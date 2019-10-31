import { PLATFORM_INITIAL_STATE } from 'constants/store';
import * as types from 'constants/types';

export default function platformReducer(state = PLATFORM_INITIAL_STATE, action) {
    if (action.type === types.SET_PLATFORM) {
        return action.platform;
    }

    return state;
}