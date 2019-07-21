import { bookingConstants } from '../_constants/booking.constants';
import { bookingService } from '../_services/booking.service';
export const bookingActions = {
    getBookings,
    addBooking,
    cancelBooking
};
function getBookings(token) {
    return dispatch => {
        dispatch(request());

        bookingService.getAll(token)
            .then(
                bookings => dispatch(success(bookings)),
                error => {
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: bookingConstants.GET_BOOKERS_REQUEST } }
    function success(bookings) { return { type: bookingConstants.GET_BOOKERS_SUCCESS, bookings } }
    function failure(error) { return { type: bookingConstants.GET_BOOKERS_FAILURE, error } }
}

function addBooking({ vendorId, tableId, timestamp, name, email, capacity }) {
    return dispatch => {
        dispatch(request());

        bookingService.addBooking({ vendorId, tableId, timestamp, email, name, capacity })
            .then(
                response => {
                    dispatch(success(response))
                    window.location.href = '/';
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: bookingConstants.ADD_BOOKING_REQUEST } }
    function success(response) { return { type: bookingConstants.ADD_BOOKING_SUCCESS, response } }
    function failure(error) { return { type: bookingConstants.ADD_BOOKING_FAILURE, error } }
}

function cancelBooking() {
    return {
        type: bookingConstants.CANCEL_BOOKING,
    }
}