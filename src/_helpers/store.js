import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from 'redux-devtools';
import rootReducer from '../_reducers';
const initialState = {};

const middlware = [thunk];

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store