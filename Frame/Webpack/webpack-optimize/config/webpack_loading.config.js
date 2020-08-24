const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/index_loading.js')
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
    ],
    devServer: {
        //开启HMR，如果热替换失败就会自动回退
        //hotOnly: true,
        contentBase: path.resolve(__dirname, '../dist'),
        compress: true,
        port: 9000,
    },
    mode: 'none',
}