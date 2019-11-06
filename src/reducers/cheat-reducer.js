import * as types from 'constants/types';
import { CHEAT_INITIAL_STATE } from 'constants/store';

export default function cheatReducer(state = CHEAT_INITIAL_STATE, action) {
    switch (action.type) {
        case types.SHOW_CHEAT:
            return {
                ...state,
                visible: true,
                symbol: action.symbol || null
            };

        case types.HIDE_CHEAT:
            return {
                ...state,
                visible: false,
                loading: false,
                symbol: null
            };

        case types.FETCH_CHEAT_LOAD:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}