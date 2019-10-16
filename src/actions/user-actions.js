import { auth } from 'api';
import * as types from 'constants/types';

const fetchUserLoad = () => ({
    type: types.FETCH_USER_LOAD
});

const fetchUserSuccess = (entities) => ({
    type: types.FETCH_USER_SUCCESS,
    entities
});

const fetchUserError = () => ({
    type: types.FETCH_USER_ERROR
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

export { fetchUser };