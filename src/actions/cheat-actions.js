import { getVKPayParamsWithCheat } from 'api';
import * as types from 'constants/types';
import * as VK from 'constants/vk';
import { showNotification } from 'actions/notification-actions';
import { CHEAT_SUCCESS, CHEAT_ERROR } from 'constants/notifications';

const showCheat = () => ({
    type: types.SHOW_CHEAT
});

const hideCheat = () => ({
    type: types.HIDE_CHEAT
});

const fetchCheatLoad = () => ({
    type: types.FETCH_CHEAT_LOAD
});

const getCheat = (connect) => async (dispatch) => {
    dispatch(fetchCheatLoad());

    try {
        const response = await getVKPayParamsWithCheat();

        try {
            const payResponse = await connect.sendPromise('VKWebAppOpenPayForm', {
                app_id: VK.APP_ID,
                action: 'pay-to-service',
                params: response.data
            });

            dispatch(hideCheat());
            
            if (payResponse.status) {
                dispatch(showNotification(CHEAT_SUCCESS, {}, 8000));
            } else {
                dispatch(showNotification(CHEAT_ERROR));
            }
            
        } catch (e) {            
            dispatch(hideCheat());
            dispatch(showNotification(CHEAT_ERROR));
        }
    } catch (e) {
        dispatch(hideCheat());
        dispatch(showNotification(CHEAT_ERROR));
    }
};

export { showCheat, hideCheat, getCheat };