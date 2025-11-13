#!/bin/bash

# Portfolio Website - Quick Setup Script
# This script automates the initial setup process

echo "╔═══════════════════════════════════════════════════════════╗"
echo "║   Portfolio Website - Automated Setup                     ║"
echo "║   AI Engineer | UI/UX Designer | Data Analyst             ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
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
echo ""
print_info "Checking prerequisites..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi
print_status "Node.js $(node -v) detected"

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi
print_status "npm $(npm -v) detected"

# Step 1: Install Frontend Dependencies
echo ""
echo "════════════════════════════════════════════════════════════"
print_info "Step 1: Installing Frontend Dependencies..."
echo "════════════════════════════════════════════════════════════"
cd frontend
if [ $? -ne 0 ]; then
    print_error "Frontend directory not found!"
    exit 1
fi

npm install
if [ $? -eq 0 ]; then
    print_status "Frontend dependencies installed successfully"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi
cd ..

# Step 2: Install Backend Dependencies
echo ""
echo "════════════════════════════════════════════════════════════"
print_info "Step 2: Installing Backend Dependencies..."
echo "════════════════════════════════════════════════════════════"
cd backend
if [ $? -ne 0 ]; then
    print_error "Backend directory not found!"
    exit 1
fi

npm install
if [ $? -eq 0 ]; then
    print_status "Backend dependencies installed successfully"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi

# Step 3: Setup Environment Variables
echo ""
echo "════════════════════════════════════════════════════════════"
print_info "Step 3: Setting up Environment Variables..."
echo "════════════════════════════════════════════════════════════"

if [ ! -f .env ]; then
    cp .env.example .env
    print_status ".env file created from .env.example"
    print_warning "IMPORTANT: Edit backend/.env with your actual credentials!"
    echo ""
    print_info "You need to configure:"
    echo "  1. MONGODB_URI - Your MongoDB connection string"
    echo "  2. EMAIL_USER - Your Gmail address"
    echo "  3. EMAIL_PASS - Your Gmail app password"
    echo "  4. JWT_SECRET - A random secret key"
else
    print_status ".env file already exists"
fi

cd ..

# Step 4: Check MongoDB
echo ""
echo "════════════════════════════════════════════════════════════"
print_info "Step 4: Checking MongoDB..."
echo "════════════════════════════════════════════════════════════"

if command -v mongod &> /dev/null; then
    print_status "MongoDB is installed"
    if pgrep -x mongod > /dev/null; then
        print_status "MongoDB is running"
    else
        print_warning "MongoDB is not running"
        print_info "Start it with: brew services start mongodb-community"
        print_info "Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas"
    fi
else
    print_warning "MongoDB not found locally"
    print_info "Options:"
    echo "  1. Install MongoDB locally: brew install mongodb-community"
    echo "  2. Use MongoDB Atlas (recommended): https://www.mongodb.com/cloud/atlas"
fi

# Summary
echo ""
echo "════════════════════════════════════════════════════════════"
print_status "Installation Complete!"
echo "════════════════════════════════════════════════════════════"
echo ""
print_info "Next Steps:"
echo ""
echo "1. Configure Environment Variables:"
echo "   ${BLUE}nano backend/.env${NC}"
echo ""
echo "2. Start MongoDB (if using local):"
echo "   ${BLUE}brew services start mongodb-community${NC}"
echo ""
echo "3. Seed Database with Sample Projects:"
echo "   ${BLUE}cd backend && node src/seeds/seedProjects.js${NC}"
echo ""
echo "4. Start Backend Server (Terminal 1):"
echo "   ${BLUE}cd backend && npm run dev${NC}"
echo ""
echo "5. Start Frontend Server (Terminal 2):"
echo "   ${BLUE}cd frontend && npm run dev${NC}"
echo ""
echo "6. Open your browser:"
echo "   ${BLUE}http://localhost:3000${NC}"
echo ""
print_info "For detailed setup instructions, see: SETUP_GUIDE.md"
echo ""
print_warning "Don't forget to:"
echo "  • Get Gmail App Password: https://myaccount.google.com/apppasswords"
echo "  • Update .env with your credentials"
echo "  • Customize your personal information in the components"
echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║   Happy Coding! 🚀                                         ║"
echo "╚═══════════════════════════════════════════════════════════╝"
