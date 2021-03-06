/**
 * Created by huhaibin on 2020/5/14.
 */
import {configureStore} from '@reduxjs/toolkit';
import reducers from '../reducers'

const store = configureStore({
    reducer: reducers
});

export default store;