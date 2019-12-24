import * as types from 'constants/types';
import connect from '@vkontakte/vk-connect';

import { APP_LINK } from 'constants/vk';

const shareStoryLoad = () => ({
    type: types.SHARE_STORY_LOAD
});

const shareStorySuccess = () => ({
    type: types.SHARE_STORY_SUCCESS,
});

const fetchShareStory = (token, userPic) => async (dispatch) => {
    dispatch(shareStoryLoad());

    try {
        await connect.sendPromise('VKWebAppShowStoryBox', {
            background_type: 'none',
            stickers: [
                {
                    sticker_type: 'renderable',
                    sticker: {
                        content_type: 'image',
                        url: `https://dev1.ezavalishin.ru/?token=${token}&userPic=${userPic}&t=${Date.now()}`,
                        can_delete: false,
                        transform: {
                            translation_y: 0.08,
                            relation_width: 0.6,
                            gravity: 'right_top'
                        },
                        clickable_zones: [{
                            action_type: 'link',
                            action: { link: APP_LINK },
                            clickable_area: [
                                { x: 0, y: 0 },
                                { x: 600, y: 0 },
                                { x: 600, y: 600 },
                                { x: 0, y: 600 }
                            ]
                        }]
                    }
                },
                {
                    sticker_type: 'renderable',
                    sticker: {
                        content_type: 'image',
                        url: `https://dev1.ezavalishin.ru/sign`,
                        can_delete: false,
                        transform: {
                            translation_y: -0.08,
                            relation_width: 0.8,
                            gravity: 'center_bottom'
                        },
                        clickable_zones: [{
                            action_type: 'link',
                            action: { link: APP_LINK },
                            clickable_area: [
                                { x: 0, y: 0 },
                                { x: 1064, y: 0 },
                                { x: 1064, y: 208 },
                                { x: 0, y: 208 }
                            ]
                        }]
                    }
                },
            ]
        });
    } catch (e) {
        console.log(e);
        
    }

    dispatch(shareStorySuccess());
}

export { fetchShareStory };