const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})
const nextTranslate = require(`next-translate`)

module.exports = withMDX(nextTranslate({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  trailingSlash: true,
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en"
  }
}))