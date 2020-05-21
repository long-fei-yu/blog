/**
 * Created by huhaibin on 2020/4/27.
 */
import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({onClick, completed, text}) => (
    <li
        onClick={onClick}
        style={{textDecoration: completed ? 'line-through' : 'none'}}>
        {text}
    </li>
);

Todo.protoTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
};

export default Todo;