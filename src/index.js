import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import { INITIAL_STATE } from 'constants/store';

import connect from '@vkontakte/vk-connect';
import fastclick from 'fastclick';
import axios from 'axios';
import { parseQueryString, getTimezoneOffset } from 'helpers';
import * as Sentry from '@sentry/browser';

import App from './App';

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        fastclick.attach(document.getElementById('popup'));
    }, false);
}

window.axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Vk-Params': window.btoa(JSON.stringify({
            ...parseQueryString(window.location.search),
            'utc_offset': getTimezoneOffset(),
        })),
        'Accept': 'application/json'
    },
});
// import registerServiceWorker from './sw';

if (process.env.NODE_ENV !== 'development') {
    Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DNS });
}

// Init VK  Mini App
connect.send('VKWebAppInit');

// Если вы хотите, чтобы ваше веб-приложение работало в оффлайне и загружалось быстрее,
// расскомментируйте строку с registerServiceWorker();
// Но не забывайте, что на данный момент у технологии есть достаточно подводных камней
// Подробнее про сервис воркеры можно почитать тут — https://vk.cc/8MHpmT
// registerServiceWorker();

render(
    <Provider store={configureStore(INITIAL_STATE)}>
        <App />
    </Provider>,
    document.getElementById('root')
);
