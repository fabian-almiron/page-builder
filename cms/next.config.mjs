import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  output: 'standalone',
  experimental: {
    // outputFileTracingIncludes: {
    //   '/api/**/*': ['./src/**/*'],
    // },
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
