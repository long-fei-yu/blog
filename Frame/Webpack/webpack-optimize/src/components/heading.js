console.log('Heading component~');// 副作用代码

export default () => {
    let element = document.createElement('button');
    element.textContent = 'page heading';
    return element;
}