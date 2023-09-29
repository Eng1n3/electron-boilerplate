const { join } = require("path");

const isProd = process.env.NODE_ENV === 'prod' ? true : false


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: isProd ? join(process.cwd(), "out") : undefined,
};

module.exports = nextConfig;
