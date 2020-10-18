import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';
import {connect} from 'react-redux';
import {addToCart} from '../redux/actions';
import {getVisibleProducts} from '../redux/reducers/productReducer';

class ProductList extends Component {
    render() {
        const {products, addToCart} = this.props;

        return (
            <div>
                <h3>Products</h3>
                {products.map(product => (
                    <ProductItem key={product.id} product={product} onAddToCartClicked={() => addToCart(product.id)}/>
                ))}
            </div>
        )
    }
}

ProductList.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            inventory: PropTypes.number.isRequired,
        }),
    ).isRequired,
    addToCart: PropTypes.func.isRequired,
}

const mapStateToProps = ({product}) => ({
    products: getVisibleProducts(product),
})

const mapDispatchToProps = (dispatch) => ({
    addToCart: productId => dispatch(addToCart(productId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)