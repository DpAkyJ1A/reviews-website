/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'reviews-admin-panel.vercel.app'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svgr$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [{
                name: 'preset-default',
                params: {
                  overrides: {
                    // disable plugins
                    removeViewBox: false,
                  },
                },
              }]
            },
            titleProp: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
