# Dashboard with Supabase Authentication

A modern Next.js dashboard application with role-based access control using Supabase authentication.

## 🚀 Features

- **Role-Based Access Control**: Two user roles with different permissions
  - **Admin**: Full access to all features
  - **Client**: Limited access to assigned site only
- **Protected Routes**: Route-level protection based on user roles
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with TailwindCSS and Heroicons
- **TypeScript**: Full type safety throughout the application

## 👥 User Roles

### Admin User
- **Email**: `admin@example.com`
- **Password**: `password`
- **Permissions**: 
  - View and manage all sites
  - Access client management
  - Full access to all content blocks
  - Access to all settings

### Client User
- **Email**: `client@example.com`
- **Password**: `password`
- **Permissions**:
  - View and edit only assigned site (Site ID: 1)
  - Limited access to content blocks
  - Basic settings access
  - No access to client management

## 🛠️ Installation & Setup

1. **Clone the project** (if not already done):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Authentication System

The application uses a **mock authentication system** for demonstration purposes. In a production environment, you would:

1. Set up a real Supabase project
2. Configure environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
3. Set up user profiles table in Supabase
4. Configure row-level security (RLS) policies

## 📱 Pages & Access Control

### Sites (`/sites`)
- **Admin**: Can view and manage all sites
- **Client**: Can only view their assigned site

### Clients (`/clients`) 
- **Admin**: Full access to client management
- **Client**: Access denied

### Blocks (`/blocks`)
- **Admin**: Full access to all content blocks
- **Client**: Limited access to content blocks

### Settings (`/settings`)
- **Admin**: Full access to all settings
- **Client**: Limited access to basic settings

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout with AuthProvider
│   ├── page.tsx           # Home page (redirects to /sites)
│   ├── sites/page.tsx     # Sites management
│   ├── clients/page.tsx   # Client management (admin only)
│   ├── blocks/page.tsx    # Content blocks
│   └── settings/page.tsx  # Settings
├── components/            # React components
│   ├── AuthWrapper.tsx    # Authentication wrapper
│   ├── Header.tsx         # Header with user info
│   ├── LoginForm.tsx      # Login form
│   ├── ProtectedRoute.tsx # Route protection component
│   └── Sidebar.tsx        # Navigation sidebar
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication context
└── lib/                   # Utilities
    └── supabase.ts        # Supabase client & mock auth
```

## 🔄 Authentication Flow

1. **Unauthenticated users** see the login form
2. **Authentication** happens via mock service (localStorage-based)
3. **Role determination** based on user profile
4. **Route protection** enforced at component level
5. **UI adaptation** based on user role and permissions

## 🎨 UI Components

- **Responsive sidebar** with role-based navigation
- **Header** with user information and logout
- **Protected content** with access control messages
- **Loading states** during authentication
- **Error handling** for failed authentication

## 🔧 Development

- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS
- **Icons**: Heroicons
- **Authentication**: Supabase (with mock implementation)
- **TypeScript**: Full type safety
- **State Management**: React Context

## 🚨 Important Notes

- This is a **demonstration version** with mock authentication
- User sessions persist in `localStorage` for demo purposes
- In production, implement proper Supabase authentication
- Add proper error handling and validation
- Implement actual database queries for user profiles and permissions

## 📝 Demo Credentials

Use these credentials to test different user roles:

| Role | Email | Password | Access Level |
|------|-------|----------|-------------|
| Admin | `admin@example.com` | `password` | Full access |
| Client | `client@example.com` | `password` | Limited access |

## 🔗 Next Steps

To make this production-ready:

1. Set up a real Supabase project
2. Create user profiles table
3. Implement proper authentication flows
4. Add proper error handling
5. Set up row-level security policies
6. Add user registration functionality
7. Implement proper session management
