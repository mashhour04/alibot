import { userConstants } from '../_constants/user.constants';
import { userService } from '../_services';
import { alertActions } from './alert.actions';
import { history } from '../_helpers';
import { toastr } from 'react-redux-toastr';


export const userActions = {
    register,
    login,
    logout,
    getUser,
    update,
};
function register({ profile, account, vendor }) {
    return dispatch => {
        dispatch(request({ profile, account }));

        userService.register({ profile, account, vendor })
            .then(
                user => {
                    dispatch(success(user));
                    setTimeout(() => window.location.href = '/', 2000);
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(body) { return { type: userConstants.REGISTER_REQUEST, body } }
    function success(body) { return { type: userConstants.REGISTER_SUCCESS, body } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    console.log('user', user);
                    dispatch(success(user));  
                    window.location.href = '/';
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}


function update({ update, userId }) {
    return dispatch => {
        dispatch(request({ update, userId }));

        userService.update({ update, userId })
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(body) { return { type: userConstants.UPDATE_REQUEST, body } }
    function success(body) { return { type: userConstants.UPDATE_SUCCESS, body } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}
function getUser() {
    return dispatch => {
        dispatch(request());

        userService.getUser()
            .then(
                user => dispatch(success(user)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: userConstants.GET_USER_REQUEST } }
    function success(user) { return { type: userConstants.GET_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_USER_FAILURE, error } }

}