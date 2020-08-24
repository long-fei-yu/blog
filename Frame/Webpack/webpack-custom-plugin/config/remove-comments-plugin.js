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