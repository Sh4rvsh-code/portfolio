#!/bin/bash

# Complete Portfolio Setup & Launch Script
# This script installs everything needed and starts your portfolio

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_step() {
    echo -e "${MAGENTA}▶${NC} $1"
}

# Check and install Homebrew
install_homebrew() {
    print_step "Checking Homebrew..."
    
    if command -v brew &> /dev/null; then
        BREW_VERSION=$(brew --version | head -n 1)
        print_success "Homebrew already installed: $BREW_VERSION"
        return 0
    fi
    
    print_warning "Homebrew not found. Installing..."
    echo ""
    print_info "This will install Homebrew (the package manager for macOS)"
    print_info "You may be prompted for your password"
    echo ""
    
    # Install Homebrew
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    if [ $? -ne 0 ]; then
        print_error "Homebrew installation failed"
        return 1
    fi
    
    # Add Homebrew to PATH for Apple Silicon Macs
    if [[ $(uname -m) == 'arm64' ]]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
        export PATH="/opt/homebrew/bin:$PATH"
    else
        echo 'eval "$(/usr/local/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/usr/local/bin/brew shellenv)"
        export PATH="/usr/local/bin:$PATH"
    fi
    
    # Reload shell config
    source ~/.zprofile 2>/dev/null || true
    
    print_success "Homebrew installed successfully!"
    return 0
}

# Check and install Node.js
install_nodejs() {
    print_step "Checking Node.js..."
    
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v)
        print_success "Node.js already installed: $NODE_VERSION"
        
        if command -v npm &> /dev/null; then
            NPM_VERSION=$(npm -v)
            print_success "npm already installed: v$NPM_VERSION"
            return 0
        fi
    fi
    
    print_warning "Node.js not found. Installing via Homebrew..."
    echo ""
    
    brew install node
    
    if [ $? -ne 0 ]; then
        print_error "Node.js installation failed"
        return 1
    fi
    
    # Reload PATH
    if [[ $(uname -m) == 'arm64' ]]; then
        export PATH="/opt/homebrew/bin:$PATH"
    else
        export PATH="/usr/local/bin:$PATH"
    fi
    
    # Verify installation
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v)
        NPM_VERSION=$(npm -v)
        print_success "Node.js installed: $NODE_VERSION"
        print_success "npm installed: v$NPM_VERSION"
        return 0
    else
        print_error "Node.js installation verification failed"
        print_warning "Try closing and reopening your terminal, then run: ./start.sh"
        return 1
    fi
}

# Create .env file
setup_env() {
    print_step "Setting up environment..."
    
    if [ ! -f backend/.env ]; then
        cp backend/.env.example backend/.env
        print_success ".env file created from template"
        print_info "Using in-memory MongoDB for testing (no setup required)"
        print_warning "For production, edit backend/.env with your credentials"
    else
        print_success ".env file already exists"
    fi
}

# Install dependencies
install_dependencies() {
    print_step "Installing dependencies..."
    
    # Backend
    if [ ! -d "backend/node_modules" ]; then
        print_info "Installing backend dependencies (this may take a few minutes)..."
        cd backend
        npm install --silent --no-audit --no-fund
        if [ $? -ne 0 ]; then
            print_error "Backend dependency installation failed"
            cd ..
            return 1
        fi
        cd ..
        print_success "Backend dependencies installed"
    else
        print_success "Backend dependencies already installed"
    fi
    
    # Frontend
    if [ ! -d "frontend/node_modules" ]; then
        print_info "Installing frontend dependencies (this may take a few minutes)..."
        cd frontend
        npm install --silent --no-audit --no-fund
        if [ $? -ne 0 ]; then
            print_error "Frontend dependency installation failed"
            cd ..
            return 1
        fi
        cd ..
        print_success "Frontend dependencies installed"
    else
        print_success "Frontend dependencies already installed"
    fi
}

# Check if port is available
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 1
    fi
    return 0
}

