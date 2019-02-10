import { userConstants } from '../_constants/user.constants';

export function profile(state = {}, action) {
    switch (action.type) {
    case userConstants.GET_USER_REQUEST:
        return {
        loading: true
        };
    case userConstants.GET_USER_SUCCESS:
        return action.user;
    case userConstants.GET_USER_FAILURE:
        return { 
        error: action.error
        };
    default:
        return state
    }
}