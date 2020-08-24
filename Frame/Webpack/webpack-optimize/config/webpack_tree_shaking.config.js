const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/index_tree_shaking.js')
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
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {modules: false}]
                        ]
                    }
                }
            },
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
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        compress: true,
        port: 9000,
    },
    //配置Webpack内置优化功能
    optimization: {
        //模块只导出外部用到的成员
        usedExports: true,
        // 尽可能合并每一个模块到一个函数中
        //concatenateModules: false,
        //压缩打包结果
        //minimize: false,
    },
    mode: 'none',
}