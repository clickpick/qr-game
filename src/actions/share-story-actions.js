import * as types from 'constants/types';
import connect from '@vkontakte/vk-connect';

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
            stickers: [{
                sticker_type: 'renderable',
                sticker: {
                    content_type: 'image',
                    url: `https://dev1.ezavalishin.ru/?token=${token}&userPic=${userPic}&t=${Date.now()}`,
                    can_delete: false,
                }
            }]
        });
    } catch (e) {}

    dispatch(shareStorySuccess());
}

export { fetchShareStory };