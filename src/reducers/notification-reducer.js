import * as types from 'constants/types';
import { NOTIFICATION_INITIAL_STATE } from 'constants/store';

export default function notificationReducer(state = NOTIFICATION_INITIAL_STATE, action) {
    switch (action.type) {
        case types.NOTIFICATION_ADD:
            return {
                visible: true,
                ...action.entities
            };

        case types.NOTIFICATION_CLOSE:
            return {
                ...state,
                visible: false
            };

        default:
            return state;
    }
}