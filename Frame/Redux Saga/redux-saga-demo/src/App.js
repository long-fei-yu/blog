import React from 'react';
import {connect} from 'react-redux';
import * as actionTypes from './redux/actions';

function App({counter, countdown, dispatch}) {
    const action = (type, value) => () => dispatch({type, value})

    return (
        <div>
            Clicked: {counter} times
            <button onClick={action(actionTypes.INCREMENT)}>+</button>{' '}
            <button onClick={action(actionTypes.DECREMENT)}>-</button>
            {' '}
            <button onClick={action(actionTypes.INCREMENT_IF_ODD)}>Increment after 1 second</button>
            {' '}
            <button
                onClick={countdown ? action(actionTypes.CANCEL_INCREMENT_ASYNC) : action(actionTypes.INCREMENT_ASYNC, 5)}
                style={{color: countdown ? 'red' : 'black'}}>
                {countdown ? `Cancel increment (${countdown})` : 'increment after 5s'}
            </button>
        </div>
    );
}

const mapStateToProps = ({countdown, counter}) => ({
    counter,
    countdown,
});

export default connect(mapStateToProps)(App);