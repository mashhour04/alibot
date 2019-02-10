import { authHeader } from '../_helpers';
import { toastr } from 'react-redux-toastr';
export const userService = {
    register,
    login,
    logout,
    getUser
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`/backend/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        })
}

function register({ profile, account, vendor }) {
    const body = {
        ...profile, ...account, vendor: {
            address: {
                street_address: vendor.street_address,
                city: vendor.city,
                state: vendor.state,
                zip_code: vendor.zip_code,
            },
            name: vendor.name,
            type: vendor.type,
            priceLevel: vendor.priceLevel,
        }
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    return fetch(`/backend/managers/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getUser() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`/backend/api/managers/`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    console.log('the response', response);
    // if (response.status !== 200) {
    //     toastr.error('Failed!', 'Internal Server Error');
    //     return new Promise(() => { });
    // }
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            console.log('data received', data);
            toastr.error('failed!', data.message);
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            const errors = data.errors;
            if (errors) {
                errors.forEach((error) => {
                    toastr.error('Error!', `${error.param} is ${error.msg}`)
                });
            }
            return Promise.reject(error);
        }
        return data;
    });
}