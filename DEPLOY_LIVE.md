# 🚀 Deploy Global Reg Monitor LIVE in 30 Minutes

Quick guide to get your app live on the internet.

## What You'll Have After This

✅ Frontend live on Vercel (Free)
✅ Backend live on Railway (Free tier - $5/month credit)
✅ Production MongoDB (Free tier)
✅ Professional app ready for users

## Timeline

| Step | Time | Difficulty |
|------|------|-----------|
| 1. Deploy Backend | 10 min | Easy ✓ |
| 2. Deploy Frontend | 10 min | Easy ✓ |
| 3. Connect & Test | 10 min | Easy ✓ |
| **Total** | **30 min** | **Very Easy** |

## Step 1: Deploy Backend to Railway (10 minutes)

### 1.1 Create Railway Account
- Go to https://railway.app
- Click "Sign in with GitHub"
- Authorize Railway

### 1.2 Push Code to GitHub
```bash
cd regulatory-monitoring-app
git init
git add .
git commit -m "Global Reg Monitor - Ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/regulatory-monitoring-app.git
git push -u origin main
```

### 1.3 Deploy Backend on Railway
1. Click "Create New Project"
2. Select "Deploy from GitHub repo"
3. Select your `regulatory-monitoring-app` repository
4. Railway auto-detects backend and deploys

### 1.4 Configure Environment Variables

Add these in Railway Dashboard (Variables section):

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=generate-strong-random-string
RAZORPAY_KEY_ID=your-key-from-razorpay
RAZORPAY_KEY_SECRET=your-secret-from-razorpay
ADMIN_EMAIL=Sagar0071@gmail.com
ADMIN_PASSWORD=your-secure-password
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=https://global-reg-monitor.vercel.app
NODE_ENV=production
```

### 1.5 Get Your Backend URL
- Railway Dashboard shows your URL like: `https://xxxx-production.up.railway.app`
- **Copy this URL** - you'll need it for frontend

✅ **Backend is now LIVE!**

## Step 2: Deploy Frontend to Vercel (10 minutes)

### 2.1 Create Vercel Account
- Go to https://vercel.com
- Click "Sign up with GitHub"
- Authorize Vercel

### 2.2 Deploy Frontend
1. Click "New Project"
2. Select "Import Git Repository"
3. Select your `regulatory-monitoring-app` repository
4. **Important**: Set Root Directory to `frontend`
5. Click "Deploy"

### 2.3 Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

```
REACT_APP_API_URL=https://your-railway-backend-url
```

Replace with your actual Railway backend URL from Step 1.5

### 2.4 Redeploy
1. Click "Deployments"
2. Click the latest deployment
3. Click "Redeploy"

✅ **Frontend is now LIVE!**

Your app is at: **https://global-reg-monitor.vercel.app**

## Step 3: Test Everything Works (10 minutes)

### 3.1 Test Frontend Loads
- Go to https://global-reg-monitor.vercel.app
- Should see login page
- Check console (F12) for errors

### 3.2 Test Login
- Open ADMIN_CREDENTIALS.md
- Use admin email and password
- Login should work
- Admin panel should be accessible

### 3.3 Test API Connection
- Try creating new user (Register page)
- Should see success message
- Check Network tab (F12) - API calls should work

### 3.4 Test Email
- Go to Forgot Password
- Enter admin email
- Check email for reset link
- Link should work

### 3.5 Test Payment (Test Mode)
- Go to Upgrade Plan
- Select any plan
- Use test card: 4111 1111 1111 1111
- Should open Razorpay popup
- Complete test payment

## What's Now Live

✅ **Frontend**: https://global-reg-monitor.vercel.app
✅ **Backend**: https://your-railway-url.up.railway.app
✅ **Database**: MongoDB Atlas (Free tier)
✅ **Email**: Gmail SMTP
✅ **Payments**: Razorpay (Test mode)

## Common Issues & Quick Fixes

### Issue: Login fails
**Fix**: 
- Verify REACT_APP_API_URL in Vercel is correct
- Check backend environment variables in Railway
- Restart Railway service

### Issue: API shows 404
**Fix**:
- Verify backend is running (check Railway logs)
- Verify REACT_APP_API_URL is correct
- No trailing slash in API URL

