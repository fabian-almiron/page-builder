# 🚀 Railway Deployment - Step by Step Fix

## ❌ Current Issue: Missing Secret Key Error

The error `missing secret key. A secret key is needed to secure Payload` indicates that Railway is not properly reading environment variables from `railway.toml`.

## ✅ Solution: Manual Environment Variable Setup

### **Step 1: Add PostgreSQL Database**
1. Go to your Railway project dashboard
2. Click **"+ New"** 
3. Select **"Database"** → **"PostgreSQL"**
4. Wait for PostgreSQL service to be provisioned

### **Step 2: Set Environment Variables Manually**
Go to your **app service** (not the PostgreSQL service) and add these variables:

#### **Required Variables:**
```bash
PAYLOAD_SECRET=0066a0e14b3ce2e83fc2876bde05c4fe5696e1b000cc0aee33d3d01db34da5a5
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

#### **Reference Variables (connect to PostgreSQL):**
```bash
DATABASE_URI=${{ Postgres.DATABASE_URL }}
NEXT_PUBLIC_SERVER_URL=https://${{ RAILWAY_PUBLIC_DOMAIN }}
```

### **Step 3: Verify Variable References**
1. Click on each variable's **👁️ eye icon** to verify values
2. **DATABASE_URI** should show: `postgresql://postgres:...@...railway.app:5432/railway`
3. **NEXT_PUBLIC_SERVER_URL** should show: `https://your-app-name.railway.app`

### **Step 4: Redeploy**
1. Click **"Deploy"** or trigger a new deployment
2. Check deployment logs for success

---

## 🎯 **Expected Result After Fix:**

### **✅ Successful Deployment:**
- No "missing secret key" errors
- App starts successfully on port 3000
- Database connection established

### **✅ Working URLs:**
- **App**: `https://your-app-name.railway.app`
- **Admin**: `https://your-app-name.railway.app/admin`
- **API**: `https://your-app-name.railway.app/api/graphql`

---

## 🐛 **If Still Having Issues:**

### **Debug Environment Variables:**
1. In Railway dashboard → **Variables** tab
2. Verify all variables are set correctly
3. Check that reference variables show actual values (not `${{ ... }}`)

### **Check Logs:**
1. Go to **Deployments** tab
2. Click on latest deployment
3. Check **Build Logs** and **Deploy Logs**

### **Common Fixes:**
- Ensure PostgreSQL service is named "Postgres" (default)
- Verify app service variables reference the correct service name
- Make sure both services are in the same Railway project

---

## 🔧 **Manual Variable Setup (If railway.toml doesn't work):**

Instead of relying on `railway.toml`, set these in Railway dashboard:

| Variable | Value |
|----------|--------|
| `PAYLOAD_SECRET` | `0066a0e14b3ce2e83fc2876bde05c4fe5696e1b000cc0aee33d3d01db34da5a5` |
| `DATABASE_URI` | `${{ Postgres.DATABASE_URL }}` |
| `NEXT_PUBLIC_SERVER_URL` | `https://${{ RAILWAY_PUBLIC_DOMAIN }}` |
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `HOSTNAME` | `0.0.0.0` | 