import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import Home from './routes/home';
import Products from './routes/products';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/products' exact component={Products}></Route>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
