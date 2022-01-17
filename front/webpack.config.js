const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, args) => {
  return {
    mode: args.mode,
    entry: './src/index.tsx',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader'
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: args.mode === 'development',
                modules: true,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    ['autoprefixer', { grid: true }]
                  ]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: args.mode === 'development'
              }
            }
          ]
        },
        {
          test: /\.(svg|woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/inline'
        }
      ]
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, '/src'),
        'react-dom': '@hot-loader/react-dom'
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    watchOptions: {
      aggregateTimeout: 600,
      poll: 1000
    },
    target: args.mode === 'development' ? 'web' : ['web', 'es5'],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public')
      },
      port: 3000,
      hot: true,
      historyApiFallback: true
    },
    plugins: [
      new ESLintPlugin({
        fix: true,
        extensions: ['ts', 'tsx', 'js']
      }),
      new StylelintPlugin({
        fix: true
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src', 'index.html')
      })
    ]
  }
}