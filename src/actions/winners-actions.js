import { winners } from 'api';
import * as types from 'constants/types';

const fetchWinnersLoad = () => ({
    type: types.FETCH_WINNERS_LOAD
});

const fetchWinnersSuccess = (entities) => ({
    type: types.FETCH_WINNERS_SUCCESS,
    entities
});

const fetchWinnersError = (error) => ({
    type: types.FETCH_WINNERS_ERROR,
    error
});

async function fetchWinners(dispatch, getState) {
    const { project: { data: project } } = getState();

    if (!project) {
        return;
    }

    dispatch(fetchWinnersLoad());

    try {
        const response = await winners(project.id);
        dispatch(fetchWinnersSuccess(response.data));
    } catch (e) {
        dispatch(fetchWinnersError('load error'));
    }
}

export { fetchWinners };