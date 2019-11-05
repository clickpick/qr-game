import { getVKPayParamsWithCheat, activateCheat } from 'api';
import * as types from 'constants/types';
import * as VK from 'constants/vk';
import { addNewKey } from 'actions/user-actions';
import { showNotification } from 'actions/notification-actions';
import { CHEAT_PROCESSING, CHEAT_SUCCESS, CHEAT_ERROR, CHEAT_NOT_FOUND } from 'constants/notifications';

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

            let status = payResponse.status;
            let extra = payResponse.extra;
            if (payResponse.hasOwnProperty('result')) {
                status = payResponse.result.status;
                extra = payResponse.result.extra;
            }

            if (status) {
                dispatch(showNotification(CHEAT_PROCESSING, {}, 0));

                const orderId = JSON.parse(extra).order_id;

                setTimeout(async () => {
                    let i = 5;
                    while (i--) {
                        try {
                            const keyResponse = await activateCheat(orderId);

                            dispatch(addNewKey(keyResponse.data));
                            dispatch(showNotification(CHEAT_SUCCESS, { message: `Ты открыл новый символ “${keyResponse.data.value.toUpperCase()}”!` }, 0));
                            break;
                        } catch (e) {
                            if (i === 1) {
                                continue;
                            }

                            dispatch(showNotification(CHEAT_NOT_FOUND));
                        }
                    }
                }, 3000);
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