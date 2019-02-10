import { tablesConstants } from '../_constants/tables.constants';
import { tablesService } from '../_services';
import { alertActions } from './alert.actions';
import { history } from '../_helpers';

export const userActions = {
    update,
};
function update({ row, name, value }) {
    return dispatch => {
        dispatch(request({ row, name, value }));

        tablesService.update({ row, name, value })
            .then(
                response => {
                    dispatch(success(response));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(body) { return { type: tablesConstants.UPDATE_REQUEST, body } }
    function success(body) { return { type: tablesConstants.UPDATE_SUCCESS, body } }
    function failure(error) { return { type: tablesConstants.UPDATE_SUCCESS, error } }
}


function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}


