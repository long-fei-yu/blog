import {fork, all, call, put, take, select} from 'redux-saga/effects';
import {api} from '../../services';
import * as actions from '../actions';
import {getCart} from '../reducers';

export function* getAllProducts() {
    //call的参数可以是Generator函数, 也可以是一个返回Promise或任意其它值的普通函数
    const products = yield call(api.getProducts);
    yield put(actions.receiveProducts(products));
}

export function* checkout() {
    try {
        const cart = yield select(getCart);
        yield call(api.buyProducts, cart);
        yield put(actions.checkoutSuccess(cart));
    } catch (error) {
        yield put(actions.checkoutFailure(error));
    }
}

export function* watchCheckout() {
    while (true) {
        yield take(actions.CHECKOUT_REQUEST);
        yield call(checkout);
    }
}

export default function* root() {
    yield all([fork(getAllProducts), fork(watchCheckout)]);
}