/**
 * Created by huhaibin on 2020/4/26.
 */

const todos = (status = [], action) => {

    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...status,
                {
                    id: action.id,
                    text: action.text,
                    completed: false,
                }
            ];
        case 'TOGGLE_TODO':
            return status.map(todo =>
                todo.id === action.id ? {...todo, completed: !todo.completed} : todo
            );
        default:
            return status
    }
};

export default todos;