import {combineReducers} from 'redux';
import * as actions from '../actions';

const initialState = {
    checkoutStatus: {
        checkoutPending: false,
        error: null,
    },
    quantityById: {},
}

function quantityById(state = initialState.quantityById, action) {
    const {productId} = action
    switch (action.type) {
        case actions.CHECKOUT_SUCCESS:
            return initialState.quantityById;
        case actions.ADD_TO_CART:
            return {...state, [productId]: (state[productId] || 0) + 1};
        case actions.REMOVE_FROM_CART:
            const qty = (state[productId] || 0) - 1;
            const copy = {...state};
            if (qty > 0) {
                copy[productId] = qty;
            } else {
                delete copy[productId];
            }
            return copy;
        default:
            return state;
    }
}

function checkoutStatus(state = initialState.checkoutStatus, action) {
    switch (action.type) {
        case actions.CHECKOUT_REQUEST:
            return {checkoutPending: true, error: null};
        case actions.CHECKOUT_SUCCESS:
            return initialState.checkoutStatus;
        case actions.CHECKOUT_FAILURE:
            return {checkoutPending: false, error: action.error};
        default:
            return state
    }
}

export default combineReducers({
    checkoutStatus,
    quantityById,
})

export function getAddedIds(state) {
    return Object.keys(state.quantityById);
}

export function getQuantity(state, productId) {
    return state.quantityById[productId] || 0;
}

//product对象
/*[
    {id: 1, title: 'iPad 4 Mini', price: 500.01, inventory: 2},
    {id: 2, title: 'H&M T-Shirt White', price: 10.99, inventory: 10},
    {id: 3, title: 'Charli XCX - Sucker CD', price: 19.99, inventory: 5},
]*/

//state对象
/*{
    checkoutStatus: {
        checkoutPending: false,
        error: null,
    },
    quantityById: {
        1: 1,
        2: 2,
        3: 1,
    },
}*/
