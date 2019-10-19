import { REQUEST_FUNDING_INITIAL_STATE } from 'constants/store';
import * as types from 'constants/types';

export default function requestFundingReducer(state = REQUEST_FUNDING_INITIAL_STATE, action) {
    switch (action.type) {
        case types.FETCH_REQUEST_FUNING_LOAD:
            return {
                ...state,
                loading: true
            };
        case types.FETCH_REQUEST_FUNING_SUCCESS: case types.FETCH_REQUEST_FUNING_ERROR:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}