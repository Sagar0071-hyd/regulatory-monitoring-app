# Complete Setup Instructions

Step-by-step guide to get your Regulatory Monitoring Dashboard running.

## Prerequisites

Before starting, ensure you have:
- **Node.js** (v14+) - Download from https://nodejs.org/
- **MongoDB** (local or Atlas account) - https://www.mongodb.com/
- **Git** - https://git-scm.com/
- **Text Editor** - VS Code recommended - https://code.visualstudio.com/
- **Gmail Account** (for password reset emails)
- **Razorpay Account** (for payments) - https://razorpay.com/

## Step 1: Prepare the Project

```bash
# Navigate to your projects directory
cd "c:\Users\MICROSOFT\OneDrive\Documents\Claude"

# You should see the regulatory-monitoring-app folder
ls -la regulatory-monitoring-app/
```

## Step 2: Backend Setup

### 2.1 Install Backend Dependencies

```bash
cd regulatory-monitoring-app/backend
npm install
```

**What this does**: Installs all Node.js packages listed in `package.json`

### 2.2 Create Environment File

```bash
# Copy template to actual .env file
cp .env.example .env

# On Windows (if cp doesn't work):
copy .env.example .env
```

### 2.3 Configure Environment Variables

Open `backend/.env` in your text editor and update:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB - Use one of these options
# Option A: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/regulatory-monitoring

# Option B: MongoDB Atlas (Cloud)
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create account and cluster
# 3. Get connection string
# 4. Replace with:
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/regulatory-monitoring

# JWT Configuration (Change these!)
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
JWT_EXPIRE=7d

# Email Configuration (Gmail)
# 1. Enable 2-Step Verification on Gmail
# 2. Go to https://myaccount.google.com/apppasswords
# 3. Select "Mail" and "Windows Computer"
# 4. Copy the 16-character password
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_FROM=noreply@regulatory-monitoring.com

# Razorpay Payment Gateway
# 1. Create account at https://razorpay.com
# 2. Go to Settings → API Keys
# 3. Copy Key ID and Secret
RAZORPAY_KEY_ID=rzp_test_1234567890
RAZORPAY_KEY_SECRET=your_secret_key_here

# Admin Account (Change password immediately!)
ADMIN_EMAIL=Sagar0071@gmail.com
ADMIN_PASSWORD=Login@321

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 2.4 Start MongoDB

Choose one option:

**Option A: Local MongoDB (Windows)**
```bash
# If MongoDB is installed
mongod

# If MongoDB is installed as service, it auto-starts
```

**Option B: MongoDB Atlas (Cloud)**
- No setup needed, just use connection string in `.env`

### 2.5 Start Backend Server

```bash
# From backend directory
npm run dev

# You should see:
# ✓ Server running on port 5000
# ✓ MongoDB connected
```

**Keep this terminal open!**

## Step 3: Frontend Setup

### 3.1 Open New Terminal

```bash
# In a NEW terminal window, navigate to frontend
cd regulatory-monitoring-app/frontend
```

### 3.2 Install Frontend Dependencies

```bash
npm install
```

### 3.3 Update Razorpay Key (Important!)

Open `frontend/src/pages/UpgradePlan.js`

Find this line (around line 70):
```javascript
key: 'rzp_test_1234567890', // Replace with your Razorpay Key ID
```

Replace with your actual key:
```javascript
key: 'YOUR_RAZORPAY_KEY_ID', // From Razorpay dashboard
```

### 3.4 Start Frontend Server

```bash
npm start

# Browser should open at http://localhost:3000
```

**Keep this terminal open!**

## Step 4: Test the Application

### 4.1 Admin Login

1. Go to http://localhost:3000
2. Click "Login"
3. Use the credentials from **ADMIN_CREDENTIALS.md** file (kept private)
4. Click "Login"

**You should see the Admin Panel link in navigation**

### 4.2 Test Admin Panel

1. Click "Admin Panel" in navigation
2. You should see:
   - User Management tab
   - Dashboard Stats tab
   - Settings tab

### 4.3 Create Test User

1. Click "Logout" (top right)
2. Click "Create Account"
3. Fill in:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `Test@123`
4. Click "Create Account"

**You should see**: "Registration successful. Please wait for admin approval."

### 4.4 Admin Approves User

1. Login again as admin
2. Go to Admin Panel → User Management
3. Find "test@example.com" with "PENDING" status
4. Click "Approve" button
5. User should show as "APPROVED"

### 4.5 Test User Features

1. Logout
2. Login with test user account
3. Should see Dashboard with tabs
4. Try clicking "Competitors" tab
5. Should see upgrade prompt
6. Click "Upgrade Now"

### 4.6 Test Payment

