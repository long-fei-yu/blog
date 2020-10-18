import {combineReducers} from 'redux';
import * as actions from '../actions';

function products(state, action) {
    switch (action.type) {
        case actions.ADD_TO_CART:
            return {
                ...state,
                inventory: state.inventory - 1,
            };
        case actions.REMOVE_FROM_CART:
            return {
                ...state,
                inventory: state.inventory + 1,
            };
        default:
            return state;
    }
}

function byId(state = {}, action) {
    switch (action.type) {
        case actions.RECEIVE_PRODUCTS:
            return {
                ...state,
                ...action.products.reduce((obj, product) => {
                    obj[product.id] = product;
                    return obj;
                }, {}),
            };
        default:
            const {productId} = action;
            if (productId) {
                return {
                    ...state,
                    [productId]: products(state[productId], action),
                }
            }
            return state;
    }
}

function visibleIds(state = [], action) {
    switch (action.type) {
        case actions.RECEIVE_PRODUCTS:
            return action.products.map(product => product.id);
        default:
            return state;
    }
}

export default combineReducers({
    byId,
    visibleIds,
})

export function getProduct(state, id) {
    return state.byId[id]
}

export function getVisibleProducts(state) {
    return state.visibleIds.map(id => getProduct(state, id));
}

//product对象
/*[
    {id: 1, title: 'iPad 4 Mini', price: 500.01, inventory: 2},
    {id: 2, title: 'H&M T-Shirt White', price: 10.99, inventory: 10},
    {id: 3, title: 'Charli XCX - Sucker CD', price: 19.99, inventory: 5},
]*/

//state对象
/*{
    byId: {
        1: {id: 1, title: 'iPad 4 Mini', price: 500.01, inventory: 2},
        2: {id: 2, title: 'H&M T-Shirt White', price: 10.99, inventory: 10},
        3: {id: 3, title: 'Charli XCX - Sucker CD', price: 19.99, inventory: 5},
    },
    visibleIds: [1, 2, 3, 4]
}*/
