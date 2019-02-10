import { navigationConstants } from '../_constants/navigation.constants';

export const navigationActions = {
    ChangeSideBar,
};

function ChangeSideBar(value) {
    return { type: navigationConstants.SIDE_BAR_CHANGE, value };
}
