import * as types from 'constants/types';
import { SHARE_STORY_INITIAL_STATE } from 'constants/store';

export default function shareStoryReducer(state = SHARE_STORY_INITIAL_STATE, action) {
    switch (action.type) {
        case types.SHARE_STORY_LOAD:
            return {
                ...state,
                sharing: true
            };

        case types.SHARE_STORY_SUCCESS:
            return {
                ...state,
                sharing: false
            };

        default:
            return state;
    }
}