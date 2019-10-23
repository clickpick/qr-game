import { auth, activeProjectKey } from 'api';
import * as types from 'constants/types';

import { showNotification, closeNotification } from 'actions/notification-actions';
import { finishProject } from 'actions/project-actions';
import { showCheat } from 'actions/cheat-actions';

import {
    QR_LOAD, QR_LOAD_DELAY,
    QR_SUCCESS, QR_FINISH_GAME, QR_ERROR,
    QR_NOT_FOUND, QR_SERVER_ERROR
} from 'constants/notifications';

const fetchUserLoad = () => ({
    type: types.FETCH_USER_LOAD
});

const fetchUserLoadEnd = () => ({
    type: types.FETCH_USER_LOAD_END
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
        dispatch(fetchUserSuccess({
            ...response.data,
            status: response.status
        }));
    } catch (e) {
        dispatch(fetchUserError('Мы не смогли тебя авторизовать :('));
    }
}

const fetchActivateKey = (token) => async (dispatch, getState) => {
    const { project } = getState();

    if (!project.data) {
        // todo
        console.log('no-project');
        return;
    }

    dispatch(fetchUserLoad());
    dispatch(showNotification(QR_LOAD, { message: getRandomFact(project.data.project_facts) }, 0));

    try {
        const response = await activeProjectKey(project.data.id, token);

        setTimeout(() => {
            dispatch(addNewKey(response.data));

            if (response.data.is_last) {
                dispatch(showNotification(QR_FINISH_GAME, {
                    message: `Ты открыл последний символ “${response.data.value.toUpperCase()}”!`
                }, 5000));
                dispatch(finishProject());

                return;
            }

            dispatch(showNotification(QR_SUCCESS, {
                message: `Ты открыл новый символ “${response.data.value.toUpperCase()}”!`
            }));
        }, QR_LOAD_DELAY);
    } catch (e) {
        setTimeout(() => {
            dispatch(fetchUserLoadEnd());

            if (e.response.status === 403) {
                dispatch(showNotification(QR_ERROR));
            }

            if (e.response.status === 404) {
                dispatch(showNotification(QR_NOT_FOUND));
            }

            if (e.response.status === 422) {
                let symbol = '';
                if (e.response.data && e.response.data.data) {
                    if (e.response.data.data.value) {
                        symbol = e.response.data.data.value;
                    }

                    if (e.response.data.data.has_cheat) {
                        dispatch(closeNotification());
                        dispatch(showCheat());

                        return;
                    }
                }

                dispatch(showNotification(QR_ERROR, {
                    title: 'Sorry',
                    message: `Символ “${symbol.toUpperCase()}” у тебя уже есть.`
                }));
            }

            if (e.response.status === 500) {
                dispatch(showNotification(QR_SERVER_ERROR));
            }
        }, QR_LOAD_DELAY);
    }
}

function getRandomFact(facts) {
    if (Array.isArray(facts) && facts.length > 0) {
        const index = getRandomIndexFact(facts.length - 1);

        return facts[index].text;
    }

    return '';
}

function getRandomIndexFact(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

export { fetchUser, fetchActivateKey, addNewKey };