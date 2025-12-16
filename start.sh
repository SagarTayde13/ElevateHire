#!/bin/bash

# Function to kill background processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $(jobs -p)
    exit
}

trap cleanup SIGINT

echo "🚀 Starting Interview Marketplace..."

# Start Backend
echo "Starting Spring Boot Backend (Port 8080)..."
cd backend
mvn spring-boot:run &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to initialize (optional, or just start frontend immediately)
sleep 5

# Start Frontend
echo "Starting Next.js Frontend (Port 3000)..."
cd frontend
npm run dev

# Wait for all background processes
wait
