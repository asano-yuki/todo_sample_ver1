const path = require('path')
const NodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = (env, args) => {
  return {
    mode: args.mode,
    entry: './src/index.ts',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader'
        }
      ]
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, '/src')
      },
      extensions: ['.ts', '.js']
    },
    plugins: [
      // サーバー側でもホットリロード
      new NodemonPlugin(),
      new ESLintPlugin({
        fix: true,
        extensions: ['ts', 'js']
      })
    ],
    externalsPresets: { node: true },
    externals: [NodeExternals()]
  }
}