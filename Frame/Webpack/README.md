### Webpack——模块打包工具——前端项目的构建系统

#### Webpack安装

npm install webpack webpack-cli --save-dev

#### Webpack解决的问题

如何在前端项目中更高效地管理和维护项目中的每一个资源

#### Webpack核心特性

插件机制：实现各种自动化的构建任务，例如自动压缩、自动发布。

Loder机制：处理特殊类型资源的加载，例如加载样式、图片。

#### Webpack核心工作过程

1. Webpack CLI启动打包流程
2. 载入Webpack核心模块，创建Compiler对象
3. 使用Compiler对象开始编译整个项目
4. 从入口文件开始，解析模块依赖，形成依赖关系树
5. 递归依赖树，将每个模块交给对应的Loader处理
6. 合并Loader处理完的结果，将打包结果输出到dist目录

#### 打包原理

打包后是一个立即函数，参数是一个数组(元素是每个模块)，可以将mode设置为none查看源码。

#### API

##### 入口(entry)

默认的入口是src/index.js，

##### 出口(output)

##### loader

常见的loader

css-loader:把css模块加载到js模块中，但并没有使用这个模块。 

style-loader:把css模块转换后的js模块用style方式添加到页面。

自定义loader

```javascript
// markdown-loader.js
const marked = require('marked');

//方式1
module.exports = source => {
  //在编译的时候打印，不会再控制台打印
  console.log('markdown-loader', source);
  
  //marked库:将markdown内容转化为html
  const html = marked(source);
  
  //返回的必须是js模块代码，不能是纯字符串
  return `module.exports = ${JSON.stringify(html)}`;
  //return `export default = ${JSON.stringify(html)}`;
}

//方式2:将返回的值给另一个loader(html-loader)，
//最终的loader返回的必须是js模块代码，不能是纯字符串
module.exports = source => {
  //在编译的时候打印，不会再控制台打印
  console.log('markdown-loader', source);
  
  //marked库:将markdown内容转化为html
  const html = marked(source);
  return html;
}

// webpack.config.js
module: {
  rules: [
    {
      test: /\.css$/,
      //use多个时，顺序是从后往前执行(先执行css-loader，再执行style-loader)
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
}
```

##### 插件(plugins)

常见的plugin

clean-webpack-plugin:自动清除输出目录。

html-webpack-plugin:自动生成使用打包结果的HTML。

copy-webpack-plugin:复制文件。开发过程中一般不会使用。


```javascript
// plugin配置
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//自动清除Webpack打包结果中的注释
const RemoveCommentsPlugin = require('./remove-comments-plugin.js');

module.exports = {
  ......
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
        }
      ]
    }),
    new RemoveCommentsPlugin()
  ]
}
```

自定义plugin机制:钩子机制。

```javascript
//自定义的插件:必须是一个函数或者是一个包含apply方法的对象

const pluginName = 'RemoveCommentsPlugin';

class RemoveCommentsPlugin {
  //apply:Webpack启动时被调用
  apply(compiler) {
    //compiler:Webpack工作过程中最核心的对象，包含此次构建的所有配置信息，通过这个对象去注册钩子函数
    //emit:Webpack即将向输出目录输出文件时执行
    compiler.hooks.emit.tap(pluginName, compilation => {
      //挂载到钩子上的函数，compilation:可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source()
          const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
          compilation.assets[name] = {
            source: () => noComments,
            size: () => noComments.length
          }
        }
      }
    })
  }
}

module.exports = RemoveCommentsPlugin;
```

##### 模式

development：process.env.NODE_ENV值是development，自动优化打包速度，启用调试过程的辅助插件(NamedChunksPlugin，NamedModulesPlugin)。

production：process.env.NODE_ENV值是production，自动优化打包结果，打包速度偏慢，启用内置优化插件(FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin，OccurrenceOrderPlugin，SideEffectsFlagPlugin，UglifyJsPlugin)。

