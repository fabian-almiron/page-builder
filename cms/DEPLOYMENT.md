# Railway Deployment Guide

This guide will help you deploy the Payload CMS to Railway using Docker.

## Prerequisites

- Railway account ([railway.app](https://railway.app))
- GitHub repository with this Payload CMS code
- Railway CLI (optional but recommended)

## Deployment Steps

### 1. Prepare Your Repository

Ensure your code is committed and pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### 2. Create a Railway Project

1. Go to [railway.app](https://railway.app) and sign in
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository containing the Payload CMS
5. Railway will automatically detect the Dockerfile

### 3. Add PostgreSQL Database

1. In your Railway project dashboard, click "Add Service"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically create a PostgreSQL instance
4. The database connection string will be available as `${{ Postgres.DATABASE_URL }}`

### 4. Configure Environment Variables

In your Railway project settings, add these environment variables:

```bash
# Database (automatically provided by Railway PostgreSQL)
DATABASE_URI=${{ Postgres.DATABASE_URL }}

# Payload Configuration (change this to a secure secret)
PAYLOAD_SECRET=your-secure-payload-secret-key-change-this-in-production

# Server Configuration (automatically set by Railway)
NEXT_PUBLIC_SERVER_URL=${{ RAILWAY_PUBLIC_DOMAIN }}
PORT=3000
HOSTNAME=0.0.0.0
NODE_ENV=production

# Next.js Configuration
NEXT_TELEMETRY_DISABLED=1
```

### 5. Deploy

1. Railway will automatically build and deploy your application
2. The build process will:
   - Use the Dockerfile to create a container
   - Install dependencies with `npm ci`
   - Build the application with `npm run build`
   - Start the server on port 3000

### 6. Access Your Application

1. Once deployed, Railway will provide you with a public URL
2. Visit `https://your-app.railway.app/admin` to access the Payload admin panel
3. Create your first admin user

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URI` | PostgreSQL connection string | `${{ Postgres.DATABASE_URL }}` |
| `PAYLOAD_SECRET` | Secret key for Payload authentication | `your-secure-secret-key` |
| `NEXT_PUBLIC_SERVER_URL` | Public URL of your application | `${{ RAILWAY_PUBLIC_DOMAIN }}` |
| `PORT` | Port for the application | `3000` |
| `HOSTNAME` | Hostname binding | `0.0.0.0` |
| `NODE_ENV` | Node environment | `production` |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | `1` |

## Troubleshooting

### Build Failures

1. **Node version issues**: Ensure you're using Node 18+ (specified in Dockerfile)
2. **Dependencies**: Make sure `package-lock.json` is committed
3. **Environment variables**: Verify all required env vars are set

### Database Connection Issues

1. **Database not connected**: Ensure PostgreSQL service is added to your Railway project
2. **Connection string**: Verify `DATABASE_URI` is set to `${{ Postgres.DATABASE_URL }}`

### Application Not Starting

1. **Port binding**: Ensure `PORT=3000` and `HOSTNAME=0.0.0.0`
2. **Build output**: Check Railway logs for build errors
3. **Standalone mode**: Verify `next.config.mjs` has `output: 'standalone'`

## Local Testing with Docker

To test the Docker build locally:

```bash
# Build the image
docker build -t payload-cms .

# Run with environment variables
docker run -p 3000:3000 \
  -e DATABASE_URI="postgres://user:pass@host:5432/db" \
  -e PAYLOAD_SECRET="your-secret" \
  -e NEXT_PUBLIC_SERVER_URL="http://localhost:3000" \
  payload-cms
```

## Database Migrations

Payload CMS will automatically handle database migrations on startup. No manual migration steps are required.

## Scaling

Railway automatically handles scaling based on your plan. For production workloads, consider:

- Using Railway Pro for better performance
- Setting up monitoring and alerts
- Implementing proper backup strategies for your PostgreSQL database

## Security Considerations

1. **Change the PAYLOAD_SECRET**: Use a strong, unique secret in production
2. **Environment variables**: Never commit secrets to your repository
3. **Database access**: PostgreSQL is private by default on Railway
4. **HTTPS**: Railway provides HTTPS by default for all domains 