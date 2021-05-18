const withPWA = require('next-pwa')

const account = process.env.STORAGE_ACCOUNT_NAME || ''

module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
  images: {
    domains: [`${account}.blob.core.windows.net`],
  },
})
