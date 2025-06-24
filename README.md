# Dashboard & CMS Project

A comprehensive project combining a Next.js dashboard with authentication and a Payload CMS for content management.

## 🏗️ Project Structure

```
📁 Dashboard & CMS Project/
├── 📁 dashboard/          # Next.js Dashboard Application
│   ├── src/app/           # Next.js App Router pages
│   ├── src/components/    # React components
│   ├── src/contexts/      # React contexts (Auth, etc.)
│   ├── src/lib/          # Utilities and configurations
│   └── package.json      # Dashboard dependencies
├── 📁 cms/               # Payload CMS (Headless CMS)
│   ├── src/collections/  # Collection definitions
│   ├── src/payload.config.ts # CMS configuration
│   └── package.json      # CMS dependencies
└── README.md             # This file
```

## ✅ Current Status

### Dashboard Application (Completed ✓)
- **Next.js 15** with TypeScript and TailwindCSS
- **Authentication System** with role-based access control
- **User Roles**: Admin (full access) and Client (limited access)
- **Protected Routes** with component-level security
- **Responsive Design** with modern UI components
- **Pages**: Sites, Clients, Blocks, Settings

### Payload CMS (Completed ✓)
- **Payload CMS 3.0** with TypeScript and PostgreSQL
- **Complete Collections**: Sites, Pages, Blocks, Clients, Users
- **Role-Based Access Control**: Admin and Client roles
- **Built-in Admin UI** with authentication
- **REST & GraphQL APIs** automatically generated

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Dashboard
```bash
cd dashboard
npm install
npm run dev
# Visit: http://localhost:3000
```

### CMS Setup
```bash
cd cms
npm install
```

**Set up environment variables** (create `cms/.env`):
```bash
DATABASE_URI=postgres://postgres:password@127.0.0.1:5432/cms
PAYLOAD_SECRET=your-secret-key-here
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

**Start the CMS**:
```bash
npm run dev
# Visit: http://localhost:3000/admin
```

## 📊 Payload CMS Collections

### 🌐 Sites
Manage website configurations and settings.
- `name` (Text, required) - Site name
- `logo` (Upload) - Site logo image  
- `primaryColor` (Text) - Brand primary color (hex code)
- `domain` (Text) - Domain name
- `status` (Select) - Site status: draft, preview, live
- `previewUrl` (Text) - Preview URL for the site

### 📄 Pages
Individual pages within sites.
- `title` (Text, required) - Page title
- `slug` (Text, required, unique) - URL-friendly slug
- `site` (Relationship to Sites, required) - Parent site
- `blocks` (Array of Block relationships) - Page content blocks
- `metaTitle` (Text) - SEO meta title
- `metaDescription` (Textarea) - SEO meta description
- `published` (Checkbox) - Publication status

### 🧱 Blocks
Reusable content blocks for pages.
- `name` (Text, required) - Block name
- `type` (Select, required) - Block type: hero, text, image, gallery, video, form, cta, testimonial, pricing, faq
- `config` (JSON) - Block configuration data
- `description` (Textarea) - Optional description
- `active` (Checkbox) - Whether block is active

### 👥 Clients
Client information and site assignments.
- `name` (Text, required) - Client name
- `email` (Email, required, unique) - Client email
- `site` (Relationship to Sites, required) - Assigned site
- `phone` (Text) - Phone number
- `company` (Text) - Company name
- `notes` (Textarea) - Notes about client
- `active` (Checkbox) - Whether client is active

### 🔐 Users
User authentication and role management.
- `email` (Email, required) - User email
- `password` (Password, required) - User password
- `role` (Select, required) - User role: admin or client
- `assignedSite` (Relationship to Sites) - Assigned site (for client users)
- `firstName` (Text) - First name
- `lastName` (Text) - Last name

## 🔐 Authentication & Access Control

### Dashboard Authentication
- **Demo Credentials**:
  - **Admin**: `admin@example.com` / `password`
  - **Client**: `client@example.com` / `password`

### CMS Access Control

#### **Admin Users**
- Full access to all collections
- Can create, read, update, and delete all content
- Can manage users and site assignments

#### **Client Users**
- Read/edit access only to content from their assigned site
- Can view and edit pages from their assigned site
- Can view blocks but cannot create/edit/delete them
- Cannot access other sites' content
- Cannot manage users or clients

## 📝 API Integration

Payload CMS automatically provides:
- **REST API**: `http://localhost:3000/api`
- **GraphQL API**: `http://localhost:3000/api/graphql`
- **Admin Panel**: `http://localhost:3000/admin`

### Example API Endpoints
```bash
# Get all sites
GET /api/sites

# Get pages for a specific site
GET /api/pages?where[site][equals]=SITE_ID

# Get blocks
GET /api/blocks

# Get clients
GET /api/clients
```

## 🗃️ Database

The CMS uses **PostgreSQL** with the following features:
- Automatic migrations handled by Payload
- Type-safe database operations
- Optimized for deployment on Railway/Heroku
- Support for media uploads and file storage

## 🚀 Deployment

### Railway Deployment
1. Connect your GitHub repository
2. Add PostgreSQL add-on
3. Set environment variables:
   ```bash
   DATABASE_URI=postgresql://...
   PAYLOAD_SECRET=your-secret-key
   NEXT_PUBLIC_SERVER_URL=https://your-app.up.railway.app
   ```
4. Deploy automatically

## 🔗 Integration Workflow

1. **Content Management**: Use Payload CMS admin panel to manage sites, pages, blocks, and clients
2. **Dashboard Access**: Use the Next.js dashboard for user-friendly content overview
3. **API Consumption**: Dashboard can consume Payload API for real-time data
4. **Role Synchronization**: Both systems share the same user role concepts

## 🎯 Next Steps

1. **Database Setup**: Configure PostgreSQL database
2. **Environment Configuration**: Set up `.env` files
3. **First Admin User**: Create admin user in Payload CMS
4. **Content Creation**: Add sample sites, pages, and blocks
5. **API Integration**: Connect dashboard to CMS API
6. **Deployment**: Deploy both applications

## 📝 Notes

- **Independent Applications**: Dashboard and CMS run separately but can be integrated
- **Shared Concepts**: Both use admin/client role system
- **API-First**: CMS provides headless API for any frontend
- **Production Ready**: Proper authentication, validation, and security
- **TypeScript First**: Full type safety throughout both applications 