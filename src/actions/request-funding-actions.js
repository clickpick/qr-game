import { requestFunding } from 'api';
import * as types from 'constants/types';
import {
    FETCH_REQUEST_FUNDING_LOAD, FETCH_REQUEST_FUNDING_SUCCESS,
    FETCH_REQUEST_FUNDING_ERROR, FETCH_REQUEST_FUNDING_DELAY
} from 'constants/notifications';

const fetchRequestFundingLoad = () => ({
    type: types.FETCH_REQUEST_FUNING_LOAD,
});

const fetchRequestFundingSuccess = () => ({
    type: types.FETCH_REQUEST_FUNING_SUCCESS,
});

const fetchRequestFundingError = () => ({
    type: types.FETCH_REQUEST_FUNING_ERROR,
});

const fetchRequestFunding = (data, notification) => async (dispatch) => {
    dispatch(fetchRequestFundingLoad());
    dispatch(notification(FETCH_REQUEST_FUNDING_LOAD, {}, 0));

    try {
        await requestFunding(data);
        setTimeout(() => {
            dispatch(fetchRequestFundingSuccess());
            dispatch(notification(FETCH_REQUEST_FUNDING_SUCCESS));
        }, FETCH_REQUEST_FUNDING_DELAY);
    } catch (e) {
        setTimeout(() => {
            dispatch(fetchRequestFundingError());
            dispatch(notification(FETCH_REQUEST_FUNDING_ERROR));
        }, FETCH_REQUEST_FUNDING_DELAY);
    }
};

export { fetchRequestFunding };