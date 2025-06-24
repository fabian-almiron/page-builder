import { createClient } from '@supabase/supabase-js'

// For demo purposes, using placeholder values
// In production, these would come from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserRole = 'admin' | 'client'

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  assigned_site_id?: string // For client users
  full_name: string
}

// Mock authentication service for demo purposes
export const mockAuth = {
  users: [
    {
      id: '1',
      email: 'admin@example.com',
      password: 'password',
      profile: {
        id: '1',
        email: 'admin@example.com',
        role: 'admin' as UserRole,
        full_name: 'Admin User'
      }
    },
    {
      id: '2', 
      email: 'client@example.com',
      password: 'password',
      profile: {
        id: '2',
        email: 'client@example.com',
        role: 'client' as UserRole,
        assigned_site_id: '1',
        full_name: 'Client User'
      }
    }
  ],

  signIn: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user = mockAuth.users.find(u => u.email === email && u.password === password)
    if (!user) {
      throw new Error('Invalid email or password')
    }
    
    // Store in localStorage for demo persistence
    localStorage.setItem('mockUser', JSON.stringify(user))
    return { user: { id: user.id, email: user.email }, profile: user.profile }
  },

  signOut: async () => {
    localStorage.removeItem('mockUser')
  },

  getSession: () => {
    try {
      const stored = localStorage.getItem('mockUser')
      if (stored) {
        const user = JSON.parse(stored)
        return { user: { id: user.id, email: user.email }, profile: user.profile }
      }
    } catch (error) {
      console.error('Error getting mock session:', error)
    }
    return null
  }
} 