none：运行最原生的打包，不做任何额外处理。用来分析模块的打包结果。

##### devServer

运行命令(npx webpack-dev-server)，它内部会启动一个HTTP Server，为打包的结果提供静态文件服务，并且自动使用Webpack打包我们的应用，然后监听源代码的变化，一旦文件发生变化，它会立即重新打包。

webpack-dev-server没有将打包结果写入到磁盘中，而是暂时存放在内存中，内部的HTTP Server也是从内存中读取这些文件的。这样可以提高了整体的构建效率。

##### contentBase：指定额外的静态资源路径

copy-webpack-plugin插件在开发环境一般不配置，开发过程中会频繁重复执行打包任务，假设这个目录下需要拷贝的文件比较多，如果每次都需要执行这个插件，那打包过程开销就会比较大，每次构建的速度也就自然会降低。故而资源文件目录需要单独配置。

##### proxy：代理

应用在开发阶段是运行在localhost的一个端口上，而API可能运行在别的一个地址上，这样产生跨域请求问题。

解决方式1：API配置支持跨域资源共享(CORS)

解决方式2：前端配置代理服务  

```javascript
devServer: {
  //contentBase:指定额外的静态资源路径，打包的dist目录和资源目录
  //使用copy-webpack-plugin插件
  contentBase: [path.resolve(__dirname, '../dist'), path.resolve(__dirname, '../src/images')],
    
  //没有使用copy-webpack-plugin插件
  //contentBase: path.resolve(__dirname, '../dist'),
  compress: true,
  port: 9000,
  //代理：请求http://localhost:9000/api/users相当于请求https://api.github.com/users
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
```

##### devtool:是否生成，以及如何生成source map

cheap:只能定位源代码的行号，没法定位源代码列号。

module:有module，解析出来的源代码是没有经过Loader加工的，和源代码是一致的。没有module，解析出来的源代码是经过Loader加工后的结果。

eval:模块代码放到eval函数中执行，并且通过sourceURL标注所属文件路径。

##### source-map:生成Source Map文件，可以反推出源代码

开发环境一般选择cheap-module-eval-source-map。

生产环境一般选择none或者nosources-source-map。

