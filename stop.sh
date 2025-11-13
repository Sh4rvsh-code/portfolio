#!/bin/bash

# Portfolio Stop Script - Stop all running servers

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo -e "${YELLOW}Stopping portfolio servers...${NC}"
echo ""

# Check if PID file exists
if [ -f .server_pids.sh ]; then
    source .server_pids.sh
    
    # Stop backend
    if [ ! -z "$BACKEND_PID" ]; then
        if ps -p $BACKEND_PID > /dev/null 2>&1; then
            kill $BACKEND_PID 2>/dev/null
            echo -e "${GREEN}✓${NC} Backend stopped (PID: $BACKEND_PID)"
        else
            echo -e "${YELLOW}⚠${NC} Backend process not found"
        fi
    fi
    
    # Stop frontend
    if [ ! -z "$FRONTEND_PID" ]; then
        if ps -p $FRONTEND_PID > /dev/null 2>&1; then
            kill $FRONTEND_PID 2>/dev/null
            echo -e "${GREEN}✓${NC} Frontend stopped (PID: $FRONTEND_PID)"
        else
            echo -e "${YELLOW}⚠${NC} Frontend process not found"
        fi
    fi
    
    rm -f .server_pids.sh
else
    echo -e "${YELLOW}⚠${NC} No PID file found. Attempting to kill by port..."
    
    # Kill by port
    BACKEND_PID=$(lsof -ti:5000)
    if [ ! -z "$BACKEND_PID" ]; then
        kill -9 $BACKEND_PID 2>/dev/null
        echo -e "${GREEN}✓${NC} Killed process on port 5000"
    fi
    
    FRONTEND_PID=$(lsof -ti:3000)
    if [ ! -z "$FRONTEND_PID" ]; then
        kill -9 $FRONTEND_PID 2>/dev/null
        echo -e "${GREEN}✓${NC} Killed process on port 3000"
    fi
fi

# Clean up log files
if [ -f backend.log ]; then
    rm backend.log
    echo -e "${GREEN}✓${NC} Cleaned backend.log"
fi

if [ -f frontend.log ]; then
    rm frontend.log
    echo -e "${GREEN}✓${NC} Cleaned frontend.log"
fi

echo ""
echo -e "${GREEN}All servers stopped!${NC}"
echo ""
