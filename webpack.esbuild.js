const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = function (env, argv) {


  return {
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash:8].js',
      chunkFilename: '[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.js/,
          use: {
            loader: 'esbuild-loader',
            options: {
              target: 'es2015',
              loader: 'jsx',
              // presets: ['@babel/preset-env', '@babel/preset-react'],
              // plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties',
              //   // antd 按需加载组件和css样式 使用babel-plugin-import 插件
              //   ['import', {
              //     libraryName: 'antd',
              //     libraryDirectory: 'es',
              //     style: 'css'
              //   }, 'antd']
              // ],
            }
          }
        },
        {
          test: /\.jsx/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties',
                // antd 按需加载组件和css样式 使用babel-plugin-import 插件
                ['import', {
                  libraryName: 'antd',
                  libraryDirectory: 'es',
                  style: 'css'
                }, 'antd']
              ],
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              // options: {
              //   modules: {
              //     localIdentName: "[local]__[hash:base64:5]",
              //   }
              // }
            }
          ]
        },
        {
          test: /\.less/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: "[local]__[hash:base64:5]",
                }
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        },
      ]
    },
    optimization: {
      minimize: true,
      // minimizer: [
      // new TerserPlugin()
      // new OptimizeCssAssetsPlugin()
      // ],
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'es2015',
          minifyWhitespace: true
        })
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            name: 'vendor'
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
            name: 'bundle'
          }
        }
      }
    },
    devServer: {
      port: 9090,
      hot: true,
      historyApiFallback: true,
      // liveReload: true,
      // client: {
      //   logging: 'info',//错误日志
      //   progress: true,//在浏览器中以百分比显示编译进度。
      //   reconnect: true,//告诉 dev-server 它应该尝试重新连接客户端的次数
      // },
      // magicHtml: true,
    },
    // devtool: 'source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html'
      }),
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
        // chunkFilename: '[name].[contenthash:8].css'
      }),
      new ESBuildPlugin()
    ]
  }
}