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

//方式2:将返回的值给另一个loader(html-loader)，最终的loader返回的必须是js模块代码，不能是纯字符串
module.exports = source => {
    //在编译的时候打印，不会再控制台打印
    console.log('markdown-loader', source);

    //marked库:将markdown内容转化为html
    const html = marked(source);
    return html;
}