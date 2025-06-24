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

// Get server URL with proper fallback
const getServerURL = () => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
  // Ensure the URL is properly formatted
  if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}

// Ensure we have required environment variables
if (!payloadSecret) {
  throw new Error('PAYLOAD_SECRET environment variable is required')
}

// For build process, allow empty database URI (will be available at runtime)
const isBuilding = process.env.NODE_ENV !== 'production' || process.argv.includes('build')
if (!databaseUri && !isBuilding) {
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
      connectionString: databaseUri || 'postgresql://localhost:5432/dummy_build_db',
    },
    // Enable automatic database migrations
    migrationDir: path.resolve(dirname, 'migrations'),
    push: true, // Auto-push schema changes to database
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  // Configure server settings for Railway deployment
  serverURL: getServerURL(),
})
