import './index.css';
import index from './index.md';

const h2Element = () => {
    console.log('index', index);
    const element = document.createElement('h2');
    element.innerHTML = index;
    return element;
}
document.body.append(h2Element());


