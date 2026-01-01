# Event Booking System - Status

## ✅ What's Working:
- ✅ Dependencies installed (backend & frontend)
- ✅ Environment file created (.env)
- ✅ Backend server running on http://localhost:5000
- ✅ Frontend server should be running on http://localhost:3000

## ⚠️ What Needs Setup:

### 1. MongoDB (Required for Database)
MongoDB is NOT currently installed or running. The app will work partially without it, but you won't be able to:
- Register/Login users
- Create events
- Make bookings
- Store any data

**To install MongoDB on Windows:**
1. Download from: https://www.mongodb.com/try/download/community
2. Run installer and follow the wizard
3. Start MongoDB: `net start MongoDB` (in Administrator PowerShell)

### 2. Stripe Payment (Required for Payments)
**Steps:**
1. Sign up at https://stripe.com
2. Get your test keys from: https://dashboard.stripe.com/test/apikeys
3. Update `.env` file with your Secret Key
4. Update `frontend/src/pages/EventDetails.js` line 10 with Publishable Key

### 3. Email Notifications (Optional)
For Gmail:
1. Enable 2-Step Verification
2. Generate App Password at: https://myaccount.google.com/apppasswords
3. Update `.env` with your email and app password

## 🚀 Quick Start Commands:

### Start Both Servers:
```powershell
.\start-all.ps1
```

### Start Backend Only:
```powershell
.\start-backend.ps1
```

### Start Frontend Only:
```powershell
.\start-frontend.ps1
```

### Or Manually:
```powershell
# Terminal 1 - Backend
cd "c:\Users\mailk\Downloads\Event Booking Project"
node backend/server.js

# Terminal 2 - Frontend
cd "c:\Users\mailk\Downloads\Event Booking Project\frontend"
npm start
```

## 🌐 Access Points:
- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## 📋 Next Steps:

1. **Check if frontend loaded**: Open http://localhost:3000 in your browser
2. **Install MongoDB** (see instructions above)
3. **Configure Stripe keys** for payments
4. **Create an admin user** (instructions in README.md)

## 🐛 Troubleshooting:

### Site not loading?
- Wait 30 seconds for React to compile
- Check if both terminal windows are open and running
- Refresh your browser at http://localhost:3000

### MongoDB connection error?
- Normal if MongoDB isn't installed yet
- Backend will still run but database features won't work
- Install MongoDB to fix

### Port already in use?
```powershell
# Kill process on port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Kill process on port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

## 📁 Important Files:
- `README.md` - Full documentation
- `SETUP.md` - Quick setup guide
- `.env` - Configuration (update with your keys)
- `start-all.ps1` - Start both servers

## ℹ️ Current Status:
- Node.js: ✅ Installed
- Dependencies: ✅ Installed
- Backend: ✅ Running
- Frontend: ✅ Starting (may take 30-60 seconds)
- MongoDB: ❌ Not installed
- Stripe: ⚠️ Needs configuration
- Email: ⚠️ Needs configuration
