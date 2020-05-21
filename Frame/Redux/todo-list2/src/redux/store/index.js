/**
 * Created by huhaibin on 2020/4/28.
 */
import {createStore} from 'redux';
import reducers from '../reducers';

const store = createStore(reducers);

export default store;