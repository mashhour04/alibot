import { navigationConstants } from '../_constants/navigation.constants';

export function sideBar(state = {}, action) {
    switch (action.type) {
    case navigationConstants.SIDE_BAR_CHANGE:
        return {
        type: 'SIDE_BAR_CHANGE',
        iconOnly: action.value,
        };
    default:
        return state
    }
}