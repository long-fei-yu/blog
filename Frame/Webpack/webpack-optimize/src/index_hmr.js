import {createElementInput} from './page/elementInput';

const input = createElementInput();
document.body.append(input);

let lastInput = input;
if (module.hot) {
    module.hot.accept('./page/elementInput', () => {
        const value = lastInput.value;
        document.body.removeChild(lastInput);
        lastInput = createElementInput();
        lastInput.value = value;
        document.body.append(lastInput);

        //undefined.foo();
    })
}