import _ from 'lodash';
import './style.css';
import Logo from './logo.svg';
import printMe from './print';

function component() {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], '');
    element.classList.add('hello');

    const btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);

    const myIcon = new Image();
    myIcon.src = Logo;
    element.appendChild(myIcon);

    return element;
}

document.body.appendChild(component());