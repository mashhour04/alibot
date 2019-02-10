import { SET_JWT, DELETE_JWT } from './booking.contsants';

export const setJWT = () => {
    return {
        type: SET_JWT,
    }
}

export const deleteJWT = () => {
    return {
        type: DELETE_JWT,
    }
}