import { getVKPayParams } from 'api';
import * as types from 'constants/types';
import * as VK from 'constants/vk';
import { showNotification } from 'actions/notification-actions';
import { DONATE_FORM_INFO, DONATE_FORM_SUCCESS, DONATE_FORM_ERROR, DONATE_FORM_SERVER_ERROR } from 'constants/notifications';

const showDonateForm = () => ({
    type: types.SHOW_DONATE_FORM
});

const hideDonateForm = () => ({
    type: types.HIDE_DONATE_FORM
});

const fetchDonateForm = () => ({
    type: types.FETCH_DONATE_FORM
});

const openDonateForm = (showInfo) => (dispatch) => {
    if (showInfo) {
        dispatch(showNotification(DONATE_FORM_INFO, {}, 0));
        return;
    }

    dispatch(showDonateForm());
};

const donate = (connect, amount) => async (dispatch) => {
    dispatch(fetchDonateForm());

    try {
        const response = await getVKPayParams(amount);

        try {
            const payResponse = await connect.sendPromise('VKWebAppOpenPayForm', {
                app_id: VK.APP_ID,
                action: 'pay-to-service',
                params: response.data
            });

            dispatch(hideDonateForm());
            
            if (payResponse.status) {
                dispatch(showNotification(DONATE_FORM_SUCCESS, {}, 8000));
            } else {
                dispatch(showNotification(DONATE_FORM_ERROR));
            }
            
        } catch (e) {
            dispatch(hideDonateForm());
            dispatch(showNotification(DONATE_FORM_ERROR));
        }
    } catch (e) {
        dispatch(hideDonateForm());
        dispatch(showNotification(DONATE_FORM_SERVER_ERROR));
    }
};

export { openDonateForm, hideDonateForm, donate };