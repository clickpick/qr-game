import { shareStory, svgPrepare, svgToBase64 } from 'helpers';
import * as types from 'constants/types';
import { APP_LINK } from 'constants/vk';
import {
    SHARE_STORY_LOAD,
    SHARE_STORY_SUCCESS,
    SHARE_STORY_ERROR
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

const fetchShareStory = (connect, svg, notification) => async (dispatch, getState) => {
    dispatch(shareStoryLoad());
    dispatch(notification(SHARE_STORY_LOAD, {}, 0));

    let link = `${APP_LINK}#utm_medium=story`;
    // const { user } = getState();
    // if (user && user.data && user.data.active_project_token && user.data.active_project_token.token) {
    //     link = link + `&token=${user.data.active_project_token.token}`;
    // }

    try {
        await shareStory(connect, svgToBase64(svgPrepare(svg)), null, link);
        dispatch(shareStorySuccess());
        dispatch(notification(SHARE_STORY_SUCCESS));
    } catch (e) {
        dispatch(shareStoryError());
        dispatch(notification(SHARE_STORY_ERROR));
    }
}

export { fetchShareStory };