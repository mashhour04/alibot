import { vendorConstants } from '../_constants/vendor.constants';

export function vendor(state = { loading: true, tables: [] } , action) {
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