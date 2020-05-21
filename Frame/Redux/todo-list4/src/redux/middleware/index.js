/**
 * Created by huhaibin on 2020/5/8.
 */

/**
 * 自定义中间件
 * @param store
 */
const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
};

export {logger};