const _ = require('lodash')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { default: SitemapWebpackPlugin } = require('sitemap-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const publicPath = 'https://fakundo.github.io/tarkov-raid-items/'

const pages = [
  { lang: 'en', href: publicPath },
  { lang: 'ru', href: `${publicPath}ru.html` },
  { lang: 'de', href: `${publicPath}de.html` },
  { lang: 'fr', href: `${publicPath}fr.html` },
]

const languages = [
  {
    filename: 'index.html',
    lang: 'en',
    title: 'Escape from Tarkov [EFT] – Find in Raid Quest Items',
    description: 'Interactive list of quest items in Escape from Tarkov (EFT) game needed to be found in raid. Progress tracker.',
    keywords: 'Escape From Tarkov, EFT, items, find in raid, quest, quest items, find in raid items, interactive list',
    alternatives: _.reject(pages, { lang: 'en' }),
  },
  {
    filename: 'ru.html',
    lang: 'ru',
    title: 'Escape from Tarkov [EFT] – Найдено в рейде, квестовые предметы',
    description: 'Интерактивный список квестовых предметов из игры Escape from Tarkov (Побег из Таркова), которые необходимо найти в рейде. Трекер прогресса.',
    keywords: 'Тарков, Escape From Tarkov, EFT, найдено в рейде, квестовые предметы, предметы найдены в рейде, интерактивный список',
    alternatives: _.reject(pages, { lang: 'ru' }),
  },
  {
    filename: 'de.html',
    lang: 'de',
    title: 'Escape from Tarkov – [EFT] Gegenstände, die bei der Razzia gefunden wurden',
    description: 'Die interaktive Liste der Questgegenstände im Spiel Escape from Tarkov (EFT) musste im Schlachtzug gefunden werden. Fortschrittsanzeige.',
    keywords: 'Escape From Tarkov, EFT die bei der razzia gefunden wurden, EFT, questgegenstände die bei der razzia gefunden wurden, interaktive',
    alternatives: _.reject(pages, { lang: 'de' }),
  },
  {
    filename: 'fr.html',
    lang: 'fr',
    title: 'Escape from Tarkov – [EFT] Objets trouvés dans le raid',
    description: 'La liste interactive des objets de quête dans le jeu Escape from Tarkov (EFT) devait être trouvée dans le raid. Suivi de progression.',
    keywords: 'Escape From Tarkov, EFT trouvée dans le raid, EFT, objets trouvés dans le raid, interactive',
    alternatives: _.reject(pages, { lang: 'fr' }),
  },
]

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
    ...languages.map((langOptions) => new HtmlWebpackPlugin({
      ...langOptions,
      minify: { collapseWhitespace: true, minifyJS: true, minifyCSS: true },
      inject: 'body',
      hash: true,
      template: path.resolve(__dirname, 'src/template.ejs'),
      favicon: path.resolve(__dirname, 'src/assets/favicon.png'),
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
      paths: pages.map((page) => ({
        path: page.href,
      })),
      options: {
        skipgzip: true,
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
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
