import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TEMPORARY: remove after 2026-10-21
  async redirects() {
    return [
      {
        source: '/es/team/diego',
        destination: 'https://reynosobienesraices.com.ar/miembros/ivana-veliz',
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);


