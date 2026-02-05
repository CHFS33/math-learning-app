import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // NOTE: If deploying to a user page (username.github.io), leave basePath empty.
  // If deploying to a project page (username.github.io/repo-name), uncomment and set repo name:
  // basePath: "/repo-name",
};

export default nextConfig;
