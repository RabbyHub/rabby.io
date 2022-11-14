const path = require('path');

module.exports = {
  base: '/docs/',
  title: 'Debank & Rabby',
  description: 'Document for Rabby',
  nextLinks: false,
  prevLinks: false,
  dest: path.resolve(__dirname, '../../dist/docs'),
  themeConfig: {
    logo: '/debank-512.png'
  },
  head: [
    ['link', { rel: 'icon', href: `https://rabby.io/assets/images/favicon.png` }]
  ],
}