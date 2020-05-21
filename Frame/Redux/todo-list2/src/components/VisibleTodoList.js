/**
 * Created by huhaibin on 2020/4/28.
 */

import React from 'react';
import {connect} from 'react-redux';
import {toggleTodo} from '../redux/actions';

const VisibleTodoList = ({todos, toggleTodo}) => {

    return (
        <ul>
            {todos.map(todo => (
                <li
                    key={todo.id}
                    onClick={() => toggleTodo(todo.id)}
                    style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
                    {todo.text}
                </li>
            ))}
        </ul>
    )
};

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        case'SHOW_ALL':
        default:
            return todos;
    }
};

const mapStateToProps = state => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
});

const mapDispatchToProps = dispatch => ({
    toggleTodo: (id) => dispatch(toggleTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VisibleTodoList);