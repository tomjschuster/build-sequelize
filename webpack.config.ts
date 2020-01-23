import path from 'path'
import webpack, { CliConfigOptions, Configuration, ConfigurationFactory } from 'webpack'

import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const config: ConfigurationFactory = (env, options: CliConfigOptions): Configuration => ({
  entry: ['./ts/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devtool: options.mode === 'production' ? false : 'source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: ['ts-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Sequelize UI',
      meta: { viewport: 'width=device-width, initial-scale=1' },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.PRODUCTION': options.mode === 'production',
    }),
  ],
})

export default config
