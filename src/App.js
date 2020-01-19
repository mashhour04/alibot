import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Provider } from "react-redux";
import { toastr } from "react-redux-toastr";
import ReduxToastr from "react-redux-toastr";

import { store } from "./_helpers";

import CustomerBooking from "./_views/CustomerBooking/CustomerBooking";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import PerfectScrollbar from "react-perfect-scrollbar";


// import PrivateRoute from 'react-private-route'

import { Switch, BrowserRouter } from "react-router-dom";

import "./_assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "./_routes/index.jsx";

import "./App.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { HomePage } from "./HomePage/HomePage";
// with only buildpack

class App extends Component {
  getComponent = () => {
    const isAuthenticated = localStorage.getItem("user");
    return isAuthenticated ? HomePage : LoginPage;
  };

  render() {
    const isAuthenticated = localStorage.getItem("user");

    const client = window.verifyToken();
    const session = client ? client.session : {};
    const vendor = session.vendor;
    if (alert.message) {
      toastr.error(alert.message);
    }
    return (
      <Provider store={store}>
        <PerfectScrollbar>
          <BrowserRouter>
            <Switch>
              {/* <PublicRoute exact path="/register" component={RegisterPage} />
                <PublicRoute exact path="/login" component={LoginPage} /> */}

              <Route
                exact
                path="/register"
                component={isAuthenticated ? HomePage : RegisterPage}
              />
              <Route
                exact
                path="/login"
                component={isAuthenticated ? HomePage : LoginPage}
              />

              <Route
                exact
                path="/book"
                component={(client && vendor) ? CustomerBooking : LoginPage }
                
              />
              {/* render={props =>
                    localStorage.getItem("user") ? (
                      <Redirect to={{ pathname: "/" }} />
                    ) : (
                      <Component {...props} />
                    )
                  }
                /> */}
              {indexRoutes.map((prop, key) => (
                <Route
                  path={prop.path}
                  component={isAuthenticated ? prop.component : LoginPage}
                  key={key}
                  isAuthenticated={isAuthenticated}
                />
              ))}
              <Route
                path="*"
                component={isAuthenticated ? HomePage : LoginPage}
              />
            </Switch>
          </BrowserRouter>

          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-left"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
        </PerfectScrollbar>
      </Provider>
    );
  }
}

export default App;
