import { shareStory, svgPrepare, svgToBase64 } from 'helpers';
import * as types from 'constants/types';

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

const fetchShareStory = (connect, svg) => async (dispatch) => {
    dispatch(shareStoryLoad());

    try {
        await shareStory(connect, svgToBase64(svgPrepare(svg)), null /* reply-id @type string */);
        dispatch(shareStorySuccess());
    } catch (e) {
        dispatch(shareStoryError());
    }
}

export { fetchShareStory };