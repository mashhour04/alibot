import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from 'redux-devtools';
import rootReducer from '../_reducers';
const initialState = {};

const middlware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlware)
));

export default store