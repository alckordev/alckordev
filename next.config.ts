import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
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

export default withNextIntl(nextConfig);
