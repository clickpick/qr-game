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
        case types.FETCH_USER_LOAD_END:
            return {
                ...state,
                loading: false
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
                error: action.error
            };

        case types.ADD_NEW_KEY:
            let keys = [action.key];
            if (state.data.hasOwnProperty('activated_project_keys')) {
                keys = state.data.activated_project_keys.concat(keys);
            }
            
            return {
                ...state,
                loading: false,
                error: false,
                data: {
                    ...state.data,
                    activated_project_keys: keys
                }
            };

        case types.TOGGLE_ALLOW_NOTIFICATIONS:
            return {
                ...state,
                loading: false,
                error: false,
                data: {
                    ...state.data,
                    notifications_are_enabled: action.isEnabled
                }
            };

        default:
            return state;
    }
}