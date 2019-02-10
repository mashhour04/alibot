import { seatsConstants } from '../_constants/seats.constants';


export function seats(state = { seats: [], options: [] }, action) {
    switch (action.type) {
        case seatsConstants.SEATS_GETALL_SUCCESS:
            state.seats = seats;
            return action.seats;
        case seatsConstants.OPTIONS_GETALL_SUCCESS:
            state.options = action.options;
            return state;
        default:
            return state
    }
}
