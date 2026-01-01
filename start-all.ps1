Write-Host "Event Booking System - Starting All Services" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Start Backend in new window
Write-Host "`nStarting Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\mailk\Downloads\Event Booking Project'; Write-Host 'Backend Server' -ForegroundColor Yellow; node backend/server.js"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start Frontend in new window
Write-Host "Starting Frontend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\mailk\Downloads\Event Booking Project\frontend'; Write-Host 'Frontend Server' -ForegroundColor Yellow; npm start"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Services Starting!" -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "`nNote: MongoDB must be running for full functionality" -ForegroundColor Red
Write-Host "To start MongoDB: net start MongoDB" -ForegroundColor Yellow
