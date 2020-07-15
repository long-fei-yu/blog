import React from 'react';
import {HashRouter as Router, Route, Link, Redirect, Switch} from './react-router-dom';
import Home from './page/home';
import User from './page/user';
import Profile from './page/profile';
import More from './page/more';

function App() {
    return (
        <Router>
            <div>
                <ul>
                    <li><Link to='/home'>home</Link></li>
                    <li><Link to='/user'>User</Link></li>
                    <li><Link to='/profile'>ProFile</Link></li>
                    <li><Link to='/more'>More</Link></li>
                </ul>

                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/user' component={User}/>
                    <Route path='/profile' component={Profile}/>
                    <Route path='/more' component={More}/>
                    <Redirect to='/home'/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
