import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Greeter} from './decorator';

function App() {

    function onAllClick() {
        let mGreeter: Greeter = new Greeter('hello');
        mGreeter.greet('lfy');
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p onClick={() => onAllClick()}>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