### Issue: CORS error
**Fix**:
- Add your Vercel URL to backend CORS
- Or update FRONTEND_URL in Railway env var
- Restart backend

### Issue: Blank page on load
**Fix**:
- Check browser console (F12) for errors
- Check Network tab - API requests should show
- Refresh page
- Clear cache (Cmd+Shift+Delete)

## Next Steps

### Immediate (Today)
- ✅ Test all features work
- ✅ Create test user account
- ✅ Approve user in admin
- ✅ Test payment
- ✅ Test password reset

### This Week
- [ ] Set up custom domain (optional)
- [ ] Enable monitoring/alerts
- [ ] Create documentation
- [ ] Share app with team

### This Month
- [ ] Add real regulatory data
- [ ] Customize branding
- [ ] Setup analytics
- [ ] Promote to users

## Cost Breakdown (Monthly)

| Service | Free Tier | Cost |
|---------|-----------|------|
| Vercel Frontend | ✓ Unlimited | FREE |
| Railway Backend | ✓ $5 credit | FREE |
| MongoDB Atlas | ✓ 512MB | FREE |
| Gmail SMTP | ✓ Unlimited | FREE |
| Razorpay | Per transaction | 2% fee |
| **Total** | - | **FREE to $20** |

## Helpful Commands

```bash
# Check if your site is live
curl https://global-reg-monitor.vercel.app

# Check backend API
curl https://your-railway-url/api/health

# View Railway logs
railway logs

# View Vercel logs
vercel logs [project-name]
```

## Getting Your URLs

### Backend URL
- Railway Dashboard → Project → Overview
- Copy the "Railway Deployment URL"
- Format: `https://xxxx-production.up.railway.app`

### Frontend URL  
- Vercel Dashboard → Project → Deployments
- Copy the "Production" URL
- Format: `https://global-reg-monitor.vercel.app`

## Domain Setup (Optional)

### Add Custom Domain

**Railway Backend**:
1. Railway → Project Settings
2. Custom Domain
3. Add your domain (e.g., api.globalregmonitor.com)
4. Add DNS record
5. Wait 24 hours for SSL

**Vercel Frontend**:
1. Vercel → Project → Settings → Domains
2. Add Domain
3. Add DNS record from Vercel
4. Wait 24 hours for SSL

## Monitoring

### Set Up Alerts
- **Railway**: Add email alerts in Settings
- **Vercel**: Enable Web Analytics
- **MongoDB**: Enable backups in Atlas

### Check Dashboard Regularly
- Monitor error rates
- Check API response times
- Review user activity
- Track payment transactions

## Troubleshooting Guide

See detailed troubleshooting in:
- `VERCEL_DEPLOYMENT.md` - Frontend issues
- `RAILWAY_DEPLOYMENT.md` - Backend issues
- `SECURITY_NOTICE.md` - Security setup

## Success Checklist

- [ ] Backend deployed on Railway
- [ ] Frontend deployed on Vercel
- [ ] Environment variables configured
- [ ] Site loads without errors
- [ ] Login works
- [ ] API requests succeed
- [ ] Email sending works
- [ ] Payment flow works (test)
- [ ] Admin panel accessible
- [ ] Users can register

## Your Live URLs

**Frontend (Users Access Here)**:
```
https://global-reg-monitor.vercel.app
```

**Backend API (Internal)**:
```
https://your-railway-url.up.railway.app
```

**Admin Panel**:
```
https://global-reg-monitor.vercel.app/admin
```

## Share Your App

You can now share:
- **Frontend URL**: https://global-reg-monitor.vercel.app
- **Admin URL**: https://global-reg-monitor.vercel.app/admin
- **GitHub Repo**: https://github.com/your-username/regulatory-monitoring-app

## Support

For deployment help:
- **Vercel**: https://vercel.com/support
- **Railway**: https://railway.app/support
- **MongoDB**: https://docs.mongodb.com/

---

## 🎉 Congratulations!

Your **Global Reg Monitor** is now **LIVE ON THE INTERNET**!

**Frontend**: https://global-reg-monitor.vercel.app
**Status**: ✅ Production Ready

Users can now:
✅ Register accounts
✅ Access free content
✅ Pay to upgrade
✅ Admin can manage users

**Next**: Check emails are working and test a payment!
