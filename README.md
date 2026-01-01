# Event Booking System

A comprehensive event booking system built with React and Node.js that allows users to browse events, book tickets, and make secure payments. Admins can manage events and pricing with a dedicated admin panel.

## Features

### User Features
- 🎫 **Event Browsing**: Browse events by category, date, and search keywords
- 📅 **Calendar Management**: Interactive calendar to view and select event dates
- 🔍 **Availability Check**: Real-time seat availability checking
- 💳 **Secure Payments**: Integrated with Stripe for secure payment processing
- 🔐 **User Authentication**: Secure login and registration system
- 📱 **Responsive Design**: Fully responsive web application that works on all devices
- 🔔 **Event Reminders**: Automated email reminders before events
- 📋 **Booking Management**: View and manage your bookings

### Admin Features
- 📊 **Dashboard**: Overview of events, bookings, users, and revenue
- 🎪 **Event Management**: Create, update, and delete events
- 💰 **Pricing Management**: Set and update event prices
- 📈 **Analytics**: View booking statistics and revenue reports
- 👥 **User Management**: View all bookings and user activities

### Event Categories
- 🎵 Concerts
- 💼 Conferences
- 🎓 Workshops
- ⚽ Sports
- 🎭 Theater
- 🎪 Other

## Technology Stack

### Frontend
- **React** 18.2.0 - UI library
- **React Router** 6.20.0 - Routing
- **Axios** - HTTP client
- **React Calendar** 4.6.1 - Calendar component
- **Stripe React** - Payment integration
- **React Toastify** 9.1.3 - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express** 4.18.2 - Web framework
- **MongoDB** - Database
- **Mongoose** 7.6.3 - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Stripe** 14.5.0 - Payment processing
- **Nodemailer** 6.9.7 - Email notifications
- **Node-cron** 3.0.3 - Scheduled tasks

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher
- **MongoDB**: v5.0.0 or higher
- **Git**: v2.0.0 or higher

### Version Check Commands
```bash
node --version
npm --version
mongod --version
git --version
```

## Local Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Event Booking Project"
```

### 2. Install MongoDB

#### Windows
1. Download MongoDB Community Server from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the installation wizard
3. Add MongoDB to your system PATH
4. Start MongoDB service:
```bash
net start MongoDB
```

#### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community@5.0
brew services start mongodb-community@5.0
```

#### Linux (Ubuntu)
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/event-booking

# JWT Secret (Use a strong random string)
JWT_SECRET=your_very_secure_jwt_secret_key_here_min_32_characters

# Stripe Configuration
# Get your keys from: https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_specific_password

# Frontend URL
CLIENT_URL=http://localhost:3000
```

### 4. Install Dependencies

#### Install Backend Dependencies
```bash
npm install
```

#### Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

Or install all at once:
```bash
npm run install-all
```

### 5. Configure Stripe

1. Sign up for a Stripe account at [https://stripe.com](https://stripe.com)
2. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
3. Copy your **Publishable key** and **Secret key**
4. Add the Secret key to your `.env` file
5. Update the frontend Stripe configuration:
   - Open `frontend/src/pages/EventDetails.js`
   - Replace `'pk_test_YOUR_PUBLISHABLE_KEY'` with your actual Stripe Publishable key

### 6. Configure Email Notifications

#### Using Gmail:
1. Enable 2-Step Verification on your Google Account
2. Generate an App Password:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and your device
   - Copy the generated password
3. Use this password in your `.env` file as `EMAIL_PASSWORD`

#### Using Other Email Services:
Update the `EMAIL_HOST` and `EMAIL_PORT` in `.env` according to your email provider's SMTP settings.

### 7. Database Setup

The application will automatically create the database and collections on first run. Optionally, you can create an admin user:

1. Start the backend server (see step 8)
2. Register a new user through the application
3. Connect to MongoDB:
```bash
mongosh
use event-booking
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
```

### 8. Running the Application

#### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
npm run server
```
The backend will run on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
The frontend will run on http://localhost:3000

#### Option 2: Run Both Concurrently
```bash
npm run dev
```

### 9. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

### 10. Create Admin Account

1. Register a new account through the UI at http://localhost:3000/register
2. Open MongoDB shell:
```bash
mongosh
```
3. Switch to the database and update user role:
```javascript
use event-booking
db.users.updateOne(
  { email: "your_email@example.com" },
  { $set: { role: "admin" } }
)
```
4. Logout and login again to access admin features

