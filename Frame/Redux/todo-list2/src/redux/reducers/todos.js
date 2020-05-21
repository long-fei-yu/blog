/**
 * Created by huhaibin on 2020/4/28.
 */
import * as Action from '../actions';

const todos = (status = [], action) => {

    switch (action.type) {
        case Action.ADD_TODO:
            return [
                ...status,
                {
                    id: action.id,
                    text: action.text,
                    completed: false,
                }
            ];
        case Action.TOGGLE_TODO:
            return status.map(todo =>
                todo.id === action.id ? {...todo, completed: !todo.completed} : todo
            );
        default:
            return status
    }
};

export default todos;