# Kill process on port
kill_port() {
    local port=$1
    local pid=$(lsof -ti:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        kill -9 $pid 2>/dev/null
        sleep 1
        print_success "Killed process on port $port"
    fi
}

# Start backend
start_backend() {
    print_step "Starting backend server..."
    
    # Check port
    if ! check_port 5000; then
        print_warning "Port 5000 is already in use. Killing existing process..."
        kill_port 5000
        sleep 2
    fi
    
    cd backend
    npm run dev > ../backend.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend to start
    print_info "Waiting for backend to start..."
    for i in {1..30}; do
        if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
            print_success "Backend running on http://localhost:5000 (PID: $BACKEND_PID)"
            echo "BACKEND_PID=$BACKEND_PID" > .server_pids.sh
            return 0
        fi
        sleep 1
        echo -n "."
    done
    echo ""
    
    print_error "Backend failed to start. Checking logs..."
    echo ""
    print_info "Last 20 lines of backend.log:"
    tail -20 backend.log
    return 1
}

# Start frontend
start_frontend() {
    print_step "Starting frontend server..."
    
    # Check port
    if ! check_port 3000; then
        print_warning "Port 3000 is already in use. Killing existing process..."
        kill_port 3000
        sleep 2
    fi
    
    cd frontend
    npm run dev > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
    
    # Wait for frontend to start
    print_info "Waiting for frontend to start..."
    for i in {1..30}; do
        if curl -s http://localhost:3000 > /dev/null 2>&1; then
            print_success "Frontend running on http://localhost:3000 (PID: $FRONTEND_PID)"
            echo "FRONTEND_PID=$FRONTEND_PID" >> .server_pids.sh
            chmod +x .server_pids.sh
            return 0
        fi
        sleep 1
        echo -n "."
    done
    echo ""
    
    print_error "Frontend failed to start. Checking logs..."
    echo ""
    print_info "Last 20 lines of frontend.log:"
    tail -20 frontend.log
    return 1
}

# Open browser
open_browser() {
    print_step "Opening browser..."
    sleep 2
    
    if command -v open &> /dev/null; then
        open http://localhost:3000
        print_success "Browser opened"
    elif command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:3000
        print_success "Browser opened"
    else
        print_warning "Could not auto-open browser. Please visit: http://localhost:3000"
    fi
}

# Main installation and startup
main() {
    clear
    echo ""
    echo -e "${CYAN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║                                                                ║${NC}"
    echo -e "${CYAN}║        🚀 PORTFOLIO WEBSITE - COMPLETE SETUP & LAUNCH 🚀       ║${NC}"
    echo -e "${CYAN}║                                                                ║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    print_info "This script will install everything needed and start your portfolio"
    echo ""
    
    # Step 1: Install Homebrew
    print_header "STEP 1/6: Installing Homebrew"
    install_homebrew
    if [ $? -ne 0 ]; then
        print_error "Setup failed at Homebrew installation"
        exit 1
    fi
    
    # Step 2: Install Node.js
    print_header "STEP 2/6: Installing Node.js"
    install_nodejs
    if [ $? -ne 0 ]; then
        print_error "Setup failed at Node.js installation"
        print_warning "Please close and reopen your terminal, then run: ./start.sh"
        exit 1
    fi
    
    # Step 3: Setup environment
    print_header "STEP 3/6: Setting Up Environment"
    setup_env
    
    # Step 4: Install dependencies
    print_header "STEP 4/6: Installing All Dependencies"
    install_dependencies
    if [ $? -ne 0 ]; then
        print_error "Setup failed at dependency installation"
        exit 1
    fi
    
    # Step 5: Start servers
    print_header "STEP 5/6: Starting Backend & Frontend"
    
    start_backend
    BACKEND_STATUS=$?
    
    if [ $BACKEND_STATUS -eq 0 ]; then
        start_frontend
        FRONTEND_STATUS=$?
        
        if [ $FRONTEND_STATUS -eq 0 ]; then
            # Step 6: Success!
            print_header "STEP 6/6: Opening Browser"
            open_browser
            
            # Final success message
            clear
            echo ""
            echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
            echo -e "${GREEN}║                                                                ║${NC}"
            echo -e "${GREEN}║            ✅ SUCCESS! YOUR PORTFOLIO IS LIVE! ✅              ║${NC}"
            echo -e "${GREEN}║                                                                ║${NC}"
            echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
            echo ""
            echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo ""
            print_success "Backend:  ${CYAN}http://localhost:5000${NC}"
            print_success "Frontend: ${CYAN}http://localhost:3000${NC}"
            echo ""
            echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo ""
            print_info "What's Installed:"
            echo "  ✓ Homebrew (package manager)"
            echo "  ✓ Node.js $(node -v)"
            echo "  ✓ npm v$(npm -v)"
            echo "  ✓ All project dependencies"
            echo ""
            print_info "What's Running:"
            echo "  ✓ Backend server (PID: $BACKEND_PID)"
            echo "  ✓ Frontend server (PID: $FRONTEND_PID)"
            echo ""
            print_info "Useful Commands:"
            echo "  • View logs:    ${CYAN}tail -f backend.log${NC} or ${CYAN}tail -f frontend.log${NC}"
            echo "  • Stop servers: ${CYAN}./stop.sh${NC}"
            echo "  • Restart:      ${CYAN}./stop.sh && ./start.sh${NC}"
            echo ""
            echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
            echo ""
            print_warning "Press Ctrl+C to stop watching logs (servers will keep running)"
            echo ""
            
            # Watch logs
            tail -f backend.log frontend.log
            
        else
            print_error "Frontend failed to start"
            kill $BACKEND_PID 2>/dev/null
            exit 1
        fi
    else
        print_error "Backend failed to start"
        exit 1
    fi
}

# Run main function
main
