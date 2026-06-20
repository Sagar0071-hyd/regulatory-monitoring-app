# Deploy Global Reg Monitor to Vercel NOW

Since you have a Vercel account, follow these exact steps.

## Step 1: Push to GitHub

Open terminal and run:

```bash
cd c:\Users\MICROSOFT\OneDrive\Documents\Claude\regulatory-monitoring-app

git init
git add .
git commit -m "Global Reg Monitor"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/regulatory-monitoring-app.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 2: Import to Vercel

1. Go to **https://vercel.com/dashboard**
2. Click **"Add New"** → **"Project"**
3. Click **"Import Git Repository"**
4. Search for `regulatory-monitoring-app`
5. Click **"Import"**

## Step 3: Configure

When import dialog appears:

- **Project Name**: `global-reg-monitor`
- **Framework Preset**: `React` (should auto-detect)
- **Root Directory**: Click and select `frontend`

Then click **"Deploy"**

Wait 2-3 minutes for deployment...

## Step 4: Add Environment Variable

When deployment finishes:

1. Click your project
2. Click **Settings** tab
3. Click **Environment Variables** on left
4. Click **"Add New"**
5. Enter:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-url.com`

*(You can use a placeholder for now)*

6. Click **"Save"**
7. Go to **Deployments** tab
8. Find latest deployment
9. Click **"Redeploy"** button

## Done! ✅

Your app is now live at:

```
https://global-reg-monitor.vercel.app
```

## What's Next?

You need to deploy the backend API. Choose one:

### Option 1: Railway (Easiest)
1. Go to https://railway.app
2. Connect GitHub
3. Deploy `backend` folder
4. Copy the URL
5. Update `REACT_APP_API_URL` in Vercel

**Read**: `RAILWAY_DEPLOYMENT.md`

### Option 2: Heroku
**Read**: `DEPLOYMENT.md` (Heroku section)

### Option 3: Other Host
**Read**: `DEPLOYMENT.md` (other options)

## ⚠️ Right Now Frontend Won't Work

The frontend is deployed but it needs a backend API to function.

**Required for full functionality**:
- [ ] Deploy backend API
- [ ] Update `REACT_APP_API_URL` in Vercel
- [ ] Test login

## Troubleshooting

### Page is blank
- Open browser console: Press F12
- Check for error messages
- Verify `REACT_APP_API_URL` is set
- Redeploy after setting variable

### Want to see logs?
1. Vercel Dashboard
2. Click your project
3. Click "Deployments"
4. Click your deployment
5. Scroll to see "Build Logs" and "Runtime Logs"

## Quick Commands Reference

```bash
# Check git status
git status

# View remote
git remote -v

# Push again (if needed)
git push origin main
```

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support

## Your Frontend URL

After deployment:
```
https://global-reg-monitor.vercel.app
```

This URL will show a loading page until you deploy the backend API.

---

**NEXT**: Deploy backend (Railway recommended - see `RAILWAY_DEPLOYMENT.md`)

After backend is live, your app will be fully functional!
