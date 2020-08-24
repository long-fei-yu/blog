const path = require('path');

module.exports = {
    entry: {
        main: path.resolve(__dirname, '../src/index.js')
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // css-loader:把css模块加载到js模块中，并没有使用这个模块
                // style-loader:把css模块转换后的js模块用style方式添加到页面
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.md$/,
                use: [
                    'html-loader',
                    path.resolve(__dirname, './markdown-loader')
                ]
            }
        ]
    },
    mode: 'none',
}