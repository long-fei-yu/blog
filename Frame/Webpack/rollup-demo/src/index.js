// import {createElementText} from './main';
// import {createElementInput} from './mine';
import {name, version} from '../package.json';
import {camelCase} from 'lodash-es';

console.log(name, version);

console.log(camelCase('hello rollup'));

// document.body.append(createElementText());
// document.body.append(createElementInput());

if (1 < 0) {
    import('./main').then(({createElementText}) => {
        document.body.append(createElementText());
    })
} else {
    import('./mine').then(({createElementInput}) => {
        document.body.append(createElementInput());
    })
}