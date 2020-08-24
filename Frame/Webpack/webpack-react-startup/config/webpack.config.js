const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = env => {
    console.log('env: ', env);

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: '[name].[contenthash].js',
            //指定图片的路径和命名
            assetModuleFilename: 'images/[hash][ext][query]'
        },
        module: {
            rules: [
                //加载css
                {
                    test: /.css$/,
                    use: ['style-loader', 'css-loader']
                },
                //加载图片资源
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/,
                    type: 'asset/resource',
                },
                //加载fonts字体
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    type: 'asset/resource',
                },
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({template: './index.html'}),
            //一般不建议使用
            // new webpack.ProvidePlugin({
            //     //_代表lodash库
            //     _: 'lodash',
            //     //join()代表lodash.join()
            //     join: ['lodash', 'join'],
            // }),
            new webpack.DefinePlugin({
                'process.env.ASSET_PATH': 'https://www.baidu.com',
            })
        ],
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.resolve(__dirname, '../dist'),
        },
        // optimization: {
        //     //vendor的hash值都不变
        //     moduleIds: 'deterministic',
        //     //将runtime代码拆分为一个单独的chunk
        //     runtimeChunk: 'single',
        //     //将第三方库(lodash或react)提取到vendor chunk
        //     splitChunks: {
        //         cacheGroups: {
        //             vendor: {
        //                 test: /[\\/]node_modules[\\/]/,
        //                 name: 'vendors',
        //                 chunks: 'all',
        //             },
        //         },
        //     },
        // },
        mode: 'development',
    }
}