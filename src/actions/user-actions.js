import { auth, activeProjectKey } from 'api';
import * as types from 'constants/types';

const fetchUserLoad = () => ({
    type: types.FETCH_USER_LOAD
});

const fetchUserSuccess = (entities) => ({
    type: types.FETCH_USER_SUCCESS,
    entities
});

const fetchUserError = (error) => ({
    type: types.FETCH_USER_ERROR,
    error
});

const addNewKey = (key) => ({
    type: types.ADD_NEW_KEY,
    key
});

async function fetchUser(dispatch) {
    dispatch(fetchUserLoad());

    try {
        const response = await auth();
        dispatch(fetchUserSuccess(response.data));
    } catch (e) {
        dispatch(fetchUserError());
    }
}

const fetchActivateKey = (token, callbackAction) => async (dispatch, getState) => {
    const { project } = getState();

    if (!project.data) {
        // todo
        return;
    }

    dispatch(fetchUserLoad());

    try {
        const response = await activeProjectKey(project.data.id, token);
        dispatch(addNewKey(response.data));

        if (response.data.is_last) {
            dispatch(callbackAction());
        }
    } catch (e) {
        if (e.response.status === 422 || e.response.status === 500) {
            let symbol = '';
            if (e.response.data && e.response.data.data && e.response.data.data.value) {
                symbol = e.response.data.data.value;
            }

            dispatch(fetchUserError(`Символ “${symbol.toUpperCase()}” у тебя уже есть.`));
        }

        if (e.response.status === 403) {
            dispatch(fetchUserError('Зачем ты сканируешт свой QR код?'));
        }
    }
}

export { fetchUser, fetchActivateKey };