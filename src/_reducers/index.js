import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { profile } from './user.reducer';
import { combineReducers } from 'redux';
import { seats } from './seats.reducer';
import { sideBar } from './navigation.reducer';
import { register } from './register.reducer';
import { vendor, tables, movies, bookings, analytics, pastBookings, availableTables } from './vendor.reducer';
import { addBooking } from './bookings.reducer';
import { deals } from './deals.reducers';


import { reducer as toastrReducer } from 'react-redux-toastr';


export default combineReducers({ authentication, deals, alert, profile, seats, sideBar, register, toastr: toastrReducer, vendor, tables, movies, bookings, analytics, pastBookings, availableTables, addBooking })