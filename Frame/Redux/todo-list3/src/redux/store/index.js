/**
 * Created by huhaibin on 2020/5/7.
 */

import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(preloadedState) {
    return createStore(
        reducers,
        preloadedState,
        applyMiddleware(thunkMiddleware)
    )
};
