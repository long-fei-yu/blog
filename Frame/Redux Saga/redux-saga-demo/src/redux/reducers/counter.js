import * as actionTypes from '../actions';

export function counter(state = 0, action) {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return state + 1;
        case actionTypes.DECREMENT:
            return state - 1;
        default:
            return state;
    }
}

export function countdown(state = 0, action) {
    switch (action.type) {
        case actionTypes.DECREMENT_INCREMENT_ASYNC:
            return state - 1;
        case actionTypes.INCREMENT_ASYNC:
            return action.value;
        case actionTypes.COUNTDOWN_TERMINATED:
        case actionTypes.CANCEL_INCREMENT_ASYNC:
            return 0;
        default:
            return state;
    }
}