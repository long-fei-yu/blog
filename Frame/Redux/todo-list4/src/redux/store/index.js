/**
 * Created by huhaibin on 2020/4/28.
 */

import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';
import {logger} from '../middleware';

export default function configureStore(preloadedState) {
    return createStore(
        reducers,
        preloadedState,
        applyMiddleware(logger)
    )
};