console.log('Button component~');// 副作用代码

export default () => {
    let element = document.createElement('button');
    element.textContent = 'Hello World webpack';
    return element;
}