/**
 * Created by huhaibin on 2020/5/15.
 */
import {combineReducers} from 'redux';
import counterReducer from '../../containers/counterSlice';

const reducers = combineReducers({
    counter: counterReducer,
});

export default reducers;