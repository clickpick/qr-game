import { activeProject } from 'api';
import * as types from 'constants/types';

const fetchProjectLoad = () => ({
    type: types.FETCH_PROJECT_LOAD
});

const fetchProjectSuccess = (entities) => ({
    type: types.FETCH_PROJECT_SUCCESS,
    entities
});

const fetchProjectError = () => ({
    type: types.FETCH_PROJECT_ERROR
});

async function fetchProject(dispatch) {
    dispatch(fetchProjectLoad());

    try {
        const response = await activeProject();
        dispatch(fetchProjectSuccess(response.data));
    } catch (e) {
        dispatch(fetchProjectError());
    }
}

export { fetchProject };