/**
 * Created by huhaibin on 2020/4/26.
 */
import todos from './todos';
import visibilityFilter from './visibilityFilter';

const reducers = (state = {todos: [], visibilityFilter: 'SHOW_ALL'}, action) => {
    return {
        todos: todos(state.todos, action),
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    }
};

export default reducers;