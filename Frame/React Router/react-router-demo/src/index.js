import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import BasicExample from './examples/basic';
import ParamsExample from './examples/params';
import AuthExample from './examples/auth';
import RouteConfigExample from './examples/routeConfig';
import QueryParamsExample from './examples/queryParams';
import DifferenceExample from './examples/difference';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <React.StrictMode>
        <DifferenceExample/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
