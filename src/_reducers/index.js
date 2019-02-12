import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { profile } from './user.reducer';
import { combineReducers } from 'redux';
import { seats } from './seats.reducer';
import { sideBar } from './navigation.reducer';
import { register } from './register.reducer';
import { vendor, tables, movies } from './vendor.reducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
export default combineReducers({ authentication, alert, profile, seats, sideBar, register, toastr: toastrReducer, vendor, tables, movies })