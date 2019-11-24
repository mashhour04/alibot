import { dealsConstants } from '../_constants/deals.constants';

export function deals(state = [], action) {
    switch (action.type) {
        case dealsConstants.GET_DEALS_REQUEST:
            return {
                loading: true
            };
        case dealsConstants.GET_DEALS_SUCCESS:
            return {allDeals: action.deals }
        case dealsConstants.GET_DEALS_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}

