const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const host = '0.0.0.0'
const port = 3000

module.exports = {
  entry: [
    `webpack-dev-server/client?http://${host}:${port}`,
    path.resolve(__dirname, 'src/index'),
  ],
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, 'src/template.ejs'),
      poster: {},
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
        test: /\.(png|otf)$/,
        use: 'url-loader?limit=1',
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
  devServer: {
    host,
    port,
    historyApiFallback: true,
  },
}
