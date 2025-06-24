import type { CollectionConfig } from 'payload'

export const Blocks: CollectionConfig = {
  slug: 'blocks',
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
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Hero',
          value: 'hero',
        },
        {
          label: 'Text',
          value: 'text',
        },
        {
          label: 'Image',
          value: 'image',
        },
        {
          label: 'Gallery',
          value: 'gallery',
        },
        {
          label: 'Video',
          value: 'video',
        },
        {
          label: 'Form',
          value: 'form',
        },
        {
          label: 'Call to Action',
          value: 'cta',
        },
        {
          label: 'Testimonial',
          value: 'testimonial',
        },
        {
          label: 'Pricing',
          value: 'pricing',
        },
        {
          label: 'FAQ',
          value: 'faq',
        },
      ],
    },
    {
      name: 'config',
      type: 'json',
      admin: {
        description: 'JSON configuration for this block type',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description of what this block does',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this block is active and available for use',
      },
    },
  ],
  access: {
    // All authenticated users can read blocks
    read: ({ req: { user } }) => !!user,
    // Only admins can create/update/delete blocks
    create: ({ req: { user } }) => (user as any)?.role === 'admin',
    update: ({ req: { user } }) => (user as any)?.role === 'admin',
    delete: ({ req: { user } }) => (user as any)?.role === 'admin',
  },
} 