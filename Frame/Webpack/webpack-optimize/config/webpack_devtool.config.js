const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const allDevtoolModes = [
    'eval',
    'cheap-eval-source-map',
    'cheap-module-eval-source-map',
    'eval-source-map',
    'cheap-source-map',
    'cheap-module-source-map',
    'inline-cheap-source-map',
    'inline-cheap-module-source-map',
    'source-map',
    'inline-source-map',
    'hidden-source-map',
    'nosources-source-map',
]

module.exports = allDevtoolModes.map(item => ({
    devtool: item,
    entry: {
        main: path.resolve(__dirname, '../src/index_devtool.js')
    },
    output: {
        filename: `js/${item}.js`,
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
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: `${item}.html`,
        }),
    ],
    mode: 'none',
}))