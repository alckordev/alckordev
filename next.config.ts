import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  /* config options here */
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // swcMinify: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
    dangerouslyAllowSVG: true,
  },
  async redirects() {
    return [
      {
        source: "/integrate-culqi-payments-nodejs-sdk",
        destination: "/blog/integrate-culqi-payments-nodejs-sdk",
        permanent: true,
      },
      {
        source: "/versioning-api-with-nestjs",
        destination: "/blog/versioning-api-with-nestjs",
        permanent: true,
      },
      {
        source: "/fixing-next-themes-hydration-errors-nextjs-app-router",
        destination: "/blog/next-themes-hydration-error-nextjs-app-router",
        permanent: true,
      },
      {
        source: "/nextjs-server-actions-forms",
        destination: "/blog/nextjs-server-actions-forms",
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withNextIntl(nextConfig));
