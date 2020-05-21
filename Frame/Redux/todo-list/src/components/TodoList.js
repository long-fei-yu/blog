/**
 * Created by huhaibin on 2020/4/27.
 */
import React from 'react';
import Todo from './Todo';
import PropTypes from 'prop-types';

const TodoList = ({todos, toggleTodo}) => (
    <ul>
        {
            todos.map(todo => (
                <Todo key={todo.id} onClick={() => toggleTodo(todo.id)} {...todo}/>
            ))
        }
    </ul>
);

TodoList.protoTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    onTodoClick: PropTypes.func.isRequired,
};

export default TodoList;