@echo off
echo Starting Wind Waker Tracker...

REM Start backend
echo Starting backend server...
start "Backend" cmd /k "cd backend && node index.js"

REM Start frontend
echo Starting frontend...
start "Frontend" cmd /k "cd frontend && npm start"

echo Services Started!