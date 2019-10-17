import React, { useState, useEffect, useCallback, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import connect from '@vkontakte/vk-connect';
import { Root, View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import * as VIEW from 'constants/views';

import Home from 'panels/Home';
import Finish from 'panels/Finish';
import Spinner from 'panels/Spinner';

import './App.css';

import { fetchUser, fetchActivateKey } from 'actions/user-actions';
import { fetchProject, finishProject } from 'actions/project-actions';
import { fetchShareStory } from 'actions/share-story-actions';

import { debounce, getHash } from 'helpers';

export default function App() {
    const { user, project, shareStory } = useSelector(state => state);
    const dispatch = useDispatch();

    const [activeView, setActiveView] = useState(VIEW.SPINNER);

    useEffect(() => {
        dispatch(fetchUser);
        dispatch(fetchProject);
    }, [dispatch]);

    useEffect(() => {        
        function checkFetchSuccess(entities) {
            return Boolean(!entities.loading && entities.error === false && entities.data);
        }

        if (checkFetchSuccess(user) && checkFetchSuccess(project)) {
            if (project.data.is_finished) {
                setTimeout(() => setActiveView(VIEW.FINISH), 200);   
            } else if (activeView === VIEW.SPINNER) {
                setTimeout(() => setActiveView(VIEW.MAIN), 200);
            }
        }
    }, [user, project, activeView]);

    /**
     * Пробрасываем в debounce,
     * потому что бывают моменты,
     * когда connect срабатывает дважды
     */
    const activateProjectKey = useCallback(debounce((link) => {
        let token = '';
        const params = getHash(link).split('&');

        for (let i = 0; i < params.length; i++) {
            const [key, value] = params[i].split('=');

            if (key === 'token') {
                token = value;
                break;
            }
        }

        if (!token) {
            // todo noty
            return;
        }

        dispatch(fetchActivateKey(token, finishProject));
    }, 200), [dispatch]);

    useEffect(() => {
        connect.subscribe(({ detail: { type, data } }) => {
            if (type === 'VKWebAppOpenQRResult') {
                activateProjectKey(data.qr_data);
            }
        });
    }, [activateProjectKey]);

    useEffect(() => {
        connect.send('VKWebAppSetViewSettings', { status_bar_style: 'dark' });
    }, []);

    const qrCodeRef = createRef();

    function share() {
        const svg = qrCodeRef.current.firstElementChild;
        dispatch(fetchShareStory(connect, svg));
    }
    
    return (
        <Root activeView={activeView}>
            <View id={VIEW.MAIN} activePanel="home" header={false}>
                <Home
                    id="home"
                    user={user.data}
                    project={project.data}
                    disabledOpenScan={user.loading}
                    qrCodeRef={qrCodeRef}
                    share={share}
                    disabledShare={shareStory.sharing} />
            </View>
            <View id={VIEW.FINISH} activePanel="finish">
                <Finish id="finish" user={user.data} project={project.data} />
            </View>
            <View id={VIEW.SPINNER} activePanel="spinner">
                <Spinner id="spinner" />
            </View>
        </Root>
    );
}