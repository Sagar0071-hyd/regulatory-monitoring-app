# 🚂 Railway Deployment Guide - Global Reg Monitor Backend

Deploy your backend API to Railway (Recommended for Node.js)

## Why Railway?

✅ **Easy Integration**: Direct GitHub sync
✅ **Auto-Scaling**: Handles traffic spikes automatically
✅ **Free Tier**: $5 free monthly credit
✅ **MongoDB Support**: Built-in marketplace
✅ **Environment Variables**: Easy configuration
✅ **Zero Config Deploy**: Works out of the box

## Prerequisites

- GitHub account with code pushed
- Railway account (https://railway.app) - FREE
- MongoDB connection string (Atlas free tier)
- Email credentials (Gmail app password)
- Razorpay API keys

## Step 1: Create Railway Account

1. Go to https://railway.app
2. Click "Sign in with GitHub"
3. Authorize Railway
4. Create a new project

## Step 2: Deploy Backend from GitHub

1. In Railway Dashboard, click "Create New Project"
2. Select "Deploy from GitHub repo"
3. Select your `regulatory-monitoring-app` repository
4. Choose your GitHub account
5. Click "Deploy"

Railway will automatically detect the Node.js project and deploy it.

## Step 3: Configure Environment Variables

### In Railway Dashboard

1. Click on your project
2. Select "Backend Service" or "server.js"
3. Go to "Variables" tab
4. Click "Add Variable" and enter each:

#### Database Configuration
```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/regulatory-monitoring
```

[Get MongoDB Atlas URI](https://www.mongodb.com/cloud/atlas)

#### JWT Configuration
```
JWT_SECRET = [Generate strong random string - 32+ characters]
JWT_EXPIRE = 7d
```

Generate JWT_SECRET:
```bash
openssl rand -base64 32
# Or use online generator: https://generate-random.org/
```

#### Razorpay Payment Keys
```
RAZORPAY_KEY_ID = [Your Razorpay Production Key]
RAZORPAY_KEY_SECRET = [Your Razorpay Secret Key]
```

[Get Razorpay Keys](https://dashboard.razorpay.com/settings/api-keys)

#### Admin Credentials
```
ADMIN_EMAIL = Sagar0071@gmail.com
ADMIN_PASSWORD = [Your secure password]
```

#### Email Configuration
```
EMAIL_SERVICE = gmail
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = [Gmail App Password - 16 characters]
```

[Generate Gmail App Password](https://myaccount.google.com/apppasswords)

#### Frontend URL
```
FRONTEND_URL = https://global-reg-monitor.vercel.app
```

(Update this after you deploy frontend on Vercel)

#### Node Environment
```
NODE_ENV = production
PORT = 3000
```

## Step 4: Verify Deployment

1. Railway will show a deployment URL like:
   ```
   https://railway.app-xxxxxxxx.up.railway.app
   ```

2. Copy this URL - you'll need it for frontend configuration

3. Test the backend:
   ```bash
   curl https://your-railway-url/api/health
   # Should return: {"success":true,"message":"Server is running"}
   ```

## Step 5: View Logs

In Railway Dashboard:
1. Click your service
2. Go to "Logs" tab
3. View real-time deployment logs
4. Check for any errors

## Troubleshooting Railway Deployment

### Issue: Build Fails

**Solution**:
1. Check Railway logs for error messages
2. Ensure `package.json` is in backend root
3. Ensure Node version compatible (14+)
4. Check for circular dependencies

### Issue: Application Crashes

**Solution**:
1. Check logs for error details
2. Verify all environment variables are set
3. Check MongoDB connection string is correct
4. Verify email credentials are valid

### Issue: Database Connection Failed

**Solution**:
1. Verify MONGODB_URI is correct
2. Check MongoDB Atlas IP whitelist includes Railway IP
3. MongoDB Atlas → Network Access → Add IP 0.0.0.0/0 (for testing)

### Issue: 503 Service Unavailable

**Solution**:
1. Check if backend is running (check logs)
2. Verify environment variables are set
3. Restart the service in Railway
4. Check database connection

## Railway + MongoDB Integration

### Option A: Use MongoDB Atlas (Recommended)

1. Create free account: https://www.mongodb.com/cloud/atlas
2. Create cluster
3. Get connection string
4. Add to Railway variables as `MONGODB_URI`

### Option B: Use Railway PostgreSQL (Alternative)

Railway has built-in PostgreSQL, but this app uses MongoDB.

## Railway Dashboard Features

### View Logs
```
Real-time logs of your running service
Check for errors and debugging info
```

### Monitor Performance
```
CPU usage
Memory usage
Network stats
```

### View Metrics
```
Request count
Response times
Error rates
```

### Deploy History
```
See all previous deployments
Rollback to previous versions
```

## Updating Code on Railway

Railway automatically redeploys when you push to GitHub:

```bash
# 1. Make changes locally
git add .
git commit -m "Update backend features"

# 2. Push to GitHub
git push origin main

# 3. Railway auto-detects and redeploys
# (Watch Dashboard → Deployments)
```

## Custom Domain on Railway (Optional)

1. Railway Dashboard → Project Settings
2. Click "Custom Domain"
3. Enter your domain (e.g., `api.globalregmonitor.com`)
4. Add DNS record provided by Railway
5. Wait for SSL certificate (24-48 hours)

## Environment Variables Reference

```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db

# Authentication
JWT_SECRET=your-secret-here-minimum-32-characters
JWT_EXPIRE=7d

# Email
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app-password-16-chars
EMAIL_FROM=noreply@globalregmonitor.com

# Payments
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxx

# Admin
ADMIN_EMAIL=Sagar0071@gmail.com
ADMIN_PASSWORD=your-secure-password

# Frontend
FRONTEND_URL=https://global-reg-monitor.vercel.app

# Node
NODE_ENV=production
PORT=3000
```

## Cost Breakdown

| Component | Free Tier | Cost |
|-----------|-----------|------|
| Railway Hosting | $5 credit/month | FREE |
| Database (MongoDB Atlas) | 512MB | FREE |
| Email (Gmail) | Unlimited | FREE |
| Storage | Per MB used | ~$0.25/GB |
| Bandwidth | Per GB used | ~$0.10/GB |

## Performance Tips

1. **Enable HTTP/2**: Automatically enabled
2. **Add Caching**: Use Redis (optional)
3. **Database Indexing**: Add indexes to frequently queried fields
4. **Compression**: Middleware for gzip compression
5. **Monitor Logs**: Check for slow queries

## Backing Up Data

### MongoDB Backup

Railway's MongoDB Atlas includes automatic backups:
1. Log in to MongoDB Atlas
2. Go to Backup page
3. Enable automated backups
4. Store offline copies monthly

## Scaling Backend on Railway

As your app grows:

1. **Within Free Tier**: No action needed (5 credits/month = ~$50 capacity)
2. **Beyond Free Tier**: Add paid plan
3. **Auto-Scaling**: Enabled by default
4. **Load Balancing**: Automatic with Vercel frontend

## Monitoring & Alerts

### Enable Railway Alerts
1. Project Settings → Alerts
2. Add email
3. Select alert conditions
4. Save

### What to Monitor
- High error rates
- Low disk space
- High CPU usage
- Database connection failures

## Useful Railway CLI Commands

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# View logs
railway logs

# Deploy
railway up

# View environment variables
railway variables
```

## Rollback a Deployment

If something breaks:

1. Railway Dashboard → Deployments
2. Find previous working version
3. Click "Rollback"
4. Confirm

Takes about 1-2 minutes.

## Connecting to Production Database

Only for debugging/admin tasks:

```bash
# Get Railway IP
railroad whoami # Shows current Railway connection

# From local machine (with Railway CLI):
railway connect

# Then connect to database via MongoDB CLI
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/db"
```

## Secrets Best Practices

✅ **DO**:
- Use strong random passwords (32+ chars)
- Rotate passwords periodically
- Store secrets in Railway variables only
- Enable 2FA on MongoDB Atlas

❌ **DON'T**:
- Commit .env files to git
- Share secrets in messages
- Use weak passwords
- Hardcode secrets in code

## Getting Help

- **Railway Docs**: https://docs.railway.app
- **Railway Support**: support@railway.app
- **Discord Community**: https://discord.gg/railway
- **GitHub Issues**: https://github.com/railwayapp

## Deployment Checklist

- [ ] GitHub repository created and pushed
- [ ] Railway account created
- [ ] Backend deployed from GitHub
- [ ] All environment variables set
- [ ] MongoDB Atlas cluster created
- [ ] Gmail app password generated
- [ ] Razorpay keys obtained
- [ ] Backend API tested with health check
- [ ] Railway URL copied
- [ ] Logs checked for errors
- [ ] Ready to deploy frontend

## Next Steps

1. ✅ Deploy backend on Railway (this guide)
2. ⏭️ Deploy frontend on Vercel (see VERCEL_DEPLOYMENT.md)
3. ⏭️ Connect frontend to backend API
4. ⏭️ Test all features
5. ⏭️ Setup monitoring

---

**Your backend is now deployed on Railway!** 🚂

Backend URL: `https://your-railway-url.up.railway.app`

Next: Deploy frontend on Vercel (see VERCEL_DEPLOYMENT.md)
