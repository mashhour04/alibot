import { authHeader, Toast } from '../_helpers';


export const bookingService = {
    getAll,
    addBooking,
    updateBooking
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`http://localhost:8000/api/bookings`, requestOptions).then(handleResponse);
}

function addBooking({ vendorId, tableId, timestamp, name, email, capacity }) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ vendorId, tableId, timestamp, name, email, capacity })
    };
    return fetch(`http://localhost:8000/api/bookings/create`, requestOptions).then(handleResponse).then(response =>{
        Toast.fire({
            type: 'success',
            title: 'booking has been added',
        })
        // login successful if there's a jwt token in the response
        return response;
    })
}

function updateBooking({ bookingId, update }) {
    const url = `/backend/api/bookings/update`;
    const body = { bookingId, update };
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: authHeader()
    };

    return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log('data', data);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                console.log('401 on getting bookings');
            }
            const error = (data && data.message) || response.statusText;
            const errors = data.errors;
            if (errors) {
                errors.forEach((error) => {
                    Toast.fire({ type: 'error', title: `${error.param} is ${error.msg}` });
                });
            } else {
                Toast.fire({ type: 'error', title: `Something went wrong` });
            }
            return Promise.reject(error);
        }
        return data;
    });
}