import { authHeader, Toast } from '../_helpers';

export const vendorService = {
    getVendor,
    getBookings,
    insertTable,
    updateTable,
    deleteTable,
    update,
    getAvailableTables
};

function getVendor({ skip, limit }) {
    let url = `/backend/api/vendors`;
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log('skip and limit', skip, limit);
    if (typeof skip !== undefined && typeof limit !== undefined) { requestOptions.qs = { skip, limit }; }

    if (requestOptions.qs) {
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
    let update = {};
    if (u.name === 'capacity' || u.name === 'name') {
        update[u.name] = u.value;
    } else {
        update.availability = { [u.name]: u.value };
    }

    const body = { tableId, update };
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: authHeader()
    };

    return fetch(url, requestOptions).then(handleResponse);
}

function deleteTable(u) {
    const url = `/backend/api/tables/update`;
    const tableId = u.row._id || u.row.id;
    let update = {
        removed: true
    };

    const body = { tableId, update };
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: authHeader()
    };

    return fetch(url, requestOptions).then(handleResponse);
}

function getBookings({ skip, limit, type }) {
    let url = `/backend/api/bookings`;
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log('skip and limit', skip, limit);
    if (typeof skip !== undefined && typeof limit !== undefined) { requestOptions.qs = { skip, limit }; }
    if (type && typeof type !== undefined) { requestOptions.qs = { type }; }
    if (requestOptions.qs) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(requestOptions.qs);
        delete requestOptions.qs;
    }

    return fetch(url, requestOptions).then(handleResponse);
}


function getAvailableTables({ timestamp, capacity, vendorId }) {
    let url = `/backend/api/tables/getAvailable`;
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    if(!timestamp || !vendorId) {
        Toast.fire({
            type: 'error',
            title: 'Something Went Wrong Checking For Tables'
        })
        return Promise.reject( { error: 'Something Went Wrong Checking For Tables' });
    }

    requestOptions.qs = { timestamp, vendorId };
    if (typeof capacity !== undefined && capacity) { requestOptions.qs.capacity = capacity; }

    if (requestOptions.qs) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(requestOptions.qs);
        delete requestOptions.qs;
    }

    return fetch(url, requestOptions).then(handleResponse)
}

function update({ update, vendorId }) {
    const body = {
        ...update,
        vendorId
    }

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    };

    return fetch(`/backend/api/vendors/update/${vendorId}`, requestOptions)
        .then(handleResponse)
        .then(response => {
            Toast.fire({
                type: 'success',
                title: 'vendor has been updated',
            })
            // login successful if there's a jwt token in the response
            return response;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            Toast.fire({ type: 'error', title: `Something went wrong` });
            const error = (data && data.message) || response.statusText;
            const errors = data.errors;
            if (errors) {
                errors.forEach((error) => {
                    Toast.fire({ type: 'error', title: `${error.param} is ${error.msg}` });
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