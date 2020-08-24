const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//自动清除Webpack打包结果中的注释
const RemoveCommentsPlugin = require('./remove-comments-plugin.js');

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/index.js')
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
            // HTML标题
            title: 'Webpack Plugin Sample',
            // 模板
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
        new RemoveCommentsPlugin(),
    ],
    devServer: {
        //contentBase:指定额外的静态资源路径，打包的dist目录和资源目录
        //没有使用copy-webpack-plugin插件
        //contentBase: [path.resolve(__dirname, '../dist'), path.resolve(__dirname, '../src/images')],

        //使用copy-webpack-plugin插件
        contentBase: path.resolve(__dirname, '../dist'),
        compress: true,
        port: 9000,
        //proxy(代理)：请求http://localhost:9000/api/users相当于请求https://api.github.com/users
        //https://api.github.com/users需要科学上网
        proxy: {
            '/api': {
                target: 'https://api.github.com',
                pathRewrite: {
                    //替换掉代理地址中的'/api'，正则的方式来替换请求路径
                    '^/api': '',
                },
                //实际代理请求地址中的主机名去请求
                changeOrigin: true,
            }
        }
    },
    mode: 'none',
}