具体参考 [https://www.webpackjs.com/configuration/devtool](https://www.webpackjs.com/configuration/devtool)

##### 热替换(HMR)

热替换：在应用运行过程中，实时的去替换掉应用中的某个模块，而应用的运行状态不会因此而改变。

```javascript
......
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  ......
  plugins: [
    // HMR需要的插件
    //new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    //开启HMR
    hot: true,
    ......
  },
}
```
这样配置后修改css以不刷新的形式更新到页面中，但是修改JS模块还是会重新刷新页面(页面的状态会丢失)。  

因为样式文件是经过Loader处理的，在style-loader中就已经自动处理了样式文件的热更新。  

JS模块需要特殊处理。JS模块代码有修改会回调module.hot.accept的回调方法。

```javascript
module.hot.accept('./main', () => {
  ......
})
```

##### Tree Shaking

在生产模式(mode=production)下会自动启用。如果在其他模式下则需要配置。

有说babel-loader会导致Tree-shaking失效：Tree-shaking实现的前提是ES Modules，也就是说：最终交给Webpack打包的代码，必须是使用 ES Modules 的方式来组织的模块化。

但是最新版本(8.x)的babel-loader中，已经自动帮我们关闭了对ES Modules转换的插件。所以经babel-loader处理后的代码默认仍然是ES Modules。所以Tree-shaking不会失效。

最简单的办法就是在配置中将 @babel/preset-env的modules属性设置为false，确保不会转换ES Modules。这样Tree-shaking总不会失效。

```javascript
module.exports = {
  ......
  module: {
    rules: [
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
  //配置Webpack内置优化功能
  optimization: {
    //模块只导出外部用到的成员
    usedExports: true,
    //压缩打包结果
    minimize: true,
  },
  mode: 'none',
}
```

##### Scope Hoisting(合并模块)

普通打包只是将一个模块最终放入一个单独的函数中，如果我们的模块很多，就意味着在输出结果中会有很多的模块函数。

##### concatenateModules

尽可能将所有模块合并到一起输出到一个函数中，这样既提升了运行效率，又减少了代码的体积。

```javascript
module.exports = {
  ......
  //配置Webpack内置优化功能
  optimization: {
    // 尽可能合并每一个模块到一个函数中
    concatenateModules: false,
  },
  mode: 'none',
}
```

##### sideEffects(副作用)

在生产模式(mode=production)下会自动启用。如果在其他模式下则需要配置。这个特性一般只有我们去开发一个npm模块时才会用到。

对全局有影响的副作用代码不能移除，而只是对模块有影响的副作用代码就可以移除。

模块的副作用：模块执行的时候除了导出成员，是否还做了其他的事情。

```javascript
package.json
{
  ......
  //保留副作用的模块：extend模块和css模块
  "sideEffects": [
    "./src/components/extend.js",
    "*.css"
  ]
}

webpack.config.js
module.exports = {
  ......
  //配置Webpack内置优化功能
  optimization: {
    //模块只导出外部用到的成员
    usedExports: true,
    //开启副作用功能
    sideEffects: true,
  },
  mode: 'none',
}
```

##### 分包

Webpack实现分包的方式主要有两种

1. 根据业务不同配置多个打包入口，输出多个打包结果。一般适用于传统的多页应用程序。
2. 结合ES Modules的动态导入特性，按需加载模块。

```javascript
方式一
module.exports = {
  entry: {
    album: path.resolve(__dirname, '../src/page/album/album.js'),
    mine: path.resolve(__dirname, '../src/page/mine/mine.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  ......
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

方式二：主要是使用动态import()来实现
import('....').then(math => {
  ......
});
```
##### 不同环境下的配置

通过process.env.NODE_ENV来获取当前的环境是development还是production。从而决定是否执行例如打印日志之类的操作。

```javascript
方式一：在配置文件中添加相应的判断条件，根据环境不同导出不同配置

//env：CLI传递的环境名参数，development表示是开发模式，production表示生产环境。
//argv：CLI 过程中的所有参数
module.exports = (env, argv) => {
  const config = {
    // ... 不同模式下的公共配置
  }
  
  if (env === 'development') {
    // 为 config 添加开发模式下的特殊配置
    ......
  } else if (env === 'production') {
    // 为 config 添加生产模式下的特殊配置
    ......
  }
    return config
}
```

方式二：为不同环境单独添加一个配置文件，一个环境对应一个配置文件
```javascript
//webpack.common.js
module.exports = {
  // ... 公共配置
}

//webpack.prod.js
const merge = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
  // 生产模式配置
})

//webpack.dev.jss
const merge = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
  // 开发模式配置
})

注意：Object.assign只能浅拷贝，合并数组或者深层对象没有效果。webpack-merge插件可以实现深拷贝。	
```
##### Define Plugin

```javascript
const webpack = require('webpack')
module.exports = {
  ......
  plugins: [
    new webpack.DefinePlugin({
      API_BASE_URL: '"https://api.example.com"',
      //或者
      API_BASE_URL: JSON.stringify('https://api.example.com'),
    })
  ]
}

//inde.js  可以直接获取API_BASE_URL值
console.log('API_BASE_URL', API_BASE_URL);
```
##### Mini CSS Extract Plugin 需要在mode是production才有效

mini-css-extract-plugin：CSS就会存放在独立的文件中，直接通过link标签引入页面。但是css不会被压缩。

optimize-css-assets-webpack-plugin：压缩css。

terser-webpack-plugin：压缩JS

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
module.exports = {
  ......
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader', // 将样式通过 style 标签注入
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ],
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin(),
    ]
  },
  mode: 'production',
}
```
### Rollup

Rollup是一款ES Modules打包器。将项目中散落的细小模块打包为整块代码。 

Rollup默认会自动开启Tree-shaking 优化输出结果，Tree-shaking的概念最早也就是Rollup这个工具提出的。输出的结果中只会保留那些用到的部分，对于未引用部分都没有输出。

Rollup不支持HMR。

### Rollup安装

npm i rollup --save-dev

#### 插件

插件是 Rollup 的唯一的扩展方式。

rollup-plugin-css-only：加载css插件。

rollup/plugin-json：加载json文件插件。

rollup/plugin-node-resolve：加载npm模块插件。

rollup/plugin-commonjs：加载CommonJS 模块。

#### 动态导入

Parcel使用动态导入，内部也会自动处理代码拆分。

```javascript
import('').then(() => {
  ......        
})
```
注：动态导入时，output不能配置file，而是要配置dir，设置值为dist。选择amd或者system格式输出，因为只有amd和system两种格式打包的结果适合于浏览器环境。但是amd标准在浏览器中也不是直接支持的，还得需要一个支持这个标准库(Require.js)来加载这些输出的模块。

```javascript
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

