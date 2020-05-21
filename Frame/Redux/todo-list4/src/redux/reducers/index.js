/**
 * Created by huhaibin on 2020/4/28.
 */
import {combineReducers} from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const reducers = combineReducers({
    todos,
    visibilityFilter,
});

/**
 * combineReducers等价于
 *
 * todos:todos(state.todos,action),
 * visibilityFilter:visibilityFilter(state.visibilityFilter,action),
 *
 */

export default reducers;