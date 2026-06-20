# 🚀 Vercel Deployment Guide - Global Reg Monitor

Complete guide to deploy your "Global Reg Monitor" application to Vercel.

## Prerequisites

- Vercel account (https://vercel.com) - FREE
- GitHub account with your repository pushed
- Backend deployed (Railway, Heroku, or any Node.js hosting)
- Your backend API URL ready

## Part 1: Deploy Backend First

Before deploying the frontend, you need a working backend API.

### Option A: Deploy Backend on Railway (Recommended)

```bash
# 1. Sign up at https://railway.app
# 2. Create new project from GitHub
# 3. Select your repository
# 4. Railway auto-deploys from git
```

### Option B: Deploy Backend on Heroku

```bash
# 1. heroku login
# 2. cd backend
# 3. heroku create global-reg-monitor-api
# 4. heroku config:set MONGODB_URI=your-mongodb-uri
# 5. heroku config:set JWT_SECRET=your-jwt-secret
# 6. heroku config:set RAZORPAY_KEY_ID=your-key
# 7. heroku config:set RAZORPAY_KEY_SECRET=your-secret
# 8. git push heroku main
```

**Note your backend API URL** (e.g., `https://global-reg-monitor-api.herokuapp.com`)

## Part 2: Deploy Frontend on Vercel

### Step 1: Push to GitHub

```bash
# From project root
git init
git add .
git commit -m "Initial commit - Global Reg Monitor"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/regulatory-monitoring-app.git
git push -u origin main
```

### Step 2: Connect Vercel to GitHub

1. Go to https://vercel.com
2. Click "New Project"
3. Select "Import Git Repository"
4. Connect your GitHub account
5. Select your `regulatory-monitoring-app` repository
6. Click "Import"

### Step 3: Configure Project

1. **Project Name**: `global-reg-monitor`
2. **Framework**: Auto-detect React ✓
3. **Root Directory**: Select `frontend`
4. **Build Command**: `npm run build` ✓
5. **Output Directory**: `build` ✓

### Step 4: Add Environment Variables

In the "Environment Variables" section, add:

```
REACT_APP_API_URL=https://your-backend-api.herokuapp.com
```

Replace with your actual backend URL (without trailing slash)

### Step 5: Deploy

Click "Deploy" and wait for deployment to complete.

**Your app will be live at**: `https://global-reg-monitor.vercel.app`

## Part 3: Configure Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click "Domains"
3. Click "Add Domain"
4. Enter your custom domain (e.g., `globalregmonitor.com`)
5. Follow DNS configuration instructions
6. Wait for SSL certificate (usually 24 hours)

## Part 4: Update Environment Variables

### For Production

```bash
# Update these in Vercel Dashboard → Settings → Environment Variables

REACT_APP_API_URL=https://your-production-backend-api.com
```

### Redeploy After Changes

```bash
git commit -m "Update environment variables"
git push origin main
# Vercel auto-redeploys
```

## Common Issues & Solutions

### Issue: Blank Page on Vercel

**Solution**:
1. Check REACT_APP_API_URL is set correctly
2. Check backend API is running
3. Check browser console for errors (F12)
4. Verify CORS is enabled in backend

### Issue: API Requests Fail (CORS Error)

**Solution in backend**:
```javascript
// Ensure CORS is configured for production URL
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://global-reg-monitor.vercel.app'
  ],
  credentials: true
};
app.use(cors(corsOptions));
```

Then redeploy backend.

### Issue: 404 on Page Refresh

**Solution**: React Router needs rewrites. Already configured in `vercel.json`

### Issue: Build Fails

**Check**:
1. Node version (should be 16+)
2. All dependencies installed: `npm install`
3. No TypeScript errors (if using TS)
4. Build locally works: `npm run build`

**Logs**:
- Check Vercel Dashboard → Deployments → Build Logs

### Issue: Environment Variables Not Loading

**Solution**:
1. Verify variable is set in Vercel Dashboard
2. Variable name must start with `REACT_APP_` for frontend
3. Redeploy after adding variables
4. Clear browser cache

## Deployment Checklist

### Before Deploying Frontend

- [ ] Backend API is deployed and working
- [ ] Backend API URL is noted
- [ ] GitHub repository is created and pushed
- [ ] Vercel account is created
- [ ] package.json name updated to "global-reg-monitor"
- [ ] index.html title updated to "Global Reg Monitor"

### Vercel Configuration

- [ ] Import project from GitHub
- [ ] Select `frontend` as root directory
- [ ] Build command: `npm run build`
- [ ] Output directory: `build`
- [ ] REACT_APP_API_URL environment variable set
- [ ] Deploy button clicked

### Post-Deployment Testing

- [ ] Site loads at vercel.app URL
- [ ] Login page displays correctly
- [ ] API requests work (check Network tab)
- [ ] Password reset emails send
- [ ] Payment integration works (test mode)
- [ ] Admin panel accessible

### Monitoring

- [ ] Check Vercel analytics
- [ ] Monitor error rates
- [ ] Check build times
- [ ] Monitor performance

## Advanced Configurations

### Add GitHub Deployments Badge

```markdown
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/YOUR_USERNAME/regulatory-monitoring-app)
```

### Setup Preview Deployments

Vercel automatically creates preview deployments for pull requests:
1. Create a branch: `git checkout -b feature/new-feature`
2. Make changes and push
3. Create pull request on GitHub
4. Vercel creates preview deployment (automatic)
5. Test changes in preview before merging

### Setup Automatic Rollback

In Vercel Dashboard → Settings:
1. Enable "Automatic rollback on build failure"
2. Keep production stable

## Performance Optimization

### For Vercel Frontend

1. **Edge Caching**
   - Already configured in `vercel.json`
   - 1 hour cache for assets

2. **Image Optimization**
   - Use Vercel's Image Optimization
   - Add to next.js config

3. **Analytics**
   - Enable Web Vitals monitoring
   - Check Vercel Analytics dashboard

### For Backend Performance

1. Use MongoDB Atlas free tier
2. Enable compression: `app.use(compression())`
3. Implement rate limiting
4. Use Redis for caching (optional)

## Scaling for Growth

### Current Setup
- Frontend: Vercel (unlimited scaling)
- Backend: Railway/Heroku (auto-scaling available)
- Database: MongoDB Atlas (auto-scaling)

### When Traffic Increases
1. Upgrade MongoDB Atlas cluster
2. Add backend auto-scaling
3. Enable Vercel Pro features
4. Implement CDN for static assets

## Cost Estimation

| Component | Free Tier | Cost |
|-----------|-----------|------|
| Vercel Frontend | ✓ Unlimited | FREE |
| Railway Backend | ✓ 500 hrs/mo | ~$5-20/mo |
| MongoDB Atlas | ✓ 512MB | FREE |
| Custom Domain | ✓ | $10-15/yr |
| **Total** | - | **~$5-20/mo** |

## Monitoring & Maintenance

### Vercel Dashboard
- Real-time deployment status
- Analytics and performance metrics
- Log access
- Git integration

### Setup Alerts
1. Go to Settings → Alerts
2. Enable error notifications
3. Set email for alerts
4. Monitor deployment health

### Regular Maintenance
- Keep dependencies updated
- Monitor error logs
- Check performance metrics
- Review analytics monthly

## Useful Vercel Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from CLI
vercel --prod

# View logs
vercel logs [deployment-id]

# List deployments
vercel deployments

# View environment variables
vercel env list
```

## Git Workflow for Continuous Deployment

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and commit
git add .
git commit -m "Add new feature"

# 3. Push to GitHub
git push origin feature/new-feature

# 4. Create Pull Request
# → Vercel creates preview deployment automatically

# 5. Test preview deployment
# → Merge PR when ready

# 6. Push to main
git checkout main
git merge feature/new-feature
git push origin main

# 7. Vercel auto-deploys to production
```

## Troubleshooting Deployment Issues

### Check Deployment Logs

1. Vercel Dashboard → Deployments
2. Click on deployment
3. View "Build & Deployment Logs"
4. Look for error messages

### Common Build Errors

```
Error: npm ERR! ERESOLVE unable to resolve dependency tree

Solution:
- Delete package-lock.json
- Run npm cache clean --force
- Commit and push
- Redeploy
```

### Verify Environment Variables

```bash
# In Vercel, add a build log statement
echo "API URL: $REACT_APP_API_URL"

# Check settings → Environment Variables
# Verify variable is there and correct
```

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: support@vercel.com
- **Community**: https://github.com/vercel
- **Status Page**: https://vercel.com/status

## Next Steps

1. Deploy backend to Railway/Heroku
2. Note backend API URL
3. Deploy frontend to Vercel
4. Set environment variables
5. Test all functionality
6. Setup monitoring
7. Configure custom domain (optional)

---

**Your Global Reg Monitor is now live on the internet!** 🚀

**Frontend**: https://global-reg-monitor.vercel.app
**Backend**: Your backend URL here

For questions, check Vercel documentation or contact support.
