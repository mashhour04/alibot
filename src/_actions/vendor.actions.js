import { vendorConstants } from '../_constants/vendor.constants';
import { vendorService } from '../_services';
import { alertActions } from './alert.actions';
import { history } from '../_helpers';

export const vendorActions = {
    getAnalytics,
    getVendor,
    getBookings,
    updateTable,
    deleteTable,
    insertTable,
    update,
    getAvailableTables
};

function getVendor({ skip, limit }) {
    return dispatch => {
        dispatch(request());

        vendorService.getVendor({ skip, limit })
            .then(
                vendor => dispatch(success(vendor)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: vendorConstants.GET_VENDOR_REQUEST } }
    function success(vendor) { return { type: vendorConstants.GET_VENDOR_SUCCESS, vendor } }
    function failure(error) { return { type: vendorConstants.GET_VENDOR_FAILURE, error } }
}

function updateTable({ row, name, value }) {
    return dispatch => {
        dispatch(request({ row, name, value }));

        vendorService.updateTable({ row, name, value })
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(body) { return { type: vendorConstants.UPDATE_TABLES_REQUREST, body } }
    function success(body) { return { type: vendorConstants.UPDATE_TABLES_SUCCESS, body } }
    function failure(error) { return { type: vendorConstants.UPDATE_TABLES_FAILURE, error } }
}

function deleteTable({ row }) {
    return dispatch => {
        dispatch(request({ row }));

        vendorService.deleteTable({ row })
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(body) { return { type: vendorConstants.UPDATE_TABLES_REQUREST, body } }
    function success(body) { return { type: vendorConstants.UPDATE_TABLES_SUCCESS, body } }
    function failure(error) { return { type: vendorConstants.UPDATE_TABLES_FAILURE, error } }
}

function insertTable({ capacity, hoursOfDay, daysOfWeek, daysOfMonth }) {

    return dispatch => {
        dispatch(request({ capacity, hoursOfDay, daysOfWeek, daysOfMonth }));

        vendorService.insertTable({ capacity, hoursOfDay, daysOfWeek, daysOfMonth })
            .then(
                response => {
                    dispatch(success(response));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };
    function request(body) { return { type: vendorConstants.INSERT_TABLES_REQUREST, body } }
    function success(body) { return { type: vendorConstants.INSERT_TABLES_SUCCESS, body } }
    function failure(error) { return { type: vendorConstants.INSERT_TABLES_FAILURE, error } }
}

function getBookings({ skip, limit, type, pagination }) {
    return dispatch => {
        dispatch(request());

        vendorService.getBookings({ skip, limit, type })
            .then(
                bookings => dispatch(success(bookings)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: (type) ? vendorConstants[type].GET_BOOKINGS_REQUEST : vendorConstants.GET_BOOKINGS_REQUEST } }
    function success(bookings) { return { type: (type) ? vendorConstants[type].GET_BOOKINGS_SUCCESS : vendorConstants.GET_BOOKINGS_SUCCESS, bookings, pagination } }
    function failure(error) { return { type: (type) ? vendorConstants[type].GET_BOOKINGS_FAILURE : vendorConstants.GET_BOOKINGS_FAILURE, error } }
}

function getAnalytics() {
    return dispatch => {
        dispatch(request());

        vendorService.getAnalytics()
            .then(
                analytics => dispatch(success(analytics)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: vendorConstants.GET_ANALYTICS_REQUEST } }
    function success(analytics) { return { type: vendorConstants.GET_ANALYTICS_SUCCESS, analytics } }
    function failure(error) { return { type: vendorConstants.GET_ANALYTICS_FAILURE, error } }
}

function getAvailableTables({ timestamp, capacity, vendorId }) {
    return dispatch => {
        dispatch(request());

        vendorService.getAvailableTables({ timestamp, capacity, vendorId })
            .then(
                tables => dispatch(success(tables)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: vendorConstants.GET_AVAILABLE_TABLES_REQUEST } }
    function success(tables) { return { type: vendorConstants.GET_AVAILABLE_TABLES_SUCCESS, tables } }
    function failure(error) { return { type: vendorConstants.GET_AVAILABLE_TABLES_FAILURE, error } }
}
function update({ update, vendorId }) {
    return dispatch => {
        dispatch(request({ update, vendorId }));

        vendorService.update({ update, vendorId })
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
    function request(body) { return { type: vendorConstants.UPDATE_REQUEST, body } }
    function success(body) { return { type: vendorConstants.UPDATE_SUCCESS, body } }
    function failure(error) { return { type: vendorConstants.UPDATE_FAILURE, error } }
}