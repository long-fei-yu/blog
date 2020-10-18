import {call, take, fork, race, put, cancelled} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';
import * as actionTypes from '../actions';

const action = type => ({type})

export const countdown = secs => {
    console.log('countdown start', secs);
    return eventChannel(listener => {
        const iv = setInterval(() => {
            secs -= 1;
            console.log('countdown interval', secs);
            if (secs > 0) {
                listener(secs);
            } else {
                listener(END);
                clearInterval(iv);
                console.log('countdown terminated');
            }
        }, 1000);

        return () => {
            clearInterval(iv);
            console.log('countdown cancelled');
        }
    })
}

export function* incrementAsync({value}) {
    const chan = yield call(countdown, value);
    try {
        while (true) {
            let seconds = yield take(chan);
            yield put({type: actionTypes.INCREMENT_ASYNC, value: seconds});
        }
    } finally {
        console.log('incrementAsync finally');
        if (!(yield cancelled())) {
            console.log('incrementAsync cancelled');
            yield put(action(actionTypes.INCREMENT));
            yield put(action(actionTypes.COUNTDOWN_TERMINATED));
        }
        chan.close();
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

export default function* cancellableCounter() {
    yield fork(watchIncrementAsync);
}