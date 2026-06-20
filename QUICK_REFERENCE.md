# Quick Reference Card - Global Reg Monitor

## 🎯 30-Minute Deployment

```
STEP 1: Backend (10 min)
  → Read: RAILWAY_DEPLOYMENT.md
  → Host: railway.app
  → Result: https://[your-url].up.railway.app

STEP 2: Frontend (10 min)
  → Read: VERCEL_DEPLOYMENT.md
  → Host: vercel.com
  → Result: https://global-reg-monitor.vercel.app

STEP 3: Test (10 min)
  → Login with admin credentials
  → Create test user
  → Test payment (test card: 4111 1111 1111 1111)
  → Result: Live! 🚀
```

## 📋 What You Need Before Starting

### Accounts
- [ ] GitHub (push code)
- [ ] Vercel (frontend)
- [ ] Railway (backend)
- [ ] MongoDB Atlas (database)
- [ ] Razorpay (payments)
- [ ] Gmail (email)

### Credentials to Gather
```
MongoDB:        Connection string from Atlas
Razorpay:       Key ID + Secret from dashboard
Gmail:          App password from account settings
JWT Secret:     Generate: openssl rand -base64 32
Admin Password: Create your own strong password
```

## 🚀 Deployment URLs

### After Deploying

```
Frontend (Users Access):
  https://global-reg-monitor.vercel.app

Admin Panel:
  https://global-reg-monitor.vercel.app/admin

Backend API:
  https://[railway-url].up.railway.app

Health Check:
  https://[railway-url].up.railway.app/api/health
```

## 🔑 Key Environment Variables

### Frontend (Vercel)
```
REACT_APP_API_URL=https://[your-railway-url].up.railway.app
```

### Backend (Railway) - 10 Variables
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-random-string
JWT_EXPIRE=7d
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
ADMIN_EMAIL=Sagar0071@gmail.com
ADMIN_PASSWORD=your-password
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=https://global-reg-monitor.vercel.app
```

## ⚡ Common Commands

```bash
# Generate JWT Secret
openssl rand -base64 32

# Check Vercel status
curl https://global-reg-monitor.vercel.app

# Check Railway API
curl https://[your-url].up.railway.app/api/health

# View Railway logs
railway logs

# View Vercel logs
vercel logs [project]
```

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Blank page | Check REACT_APP_API_URL in Vercel |
| API fails | Verify backend is running, check logs |
| CORS error | Verify FRONTEND_URL in Railway env vars |
| Login fails | Check admin credentials, verify database |
| Email not sending | Verify Gmail app password, check SMTP |
| Payment broken | Verify Razorpay keys, check test mode |

## 📞 Support Links

| Need Help With | Link |
|---|---|
| Vercel issues | vercel.com/support |
| Railway issues | railway.app/support |
| MongoDB issues | docs.mongodb.com |
| Razorpay issues | razorpay.com/support |

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| DEPLOY_LIVE.md | Full 30-min guide |
| VERCEL_DEPLOYMENT.md | Frontend setup |
| RAILWAY_DEPLOYMENT.md | Backend setup |
| ADMIN_CREDENTIALS.md | Your login info |

## ✅ Testing Checklist

After deployment, verify:

```
[ ] Frontend loads
[ ] Login page works
[ ] Can create user account
[ ] Can approve user (admin)
[ ] Can login as user
[ ] Can see free tabs
[ ] Can see upgrade option
[ ] Test payment works (4111...)
[ ] Email sending works
[ ] All tabs display
```

## 💰 Monthly Costs

```
Vercel:       FREE
Railway:      FREE ($5 credit)
MongoDB:      FREE (512MB)
Gmail:        FREE
Razorpay:     2% per transaction
TOTAL:        FREE to $20/month
```

## 🎯 Features Available

**Users Can**:
- Register with email
- Login/logout
- Reset password
- View free content
- Upgrade to paid
- Process payments

**Admins Can**:
- View all users
- Approve/reject users
- See statistics
- Track revenue

**Dashboard**:
- 8 tabs (4 free, 4 paid)
- Mobile responsive
- Real-time data
- Professional UI

## 📊 Project Stats

```
Files:        42
Code:         3,000+ lines
Docs:         10,000+ lines
Pages:        7
Components:   2
CSS Files:    8
API Routes:   4
Models:       2
Features:     15+
```

## 🔒 Security

```
✅ Password hashing
✅ JWT authentication
✅ Protected routes
✅ Admin access control
✅ HTTPS ready
✅ Environment variables
✅ No hardcoded secrets
```

## 🚀 Ready to Go?

1. **First**: Read `DEPLOY_LIVE.md`
2. **Gather**: All credentials
3. **Deploy**: Backend (10 min)
4. **Deploy**: Frontend (10 min)
5. **Test**: Everything (10 min)
6. **Share**: URL with users

**Total Time: 30 minutes**

---

### Your App Name
```
Global Reg Monitor
```

### Frontend URL (Live)
```
https://global-reg-monitor.vercel.app
```

### Admin Login
```
See: ADMIN_CREDENTIALS.md
```

---

**Start with**: `DEPLOY_LIVE.md`
**Expected**: Live in 30 minutes
**Status**: ✅ Ready for production
