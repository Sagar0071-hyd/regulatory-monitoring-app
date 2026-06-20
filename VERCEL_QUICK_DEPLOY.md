# 🚀 Quick Vercel Deploy - Global Reg Monitor

Since you already have a Vercel account, here's the fastest path to deployment.

## ⏱️ 5-Minute Deployment

### Step 1: Push Code to GitHub (2 min)

```bash
cd regulatory-monitoring-app

# Initialize git (if not already done)
git init
git add .
git commit -m "Global Reg Monitor - Ready for Vercel"
git branch -M main

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/regulatory-monitoring-app.git
git push -u origin main
```

### Step 2: Deploy Frontend on Vercel (2 min)

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select "Import Git Repository"
4. Find and select `regulatory-monitoring-app`
5. Click "Import"

**Configuration:**
- **Project Name**: `global-reg-monitor`
- **Framework Preset**: React (auto-detected)
- **Root Directory**: Select `frontend`
- **Build Command**: `npm run build` ✓
- **Output Directory**: `build` ✓

Click "Deploy" → Wait 2-3 minutes

### Step 3: Add Environment Variables (1 min)

After deployment completes:

1. Click your project
2. Go to **Settings** → **Environment Variables**
3. Add one variable:

```
REACT_APP_API_URL = https://your-backend-api-url.com
```

(Replace with your actual backend URL - see below)

4. Click "Save"
5. Go to **Deployments** tab
6. Click the latest deployment
7. Click **Redeploy**

## 🔗 You Need a Backend API URL

Before the frontend works, you need to deploy the backend.

### Option A: Deploy Backend on Railway (Recommended - 5 min)

1. Go to https://railway.app
2. Click "Create New Project"
3. Select "Deploy from GitHub repo"
4. Select your `regulatory-monitoring-app` repository
5. Railway auto-deploys
6. Get your URL from the Railway dashboard
7. Update `REACT_APP_API_URL` in Vercel

### Option B: Use Existing Backend

If you already have a backend deployed somewhere:
- Use that API URL
- Add it to `REACT_APP_API_URL` in Vercel

## ✅ After Deployment

Your app will be live at:
```
https://global-reg-monitor.vercel.app
```

### Test It

1. Open https://global-reg-monitor.vercel.app
2. Check browser console (F12) for errors
3. Try login (see ADMIN_CREDENTIALS.md)
4. Test API calls (check Network tab)

## 🛠️ If Something Goes Wrong

### Check Build Logs
1. Vercel Dashboard → Deployments
2. Click failed deployment
3. View "Build Logs" tab
4. Look for error messages

### Common Issues

**Issue: Blank Page**
- Check if `REACT_APP_API_URL` is set correctly
- Check if backend API is running
- Check browser console (F12) for errors

**Issue: 404 on Page Refresh**
- Already configured in `vercel.json`
- Should work automatically

**Issue: API Calls Fail (CORS)**
- Verify backend has CORS enabled
- Update backend's `FRONTEND_URL` environment variable
- Restart backend

## 📝 Your Frontend is Now Live!

After these steps:
- ✅ Frontend deployed on Vercel
- ✅ Auto-scales to unlimited users
- ✅ Global CDN delivery
- ✅ Free forever (with Vercel free tier)

## Next: Deploy Backend

Your frontend is ready, now deploy the backend:

**Read**: `RAILWAY_DEPLOYMENT.md` (or use your preferred hosting)

The backend is essential for login, payments, and data.

## Quick Links

- **Your Vercel Dashboard**: https://vercel.com/dashboard
- **Global Reg Monitor Live**: https://global-reg-monitor.vercel.app (after deploy)
- **Admin Credentials**: See `ADMIN_CREDENTIALS.md`
- **Detailed Vercel Guide**: `VERCEL_DEPLOYMENT.md`

## Vercel Free Tier Includes

✅ Unlimited deployments
✅ Serverless functions
✅ Global CDN
✅ SSL/HTTPS
✅ Git integration
✅ Environment variables
✅ Analytics
✅ Preview deployments

---

## 🎯 Summary

1. **Push code to GitHub** (2 min)
2. **Import to Vercel** (2 min)
3. **Add environment variable** (1 min)
4. **Deploy backend** (separate, 10 min)
5. **Test your live app** (2 min)

**Total: ~17 minutes to fully live**

---

**Next Step**: Deploy backend on Railway (see `RAILWAY_DEPLOYMENT.md`)

After backend is deployed, your app will be fully functional!
