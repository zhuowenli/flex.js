/*
 * @Author: 卓文理
 * @Email: 531840344@qq.com
 * @Date: 2017-04-28 15:14:38
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.MEIYA_ENV;

module.exports = {
    entry: {
        flex: './flex.js',
        app: './example/app.js',
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: ['.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: { minimize: true, importLoaders: true },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')({
                                        browsers: ['ie > 8', 'last 4 versions'],
                                        remove: false,
                                    }),
                                    require('postcss-pxtorem')({
                                        rootValue: 32,
                                        selectorBlackList: ['html'],
                                        minPixelValue: 1,
                                        propWhiteList: ['*'],
                                    }),
                                ],
                            },
                        },
                        { loader: 'sass-loader', options: { sourceMap: true } },
                    ],
                }),
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/i,
                use: `file-loader?name=${env ? '' : '/dist/'}img/[name].[ext]`,
            },
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('[name].min.css'),
    ],
};
