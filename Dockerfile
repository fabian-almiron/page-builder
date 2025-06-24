FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY cms/package.json cms/package-lock.json* ./
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY cms/ ./

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

# Environment variables needed for build process with defaults
# Railway will pass these as build args, but we provide defaults for local builds
ARG PAYLOAD_SECRET="0066a0e14b3ce2e83fc2876bde05c4fe5696e1b000cc0aee33d3d01db34da5a5"
ARG DATABASE_URI="postgresql://localhost:5432/dummy_build_db"
ARG NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
ARG NODE_ENV="production"

# Set environment variables for build
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV DATABASE_URI=$DATABASE_URI
ENV NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL
ENV NODE_ENV=$NODE_ENV

# Build the application
RUN npm run build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create public directory and set permissions
RUN mkdir -p ./public && chown nextjs:nodejs ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy the complete application with node_modules for migration support
COPY --from=builder --chown=nextjs:nodejs /app ./

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Use the production start script that runs migrations first
CMD ["npm", "run", "start:prod"] 