//const formats = ['es', 'amd', 'cjs', 'iife', 'umd', 'system'];
//export default formats.map(format => ({
  //input: 'src/index.js',
  //output: {
    //file: `dist/bundle.${format}.js`,
    //format //主要是适配运行在不同的环境
  //},
  //plugins: [
    //css({output: 'bundle.css'}),
  //],
//}))
```

#### Rollup优缺点

优点  

1. 输出结果更加扁平，执行效率更高；  
2. 自动移除未引用代码；  
3. 打包结果依然完全可读；  

缺点  
1. 加载非 ESM 的第三方模块比较复杂；  
2. 因为模块最终都被打包到全局中，所以无法实现 HMR；  
3. 浏览器环境中，代码拆分功能必须使用 Require.js 这样的 AMD 库；

一般的选择是：应用开发使用Webpack，类库或者框架开发使用Rollup。 		

### Parcel

Parcel是一款完全零配置的前端打包器，"傻瓜式"的使用体验。

#### Parcel安装

npm install parcel-bundler --save-dev

#### 入口(entry)

支持以任意类型文件作为打包入口，但是官方还是建议我们使用HTML文件作为入口。官方的理由是HTML是应用在浏览器端运行时的入口。

#### 执行打包命令

执行打包命令后，还同时开启了一个开发服务器，和Webpack Dev Server一样。也支持自动刷新。

Parcel的构建速度会比Webpack快很多。因为Parcel内部使用的是多进程同时工作，充分发挥了多核CPU的性能。Webpack中也可以使用一个叫作happypack的插件实现。

```javascript
//package.json
{
  ......
  "scripts": {
    "start": "parcel index.html",			//测试环境打包
    "build": "parcel build index.html"		//正式环境打包
  },
  ......
}
```
#### 模块热

当前模块更新或者所依赖的模块更新过后自动执行传入的回调函数。

```javascript
if (module.hot) {
  module.hot.accept(() => {
    ......
    console.log('HMR～')
  })
}
```
#### 自动安装依赖

Parcel当需要其他模块时，在引入时会自动安装。

#### 其他类型资源加载

Parcel加载其他类型的资源模块同样是零配置的。

#### 动态导入

Parcel使用动态导入，内部也会自动处理代码拆分。

```javascript
import('').then(() => {
  ......
})
```
### Parcel优点

1. 真正做到了完全零配置，对项目没有任何的侵入；
2. 自动安装依赖，开发过程更专注；
3. 构建速度更快，因为内部使用了多进程同时工作，能够充分发挥多核 CPU 的效率；

webpack-optimize：webpack简单使用

webpack-custom-loader：webpack自定义loader

webpack-custom-plugin：webpack自定义plugin

parcel-demo：parcel简单使用 

rollup-demo：rollup简单使用

webpack-react-startup：基于webpack创建react项目