# Deployment Guide

Complete guide to deploy the Regulatory Monitoring Dashboard to production.

## Backend Deployment

### Option 1: Deploy on Heroku

#### Prerequisites
- Heroku account
- Heroku CLI installed

#### Steps

1. **Create Heroku app**
```bash
heroku create your-app-name-backend
```

2. **Set environment variables**
```bash
heroku config:set PORT=5000
heroku config:set MONGODB_URI=your-mongodb-atlas-uri
heroku config:set JWT_SECRET=your-production-secret
heroku config:set JWT_EXPIRE=7d

heroku config:set EMAIL_SERVICE=gmail
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set EMAIL_FROM=noreply@regulatory-monitoring.com

heroku config:set RAZORPAY_KEY_ID=your-production-key
heroku config:set RAZORPAY_KEY_SECRET=your-production-secret

heroku config:set ADMIN_EMAIL=Sagar0071@gmail.com
heroku config:set ADMIN_PASSWORD=Login@321

heroku config:set FRONTEND_URL=https://your-frontend-domain.com
heroku config:set NODE_ENV=production
```

3. **Deploy**
```bash
git push heroku main
```

4. **View logs**
```bash
heroku logs --tail
```

### Option 2: Deploy on Railway

1. **Connect GitHub repository**
2. **Create new service from GitHub**
3. **Add environment variables in Railway dashboard**
4. **Railway auto-deploys on push**

### Option 3: Deploy on DigitalOcean App Platform

1. **Sign up on DigitalOcean**
2. **Create new app**
3. **Connect GitHub repository**
4. **Configure build command**: `npm install`
5. **Configure run command**: `npm start`
6. **Add environment variables**
7. **Deploy**

### Option 4: Deploy on AWS (EC2)

```bash
# SSH into instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs

# Install MongoDB
sudo amazon-linux-extras install mongodb-org -y

# Clone repository
git clone your-repo-url
cd regulatory-monitoring-app/backend

# Install dependencies
npm install

# Create .env file
nano .env
# Paste environment variables

# Install PM2 for process management
npm install -g pm2
pm2 start server.js --name "regulatory-api"
pm2 startup
pm2 save

# Setup Nginx as reverse proxy
sudo amazon-linux-extras install nginx -y
sudo systemctl start nginx
```

## Frontend Deployment

### Option 1: Deploy on Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel --prod
```

### Option 2: Deploy on Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
cd frontend
npm run build

# Deploy
netlify deploy --prod --dir=build
```

### Option 3: Deploy on GitHub Pages

1. **Update package.json**
```json
{
  "homepage": "https://yourusername.github.io/repo-name"
}
```

2. **Build and deploy**
```bash
cd frontend
npm run build
npm install --save-dev gh-pages
```

3. **Add deployment scripts to package.json**
```json
"deploy": "npm run build && gh-pages -d build"
```

### Option 4: Deploy on AWS S3 + CloudFront

```bash
# Build frontend
cd frontend
npm run build

# Upload to S3
aws s3 sync build/ s3://your-bucket-name/

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Option 5: Deploy on Digital Ocean App Platform

1. **Connect GitHub repo**
2. **Select frontend directory**: `frontend`
3. **Build command**: `npm run build`
4. **Run command**: `npm start`
5. **Environment variable**: `REACT_APP_API_URL=https://your-backend-url`
6. **Deploy**

## Database Setup

### Option 1: MongoDB Atlas (Cloud)

1. **Create account** at https://www.mongodb.com/cloud/atlas
2. **Create cluster**
3. **Get connection string**
4. **Whitelist IP addresses**
5. **Update MONGODB_URI in .env**

### Option 2: Self-Hosted MongoDB

```bash
# Install MongoDB
sudo apt-get install -y mongodb

# Start service
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongo --version
```

## SSL/HTTPS Setup

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --standalone -d your-domain.com

# Renew (automatic)
sudo certbot renew --dry-run
```

### Using Nginx

```bash
sudo nano /etc/nginx/sites-available/default

# Add SSL configuration
server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

## Environment Variables for Production

