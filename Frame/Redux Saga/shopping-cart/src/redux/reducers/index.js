import {combineReducers} from 'redux';
import productReducer, {getProduct} from './productReducer';
import cartReducer, {getAddedIds, getQuantity} from './cartReducer';

const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
})

export function getCartProducts(state) {
    return getAddedIds(state.cart).map(id => ({
        ...getProduct(state.product, id),
        quantity: getQuantity(state.cart, id),
    }))
}

export function getTotal(state) {
    return getAddedIds(state.cart)
        .reduce((total, id) => total + getProduct(state.product, id).price * getQuantity(state.cart, id), 0)
        .toFixed(2);
}

export function getCart(state) {
    return state.cart;
}

export default rootReducer;