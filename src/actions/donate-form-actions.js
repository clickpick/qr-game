import { getVKPayParams } from 'api';
import * as types from 'constants/types';
import * as VK from 'constants/vk';

const showDonateForm = () => ({
    type: types.SHOW_DONATE_FORM
});

const hideDonateForm = () => ({
    type: types.HIDE_DONATE_FORM
});

const fetchDonateForm = () => ({
    type: types.FETCH_DONATE_FORM
});

const donate = (connect, amount) => async (dispatch) => {
    dispatch(fetchDonateForm());

    try {
        const response = await getVKPayParams(amount);
        connect.send(
            'VKWebAppOpenPayForm',
            {
                app_id: VK.APP_ID,
                action: 'pay-to-service',
                params: response.data
            }
        );

    } catch (e) {
        console.log(e);
    }
};

export { showDonateForm, hideDonateForm, donate };