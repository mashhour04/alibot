import { GET_BOOKERS, CANCEL_BOOKING } from '../actions/contsants';
import { stat } from 'fs';

const initialState = {
    booekrs: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_BOOKERS:
        return {
            ...state
        }
    }
}