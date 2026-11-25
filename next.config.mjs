import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TEMPORARY: remove after 2026-10-21
  async redirects() {
    return [];
  },
};

export default withNextIntl(nextConfig);


