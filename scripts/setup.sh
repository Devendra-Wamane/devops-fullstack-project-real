#!/bin/bash

# ============================================================
# DevOps Project - Local Setup Script
# ============================================================

set -e

echo "🚀 Setting up DevOps Full-Stack Project..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
check_command() {
    if ! command -v $1 &> /dev/null; then
        echo -e "${RED}❌ $1 is not installed. Please install it first.${NC}"
        return 1
    else
        echo -e "${GREEN}✅ $1 is installed${NC}"
        return 0
    fi
}

echo ""
echo "📋 Checking prerequisites..."
echo "================================"

check_command docker
check_command docker-compose
check_command node
check_command npm
check_command terraform
check_command aws
check_command kubectl

echo ""
echo "🔧 Setting up the application..."
echo "================================"

# Install Node.js dependencies
cd app
echo "📦 Installing Node.js dependencies..."
npm install

# Run tests
echo "🧪 Running tests..."
npm test

# Build Docker image
cd ..
echo "🐳 Building Docker image..."
docker build -t devops-demo-api:local ./app

# Start with Docker Compose
echo "🚀 Starting application with Docker Compose..."
docker-compose up -d

# Wait for the app to be ready
echo "⏳ Waiting for application to start..."
sleep 5

# Health check
echo ""
echo "🏥 Running health check..."
if curl -sf http://localhost:3000/health > /dev/null; then
    echo -e "${GREEN}✅ Application is healthy!${NC}"
else
    echo -e "${RED}❌ Application health check failed${NC}"
fi

echo ""
echo "================================"
echo -e "${GREEN}🎉 Setup complete!${NC}"
echo ""
echo "📍 Application: http://localhost:3000"
echo "📍 Health Check: http://localhost:3000/health"
echo "📍 API Items: http://localhost:3000/api/items"
echo ""
echo "📝 Useful commands:"
echo "   docker-compose logs -f    # View logs"
echo "   docker-compose down       # Stop application"
echo "   docker-compose restart    # Restart application"
echo ""
