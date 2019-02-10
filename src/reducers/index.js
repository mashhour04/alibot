import { combineReducers } from 'redux';
import bookersReducer from './bookersReducer'; // This I'll add my owns

export default combineReducers({
    bookers: bookersReducer,
})