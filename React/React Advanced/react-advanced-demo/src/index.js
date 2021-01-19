import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LifeCycleContainer from './containers/LifeCycleContainer';
import TransferData from './containers/TransferData';
import PersonalInfoComponent from './containers/PersonalInfoComponent';
import StateOperation from './containers/StateOperation';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <LifeCycleContainer/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
