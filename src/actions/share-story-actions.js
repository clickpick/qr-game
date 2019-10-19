import { shareStory, svgPrepare, svgToBase64 } from 'helpers';
import * as types from 'constants/types';
import {
    NOTIFICATION_SHARE_STORY_LOAD,
    NOTIFICATION_SHARE_STORY_SUCCESS,
    NOTIFICATION_SHARE_STORY_ERROR
} from 'constants/notifications';

const shareStoryLoad = () => ({
    type: types.SHARE_STORY_LOAD
});

const shareStorySuccess = () => ({
    type: types.SHARE_STORY_SUCCESS,
});

const shareStoryError = (error) => ({
    type: types.SHARE_STORY_ERROR,
    error
});

const fetchShareStory = (connect, svg, notification) => async (dispatch) => {
    dispatch(shareStoryLoad());
    dispatch(notification(NOTIFICATION_SHARE_STORY_LOAD, {}, 0));

    try {
        await shareStory(connect, svgToBase64(svgPrepare(svg)), null /* reply-id @type string */);
        dispatch(shareStorySuccess());
        dispatch(notification(NOTIFICATION_SHARE_STORY_SUCCESS));
    } catch (e) {
        dispatch(shareStoryError());
        dispatch(notification(NOTIFICATION_SHARE_STORY_ERROR));
    }
}

export { fetchShareStory };