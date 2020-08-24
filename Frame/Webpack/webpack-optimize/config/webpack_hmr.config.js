const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/index_hmr.js')
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack Plugin Sample',
            template: path.resolve(__dirname, '../index.html')
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../src/images'),
                    to: path.resolve(__dirname, '../dist/images'),
                }
            ]
        }),
        // HMR需要的插件
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        //开启HMR，如果热替换失败就会自动回退使用自动刷新
        hot: true,
        //开启HMR，如果热替换失败就会自动回退
        //hotOnly: true,
        contentBase: path.resolve(__dirname, '../dist'),
        compress: true,
        port: 9000,
    },
    mode: 'none',
}