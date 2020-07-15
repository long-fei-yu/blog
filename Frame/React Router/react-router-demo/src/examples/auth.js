import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation} from 'react-router-dom';

export default function AuthExample() {
    return (
        <Router keyLength={9} forceRefresh>
            <div>
                <AuthButton/>

                <ul>
                    <li>
                        <Link to='/public'>Public Page</Link>
                    </li>
                    <li>
                        <Link to='/protected'>Protected Page</Link>
                    </li>
                </ul>

                <Switch>
                    <Route path='/public'>
                        <PublicPage/>
                    </Route>
                    <Route path='/login'>
                        <LoginPage/>
                    </Route>
                    <PrivateRoute path='/protected'>
                        <ProtectedPage/>
                    </PrivateRoute>
                </Switch>
            </div>
        </Router>
    );
}

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        fakeAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        fakeAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

function AuthButton() {
    let history = useHistory();
    console.log('fakeAuth.isAuthenticated', fakeAuth.isAuthenticated);

    return fakeAuth.isAuthenticated ? (
        <p>
            Welcome!{' '}
            <button
                onClick={() => {
                    fakeAuth.signout(() => history.push('/'));
                }}
            >
                Sign out
            </button>
        </p>
    ) : (
        <p>You are not logged in.</p>
    );
}

function PrivateRoute({children, ...rest}) {
    return (
        <Route
            {...rest}
            render={({location}) =>
                fakeAuth.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

function PublicPage() {
    return <h3>Public</h3>;
}

function ProtectedPage() {
    return <h3>Protected</h3>;
}

function LoginPage() {
    let history = useHistory();
    let location = useLocation();

    let {from} = location.state || {from: {pathname: '/'}};
    let login = () => {
        fakeAuth.authenticate(() => {
            history.replace(from);
        });
    };

    return (
        <div>
            <p>You must log in to view the page at {from.pathname}</p>
            <button onClick={login}>Log in</button>
        </div>
    );
}
