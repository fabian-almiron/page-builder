import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title',
      },
    },
    {
      name: 'site',
      type: 'relationship',
      relationTo: 'sites' as const,
      required: true,
      admin: {
        description: 'The site this page belongs to',
      },
    },
    {
      name: 'blocks',
      type: 'array',
      fields: [
        {
          name: 'block',
          type: 'relationship',
          relationTo: 'blocks' as const,
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Order of this block on the page',
          },
        },
      ],
      admin: {
        description: 'Blocks that make up this page',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        description: 'SEO meta title',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description: 'SEO meta description',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether this page is published and visible',
      },
    },
  ],
  access: {
    // Read access: admins see all, clients see only pages from their assigned site
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
    // Create access: admins can create any page, clients can create pages for their site
    create: ({ req: { user } }) => {
      if ((user as any)?.role === 'admin') return true
      return (user as any)?.role === 'client'
    },
    // Update access: admins can update any page, clients can update pages from their site
    update: ({ req: { user } }) => {
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
    // Delete access: only admins
    delete: ({ req: { user } }) => (user as any)?.role === 'admin',
  },
} 