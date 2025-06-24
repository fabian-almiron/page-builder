import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  output: 'standalone',
  // Skip static optimization for API routes during build
  trailingSlash: false,
  // Don't try to pre-render API routes during build
  generateStaticParams: false,
  experimental: {
    // Disable static generation for problematic routes
    skipTrailingSlashRedirect: true,
    // outputFileTracingIncludes: {
    //   '/api/**/*': ['./src/**/*'],
    // },
  },
  // Configure which pages should be statically generated
  async generateBuildId() {
    // Use environment-based build ID to ensure consistency
    return process.env.NODE_ENV === 'production' ? 'production-build' : 'development-build'
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
