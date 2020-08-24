import {createElementText} from './main';
import {createElementInput} from './mine';

document.body.append(createElementText());
document.body.append(createElementInput());

// if (1 < 0) {
//     import('./main').then(({createElementText}) => {
//         document.body.append(createElementText());
//     })
// } else {
//     import('./mine').then(({createElementInput}) => {
//         document.body.append(createElementInput());
//     })
// }

if (module.hot) {
    //当前模块更新或者所依赖的模块更新过后自动执行
    module.hot.accept(() => {
        console.log('hot', 'HMR～');
    })
}