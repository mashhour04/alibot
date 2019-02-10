import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
// JS (Webpack)
import 'react-table/react-table.css';


// Stylesheets 
import "./_assets/images/favicon.png";

import "./_assets/css/js-offcanvas.css";
import './react-bootstrap-table-all.min.css';

// Font Icons 
import "./_assets/css/fontawesome-all.css";

import './_assets/vendors/css/vendor.bundle.addons.css';
import './_assets/vendors/css/vendor.bundle.base.css';
import './_assets/css/magnific-popup.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
