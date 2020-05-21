/**
 * Created by huhaibin on 2020/5/7.
 */
import {combineReducers} from 'redux';
import {SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS} from '../actions';

function selectedSubreddit(state = 'reactjs', action) {
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit;
        default:
            return state
    }
}

/**
 * @param state
 * @param action
 * @returns {*}
 *
 * isFetching 显示进度条
 * didInvalidate 标记数据是否过期
 * lastUpdated 存放数据最后更新时间
 * items 列表数据
 */
function posts(state = {isFetching: false, didInvalidate: false, items: []}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

function postsBySubreddit(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.subreddit]: posts(state[action.subreddit], action)
            });
        default:
            return state
    }
}

const reducers = combineReducers({
    selectedSubreddit,
    postsBySubreddit,
});

export default reducers;


/**
 * state结构
 *
 {
    selectedSubreddit: 'frontend',
    postsBySubreddit: {
        frontend: {
            isFetching: true,
            didInvalidate: false,
            lastUpdated: 1439478405547,
            items: [{title:''}],
        },
        reactjs: {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: 1439478405547,
            items: [{title:''}],
        }
    }
}
 *
 */
