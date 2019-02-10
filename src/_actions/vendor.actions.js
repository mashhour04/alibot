import { vendorConstants } from '../_constants/vendor.constants';
import { vendorService } from '../_services';
import { alertActions } from './alert.actions';
import { history } from '../_helpers';

export const vendorActions = {
    getVendor,
    updateTable,
    insertTable
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

function insertTable({ capacity, hoursOfDay, daysOfWeek, daysOfMonth}) {

    return dispatch => {
        dispatch(request({ capacity, hoursOfDay, daysOfWeek, daysOfMonth}));

        vendorService.insertTable({ capacity, hoursOfDay, daysOfWeek, daysOfMonth})
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
