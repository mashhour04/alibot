import { authHeader } from '../_helpers';
import { toastr } from 'react-redux-toastr';
export const vendorService = {
    getVendor,
    getBookings,
    insertTable,
    updateTable,
};

function getVendor({skip, limit}) {
    let url = `/backend/api/vendors`;
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log('skip and limit', skip, limit);
    if (typeof skip !== undefined && typeof limit !== undefined) { requestOptions.qs = { skip, limit }; }

    if(requestOptions.qs) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(requestOptions.qs);
        delete requestOptions.qs;
    }

    return fetch(url, requestOptions).then(handleResponse);
}

function insertTable(table) {
    const url = `/backend/api/tables/create`;

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(table),
        headers: authHeader()
    };
    console.log('creating table', requestOptions);
    return fetch(url, requestOptions).then(handleResponse);
}
function updateTable(u) {
    const url = `/backend/api/tables/update`;
    const tableId = u.row._id || u.row.id;
    console.log('tableId', tableId);
    let update = {} ;
    if (u.name === 'capacity' || u.name === 'name') {
        update[u.name] = u.value;
    } else {
        update.availability = { [u.name]: u.value };
    }
    
    const body = { tableId, update } ;
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: authHeader()
    };

    return fetch(url, requestOptions).then(handleResponse);
}

function getBookings({ skip, limit }) {
    let url = `/backend/api/bookings`;
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log('skip and limit', skip, limit);
    if (typeof skip !== undefined && typeof limit !== undefined) { requestOptions.qs = { skip, limit }; }

    if(requestOptions.qs) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(requestOptions.qs);
        delete requestOptions.qs;
    }

    return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            toastr.error('Error!', `Something went wrong`);
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

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}