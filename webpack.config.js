const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");



const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },
    devServer: {
      port: 3000,
      open: true,
      hot: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 
                  { 
                    loader: 'css-loader', 
                    options: { url: false } 
                }, 
                'sass-loader'],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            inject: 'body',
            scriptLoading: 'blocking'
        }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
              patterns: [
                {
                  from: './images/*.+(png|svg|jpg|jpeg|gif|ico)',
                  to: path.resolve(__dirname, 'dist')
                },
                {
                  from: 'JSON/*.json',
                  to: path.resolve(__dirname, 'dist')
                },
                {
                  from: './fonts/*.+(woff|woff2|eot|ttf|otf)',
                  to: path.resolve(__dirname, 'dist')
                }
              ]
            })
    ],
    optimization: {
      minimizer: [
        new CssMinimizerPlugin({
          test: /.css$/,
        }),
        new ImageMinimizerPlugin({
          test: /\.(jpe?g|png|gif|svg)$/i,
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                "imagemin-gifsicle",
                "imagemin-mozjpeg",
                "imagemin-optipng",
                "imagemin-svgo",
              ],
            },
          },
          // Disable `loader`
          loader: false,
        }),
      ],
    },
}


