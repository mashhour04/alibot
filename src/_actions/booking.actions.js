import { bookingConstants } from '../_constants/booking.constants';
import { bookingService } from '../_services/booking.service';
export const bookingActions = {
    getBookings,
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

function cancelBooking() {
    return {
        type: bookingConstants.CANCEL_BOOKING,
    }
}