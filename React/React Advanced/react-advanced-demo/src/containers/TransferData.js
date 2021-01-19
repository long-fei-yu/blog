import React from 'react';
import A from '../components/A';
import B from '../components/B';
import myEventEmitter from '../util/myEventEmitter';

global.eventEmitter = new myEventEmitter();

export default function App() {
    return (
        <div className="App">
            <B/>
            <A/>
        </div>
    );
}