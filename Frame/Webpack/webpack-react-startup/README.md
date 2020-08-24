### 基于Webpack 5来创建一个React项目

#### 初始化

yarn init -y

#### 安装依赖包

##### 安装react
yarn add react react-dom

##### 安装 webpack
yarn add webpack webpack-cli webpack-dev-server --dev

webpack-cli:命令行工具,webpack的编译器

webpack-dev-server:是基于express的开发服务器

##### 安装插件
会生成一个html文件，自动引入了webpack的bundle文件

yarn add html-webpack-plugin --dev

支持引入css文件 

yarn add style-loader css-loader --dev

清理dist文件夹 

yarn add clean-webpack-plugin --dev