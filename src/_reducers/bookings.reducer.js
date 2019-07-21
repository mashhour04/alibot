import { bookingConstants } from '../_constants/booking.constants';

export function addBooking(state = {}, action) {
    switch (action.type) {
        case bookingConstants.ADD_BOOKING_REQUEST:
            return {
                loading: true
            };
        case bookingConstants.ADD_BOOKING_SUCCESS:
            return action.response;
        case bookingConstants.ADD_BOOKING_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}