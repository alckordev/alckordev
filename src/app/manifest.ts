import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "alckor.dev",
    short_name: "alckor.dev",
    description: "Isco, Tech Lead & Senior Fullstack Developer",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "ico",
      },
    ],
  };
}
