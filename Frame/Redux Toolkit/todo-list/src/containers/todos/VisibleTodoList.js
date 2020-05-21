/**
 * Created by huhaibin on 2020/4/27.
 */
import React from 'react';
import {connect} from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';
import TodoList from '../../components/TodoList';
import {toggleTodo} from './todosSlice';

const selectTodos = state => state.todos;
const selectFilter = state => state.visibilityFilter;

const selectVisibleTodos = createSelector([selectTodos, selectFilter], (todos, filter) => {
    switch (filter) {
        case'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
        case'SHOW_ALL':
        default:
            return todos;
    }
});

const mapStateToProps = state => ({
    todos: selectVisibleTodos(state),
});

const mapDispatchToProps = {toggleTodo};

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);

export default VisibleTodoList;