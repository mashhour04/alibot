import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
// import DevTools from 'redux-devtools';
import rootReducer from '../_reducers';
const initialState = {};

const middlware = [thunk];

const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
  });
// const composeEnhancers = typeof window === 'object' &&
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//             // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
//         }) : compose;

const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlware)
));

export default store