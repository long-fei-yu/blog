import {all, call, take, takeEvery, select} from 'redux-saga/effects';

export function* logger(action) {
    const state = yield select()
    console.log('action', action)
    console.log('state after', state)
}

function* watchAndLog() {
    yield takeEvery('*', logger)
}

function* watchAndLogTake() {
    while (true) {
        const action = yield take('*');
        const state = yield select();
        console.log('action', action)
        console.log('state after', state)
    }
}

export default function* takeTest() {
    yield all([
        call(watchAndLog),
        call(watchAndLogTake),
    ])
}