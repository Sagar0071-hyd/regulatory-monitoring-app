# Regulatory Monitoring Dashboard - Full Stack Application

A comprehensive web application for monitoring regulatory updates with role-based access control, payment integration, and admin panel.

## Features

### 🔐 Authentication & Authorization
- **User Registration**: New users can register and await admin approval
- **Admin Login**: Admin access with email `Sagar0071@gmail.com` and password `Login@321`
- **Password Reset**: Email-based password reset with alphanumeric tokens
- **Role-Based Access**: User, Admin, and Paid User roles
- **JWT Token Authentication**: Secure token-based authentication

### 📊 Dashboard
- **8 Regulatory Tabs**:
  - Regulatory Updates (Free)
  - M&A Tracker (Free)
  - Deadline Countdown (Free)
  - Recalls (Free)
  - Competitors (Paid)
  - RFI/RFP (Paid)
  - Regulatory Services (Paid)
  - Reg. Tools (Paid)

### 💳 Payment Integration
- **Razorpay Integration**: UPI, Credit Cards, Debit Cards
- **Three Pricing Plans**:
  - Monthly: ₹99 (30 days)
  - Quarterly: ₹249 (90 days) - 15% savings
  - Yearly: ₹899 (365 days) - 25% savings
- **Secure Payment Processing**
- **Payment History Tracking**

### 👨‍💼 Admin Panel
- **User Management**: View, approve, or reject users
- **Dashboard Statistics**:
  - Total Users
  - Pending Approvals
  - Approved Users
  - Paid Users
  - Total Revenue
- **GitHub Integration**: Real-time data updates
- **Payment Settings Configuration**

### 🔔 Email Notifications
- Registration confirmation
- Password reset links
- Account approval notifications
- Payment receipts

## Tech Stack

### Backend
- **Runtime**: Node.js with ES Modules
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Payments**: Razorpay SDK
- **Email**: Nodemailer

### Frontend
- **Library**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Tables**: Tanstack React Table (optional)
- **Charts**: Recharts (optional)

## Project Structure

```
regulatory-monitoring-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── RegulatoryData.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   ├── payment.js
│   │   └── data.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   ├── sendEmail.js
│   │   └── generatePassword.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── AdminPanel.js
│   │   │   ├── UpgradePlan.js
│   │   │   ├── ForgotPassword.js
│   │   │   └── ResetPassword.js
│   │   ├── components/
│   │   │   ├── Navigation.js
│   │   │   └── ProtectedRoute.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Razorpay Account
- Gmail Account (for email service)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   npm install
   ```

2. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```

3. **Update `.env` with your credentials**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/regulatory-monitoring
   JWT_SECRET=your-secret-key-here
   
   # Email Configuration
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_FROM=noreply@regulatory-monitoring.com
   
   # Razorpay
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   
   # Admin
   ADMIN_EMAIL=Sagar0071@gmail.com
   ADMIN_PASSWORD=Login@321
   
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB** (if local)
   ```bash
   mongod
   ```

5. **Run backend**
   ```bash
   npm run dev
   # or for production
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Update Razorpay Key** in `src/pages/UpgradePlan.js`
   ```javascript
   const options = {
     key: 'YOUR_RAZORPAY_KEY_ID', // Replace this
     // ...
   };
   ```

## Environment Variables

### Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/regulatory-monitoring

# JWT
JWT_SECRET=your_very_secure_secret_key_change_this
JWT_EXPIRE=7d

# Email (Gmail SMTP)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_FROM=noreply@regulatory-monitoring.com

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_KEY_SECRET=your_secret_key

# Admin Credentials
ADMIN_EMAIL=Sagar0071@gmail.com
ADMIN_PASSWORD=Login@321

# Frontend
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/me` - Get current user

### Admin
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user by ID
- `PUT /api/admin/users/:id/approve` - Approve user for paid version
- `PUT /api/admin/users/:id/reject` - Reject user
- `GET /api/admin/stats` - Get dashboard statistics

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify-payment` - Verify payment and upgrade user

### Data
- `GET /api/data/category/:category` - Get data by category
- `POST /api/data/get-data` - Get data with filters
- `GET /api/data/admin/all` - Admin: Get all data

## Default Admin Account

```
Email: Sagar0071@gmail.com
Password: Login@321
```

⚠️ Change this password immediately after first login!

## Email Configuration

### Gmail Setup
1. Enable 2-Step Verification
2. Create App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character app password in `.env`

### Alternative: SendGrid, Mailgun, etc.
Update the transporter in `backend/utils/sendEmail.js`

## Razorpay Integration

### Test Credentials
Use test credentials for development:
- Card: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits

### Get Production Keys
1. Create Razorpay account
2. Get Key ID and Secret from dashboard
3. Update `.env` with production keys
4. Update frontend with production Key ID

## Features Breakdown

### Free Users Can Access
- Regulatory Updates
- M&A Tracker
- Deadline Countdown
- Recalls

### Paid Users Unlock
- Competitors Analysis
- RFI/RFP Tracking
- Regulatory Services
- Regulatory Tools

### Admin Features
- User Management
- Approval/Rejection of users
- Dashboard statistics
- Revenue tracking
- GitHub integration (UI ready)
- Payment settings management

## Security Features

✅ **Implemented**
- JWT token-based authentication
- Password hashing with bcryptjs
- Protected routes
- CORS configuration
- Input validation
- Database encryption (password fields)

⚠️ **To Implement**
- Rate limiting
- Helmet.js for HTTP headers
- SQL injection prevention
- XSS protection
- CSRF tokens

## Common Issues

### MongoDB Connection Error
```
Check if MongoDB is running:
- Windows: Start MongoDB service
- Mac/Linux: mongod command
- Use MongoDB Atlas for cloud database
```

### Email Not Sending
```
1. Enable Less Secure App Access (Gmail)
2. Use App Password instead of Gmail password
3. Check EMAIL_USER and EMAIL_PASSWORD in .env
4. Verify SMTP settings
```

### Razorpay Payment Fails
```
1. Check Key ID and Secret in .env
2. Ensure test/production keys match environment
3. Verify API endpoint URLs
4. Check CORS settings
```

### JWT Token Expired
```
Token expires in 7 days by default
User needs to login again
Update JWT_EXPIRE in .env to change duration
```

## Deployment

### Backend Deployment (Heroku Example)
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your-connection-string
git push heroku main
```

### Frontend Deployment (Vercel Example)
```bash
npm run build
vercel --prod
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
1. Check the API endpoints documentation
2. Review .env configuration
3. Check browser console for frontend errors
4. Check server logs for backend errors

## Future Enhancements

- [ ] Two-factor authentication
- [ ] API rate limiting
- [ ] Advanced analytics
- [ ] Data export (CSV/PDF)
- [ ] Mobile app
- [ ] Real-time notifications
- [ ] Advanced filtering
- [ ] Custom reports

---

**Made with ❤️ for regulatory monitoring**
