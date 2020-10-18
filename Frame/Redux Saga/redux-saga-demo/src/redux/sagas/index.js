import {all, call, put, takeEvery, delay} from 'redux-saga/effects';
import * as actionTypes from '../actions';

export function* helloSaga() {
    console.log('Hello Saga!')
}

export function* incrementAsync() {
    yield delay(1000);
    yield put({type: actionTypes.INCREMENT});
}

export function* watchIncrementAsync() {
    yield takeEvery(actionTypes.INCREMENT_IF_ODD, incrementAsync);
}

export default function* rootSaga() {
    yield all([
        call(helloSaga),
        call(watchIncrementAsync),
    ])
}