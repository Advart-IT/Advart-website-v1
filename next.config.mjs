import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js"

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default (phase) => ({
  ...nextConfig,
  // Keep production builds from overwriting a running development server's cache.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
})

