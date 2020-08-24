import './main.css';

export const createElementText = () => {
    let element = document.createElement('h2');
    element.textContent = 'Hello World Parcel';
    return element;
}