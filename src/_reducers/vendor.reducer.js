import { vendorConstants } from '../_constants/vendor.constants';

export function vendor(state = { loading: true, tables: [] }, action) {
    switch (action.type) {
        case vendorConstants.GET_VENDOR_REQUEST:
            return {
                loading: true
            };
        case vendorConstants.GET_VENDOR_SUCCESS:
            return {
                vendor: action.vendor,
                tables: action.vendor.tables,
            };
        case vendorConstants.GET_VENDOR_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}
export function tables(state = [], action) {
    switch (action.type) {
        case vendorConstants.GET_TABLES_REQUEST:
            return {
                loading: true
            };
        case vendorConstants.GET_TABLES_SUCCESS:
            return {
                tables: action.tables
            };
        case vendorConstants.GET_TABLES_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

export function movies(state = [], action) {
    switch (action.type) {
        case vendorConstants.GET_MOVIES_REQUEST:
            return {
                loading: true
            };
        case vendorConstants.GET_MOVIES_SUCCESS:
            return {
                movies: action.movies
            };
        case vendorConstants.GET_MOVIES_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

export function bookings(state = [], action) {
    switch (action.type) {
        case vendorConstants.GET_BOOKINGS_REQUEST:
            if (action.pagination) {
                return {
                    paginating: true,
                    loading: true,
                    oldValue: state
                }
            } else {
                return {
                    loading: true,
                    oldValue: state,
                };
            }
        case vendorConstants.GET_BOOKINGS_SUCCESS:
            if (action.pagination) {
                if (state.oldValue) {
                    const newBookings = action.bookings.concat(state.oldValue)
                    console.log('the default state after a request with pagination', newBookings);
                    return newBookings
                }
                return action.bookings;
            }
            return action.bookings;
        case vendorConstants.GET_BOOKINGS_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

export function pastBookings(state = [], action) {
    switch (action.type) {
        case vendorConstants['past'].GET_BOOKINGS_REQUEST:
            return {
                loading: true
            };
        case vendorConstants['past'].GET_BOOKINGS_SUCCESS:
            return action.bookings;
        case vendorConstants['past'].GET_BOOKINGS_FAILURE:
            return {
                error: action.error
            };
        case vendorConstants['past'].GET_BOOKINGS_SUCCESS:
            return action.bookings
        default:
            return state
    }
}

export function availableTables(state = [], action) {
    switch (action.type) {
        case vendorConstants.GET_AVAILABLE_TABLES_REQUEST:
            return {
                loading: true
            };
        case vendorConstants.GET_AVAILABLE_TABLES_SUCCESS:
            return action.tables;
        case vendorConstants.GET_AVAILABLE_TABLES_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

export function hasMoreStatus(state = { hasMore: false, loading: false }, action) {
    switch (action.type) {
        case vendorConstants.GET_BOOKINGS_SUCCESS:
        case vendorConstants['past'].GET_BOOKINGS_SUCCESS:
            if (action.bookings && action.bookings.length >= 20) {
                return { loading: false, hasMore: true };
            }
            return state;
        case vendorConstants.GET_BOOKINGS_REQUEST:
        case vendorConstants['past'].GET_BOOKINGS_REQUEST:
            if (action.pagination) {
                return { loading: true, hasMore: false };
            }
            return state;
        default:
            return state
    }
}