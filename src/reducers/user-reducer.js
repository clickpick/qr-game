import * as types from 'constants/types';
import { USER_INITIAL_STATE } from 'constants/store';

export default function userReducer(state = USER_INITIAL_STATE, action) {
    switch (action.type) {
        case types.FETCH_USER_LOAD:
            return {
                ...state,
                loading: true,
                error: false
            };

        case types.FETCH_USER_SUCCESS:
            return {
                ...state,
                data: action.entities,
                loading: false,
                error: false
            };

        case types.FETCH_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            };

        default:
            return state;
    }
}