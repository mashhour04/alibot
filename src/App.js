import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import ReduxToastr from 'react-redux-toastr';

import { history, store } from './_helpers';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { PrivateRoute, PublicRoute } from './components/PrivateRoute';
// import PrivateRoute from 'react-private-route'

// import { Switch } from "react-router-dom";

import "./_assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "./_routes/index.jsx";

import './App.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { HomePage } from './HomePage/HomePage';
// with only buildpack


class App extends Component {

  render() {
    const isAuthenticated = localStorage.getItem('user');
    if (alert.message) {
      toastr.error(alert.message);
    }
    return (
      <Provider store={store}>
        <PerfectScrollbar>
          <Router history={history}>
            <div height="100%">
            <PublicRoute exact path="/register" component={RegisterPage} />
            <PublicRoute exact path="/login"  component={LoginPage} />
              {indexRoutes.map((prop, key) => <PrivateRoute path={prop.path} component={prop.component} key={key} isAuthenticated={isAuthenticated}/>)}
             <Route component={isAuthenticated ? HomePage : LoginPage} />
            </div>
          </Router>
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-left"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick />
        </PerfectScrollbar>
      </Provider>

    );
  }
}

export default App;
