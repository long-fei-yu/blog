import {call, take, fork, race, put, delay, select} from 'redux-saga/effects';
import * as actionTypes from '../actions';

export function* incrementAsync({value}) {
    try {
        yield put({type: actionTypes.INCREMENT_ASYNC, value});

        while (true) {
            const {countdown} = yield select();
            if (countdown <= 0) {
                return;
            }
            console.log('incrementAsync', countdown);
            yield delay(1000);
            yield put({type: actionTypes.DECREMENT_INCREMENT_ASYNC});
        }
    } finally {
        console.log('incrementAsync finally');
    }
}

export function* watchIncrementAsync() {
    try {
        while (true) {
            const action = yield take(actionTypes.INCREMENT_ASYNC);
            yield race([call(incrementAsync, action), take(actionTypes.CANCEL_INCREMENT_ASYNC)]);
        }
    } finally {
        console.log('watchIncrementAsync terminated')
    }
}

export default function* cancellableCounterAdvanced() {
    yield fork(watchIncrementAsync);
}