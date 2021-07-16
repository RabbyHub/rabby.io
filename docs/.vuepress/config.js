const path = require('path');

module.exports = {
  base: '/docs/',
  title: 'Rabby',
  description: 'Document for Rabby',
  nextLinks: false,
  prevLinks: false,
  dest: path.resolve(__dirname, '../../dist/docs'),
  themeConfig: {
    logo: '/logo.png'
  },
  head: [
    ['link', { rel: 'icon', href: `https://rabby.io/assets/favicon.png` }]
  ],
}