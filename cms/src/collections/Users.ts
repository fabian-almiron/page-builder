import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'client',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Client',
          value: 'client',
        },
      ],
    },
    {
      name: 'assignedSite',
      type: 'relationship',
      relationTo: 'sites' as const,
      admin: {
        condition: (data) => data?.role === 'client',
        description: 'Select the site this client has access to (only visible for client users)',
      },
    },
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
  ],
  access: {
    // Admins can see all users, clients can only see themselves
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    // Only admins can create/update/delete users
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}
