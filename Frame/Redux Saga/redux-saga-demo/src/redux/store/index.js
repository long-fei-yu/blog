import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import takeTest from '../sagas/take_test';
import cancellableCounter from '../sagas/cancellable_counter';
import cancellableCounterAdvanced from '../sagas/cancellable_counter_advanced';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga);
//sagaMiddleware.run(takeTest);
//sagaMiddleware.run(cancellableCounter);
sagaMiddleware.run(cancellableCounterAdvanced);

export default store;

