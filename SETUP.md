# Quick Setup Guide

## Minimum Required Versions
- Node.js: v16.0.0+
- npm: v8.0.0+
- MongoDB: v5.0.0+

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
# Install all dependencies (backend + frontend)
npm run install-all
```

### 2. Setup MongoDB
**Windows:**
```bash
net start MongoDB
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 3. Configure Environment
```bash
# Copy environment template
cp .env.example .env
```

**Edit `.env` with minimum required settings:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event-booking
JWT_SECRET=your_32_character_secret_key_here_minimum
STRIPE_SECRET_KEY=sk_test_your_stripe_key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
CLIENT_URL=http://localhost:3000
```

### 4. Update Stripe Publishable Key
Open `frontend/src/pages/EventDetails.js` line 10 and replace:
```javascript
const stripePromise = loadStripe('pk_test_YOUR_ACTUAL_PUBLISHABLE_KEY');
```

### 5. Start the Application
```bash
# Start both backend and frontend
npm run dev
```

### 6. Create Admin User
1. Register at http://localhost:3000/register
2. Open MongoDB shell:
```bash
mongosh
use event-booking
db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } })
exit
```
3. Logout and login again

## Test Payment
Use Stripe test card: **4242 4242 4242 4242**
- Any future expiry date
- Any 3-digit CVC
- Any ZIP code

## Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Admin Dashboard**: http://localhost:3000/admin/dashboard (after creating admin user)

## Common Issues

### Port in use?
Change PORT in `.env` file to 5001 or any available port

### MongoDB not running?
Start it with commands in step 2

### Can't login after registration?
Clear browser cache and try again

## Need Help?
Refer to the main README.md for detailed instructions!
