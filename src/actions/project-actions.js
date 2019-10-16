import { activeProject } from 'api';
import * as types from 'constants/types';

const fetchProjectLoad = () => ({
    type: types.FETCH_PROJECT_LOAD
});

const fetchProjectSuccess = (entities) => ({
    type: types.FETCH_PROJECT_SUCCESS,
    entities
});

const fetchProjectError = (error) => ({
    type: types.FETCH_PROJECT_ERROR,
    error
});

async function fetchProject(dispatch) {
    dispatch(fetchProjectLoad());

    try {
        const response = await activeProject();
        dispatch(fetchProjectSuccess(response.data));
    } catch (e) {
        dispatch(fetchProjectError('Мы не смогли загрузить проект'));
    }
}

export { fetchProject };