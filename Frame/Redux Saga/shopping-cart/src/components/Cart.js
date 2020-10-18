import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CartItem from './CartItem';
import {connect} from 'react-redux';
import {getCartProducts, getTotal} from '../redux/reducers';
import {removeFromCart, checkout} from '../redux/actions';

class Cart extends Component {
    render() {
        const {products, total, error, checkoutPending, checkout, removeFromCart} = this.props;

        const hasProducts = products.length > 0;
        const checkoutAllowed = hasProducts && !checkoutPending;

        const nodes = !hasProducts ? (
            <em>Please add some products to cart.</em>
        ) : (
            products.map(product => (
                <CartItem
                    title={product.title}
                    price={product.price}
                    quantity={product.quantity}
                    key={product.id}
                    onRemove={() => removeFromCart(product.id)}/>
            ))
        )

        return (
            <div>
                <h3>Your Cart</h3>
                <div>{nodes}</div>
                <p>Total: &#36;{total}</p>
                <button onClick={checkout} disabled={checkoutAllowed ? '' : 'disabled'}>
                    Checkout
                </button>
                <div style={{color: 'red'}}>{error}</div>
            </div>
        )
    }
}

Cart.propTypes = {
    // data
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
        }),
    ).isRequired,
    total: PropTypes.string,
    error: PropTypes.string,
    checkoutPending: PropTypes.bool,

    // actions
    checkout: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    products: getCartProducts(state),
    total: getTotal(state),
    error: state.cart.checkoutStatus.error,
    checkoutPending: state.cart.checkoutStatus.checkoutPending,
})

const mapDispatchToProps = (dispatch) => ({
    checkout: productId => dispatch(checkout(productId)),
    removeFromCart: productId => dispatch(removeFromCart(productId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)