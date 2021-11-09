/** @type {import('next').NextConfig} */
const config = {
  async headers() {
    return [
      /** Disallow indexing by search engines. */
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ]
  },
  pageExtensions: ["page.tsx", "page.mdx"],
  reactStrictMode: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "xdm/webpack.cjs",
          /** @type {import('xdm/lib/integration/webpack').Options} */
          options: {
            jsx: true,
          },
        },
      ],
    });

    return config;
  },
};

export default config;
