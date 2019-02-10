import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const safe = ['/register', '/login'];
const checkAuth = (rest) => {
    console.log('the rest', rest);
    const { path } = rest;
    const isLogged = localStorage.getItem('user');
    console.log('safe inclusion', safe.includes(path), 'path', path);
    return isLogged || safe.includes(path);
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkAuth(rest)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login' }} />
    )} />
)

export const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Redirect to={{ pathname: '/' }} />
            : <Component {...props} />
    )} />
)

