'use strict'
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: resolve('./'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: resolve('target/site'),
    filename: '[name].js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    modules: [resolve('node_modules'), resolve('src')]
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.css$/,
        use: 
          ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: false
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: false
                }
              }
            ],
            fallback: 'vue-style-loader'
          })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
              scss: [
                'vue-style-loader',
                {
                  loader: 'sass?resolve url-loader',
                  options: {
                    sourceMap: false
                  }
                },
                {
                  loader: 'css-loader',
                  options: {
                    sourceMap: false
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap: false
                  }
                }
              ]
            },
            cssSourceMap: false,
            cacheBusting: false,
            transformToRequire: {
              video: ['src', 'poster'],
              source: 'src',
              img: 'src',
              image: 'xlink:href'
            }
          }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client')
        ]
      },
      // optimize the parallax layer images
      {
        test: (path) => {
            return path.includes('parallax_layer')
                && path.endsWith('.png')
        },
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static/img'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                enabled: true,
              }
            }
          }
        ]
      },
      // process other images but do not optimize them
      {
        test: (path) => {
            return !path.includes('parallax_layer')
                && path.match(/\.(gif|png|jpe?g|svg)$/i)
        },
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static/img'
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: path.posix.join('static', 'css/[name].[contenthash].css'),
      allChunks: true,
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true, map: { inline: false } }
    })
  ],
  node: {
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
