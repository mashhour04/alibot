import { dealsConstants } from '../_constants/deals.constants';
import { dealsService } from '../_services';
import { alertActions } from './alert.actions';
import { history } from '../_helpers';

export const dealsActions = {
    getDeals,
    createDeal
};

function getDeals({ skip, limit }) {
    return dispatch => {
        dispatch(request());

        dealsService.getDeals({ skip, limit })
            .then(
                deals => dispatch(success(deals)),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: dealsConstants.GET_DEALS_REQUEST } }
    function success(deals) { return { type: dealsConstants.GET_DEALS_SUCCESS, deals } }
    function failure(error) { return { type:dealsConstants.GET_DEALS_FAILURE, error } }
}


function createDeal(dealData) {
    return dispatch => {
        dispatch(request());

        dealsService.createDeal(dealData)
            .then(
                () => dispatch(success()),
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error))
                }
            );
    };

    function request() { return { type: dealsConstants.CREATE_DEALS_REQUREST } }
    function success() { return { type: dealsConstants.CREATE_DEALS_SUCCESS } }
    function failure(error) { return { type: dealsConstants.CREATE_DEALS_FAILURE, error } }
}