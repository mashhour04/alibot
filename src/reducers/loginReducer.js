import { SET_JWT } from "../actions/contsants";

const initialState = {
    booekrs: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_JWT:
        return {
            ...state
        }
    }
}