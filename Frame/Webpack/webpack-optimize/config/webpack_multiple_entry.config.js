const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        album: path.resolve(__dirname, '../src/page/album/album.js'),
        mine: path.resolve(__dirname, '../src/page/mine/mine.js'),
    },
    output: {
        filename: '[name].bundle.js',
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
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Multi Entry',
            template: path.resolve(__dirname, '../src/page/album/album.html'),
            filename: 'album.html',
            chunks: ['album'],// 指定使用 album.bundle.js
        }),
        new HtmlWebpackPlugin({
            title: 'Multi Entry',
            template: path.resolve(__dirname, '../src/page/mine/mine.html'),
            filename: 'mine.html',
            chunks: ['mine'] // 指定使用 mine.bundle.js
        }),
    ],
    //配置Webpack内置优化功能
    optimization: {
        splitChunks: {
            // 自动提取所有公共模块到单独 bundle
            chunks: 'all',
        }
    },
    mode: 'none',
}