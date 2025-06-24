// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Sites } from './collections/Sites'
import { Pages } from './collections/Pages'
import { Blocks } from './collections/Blocks'
import { Clients } from './collections/Clients'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Support multiple database environment variable names for different deployment platforms
const databaseUri = process.env.DATABASE_URI || process.env.DATABASE_URL || process.env.POSTGRES_URL || ''

// Support multiple secret key environment variable names
const payloadSecret = process.env.PAYLOAD_SECRET || ''

// Ensure we have required environment variables
if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET environment variable is required')
}

if (!databaseUri) {
  throw new Error('DATABASE_URI (or DATABASE_URL) environment variable is required')
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Sites, Pages, Blocks, Clients],
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUri,
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  // Configure server settings for Railway deployment
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
})
