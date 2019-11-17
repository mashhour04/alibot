import { authHeader, Toast } from '../_helpers';

export const dealsService = {
    getDeals,
    createDeal
};


function getDeals({ skip, limit }) {
    let apiUrl = process.env.REACT_APP_API_URL || 'https://bot.prod.alibot.xyz';
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
    let apiUrl = process.env.REACT_APP_API_URL || 'https://bot.prod.alibot.xyz';
    if(String(apiUrl).includes('localhost')) apiUrl = 'http://localhost:8000';
    const url =  apiUrl + `/backend/api/deals/`;
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(dealData)
    };
    return fetch(url, requestOptions).then(handleResponse).then(response =>{
        Toast.fire({
            type: 'success',
            title: 'deal has been added',
        })
        return response;
    })
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
