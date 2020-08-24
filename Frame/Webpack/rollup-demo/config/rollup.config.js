import css from 'rollup-plugin-css-only';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.js',
    output: {
        //file: 'dist/bundle.js',
        dir: 'dist',
        format: 'amd' // 输出格式可以设置多种
    },
    plugins: [
        css({output: 'bundle.css'}),
        json(),
        resolve(),
    ],
}

// const formats = ['es', 'amd', 'cjs', 'iife', 'umd', 'system'];
// export default formats.map(format => ({
//     input: 'src/index.js',
//     output: {
//         file: `dist/bundle.${format}.js`,
//         format
//     },
//     plugins: [
//         css({output: 'bundle.css'}),
//     ],
// }))