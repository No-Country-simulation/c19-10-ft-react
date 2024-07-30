require("dotenv").config();

module.exports = {
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
