import { registerConstants } from '../_constants/register.constants';
const initialState = {
    profileErrors: {
        firstName: false,
        lastName: false,
        email: false,
        phone: false
    }, accountErrors: {
        username: false,
        password: false,
        confirm: false
    }, profile: {}, vendor: {
        name: '',
        street_address: '',
        city: '',
        state: '',
        zip_code: '',
        googleMapLink: ''
    }, vendorErrors: {
        name: false,
        street_address: false,
        type: false,
        priceLevel: false,
        city: false,
        state: false,
        zip_code: false
    }, account: {}
}

export function register(state = initialState, action) {
    switch (action.type) {
        case registerConstants.PROFILE_FIELD_CHANGE:
            state.profile = action.profile;
            return state;
        case registerConstants.ACCOUNT_FIELD_CHANGE:
            state.account = action.account;
            return state;
        case registerConstants.ACCOUNT_FIELD_ERROR:
            state.accountErrors = action.accountErrors;
            return state;
        case registerConstants.PROFILE_FIELD_ERROR:
            console.log('proifle error in reducer', action);
            state.profileErrors = action.profileErrors;
            return state;
        default:
            return state
    }
}
