import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import ReduxToastr from 'react-redux-toastr';

import { history, store } from './_helpers';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

import { PrivateRoute } from './components/PrivateRoute';

// import { Switch } from "react-router-dom";

import "./_assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "./_routes/index.jsx";

import './App.css';
// with only buildpack


class App extends Component {

  render() {
    if (alert.message) {
      toastr.error(alert.message);
    }
    return (
      <Provider store={store}>
        <div heigh="100%">
          <Router history={history}>
            <div heigh="100%">
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login"  component={LoginPage} />
              {indexRoutes.map((prop, key) => <PrivateRoute exact path={prop.path} component={prop.component} key={key} />)}
              {/* <PrivateRoute path="/" component={HomePage} /> */}
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
        </div>
      </Provider>

    );
  }
}

export default App;