1. On Upgrade page, click "Get Started" on any plan
2. Test payment window appears
3. Use test card: `4111 1111 1111 1111`
4. Expiry: Any future date
5. CVV: Any 3 digits
6. Click "Pay"

**After successful payment**: Tab should be accessible

## Step 5: Customize the Application

### 5.1 Change Admin Password

1. Login as admin
2. Go to profile settings (or edit .env and restart)
3. Update `ADMIN_PASSWORD` in `backend/.env`
4. Restart backend: Stop and run `npm run dev` again

### 5.2 Customize Branding

**Change app title**:
- Edit `frontend/public/index.html`
- Change `<title>Regulatory Monitoring Dashboard</title>`

**Change colors**:
- Edit `frontend/src/App.css`
- Change primary color `#667eea`
- Change secondary color `#764ba2`

**Change logo**:
- Edit `frontend/src/components/Navigation.js`
- Replace `📊` emoji or add actual logo

### 5.3 Add Sample Data

1. Connect to MongoDB
2. Insert test data:
```javascript
db.regulatory_data.insertMany([
  {
    category: "regulatory_updates",
    title: "FDA Updates on Medical Devices",
    description: "New guidelines...",
    severity: "high",
    region: "AMR",
    country: "USA",
    productCategory: "Medical Devices",
    source: "FDA",
    createdAt: new Date()
  }
])
```

## Step 6: Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"

**Solution**:
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
mongod --dbpath /path/to/data

# Or use MongoDB Atlas (cloud)
```

### Issue: "Email not sending"

**Solution**:
1. Go to https://myaccount.google.com/apppasswords
2. Generate new app password
3. Update `EMAIL_PASSWORD` in `.env`
4. Restart backend

### Issue: "Port 5000 already in use"

**Solution**:
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in .env
PORT=5001
```

### Issue: "CORS error when accessing API"

**Solution**:
1. Check `FRONTEND_URL` in `backend/.env`
2. Should be exactly `http://localhost:3000`
3. Restart backend

### Issue: "Payment page blank"

**Solution**:
1. Update Razorpay key in `UpgradePlan.js`
2. Check browser console for errors
3. Verify Razorpay account is active

## Step 7: Development Tips

### Useful Commands

```bash
# Backend
npm run dev        # Start with auto-reload
npm start          # Start normally

# Frontend
npm start          # Start dev server
npm run build      # Create production build
npm test           # Run tests
```

### Debug Mode

**Backend**: Check console output for API logs
**Frontend**: Use browser DevTools (F12) to:
- Check Network tab for API calls
- Check Console tab for errors
- Check Application tab for localStorage (token storage)

### Test Different Scenarios

1. **Free User Flow**:
   - Register → Approve → Login → View free tabs → Can't access paid tabs

2. **Paid User Flow**:
   - Register → Approve → Login → Upgrade → Can access all tabs

3. **Admin Flow**:
   - Login as admin → Manage users → View statistics

## Step 8: Before Going to Production

### Security Checklist

- [ ] Change `ADMIN_PASSWORD` to strong password
- [ ] Change `JWT_SECRET` to random string (minimum 32 chars)
- [ ] Update `RAZORPAY_KEY_ID` to production key
- [ ] Update `RAZORPAY_KEY_SECRET` to production secret
- [ ] Switch `MONGODB_URI` to production database
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS/SSL
- [ ] Setup database backups

### Performance Optimization

- [ ] Build frontend: `npm run build`
- [ ] Enable compression in backend
- [ ] Setup caching
- [ ] Optimize images
- [ ] Configure CDN

### Deployment

- [ ] Choose hosting (Heroku, Vercel, AWS, etc.)
- [ ] Configure environment variables
- [ ] Setup monitoring and logging
- [ ] Setup email alerts
- [ ] Test all features in production

## Step 9: Get Help

### Check Documentation
1. **README.md** - Project overview
2. **QUICKSTART.md** - Quick setup
3. **PROJECT_STRUCTURE.md** - File organization
4. **DEPLOYMENT.md** - Production guide

### Debug Steps
1. Check `.env` configuration
2. Review browser console (F12)
3. Check backend logs in terminal
4. Verify MongoDB connection
5. Test API endpoints with curl

### Contact Support
For issues:
1. Review error messages carefully
2. Check relevant documentation
3. Verify all credentials and URLs
4. Restart backend and frontend

## Next Steps

1. ✅ Complete basic setup above
2. ✅ Test all features locally
3. ✅ Customize branding and colors
4. ✅ Add sample regulatory data
5. ✅ Test payment integration
6. ✅ Deploy to production

---

**Congratulations!** Your Regulatory Monitoring Dashboard is now running! 🎉

**For deployment, refer to DEPLOYMENT.md**
