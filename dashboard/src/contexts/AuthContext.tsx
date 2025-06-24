'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { UserProfile, mockAuth } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signOut: () => Promise<void>
  hasRole: (role: string) => boolean
  canAccessSite: (siteId: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session from mock auth
    const getInitialSession = async () => {
      try {
        const session = mockAuth.getSession()
        if (session) {
          setUser(session.user as User)
          setProfile(session.profile)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const result = await mockAuth.signIn(email, password)
      
      setUser(result.user as User)
      setProfile(result.profile)
      
      setLoading(false)
      return {}
    } catch (err) {
      console.error('Sign in error:', err)
      setLoading(false)
      return { error: err instanceof Error ? err.message : 'Sign in failed' }
    }
  }

  const signOut = async () => {
    try {
      await mockAuth.signOut()
      setUser(null)
      setProfile(null)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const hasRole = (role: string) => {
    return profile?.role === role
  }

  const canAccessSite = (siteId: string) => {
    if (profile?.role === 'admin') return true
    if (profile?.role === 'client') {
      return profile.assigned_site_id === siteId
    }
    return false
  }

  const value = {
    user,
    profile,
    loading,
    signIn,
    signOut,
    hasRole,
    canAccessSite,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 