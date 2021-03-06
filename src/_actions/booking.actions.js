import { bookingConstants } from '../_constants/booking.constants';
import { bookingService } from '../_services/booking.service';

export const bookingActions = {
    getBookings,
    addBooking,
    cancelBooking,
    updateBooking
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

function addBooking({ vendorId, userId, tableId, timestamp, name, email, capacity }) {
    return dispatch => {
        dispatch(request());

        bookingService.addBooking({ vendorId, userId, tableId, timestamp, email, name, capacity })
            .then(
                response => {
                    dispatch(success(response))
                    if (userId) {
                        if (window.MessengerExtensionsError) {
                            return window.location.href = '/book';
                        }

                        if (!window.MessengerExtensionsError) {
                            return window.MessengerExtensions.requestCloseBrowser(() => {}, (err) => window.location.href = '/book' );
                        }
                    }
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

function updateBooking({ bookingId, action }) {
    return dispatch => {
        dispatch(request());

        bookingService.updateBooking({ bookingId, update: action })
            .then(
                response => {
                    dispatch(success(response))
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request() { return { type: bookingConstants.Change_BOOKING_Status_REQUEST } }
    function success(response) { return { type: bookingConstants.Change_BOOKING_Status_SUCCESS, response } }
    function failure(error) { return { type: bookingConstants.Change_BOOKING_Status_FAILURE, error } }
}

function cancelBooking() {
    return {
        type: bookingConstants.CANCEL_BOOKING,
    }
}