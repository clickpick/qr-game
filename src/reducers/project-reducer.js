import * as types from 'constants/types';
import { PROJECT_INITIAL_STATE } from 'constants/store';

export default function projectReducer(state = PROJECT_INITIAL_STATE, action) {
    switch (action.type) {
        case types.FETCH_PROJECT_LOAD:
            return {
                ...state,
                loading: true,
                error: false
            };

        case types.FETCH_PROJECT_SUCCESS:
            return {
                ...state,
                data: action.entities,
                loading: false,
                error: false
            };

        case types.FETCH_PROJECT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case types.FINISH_PORJECT:
            return {
                ...state,
                loading: false,
                error: false,
                data: {
                    ...state.data,
                    is_finished: true
                }
            };

        default:
            return state;
    }
}