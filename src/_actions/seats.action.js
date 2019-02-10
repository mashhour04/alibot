import { seatsConstants } from '../_constants/seats.constants';
// import { seatsService } from '../_services';
import { alertActions } from './alert.actions';


export const seatsActions = {
    getAll
};


function getAll() {
    return dispatch => {
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ]
        dispatch(success(options));
    };

    // function request() { return { type: seatsConstants.GETALL_REQUEST } }
    function success(options) { return { type: seatsConstants.OPTIONS_GETALL_SUCCESS, options } }
    // function failure(error) { return { type: seatsConstants.GETALL_FAILURE, error } }
}