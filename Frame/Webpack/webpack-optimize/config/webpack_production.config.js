const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
    console.log('env, argv', env, argv)

    const config = {
        entry: {
            main: path.resolve(__dirname, '../src/index_production.js')
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
                        //'style-loader',
                        MiniCssExtractPlugin.loader,
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
            new webpack.DefinePlugin({
                API_BASE_URL: JSON.stringify('https://api.example.com'),
            }),
            new MiniCssExtractPlugin(),
        ],
        devServer: {
            contentBase: path.resolve(__dirname, '../dist'),
            compress: true,
            port: 9000,
        },
        optimization: {
            minimizer: [
                new TerserWebpackPlugin(),
                new OptimizeCssAssetsWebpackPlugin(),
            ]
        },
        mode: 'production',
    }

    return config;
}