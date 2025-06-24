'use client'

import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/lib/supabase'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  requiredSiteAccess?: string
  fallback?: React.ReactNode
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles, 
  requiredSiteAccess
}: ProtectedRouteProps) {
  const { profile, hasRole, canAccessSite } = useAuth()

  // Check role permission
  if (allowedRoles && allowedRoles.length > 0) {
    const hasAllowedRole = allowedRoles.some(role => hasRole(role))
    if (!hasAllowedRole) {
      return (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">
              You don&apos;t have permission to access this page.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Your role: <span className="font-medium">{profile?.role}</span>
            </p>
          </div>
        </div>
      )
    }
  }

  // Check site access permission
  if (requiredSiteAccess && !canAccessSite(requiredSiteAccess)) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="text-yellow-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Site Access Restricted</h2>
          <p className="text-gray-600">
            You don&apos;t have access to this specific site.
          </p>
          {profile?.role === 'client' && (
            <p className="text-sm text-gray-500 mt-2">
              You can only access site: <span className="font-medium">{profile.assigned_site_id}</span>
            </p>
          )}
        </div>
      </div>
    )
  }

  return <>{children}</>
} 