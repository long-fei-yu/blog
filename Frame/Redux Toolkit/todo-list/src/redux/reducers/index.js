/**
 * Created by huhaibin on 2020/5/14.
 */

import {combineReducers} from 'redux';
import todosReducer from '../../containers/todos/todosSlice';
import visibilityFilterReducer from '../../containers/filters/filtersSlice';

const reducers = combineReducers({
    todos: todosReducer,
    visibilityFilter: visibilityFilterReducer,
});

export default reducers;
