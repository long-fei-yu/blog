/**
 * Created by huhaibin on 2020/4/26.
 */
import {createStore} from 'redux';
import reducers from '../reducers'

const store = createStore(reducers);

export default store;