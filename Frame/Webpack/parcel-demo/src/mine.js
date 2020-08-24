import './mine.css';

export const createElementInput = () => {
    let element = document.createElement('input');
    element.value = 'Hello World Parcel';
    return element;
}