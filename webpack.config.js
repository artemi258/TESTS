const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
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
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    outputPath: 'images/',
                    filename: '[name][ext]'
                  }
            },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: 'asset/resource',
              generator: {
                outputPath: 'fonts/',
                filename: '[name][ext]'
              }
            },
            {
              test: /\.json$/,
              type: 'asset/resource',
              generator: {
                  outputPath: 'JSON/',
                  filename: '[name][ext]'
                }
          },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:  path.resolve(__dirname, 'index.html'),
            inject: 'body',
            scriptLoading: 'blocking'
        }),
        new MiniCssExtractPlugin()
    ],
    optimization: {
        minimizer: [
          new CssMinimizerPlugin({
            test: /.css$/,
          }),
        ],
      },
}