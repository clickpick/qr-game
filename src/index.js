import 'core-js/features/map';
import 'core-js/features/set';
import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import { INITIAL_STATE } from 'constants/store';

import fastclick from 'fastclick';
import axios from 'axios';
import { parseQueryString, getTimezoneOffset } from 'helpers';
import connect from '@vkontakte/vk-connect';
import * as Sentry from '@sentry/browser';
import mVKMiniAppsScrollHelper from '@vkontakte/mvk-mini-apps-scroll-helper';

import App from './App';

// import registerServiceWorker from './sw';

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

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        fastclick.attach(document.getElementById('popup'));
    }, false);
}

// Init VK  Mini App
connect.send('VKWebAppInit');

if (process.env.NODE_ENV !== 'development') {
    Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DNS });
}

mVKMiniAppsScrollHelper(root);

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
