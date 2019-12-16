import { shareStory, draw, svgPrepare, svgToBase64, getBlob, svgToPng } from 'helpers';
import * as types from 'constants/types';
import { APP_LINK } from 'constants/vk';
import { TEMPLATE_URL } from 'constants/story';
import { showNotification, closeNotification } from 'actions/notification-actions';
import {
    SHARE_STORY_PREVIEW, SHARE_STORY_PREVIEW_ERROR,
    SHARE_STORY_LOAD, SHARE_STORY_SUCCESS, SHARE_STORY_ERROR
} from 'constants/notifications';

import { tempImage } from 'api'

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
        

        svgToPng(svg.outerHTML)
            .then((d) => {
                console.log(1);
                
                console.log(d);
                
            })
            .catch((e) => {
                console.log(2);
                
                console.log(e);
                
            });
        // const r = await tempImage(getBlob(svg.outerHTML));
        
        // console.log(r);

        dispatch(showNotification(SHARE_STORY_PREVIEW, {
            imageType: undefined,
            message: `<img src="${img}" alt="история" style="margin-top: 12px" />`,
            actions: [
                {
                    theme: 'info',
                    title: 'Отмена',
                    action: async () => {
                        try {
                            const response = await connect.sendPromise('VKWebAppShowStoryBox', {
                                background_type: 'none',
                                stickers: [{
                                    sticker_type: 'renderable',
                                    sticker: {
                                        can_delete: 0,
                                        content_type: 'image',
                                        // blob
                                    }
                                }]
                            })

                            console.log(response);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    // action: () => dispatch(closeNotification())
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
        console.log(e);
        
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

        if (e.hasOwnProperty('error_code')) {            
            switch (e.error_code) {
                case 1: case 2:
                    dispatch(showNotification(SHARE_STORY_ERROR, { message: 'Ты не разрешил нам публиковать истории :(' }));
                    return;
                case 3:
                    dispatch(showNotification(SHARE_STORY_ERROR));
                    return;
                default:
                    break;
            }
        }

        dispatch(showNotification(SHARE_STORY_ERROR));
    }
}

export { previewShareStory };