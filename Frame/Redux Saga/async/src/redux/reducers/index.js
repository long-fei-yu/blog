import {combineReducers} from 'redux';
import * as actions from '../actions';

function posts(state = {isFetching: false, items: []}, action) {
    switch (action.type) {
        case actions.REQUEST_POSTS:
            return {...state, isFetching: true};
        case actions.RECEIVE_POSTS:
            return {...state, isFetching: false, items: action.posts, lastUpdated: action.receivedAt};
        default:
            return state;
    }
}

function selectedReddit(state = 'reactjs', action) {
    switch (action.type) {
        case actions.SELECT_REDDIT:
            return action.reddit;
        default:
            return state;
    }
}

function postsByReddit(state = {}, action) {
    switch (action.type) {
        case actions.REQUEST_POSTS:
        case actions.RECEIVE_POSTS:
            return {...state, [action.reddit]: posts(state[action.reddit], action)};
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    postsByReddit,
    selectedReddit,
})

export default rootReducer;

//state数据
// {
//     postsByReddit: {
//         reactjs: {
//             isFetching: false,
//             items: [],
//             lastUpdated: '1606986258000',
//         },
//         frontend: {
//             isFetching: false,
//             items: [],
//             lastUpdated: '1606986250000',
//         }
//     },
//     selectedReddit: 'reactjs',
// }
