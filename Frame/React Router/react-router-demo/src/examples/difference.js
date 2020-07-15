import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

export default function DifferenceExample() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/dashboard'>Dashboard</Link>
                    </li>
                </ul>
                <hr/>

                <Route exact path='/' component={Home}/>
                <Route path='/about' render={({history, location, match}) => {
                    console.log('difference', 'render', history, location, match);
                    return (
                        <div>
                            <h2>About</h2>
                        </div>
                    )
                }}>
                </Route>
                <Route path='/dashboard' children={({history, location, match}) => {
                    console.log('difference', 'children', history, location, match);
                    if (match) {
                        return (
                            <div>
                                <h2>Dashboard</h2>
                            </div>
                        )
                    }
                    return (
                        <div>
                            <h2>没有匹配成功</h2>
                        </div>
                    )
                }}>
                </Route>

            </div>
        </Router>
    );
}

function Home() {
    return (
        <div>
            <h2>Home</h2>
        </div>
    );
}