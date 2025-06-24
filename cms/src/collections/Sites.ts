import type { CollectionConfig } from 'payload'

export const Sites: CollectionConfig = {
  slug: 'sites',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media' as const,
      admin: {
        description: 'Upload a logo for this site',
      },
    },
    {
      name: 'primaryColor',
      type: 'text',
      admin: {
        description: 'Primary brand color (hex code, e.g., #3B82F6)',
      },
      defaultValue: '#3B82F6',
    },
    {
      name: 'domain',
      type: 'text',
      admin: {
        description: 'Domain name for this site (e.g., example.com)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Preview',
          value: 'preview',
        },
        {
          label: 'Live',
          value: 'live',
        },
      ],
    },
    {
      name: 'previewUrl',
      type: 'text',
      admin: {
        description: 'Preview URL for this site',
      },
    },
  ],
  access: {
    // Admins can access all sites, clients can only access their assigned site
    read: ({ req: { user } }) => {
      if ((user as any)?.role === 'admin') return true
      if ((user as any)?.role === 'client') {
        return {
          id: {
            equals: (user as any)?.assignedSite,
          },
        }
      }
      return false
    },
    create: ({ req: { user } }) => (user as any)?.role === 'admin',
    update: ({ req: { user } }) => {
      if ((user as any)?.role === 'admin') return true
      if ((user as any)?.role === 'client') {
        return {
          id: {
            equals: (user as any)?.assignedSite,
          },
        }
      }
      return false
    },
    delete: ({ req: { user } }) => (user as any)?.role === 'admin',
  },
} 