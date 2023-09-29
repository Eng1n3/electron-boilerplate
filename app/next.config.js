const { join } = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: join(process.cwd(), "out"),
};

module.exports = nextConfig;