## Testing the Application

### Test User Flow:
1. Register a new user account
2. Browse events on the Events page
3. Use the calendar to filter events by date
4. Click on an event to view details
5. Book tickets (use Stripe test card: 4242 4242 4242 4242)
6. View your bookings in "My Bookings"

### Test Admin Flow:
1. Login with an admin account
2. Navigate to Admin Dashboard
3. View statistics and recent bookings
4. Go to "Manage Events"
5. Create a new event
6. Edit or delete existing events

### Stripe Test Cards:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- Use any future expiry date and any 3-digit CVC

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `GET /api/events/:id/availability` - Check availability

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user bookings
- `GET /api/bookings/:id` - Get single booking
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Admin (Protected)
- `POST /api/admin/events` - Create event
- `PUT /api/admin/events/:id` - Update event
- `DELETE /api/admin/events/:id` - Delete event
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/stats` - Get dashboard statistics

### Payments
- `POST /api/payments/create-payment-intent` - Create payment intent
- `POST /api/payments/confirm-payment` - Confirm payment

## Project Structure

```
Event Booking Project/
├── backend/
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Event.js             # Event model
│   │   └── Booking.js           # Booking model
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── events.js            # Event routes
│   │   ├── bookings.js          # Booking routes
│   │   ├── admin.js             # Admin routes
│   │   └── payments.js          # Payment routes
│   ├── services/
│   │   └── emailService.js      # Email service
│   └── server.js                # Express server
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.js        # Navigation bar
│       │   └── EventCard.js     # Event card component
│       ├── context/
│       │   └── AuthContext.js   # Authentication context
│       ├── pages/
│       │   ├── Home.js          # Home page
│       │   ├── Events.js        # Events listing
│       │   ├── EventDetails.js  # Event details & booking
│       │   ├── Login.js         # Login page
│       │   ├── Register.js      # Registration page
│       │   ├── MyBookings.js    # User bookings
│       │   ├── AdminDashboard.js # Admin dashboard
│       │   └── AdminEvents.js   # Event management
│       ├── services/
│       │   └── api.js           # API service
│       ├── App.js               # Main app component
│       └── index.js             # Entry point
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: 
- Ensure MongoDB is running: `net start MongoDB` (Windows) or `brew services start mongodb-community` (macOS)
- Check if MongoDB is accessible: `mongosh`

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**:
- Change the PORT in `.env` file
- Or kill the process using the port:
  - Windows: `netstat -ano | findstr :5000` then `taskkill /PID <PID> /F`
  - macOS/Linux: `lsof -ti:5000 | xargs kill -9`

### JWT Token Error
```
Error: Invalid token
```
**Solution**:
- Clear browser localStorage
- Logout and login again
- Ensure JWT_SECRET is set in `.env`

### Stripe Payment Error
```
Error: Invalid API Key
```
**Solution**:
- Verify your Stripe keys in `.env` and `EventDetails.js`
- Ensure you're using test keys for development
- Check if keys are properly formatted

### Email Not Sending
```
Error: Invalid login
```
**Solution**:
- Verify EMAIL_USER and EMAIL_PASSWORD in `.env`
- For Gmail, use an App-specific password
- Check SMTP settings for your email provider

## Features in Detail

### Calendar Management
- Interactive date picker to filter events
- View events by specific dates
- Clear date filter option
- Visual event indicators

### Booking System
- Real-time availability checking
- Seat selection
- Automatic seat inventory management
- Booking confirmation emails

### Payment Integration
- Secure Stripe payment processing
- PCI compliant card handling
- Payment confirmation
- Transaction history

### Admin Dashboard
- Total events count
- Total bookings
- Registered users
- Revenue analytics
- Recent bookings overview

### Notification System
- Booking confirmation emails
- Event reminder emails (24 hours before)
- Automated cron job for reminders
- Customizable email templates

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- CORS configuration
- Input validation
- XSS protection
- Secure payment handling

## Performance Optimizations

- Database indexing
- API response caching
- Lazy loading of components
- Optimized database queries
- Connection pooling

## Future Enhancements

- [ ] QR code tickets
- [ ] Social media integration
- [ ] Event recommendations
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] PDF ticket generation
- [ ] Refund management
- [ ] Review and rating system
- [ ] Seat selection map

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request


## Support

For issues and questions:
- Create an issue in the repository
- Contact: mailkhushiag.21@gmail.com

