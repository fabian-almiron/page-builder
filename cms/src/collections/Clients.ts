import type { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
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
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'site',
      type: 'relationship',
      relationTo: 'sites' as const,
      required: true,
      admin: {
        description: 'The site this client is associated with',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Optional phone number',
      },
    },
    {
      name: 'company',
      type: 'text',
      admin: {
        description: 'Optional company name',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Optional notes about this client',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this client is active',
      },
    },
  ],
  access: {
    // Admins can see all clients, clients can only see themselves
    read: ({ req: { user } }) => {
      if ((user as any)?.role === 'admin') return true
      if ((user as any)?.role === 'client') {
        return {
          site: {
            equals: (user as any)?.assignedSite,
          },
        }
      }
      return false
    },
    // Only admins can create/update/delete clients
    create: ({ req: { user } }) => (user as any)?.role === 'admin',
    update: ({ req: { user } }) => (user as any)?.role === 'admin',
    delete: ({ req: { user } }) => (user as any)?.role === 'admin',
  },
} 