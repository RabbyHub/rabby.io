const withLess = require('next-with-less');
const withTM = require('next-transpile-modules'); // pass the modules you would like to see transpiled

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
};

module.exports = withTM(['@debank/common'])(withLess(nextConfig));
