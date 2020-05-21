/**
 * Created by huhaibin on 2020/5/15.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './Counter.css';
import {increment, decrement, incrementByAmount} from './counterSlice';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incrementAmount: 0,
        }
    }

    render() {
        const {incrementAmount} = this.state;
        const {increment, decrement, incrementByAmount, count} = this.props;

        return (<div>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label="Increment value"
                    onClick={() => increment()}>
                    +
                </button>
                <span className={styles.value}>{count}</span>
                <button
                    className={styles.button}
                    aria-label="Decrement value"
                    onClick={() => decrement()}>
                    -
                </button>
            </div>
            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={e => this.setState({incrementAmount: e.target.value})}/>

                <button
                    className={styles.button}
                    onClick={() =>
                        incrementByAmount(Number(incrementAmount) || 0)
                    }>
                    Add Amount
                </button>
            </div>
        </div>)
    }
}

const mapStateToProps = ({counter}) => ({
    count: counter.value,
});

const mapStateToDispatch = {increment, decrement, incrementByAmount};

export default connect(mapStateToProps, mapStateToDispatch)(Counter);