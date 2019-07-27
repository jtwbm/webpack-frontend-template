const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: path.resolve( __dirname, 'src/index.js' ),
    output: {
      path: path.resolve( __dirname, 'dist' ),
      filename: 'index.bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve( __dirname, 'src/index.html' ),
        }),
        new MiniCssExtractPlugin({
          filename: devMode ? '[name].css' : '[name].[hash].css',
          chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      hmr: process.env.NODE_ENV === 'development',
                      reloadAll: true,
                    },
                  },
                  'css-loader',
                  'sass-loader',
                ],
            },
            {
                test: /\.(html)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        port: 9000
    }
};