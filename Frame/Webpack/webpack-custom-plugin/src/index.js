import './index.css';

const createElement = () => {
    const element = document.createElement('h2');
    element.textContent = 'Hello World Webpack Plugin';
    return element;
}
document.body.append(createElement());


