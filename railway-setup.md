# Railway Automatic Setup Guide

## 🚀 One-Click Railway Deployment

This project is configured for automatic Railway deployment with all environment variables and database setup included.

### ✅ What's Pre-Configured:

- **🔐 Secret Key**: Automatically generated secure 64-character hex key
- **🗄️ Database**: Instructions for automatic PostgreSQL provisioning
- **🌐 Domain**: Railway auto-assigns public domain
- **⚙️ Environment**: All production settings included

### 🛠️ Deployment Steps:

#### **Option 1: Automatic (Recommended)**
1. **Fork/Clone** this repository
2. **Connect to Railway**: 
   - Go to [railway.app](https://railway.app)
   - Click "Deploy from GitHub repo"
   - Select your forked repository
3. **Add PostgreSQL**:
   - In Railway dashboard: click "+ New"
   - Select "Database" → "PostgreSQL"
   - Railway automatically connects it to your app
4. **Deploy**: Railway will automatically use the `railway.toml` configuration

#### **Option 2: Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway link

# Add PostgreSQL database
railway add --database postgresql

# Deploy
railway up
```

### 🔐 **Generated Secret Key**
```
PAYLOAD_SECRET=0066a0e14b3ce2e83fc2876bde05c4fe5696e1b000cc0aee33d3d01db34da5a5
```

### 📊 **Auto-Configured Environment Variables**
All environment variables are pre-configured in `railway.toml`:

- ✅ `PAYLOAD_SECRET` - Secure generated key
- ✅ `DATABASE_URI` - Auto-populated from PostgreSQL service
- ✅ `NEXT_PUBLIC_SERVER_URL` - Auto-populated Railway domain
- ✅ `NODE_ENV=production`
- ✅ `PORT=3000`
- ✅ `HOSTNAME=0.0.0.0`

### 🎯 **Expected Result**
After deployment:
- **Live URL**: `https://your-app-name.railway.app`
- **Admin Panel**: `https://your-app-name.railway.app/admin`
- **API Endpoints**: `https://your-app-name.railway.app/api/`

### 🔧 **Manual Override (if needed)**
If you need to change any environment variable:
1. Go to Railway project dashboard
2. Click your service → "Variables" tab
3. Add/modify variables (will override `railway.toml` settings)

### 🛡️ **Security Note**
The included secret key is for demo purposes. For production:
1. Go to Railway Variables tab
2. Update `PAYLOAD_SECRET` with your own secure key
3. Or generate a new one: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` 