# Payload CMS

A headless CMS built with Payload CMS, TypeScript, and PostgreSQL for managing sites, pages, blocks, and clients.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file with:
   ```bash
   DATABASE_URI=postgres://postgres:password@127.0.0.1:5432/cms
   PAYLOAD_SECRET=your-secret-key-here
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

3. **Start PostgreSQL** (if using local database):
   Make sure PostgreSQL is running and the database `cms` exists.

4. **Generate types**:
   ```bash
   npm run generate:types
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

6. **Access the admin panel**:
   Visit [http://localhost:3000/admin](http://localhost:3000/admin)

## 🚀 Railway Deployment

This project is ready for Railway deployment with Docker. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Railway Deploy

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Railway"
   git push origin main
   ```

2. **Create Railway Project**:
   - Go to [railway.app](https://railway.app)
   - Create new project from GitHub repo
   - Add PostgreSQL database
   - Set environment variables (see `railway.env.example`)

3. **Environment Variables for Railway**:
   ```bash
   DATABASE_URI=${{ Postgres.DATABASE_URL }}
   PAYLOAD_SECRET=your-secure-secret-key
   NEXT_PUBLIC_SERVER_URL=${{ RAILWAY_PUBLIC_DOMAIN }}
   PORT=3000
   NODE_ENV=production
   ```

4. **Deploy**: Railway will automatically build and deploy using the Dockerfile

## 📊 Collections

### Sites
Manage website configurations and settings.

**Fields:**
- `name` (Text, required) - Site name
- `logo` (Upload) - Site logo image
- `primaryColor` (Text) - Brand primary color (hex code)
- `domain` (Text) - Domain name
- `status` (Select) - Site status: draft, preview, live
- `previewUrl` (Text) - Preview URL for the site

### Pages
Individual pages within sites.

**Fields:**
- `title` (Text, required) - Page title
- `slug` (Text, required, unique) - URL-friendly slug
- `site` (Relationship to Sites, required) - Parent site
- `blocks` (Array of Block relationships) - Page content blocks
- `metaTitle` (Text) - SEO meta title
- `metaDescription` (Textarea) - SEO meta description
- `published` (Checkbox) - Publication status

### Blocks
Reusable content blocks for pages.

**Fields:**
- `name` (Text, required) - Block name
- `type` (Select, required) - Block type: hero, text, image, gallery, video, form, cta, testimonial, pricing, faq
- `config` (JSON) - Block configuration data
- `description` (Textarea) - Optional description
- `active` (Checkbox) - Whether block is active

### Clients
Client information and site assignments.

**Fields:**
- `name` (Text, required) - Client name
- `email` (Email, required, unique) - Client email
- `site` (Relationship to Sites, required) - Assigned site
- `phone` (Text) - Phone number
- `company` (Text) - Company name
- `notes` (Textarea) - Notes about client
- `active` (Checkbox) - Whether client is active

### Users
User authentication and role management.

**Fields:**
- `email` (Email, required) - User email
- `password` (Password, required) - User password
- `role` (Select, required) - User role: admin or client
- `assignedSite` (Relationship to Sites) - Assigned site (for client users)
- `firstName` (Text) - First name
- `lastName` (Text) - Last name

## 🔐 Access Control

### Admin Users
- Full access to all collections
- Can create, read, update, and delete all content
- Can manage users and site assignments

### Client Users
- Read/edit access only to content from their assigned site
- Can view and edit pages from their assigned site
- Can view blocks but cannot create/edit/delete them
- Cannot access other sites' content
- Cannot manage users or clients

## 🗃️ Database

The CMS uses PostgreSQL with the following key features:
- Automatic migrations handled by Payload
- Type-safe database operations
- Optimized for deployment on Railway/Heroku
- Support for media uploads and file storage

## 📝 API

Payload automatically generates REST and GraphQL APIs:

- **REST API**: `http://localhost:3000/api`
- **GraphQL**: `http://localhost:3000/api/graphql`
- **Admin Panel**: `http://localhost:3000/admin`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run generate:types` - Generate TypeScript types
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── collections/           # Collection definitions
│   ├── Users.ts          # User authentication
│   ├── Sites.ts          # Site management
│   ├── Pages.ts          # Page content
│   ├── Blocks.ts         # Content blocks
│   ├── Clients.ts        # Client management
│   └── Media.ts          # File uploads
├── payload.config.ts     # Main configuration
└── payload-types.ts      # Generated types
```

## 🐳 Docker

### Local Docker Build

```bash
docker build -t payload-cms .
docker run -p 3000:3000 \
  -e DATABASE_URI="postgres://user:pass@host:5432/db" \
  -e PAYLOAD_SECRET="your-secret" \
  -e NEXT_PUBLIC_SERVER_URL="http://localhost:3000" \
  payload-cms
```

### Production Deployment

The Dockerfile is optimized for production deployment on platforms like Railway, using:
- Node.js 18 Alpine (lightweight)
- Multi-stage build for smaller image size
- Next.js standalone output
- Proper security with non-root user
- Environment variable support

## 🔗 Integration

This CMS is designed to work with the Next.js dashboard application. The dashboard can consume the API to:
- Display site information
- Manage client assignments
- Handle user authentication
- Present content in a user-friendly interface
