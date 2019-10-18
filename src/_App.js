import React, { useState, useEffect, useCallback, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import connect from '@vkontakte/vk-connect';
import { Root, View, ModalRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import * as VIEW from 'constants/views';
import * as MODAL from 'constants/modals';

import './App.css';

import Home from 'panels/Home';
import Finish from 'panels/Finish';
import Spinner from 'panels/Spinner';

import ErrorCard from 'modals/ErrorCard';

import PopupContainer from 'components/PopupContainer';
import Popup from 'components/Popup';
import DonateForm from 'components/DonateForm';

import { fetchUser, fetchActivateKey } from 'actions/user-actions';
import { fetchProject, finishProject } from 'actions/project-actions';
import { fetchShareStory } from 'actions/share-story-actions';
import { showDonateForm, hideDonateForm, donate } from 'actions/donate-form-actions';

import { debounce, getHash } from 'helpers';

export default function App() {
    const { user, project, shareStory, donateForm } = useSelector(state => state);
    const dispatch = useDispatch();

    const [activeView, setActiveView] = useState(VIEW.SPINNER);
    const [activeModal, setActiveModal] = useState(null);

    const [errorLoad, setErrorLoad] = useState({});

    useEffect(() => {
        dispatch(fetchUser);
        dispatch(fetchProject);
    }, [dispatch]);

    useEffect(() => {        
        function checkFetchSuccess(entities) {
            return Boolean(!entities.loading && entities.error === false && entities.data);
        }

        function getFetchError(entities) {
            return !entities.loading && entities.error;
        }

        /**
         * Проверяем результаты запросов на ошибки
         */
        let currentModal = activeModal;
        const fetchUserError = getFetchError(user);
        const fetchProjectError = getFetchError(project);

        if (fetchUserError && currentModal === null) {
            setErrorLoad({
                title: 'Ой...',
                caption: fetchUserError,
                action: {
                    title: 'Попробовать ещё раз',
                    action: () => {
                        setErrorLoad({});
                        setActiveModal(null);
                        dispatch(fetchUser);
                    }
                }
            });
            setActiveModal(MODAL.ERROR_LOAD);

            currentModal = MODAL.ERROR_LOAD;
        }

        if (fetchProjectError && currentModal === null) {
            setErrorLoad({
                title: 'Ой...',
                caption: fetchProjectError,
                action: {
                    title: 'Попробовать ещё раз',
                    action: () => {
                        setErrorLoad({});
                        setActiveModal(null);
                        dispatch(fetchProject);
                    }
                }
            });
            setActiveModal(MODAL.ERROR_LOAD);
        }

        /**
         * Если всё получино, то устанавливаем нужную view
         */
        if (checkFetchSuccess(user) && checkFetchSuccess(project)) {
            if (project.data.is_finished) {
                setTimeout(() => setActiveView(VIEW.FINISH), 200);   
            } else if (activeView === VIEW.SPINNER) {
                setTimeout(() => setActiveView(VIEW.MAIN), 200);
            }
        }
    }, [user, project, activeView, activeModal, dispatch]);

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

            if (type === 'VKWebAppOpenPayFormResult' || type === 'VKWebAppOpenPayFormFailed') {
                console.log(type, data);
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

    function closeModal() {
        setActiveModal(null);
    }

    const spinnerModal = (
        <ModalRoot activeModal={activeModal}>
            <ErrorCard id={MODAL.ERROR_LOAD} {...errorLoad} close={closeModal} />
        </ModalRoot>
    );
    
    return <>
        <Root activeView={activeView}>
            <View id={VIEW.MAIN} activePanel="home" header={false}>
                <Home
                    id="home"
                    user={user.data}
                    project={project.data}
                    disabledOpenScan={user.loading}
                    qrCodeRef={qrCodeRef}
                    share={share}
                    disabledShare={shareStory.sharing}
                    openDonateForm={() => dispatch(showDonateForm())}
                    disabledOpenDonateForm={donateForm.loading} />
            </View>
            <View id={VIEW.FINISH} activePanel="finish">
                <Finish id="finish" user={user.data} project={project.data} />
            </View>
            <View id={VIEW.SPINNER} activePanel="spinner" modal={spinnerModal}>
                <Spinner id="spinner" />
            </View>
        </Root>

        <PopupContainer>
            <Popup
                visible={donateForm.visible}
                dialogProps={{
                    title: 'Пожертвование',
                    message: 'Все деньги идут напрямую фонду через систему VK Pay'
                }}
                onClose={() => dispatch(hideDonateForm())}>
                <DonateForm
                    className="Popup__DonateForm"
                    onSubmit={(amount) => dispatch(donate(connect, amount))}
                    onCancel={() => dispatch(hideDonateForm())}
                    disabledSubmit={donateForm.loading} />
            </Popup>
        </PopupContainer>
    </>;
}