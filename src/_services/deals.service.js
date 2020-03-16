import { authHeader, Toast } from '../_helpers';

export const dealsService = {
    getDeals,
    createDeal,
    updateDeal,
    deleteDeal
};


function getDeals({ skip, limit }) {
    let apiUrl = process.env.REACT_APP_API_URL || 'https://bot.prod.Spoon.ai.xyz';
    if(String(apiUrl).includes('localhost')) apiUrl = 'http://localhost:8000';
    let url =  apiUrl + `/backend/api/deals`;
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

function createDeal(dealData) {
    let apiUrl = process.env.REACT_APP_API_URL || 'https://bot.prod.Spoon.ai.xyz';
    if(String(apiUrl).includes('localhost')) apiUrl = 'http://localhost:8000';
    const url =  apiUrl + `/backend/api/deals/`;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(dealData)
    };
    return fetch(url, requestOptions).then(handleResponse).then(response => {
        Toast.fire({
            type: 'success',
            title: 'deal has been added',
        })
        setTimeout(() => { window.location.href = '/get-deals'; }, 3000);
    }).catch((error) => {
    })
}

function updateDeal(u) {
    const dealId = u.row._id || u.row.id;
    const apiUrl = process.env.REACT_APP_API_URL || 'https://aliserverbot.herokuapp.com';
    const url =  apiUrl + `/backend/api/deals/`;
    console.log('dealId', dealId);
    let update = {};
    if (u.name === 'status' || u.name === 'name') {
        update[u.name] = u.value;
    } else {
        update.availability = { [u.name]: u.value };
    }

    const body = { dealId, update };
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: authHeader()
    };

    return fetch(url, requestOptions).then(handleResponse);
}

function deleteDeal(u) {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://aliserverbot.herokuapp.com';
    const url =  apiUrl + `/backend/api/deals/`;
    const dealId = u.row._id || u.row.id;
    let update = {
        removed: true
    };

    const body = { dealId, update };
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: authHeader()
    };

    return fetch(url, requestOptions).then(handleResponse);
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
