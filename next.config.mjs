/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
};

export default nextConfig;