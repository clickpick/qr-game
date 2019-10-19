import * as types from 'constants/types';
import { DONATE_FORM_INITIAL_STATE } from 'constants/store';

export default function donateFormReducer(state = DONATE_FORM_INITIAL_STATE, action) {
    switch (action.type) {
        case types.SHOW_DONATE_FORM:
            return {
                ...state,
                visible: true
            };

        case types.HIDE_DONATE_FORM:
            return {
                ...state,
                visible: false,
                loading: false
            };

        case types.FETCH_DONATE_FORM:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}