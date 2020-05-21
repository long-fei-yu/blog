/**
 * Created by huhaibin on 2020/4/27.
 */
import React from 'react';
import {connect} from 'react-redux';
import TodoList from '../components/TodoList';
import {toggleTodo} from '../redux/actions';

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
    toggleTodo: id => dispatch(toggleTodo(id)),
});

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);

export default VisibleTodoList;