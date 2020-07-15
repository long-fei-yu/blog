import React, {PureComponent} from 'react';
import {Route, Link, Switch} from '../react-router-dom';
import List from './list';
import Detail from './detail';


export default class More extends PureComponent {

    render() {
        return (
            <div>
                <ul>
                    <li><Link to='/more/list'>list</Link></li>
                    <li><Link to='/more/detail'>detail</Link></li>
                </ul>

                <Switch>
                    <Route path='/more/list' component={List}/>
                    <Route path='/more/detail' component={Detail}/>
                </Switch>
            </div>
        );
    }
}