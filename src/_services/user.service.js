import { authHeader, Toast } from '../_helpers';

export const userService = {
    register,
    login,
    logout,
    getUser,
    update,
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
    if (localStorage.getItem('user')) {
        localStorage.removeItem('user');
        window.location.reload();
    }
}

function getUser() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`/backend/api/managers/`, requestOptions).then(handleResponse);
}

function update({ update, userId }) {
    const body = {
        ...update,
    }

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    };

    return fetch(`/backend/api/managers/update`, requestOptions)
        .then(handleResponse)
        .then(response => {
            Toast.fire({
                type: 'success',
                title: 'profile has been updated',
            })
            // login successful if there's a jwt token in the response
            return response;
        });
}

function handleResponse(response) {
    console.log('the response', response);
    // if (response.status !== 200) {
    //     toastr.error('Failed!', 'Internal Server Error');
    //     return new Promise(() => { });
    // // }
    // alert(JSON.stringify(response.text()))
    return response.text().then(text => {
        const data = (text) ? toJSON(text) : text;
        if (!response.ok) {
            const message = data.message || text;
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            const errors = data.errors;
            if (errors) {
                errors.forEach((error) => {
                    Toast.fire({type: 'error', title: `${error.param} is ${error.msg}` });
                });
            } else {
                Toast.fire({type: 'error', title: message });
            }
            return Promise.reject(error);
        }
        return data;
    });
}

function toJSON(string) {
    try {
        return JSON.parse(string);
    } catch (err) {
        return string;
    }
}