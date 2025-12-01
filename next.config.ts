import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // For GitHub Pages deployment, set basePath to your repo name
  // basePath: '/winterfest-santa',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