### Backend Production .env
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/regulatory-monitoring
JWT_SECRET=use-a-long-random-string-here-minimum-32-characters
JWT_EXPIRE=7d

EMAIL_SERVICE=gmail
EMAIL_USER=your-production-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
EMAIL_FROM=noreply@regulatory-monitoring.com

RAZORPAY_KEY_ID=rzp_live_your_production_key_id
RAZORPAY_KEY_SECRET=your_production_secret

ADMIN_EMAIL=Sagar0071@gmail.com
ADMIN_PASSWORD=change-this-to-strong-password

FRONTEND_URL=https://your-production-domain.com

NODE_ENV=production
```

### Frontend .env
```env
REACT_APP_API_URL=https://your-backend-api.com
```

## Post-Deployment Checklist

### Security
- [ ] Change default admin password
- [ ] Update JWT secret to strong random string
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Setup database backups
- [ ] Enable authentication on database
- [ ] Implement rate limiting
- [ ] Setup WAF (Web Application Firewall)

### Performance
- [ ] Enable compression
- [ ] Setup caching
- [ ] Optimize images
- [ ] Minify CSS/JS
- [ ] Setup CDN
- [ ] Enable database indexing

### Monitoring
- [ ] Setup error logging (Sentry)
- [ ] Setup performance monitoring (New Relic)
- [ ] Setup uptime monitoring
- [ ] Configure email alerts
- [ ] Setup backups automation

### Optimization
- [ ] Enable gzip compression
- [ ] Setup Redis caching
- [ ] Configure database connection pooling
- [ ] Setup log rotation
- [ ] Implement rate limiting

## Scaling the Application

### Database Scaling
```javascript
// Enable indexes in MongoDB
db.users.createIndex({ email: 1 }, { unique: true })
db.regulatory_data.createIndex({ category: 1 })
db.regulatory_data.createIndex({ createdAt: -1 })
```

### API Caching
```javascript
// Install Redis
npm install redis

// Use Redis for session storage
const redis = require('redis');
const client = redis.createClient();

// Cache regulatory data
client.setex(`category:${category}`, 3600, JSON.stringify(data));
```

### Load Balancing
- Use Nginx or HAProxy as reverse proxy
- Deploy multiple backend instances
- Use Heroku auto-scaling or AWS Load Balancer

## Monitoring and Logging

### Sentry (Error Tracking)
```bash
npm install @sentry/node

# Initialize in server.js
const Sentry = require("@sentry/node");
Sentry.init({ dsn: "your-sentry-dsn" });
```

### Winston (Logging)
```bash
npm install winston

# Log all requests and errors
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## Continuous Integration/Deployment (CI/CD)

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy Backend
      run: |
        cd backend
        npm install
        npm test
        git push heroku main
    
    - name: Deploy Frontend
      run: |
        cd frontend
        npm install
        npm run build
        npm run deploy
```

## Backup and Recovery

### Database Backup
```bash
# MongoDB backup
mongodump --uri="mongodb+srv://user:pass@host/db" --out=./backup

# Restore
mongorestore ./backup
```

### Automated Backups
```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --uri="your-uri" --out="./backups/backup_$DATE"

# Schedule with cron
0 2 * * * /path/to/backup-script.sh
```

## Cost Optimization

### Reduce Hosting Costs
- Use free tier (Heroku, Vercel)
- Consolidate services
- Use spot instances (AWS)
- Optimize data storage

### Free Services
- **Database**: MongoDB Atlas (free tier)
- **Email**: SendGrid (free tier)
- **Payment**: Razorpay (no setup fee)
- **Hosting**: Vercel, Netlify (free tier)

## Troubleshooting Deployment

### Common Issues

**502 Bad Gateway**
- Check backend is running
- Verify environment variables
- Check logs with `heroku logs --tail`

**Database Connection Fails**
- Verify MongoDB URI
- Check IP whitelist
- Verify credentials

**CORS Errors**
- Update FRONTEND_URL in backend
- Verify CORS configuration

**Payment Gateway Issues**
- Check Razorpay credentials
- Verify test/production mode
- Check API keys are correct

---

**Deployment successful!** 🚀
