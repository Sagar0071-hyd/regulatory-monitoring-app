# Quick Start Guide - Regulatory Monitoring Dashboard

Get the application running in 10 minutes!

## 1️⃣ Clone and Setup

```bash
# Navigate to the project directory
cd regulatory-monitoring-app

# Create a copy of environment file
cp backend/.env.example backend/.env
```

## 2️⃣ Configure Environment (backend/.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/regulatory-monitoring
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=7d

EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-16-chars
EMAIL_FROM=noreply@regulatory-monitoring.com

RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_KEY_SECRET=your_secret

ADMIN_EMAIL=Sagar0071@gmail.com
ADMIN_PASSWORD=Login@321

FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

## 3️⃣ Start MongoDB

### Option A: Local MongoDB
```bash
mongod
```

### Option B: MongoDB Atlas (Cloud)
Replace `MONGODB_URI` in .env with your Atlas connection string

## 4️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

✅ Backend running on: `http://localhost:5000`

## 5️⃣ Frontend Setup (New Terminal)

```bash
cd frontend
npm install
npm start
```

✅ Frontend running on: `http://localhost:3000`

## 6️⃣ Test the Application

### Admin Login
- **Email**: `Sagar0071@gmail.com`
- **Password**: `Login@321`
- Access: `http://localhost:3000/login`

### Admin Panel Features
1. Approve/reject new users
2. View dashboard statistics
3. Configure payment settings
4. Manage GitHub integration

### Test User Flow
1. Register new account
2. Admin approves account
3. User logs in
4. Can view free content
5. Click "Upgrade Plan"
6. Select plan and pay (test mode)

## 7️⃣ Gmail App Password (For Email Sending)

1. Go to https://myaccount.google.com/apppasswords
2. Select: Mail → Windows Computer (or your device)
3. Copy the 16-character password
4. Paste in `.env` as `EMAIL_PASSWORD`

## 8️⃣ Razorpay Test Mode

### Test Card Details
- **Card Number**: 4111 1111 1111 1111
- **Expiry**: Any future date (e.g., 12/25)
- **CVV**: Any 3 digits (e.g., 123)

### Get Test Credentials
1. Create account at https://razorpay.com
2. Go to Settings → API Keys
3. Copy Key ID and Secret
4. Update `.env`

## 9️⃣ API Testing (Optional)

### Test User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test@123"
  }'
```

### Test Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-admin-email@example.com",
    "password": "your-admin-password"
  }'
```

## 🔟 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
ps aux | grep mongod

# If not running:
mongod --dbpath /path/to/data
```

### "Email not sending"
1. Verify `EMAIL_USER` and `EMAIL_PASSWORD` in .env
2. Enable "Less secure app access" or use App Password
3. Check Gmail account has 2-Factor Authentication enabled

### "Razorpay payment fails"
1. Verify `RAZORPAY_KEY_ID` in .env
2. Update Key ID in `frontend/src/pages/UpgradePlan.js` line 70
3. Check test/production mode consistency

### "CORS error"
1. Ensure `FRONTEND_URL` matches your frontend URL
2. Verify backend CORS configuration in `server.js`

### "Port already in use"
```bash
# Change port in .env or kill existing process
# Linux/Mac:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## 📁 Key Files to Customize

### Backend
- `backend/.env` - Configuration
- `backend/routes/auth.js` - Authentication logic
- `backend/routes/admin.js` - Admin features
- `backend/utils/sendEmail.js` - Email templates

### Frontend
- `frontend/src/pages/UpgradePlan.js` - Payment integration (update Razorpay key)
- `frontend/src/App.js` - Routes and authentication
- `frontend/src/pages/Dashboard.js` - Main dashboard

## 🚀 Next Steps

1. **Customize Branding**
   - Update app title in `frontend/public/index.html`
   - Change colors in CSS files
   - Add your logo

2. **Add Sample Data**
   - Insert regulatory data into MongoDB
   - Use admin panel to verify

3. **Configure Email Templates**
   - Customize email messages in `backend/routes/auth.js`
   - Update sender email and branding

4. **Setup Production Deployment**
   - Configure production database
   - Set up HTTPS
   - Enable environment-based configuration

## 📱 Mobile Responsive

The application is mobile-responsive. Test on:
- iPhone (Safari)
- Android (Chrome)
- Tablet devices

## ✨ Features Ready to Use

✅ User registration and authentication
✅ Admin approval system
✅ Password reset via email
✅ Razorpay payment integration
✅ Role-based access control
✅ Premium content restriction
✅ Admin dashboard with statistics
✅ User management panel

## 🔐 Security Checklist

Before deploying:

- [ ] Change default admin password
- [ ] Update JWT_SECRET with strong key
- [ ] Move API keys to environment variables
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Setup database backups
- [ ] Configure firewall rules
- [ ] Enable database authentication
- [ ] Update CORS for production URLs

## 📞 Support

For issues:
1. Check `.env` configuration
2. Review browser console errors
3. Check backend server logs
4. Verify database connection

---

**You're all set! Start the application and begin testing.** 🎉
