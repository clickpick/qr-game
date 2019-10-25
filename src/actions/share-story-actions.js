import React from 'react';

import { shareStory, draw, svgPrepare, svgToBase64 } from 'helpers';
import * as types from 'constants/types';
import { APP_LINK } from 'constants/vk';
import { TEMPLATE_URL } from 'constants/story';
import { showNotification, closeNotification } from 'actions/notification-actions';
import {
    SHARE_STORY_PREVIEW, SHARE_STORY_PREVIEW_ERROR,
    SHARE_STORY_LOAD, SHARE_STORY_SUCCESS, SHARE_STORY_ERROR
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

const previewShareStory = (connect, svg) => async (dispatch) => {
    try {
        const img = await draw(TEMPLATE_URL, svgToBase64(svgPrepare(svg)));

        dispatch(showNotification(SHARE_STORY_PREVIEW, {
            imageType: undefined,
            message: <img src={img} alt="история" style={{ marginTop: 12 }} />,
            actions: [
                {
                    theme: 'info',
                    title: 'Отмена',
                    action: () => dispatch(closeNotification())
                },
                {
                    theme: 'primary',
                    title: 'Опубликовать',
                    full: true,
                    action: () => dispatch(fetchShareStory(connect, svg))
                }
            ]
        }, 0));
    } catch (e) {
        dispatch(showNotification(SHARE_STORY_PREVIEW_ERROR));
    }
}

const fetchShareStory = (connect, svg) => async (dispatch) => {
    dispatch(shareStoryLoad());
    dispatch(showNotification(SHARE_STORY_LOAD, {}, 0));

    let link = `${APP_LINK}#utm_medium=story`;
    // const { user } = getState();
    // if (user && user.data && user.data.active_project_token && user.data.active_project_token.token) {
    //     link = link + `&token=${user.data.active_project_token.token}`;
    // }

    try {
        await shareStory(connect, svgToBase64(svgPrepare(svg)), null, link);
        dispatch(shareStorySuccess());
        dispatch(showNotification(SHARE_STORY_SUCCESS));
    } catch (e) {
        dispatch(shareStoryError());
        dispatch(showNotification(SHARE_STORY_ERROR));
    }
}

export { previewShareStory };