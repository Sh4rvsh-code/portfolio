#!/bin/bash

# Portfolio Startup Script - Automated Server Launch
# This script checks prerequisites, installs dependencies, and starts both servers

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo ""
    echo -e "${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC}  $1"
    echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
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

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed!"
        echo ""
        print_info "Installing Node.js..."
        echo ""
        echo "Choose installation method:"
        echo "  1. Homebrew (recommended): ${CYAN}brew install node${NC}"
        echo "  2. Download from: ${CYAN}https://nodejs.org/${NC}"
        echo "  3. Use nvm: ${CYAN}curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash${NC}"
        echo ""
        
        # Try to install with Homebrew if available
        if command -v brew &> /dev/null; then
            read -p "Install Node.js via Homebrew now? (y/n) " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                brew install node
                if [ $? -eq 0 ]; then
                    print_success "Node.js installed successfully!"
                    return 0
                fi
            fi
        fi
        
        print_error "Please install Node.js manually and run this script again"
        exit 1
    fi
    
    NODE_VERSION=$(node -v)
    print_success "Node.js ${NODE_VERSION} detected"
    return 0
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed!"
        print_info "npm should come with Node.js. Please reinstall Node.js."
        exit 1
    fi
    
    NPM_VERSION=$(npm -v)
    print_success "npm ${NPM_VERSION} detected"
    return 0
}

# Create .env if it doesn't exist
setup_env() {
    if [ ! -f backend/.env ]; then
        print_warning ".env file not found. Creating from template..."
        cp backend/.env.example backend/.env
        print_success ".env created from template"
        print_warning "IMPORTANT: Edit backend/.env with your credentials before production use!"
        print_info "For quick testing, the backend will use in-memory MongoDB (data won't persist)"
    else
        print_success ".env file exists"
    fi
}

# Install dependencies
install_deps() {
    print_info "Checking dependencies..."
    
    # Backend
    if [ ! -d "backend/node_modules" ]; then
        print_info "Installing backend dependencies..."
        cd backend
        npm install --silent
        if [ $? -ne 0 ]; then
            print_error "Failed to install backend dependencies"
            exit 1
        fi
        cd ..
        print_success "Backend dependencies installed"
    else
        print_success "Backend dependencies already installed"
    fi
    
    # Frontend
    if [ ! -d "frontend/node_modules" ]; then
        print_info "Installing frontend dependencies..."
        cd frontend
        npm install --silent
        if [ $? -ne 0 ]; then
            print_error "Failed to install frontend dependencies"
            exit 1
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
    local pid=$(lsof -ti:$port)
    if [ ! -z "$pid" ]; then
        kill -9 $pid 2>/dev/null
        sleep 1
        print_success "Killed process on port $port"
    fi
}

# Seed database (optional)
seed_database() {
    if [ ! -f backend/.env ]; then
        print_info "Skipping database seeding (using in-memory DB)"
        return 0
    fi
    
    # Check if MONGODB_URI is set in .env
    if grep -q "^MONGODB_URI=mongodb" backend/.env 2>/dev/null; then
        read -p "Seed database with sample projects? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            print_info "Seeding database..."
            cd backend
            node src/seeds/seedProjects.js
            if [ $? -eq 0 ]; then
                print_success "Database seeded successfully"
            else
                print_warning "Database seeding failed (continuing anyway)"
            fi
            cd ..
        fi
    fi
}

# Start backend in background
start_backend() {
    print_info "Starting backend server..."
    
    # Check port
    if ! check_port 5001; then
        print_warning "Port 5001 is already in use"
        read -p "Kill the process and restart? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            kill_port 5001
        else
            print_error "Cannot start backend - port 5001 in use"
            return 1
        fi
    fi
    
    cd backend
    npm run dev > ../backend.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    
    # Wait for backend to start
    print_info "Waiting for backend to start..."
    for i in {1..30}; do
        if curl -s http://localhost:5001/api/health > /dev/null 2>&1; then
            print_success "Backend running on http://localhost:5001 (PID: $BACKEND_PID)"
            return 0
        fi
        sleep 1
    done
    
    print_error "Backend failed to start. Check backend.log for details."
    tail -20 backend.log
    return 1
}

# Start frontend in background
start_frontend() {
    print_info "Starting frontend server..."
    
    # Check port
    if ! check_port 3001; then
        print_warning "Port 3001 is already in use"
        read -p "Kill the process and restart? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            kill_port 3001
        else
            print_error "Cannot start frontend - port 3001 in use"
            return 1
        fi
    fi
    
    cd frontend
    npm run dev > ../frontend.log 2>&1 &
    FRONTEND_PID=$!
    cd ..
    
    # Wait for frontend to start
    print_info "Waiting for frontend to start..."
    for i in {1..30}; do
        if curl -s http://localhost:3001 > /dev/null 2>&1; then
            print_success "Frontend running on http://localhost:3001 (PID: $FRONTEND_PID)"
            return 0
        fi
        sleep 1
    done
    
    print_error "Frontend failed to start. Check frontend.log for details."
    tail -20 frontend.log
    return 1
}

# Main script
main() {
    clear
    print_header "🚀 Portfolio Website - Automated Startup"
    
    # Save PIDs to file for later cleanup
    echo "#!/bin/bash" > .server_pids.sh
    chmod +x .server_pids.sh
    
    # Step 1: Check prerequisites
    print_header "Step 1: Checking Prerequisites"
    check_node
    check_npm
    
    # Step 2: Setup environment
    print_header "Step 2: Setting Up Environment"
    setup_env
    
    # Step 3: Install dependencies
    print_header "Step 3: Installing Dependencies"
    install_deps
    
    # Step 4: Optional database seeding
    print_header "Step 4: Database Setup"
    seed_database
    
    # Step 5: Start servers
    print_header "Step 5: Starting Servers"
    
    start_backend
    BACKEND_STATUS=$?
    
    if [ $BACKEND_STATUS -eq 0 ]; then
        echo "BACKEND_PID=$BACKEND_PID" >> .server_pids.sh
        
        start_frontend
        FRONTEND_STATUS=$?
        
        if [ $FRONTEND_STATUS -eq 0 ]; then
            echo "FRONTEND_PID=$FRONTEND_PID" >> .server_pids.sh
            
            # Success!
            print_header "✅ Success! Your Portfolio is Running!"
            echo ""
            print_success "Backend:  http://localhost:5001"
            print_success "Frontend: http://localhost:3001"
            echo ""
            print_info "Opening browser in 3 seconds..."
            sleep 3
            
            # Try to open browser
            if command -v open &> /dev/null; then
                open http://localhost:3001
            elif command -v xdg-open &> /dev/null; then
                xdg-open http://localhost:3001
            fi
            
            echo ""
            echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
            echo ""
            print_info "Server logs:"
            echo "  • Backend:  ${CYAN}tail -f backend.log${NC}"
            echo "  • Frontend: ${CYAN}tail -f frontend.log${NC}"
            echo ""
            print_info "To stop servers:"
            echo "  ${CYAN}./stop.sh${NC}"
            echo ""
            print_info "To restart:"
            echo "  ${CYAN}./start.sh${NC}"
            echo ""
            echo -e "${CYAN}═══════════════════════════════════════════════════════════${NC}"
            echo ""
            print_success "Press Ctrl+C to stop watching logs (servers will keep running)"
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

# Run main script
main
