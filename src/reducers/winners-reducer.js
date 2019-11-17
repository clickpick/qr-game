import * as types from 'constants/types';
import { WINNERS_INITIAL_STATE } from 'constants/store';

export default function winnersReducer(state = WINNERS_INITIAL_STATE, action) {
    switch (action.type) {
        case types.FETCH_WINNERS_LOAD:
            return {
                ...state,
                loading: true,
                error: false
            };

        case types.FETCH_WINNERS_SUCCESS:
            return {
                ...state,
                data: action.entities,
                loading: false,
                error: false
            };

        case types.FETCH_WINNERS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        
        default:
            return state;
    }
}