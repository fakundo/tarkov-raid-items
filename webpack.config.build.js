const _ = require('lodash')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const { default: SitemapWebpackPlugin } = require('sitemap-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const createPages = require('./createPages')

const publicPath = 'https://fakundo.github.io/tarkov-raid-items/'
const pages = createPages(publicPath)

module.exports = {
  entry: path.resolve(__dirname, 'src/index'),
  output: {
    publicPath,
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  target: 'web',
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    ...pages.map((pageOptions) => new HtmlWebpackPlugin({
      ...pageOptions,
      alternatives: _.reject(pages, { lang: pageOptions.lang }),
      minify: { collapseWhitespace: true, minifyJS: true, minifyCSS: true },
      inject: 'body',
      hash: true,
      template: path.resolve(__dirname, 'src/template.ejs'),
      poster: {
        url: `${publicPath}poster.png`,
        width: '144',
        height: '144',
      },
      googleTagKey: 'G-SVCPTV948J',
    })),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/poster.png', force: true },
      ],
    }),
    new CleanWebpackPlugin(),
    new SitemapWebpackPlugin({
      base: publicPath,
      paths: pages,
      options: {
        skipgzip: true,
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'src/assets/favicon.png'),
      publicPath,
      outputPath: path.resolve(__dirname, 'build/favicons'),
      favicons: {
        appName: 'Tarkov Raid Items',
        appDescription: 'Interactive list of quest items in Escape from Tarkov (EFT) game needed to be found in raid. Progress tracker.',
        version: null,
        developerURL: null,
        developerName: null,
        background: '#000000',
        theme_color: '#FFFFFF',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.otf$/,
        use: 'url-loader?limit=1',
      },
      {
        test: /\.png$/,
        use: [
          'url-loader?limit=1',
          'image-webpack-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: 'svg-sprite-loader',
      },
      {
        test: /\.po$/,
        use: 'react-localized-loader',
      },
    ],
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      constants: path.resolve(__dirname, 'src/constants'),
      data: path.resolve(__dirname, 'src/data'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      locales: path.resolve(__dirname, 'src/locales'),
      providers: path.resolve(__dirname, 'src/providers'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
}
