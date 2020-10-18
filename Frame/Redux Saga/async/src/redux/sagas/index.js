import {take, put, call, fork, select} from 'redux-saga/effects';
import * as actions from '../actions';

export function fetchPostsApi(reddit) {
    return fetch(`https://www.reddit.com/r/${reddit}.json`)
        .then(response => response.json())
        .then(json => json.data.children.map(child => child.data))
}

export function* fetchPosts(reddit) {
    yield put(actions.requestPosts(reddit));
    const posts = yield call(fetchPostsApi, reddit);
    yield put(actions.receivePosts(reddit, posts));
}

export function* invalidateReddit() {
    while (true) {
        const {reddit} = yield take(actions.INVALIDATE_REDDIT);
        yield fork(fetchPosts, reddit);
    }
}

export function* nextRedditChange() {
    while (true) {
        const prevReddit = yield select(state => state.selectedReddit);
        yield take(actions.SELECT_REDDIT);
        const newReddit = yield select(state => state.selectedReddit);
        const postsByReddit = yield select(state => state.postsByReddit);
        if (prevReddit !== newReddit && !postsByReddit[newReddit]) {
            yield fork(fetchPosts, newReddit);
        }
    }
}

export function* startup() {
    const selectedReddit = yield select(state => state.selectedReddit);
    yield fork(fetchPosts, selectedReddit);
}

export default function* root() {
    yield fork(startup);
    yield fork(nextRedditChange);
    yield fork(invalidateReddit);
}
