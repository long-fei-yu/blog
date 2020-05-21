/**
 * Created by huhaibin on 2020/5/7.
 */
import {configureStore} from '@reduxjs/toolkit';
import reducers from '../reducers';

export default configureStore({
    reducer: reducers,
});
