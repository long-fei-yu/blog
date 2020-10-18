import React, {Component} from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

export default class App extends Component {
    render() {
        return (
            <div>
                <h2>Shopping Cart Example</h2>
                <hr/>
                <ProductList/>
                <hr/>
                <Cart/>
            </div>
        )
    }
}
