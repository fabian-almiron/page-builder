# Deployment Guide

## 🚀 Quick Railway Deployment (Automated)

**✅ Everything is pre-configured! No manual environment setup needed.**

### **Option 1: One-Click Deployment (Recommended)**

1. **Fork** this repository to your GitHub account
2. **Deploy to Railway**:
   - Go to [railway.app](https://railway.app)
   - Click "Deploy from GitHub repo"
   - Select your forked repository
   - Railway automatically uses the `railway.toml` configuration
3. **Add Database**:
   - In Railway project dashboard: click "+ New"
   - Select "Database" → "PostgreSQL"
   - Railway automatically connects it to your app
4. **Done!** Your app will be live at `https://your-app-name.railway.app`

### **Option 2: Railway CLI**
```bash
npm install -g @railway/cli
railway login
railway link  # or railway login --browserless for headless
railway add --database postgresql
railway up
```

### 🔐 **Pre-Generated Secure Secret Key**
```
PAYLOAD_SECRET=0066a0e14b3ce2e83fc2876bde05c4fe5696e1b000cc0aee33d3d01db34da5a5
```

### 📊 **Auto-Configured Variables**
All environment variables are baked into `railway.toml`:

| Variable | Value | Source |
|----------|--------|---------|
| `PAYLOAD_SECRET` | `0066a...` | Pre-generated secure key |
| `DATABASE_URI` | `postgresql://...` | Auto-populated by Railway |
| `NEXT_PUBLIC_SERVER_URL` | `https://your-app.railway.app` | Auto-populated by Railway |
| `NODE_ENV` | `production` | Static |
| `PORT` | `3000` | Static |

---

## 🛠️ Manual Deployment (Alternative)

<details>
<summary>Click to expand manual deployment instructions</summary>

### Prerequisites
- Node.js 20+ installed
- PostgreSQL database
- Railway account

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Mgmt/cms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp railway.env.example .env
   # Edit .env with your values
   ```

4. **Start local development**
   ```bash
   npm run dev
   ```

### Environment Variables (Manual Setup)

```bash
# Core Configuration
PAYLOAD_SECRET=your-secret-key-here
NODE_ENV=production

# Database
DATABASE_URI=postgresql://username:password@host:port/database

# Server
NEXT_PUBLIC_SERVER_URL=https://your-domain.com
PORT=3000
HOSTNAME=0.0.0.0

# Optional
NEXT_TELEMETRY_DISABLED=1
```

### Manual Railway Deployment

1. **Create Railway project**
   ```bash
   railway login
   railway init
   ```

2. **Add PostgreSQL database**
   ```bash
   railway add postgresql
   ```

3. **Set environment variables**
   ```bash
   railway variables set PAYLOAD_SECRET=your-secret-key
   railway variables set NODE_ENV=production
   # Railway auto-sets DATABASE_URI and PUBLIC_URL
   ```

4. **Deploy**
   ```bash
   railway up
   ```

</details>

---

## 🎯 **Expected Result**

After successful deployment:

### **✅ Live Application**
- **Main Site**: `https://your-app-name.railway.app`
- **Admin Panel**: `https://your-app-name.railway.app/admin`

### **✅ Admin Credentials**
- **Email**: `admin@example.com`
- **Password**: `admin123`

### **✅ API Endpoints**
- **GraphQL**: `https://your-app-name.railway.app/api/graphql`
- **GraphQL Playground**: `https://your-app-name.railway.app/api/graphql-playground`
- **REST API**: `https://your-app-name.railway.app/api/*`

---

## 🔧 **Post-Deployment Configuration**

### **1. Update Admin Credentials**
1. Login to admin panel
2. Go to Users collection
3. Update email/password for security

### **2. Configure Collections**
Your Payload CMS includes these collections:
- **Sites**: Manage websites
- **Pages**: Site pages with blocks
- **Blocks**: Reusable content blocks
- **Clients**: Client management
- **Users**: User management with roles

### **3. Custom Domain (Optional)**
1. In Railway dashboard → Settings
2. Add custom domain
3. Update DNS records as instructed

---

## 🛡️ **Security Notes**

### **Change Default Secret Key**
For production, update the secret key:
```bash
# Generate new key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Update in Railway dashboard
railway variables set PAYLOAD_SECRET=your-new-secret-key
```

### **Environment Security**
- ✅ Secret key is pre-generated and secure
- ✅ Database credentials auto-managed by Railway
- ✅ No sensitive data in repository
- ✅ Production environment variables isolated

---

## 🐛 **Troubleshooting**

### **Common Issues**

**"Missing secret key" error**
- ✅ **Fixed**: Secret key is now pre-configured in `railway.toml`

**Database connection failed**
- ✅ **Fixed**: DATABASE_URI auto-populated by Railway PostgreSQL service

**Build failures**
- ✅ **Fixed**: Dockerfile optimized for Railway deployment

**For additional support**:
1. Check Railway deployment logs
2. Verify PostgreSQL service is running
3. Ensure all environment variables are set

---

## 📚 **Additional Resources**

- [Railway Documentation](https://docs.railway.app/)
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs) 