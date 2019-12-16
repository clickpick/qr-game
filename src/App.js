import React, { useState, useEffect, useCallback, createRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import connect from '@vkontakte/vk-connect';
import {
    Root, View,
    ModalRoot, ModalPage, ModalPageHeader, HeaderButton,
    platform, ANDROID, IOS
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import * as VIEW from 'constants/views';
import * as MODAL from 'constants/modals';
import * as NOTIFICATION from 'constants/notifications';
import { MOBILE_WEB, WEB } from 'constants/platform';

import './App.css';

import Home from 'panels/Home';
import Finish from 'panels/Finish';
import Spinner from 'panels/Spinner';

import PopupContainer from 'components/PopupContainer';
import Popup from 'components/Popup';
import DonateForm from 'components/DonateForm';
import RequestFundingForm from 'components/RequestFundingForm';
import Scanner from 'components/Scanner';

import { fetchUser, fetchActivateKey, enableNotifications } from 'actions/user-actions';
import { fetchProject } from 'actions/project-actions';
import { previewShareStory } from 'actions/share-story-actions';
import { openDonateForm, hideDonateForm, donate } from 'actions/donate-form-actions';
import { showNotification, closeNotification } from 'actions/notification-actions';
import { fetchRequestFunding } from 'actions/request-funding-actions';
import { getCheat, hideCheat } from 'actions/cheat-actions';
import { setPlatform } from 'actions/platform-actions';
import { fetchWinners } from 'actions/winners-actions';

import { debounce, getHash } from 'helpers';

const osname = platform();

export default function App() {
    const {
        user, project,
        shareStory, donateForm,
        notification, requestFunding, cheat,
        platform: currentPlatform,
        winners
    } = useSelector(state => state);
    const dispatch = useDispatch();

    const [activeView, setActiveView] = useState(VIEW.SPINNER);
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        if (!user.loading && !user.data && !user.error) {
            dispatch(fetchUser);
        }

        if (!user.loading && user.data && !project.data && !project.loading) {
            dispatch(fetchProject);
        }
    }, [user, project, dispatch]);

    const showRules = useCallback(() => {
        dispatch(showNotification(NOTIFICATION.RULES, {
            actions: [{
                theme: 'info',
                title: 'Понятно',
                full: true,
                action: () => dispatch(closeNotification())
            }]
        }, 0));
    }, [dispatch]);

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
            dispatch(showNotification(NOTIFICATION.TOKEN_NOT_FOUND));
            return;
        }

        dispatch(fetchActivateKey(token));
    }, 200), [dispatch]);

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
        let errorSet = false;
        const fetchUserError = getFetchError(user);
        const fetchProjectError = getFetchError(project);

        if (fetchUserError && !errorSet) {
            dispatch(showNotification(NOTIFICATION.FETCH_USER_ERROR, {
                actions: [{
                    disabled: true,
                    theme: 'primary',
                    title: 'Попробовать ещё раз',
                    full: true,
                    action: () => dispatch(fetchUser)
                }]
            }, 0));

            errorSet = true;
        }

        if (fetchProjectError && !errorSet) {
            dispatch(showNotification(NOTIFICATION.FETCH_USER_ERROR, {
                actions: [{
                    disabled: true,
                    theme: 'primary',
                    title: 'Попробовать ещё раз',
                    full: true,
                    action: () => dispatch(fetchProject)
                }]
            }, 0));
        }

        /**
         * Если всё получино, то устанавливаем нужную view
         */
        if (checkFetchSuccess(user) && checkFetchSuccess(project)) {
            if (!winners.loading && !winners.data) {
                dispatch(fetchWinners);
            }

            if (project.data.is_finished) {
                setTimeout(() => setActiveView(VIEW.MAIN), 200);
            } else if (activeView === VIEW.SPINNER) {
                setTimeout(() => {
                    setActiveView(VIEW.MAIN);

                    if (user.data.status === 201) {
                        setTimeout(() => {
                            dispatch(showNotification(NOTIFICATION.GAME_INFO, {
                                actions: [{
                                    theme: 'info',
                                    title: 'Начать игру',
                                    full: true,
                                    action: showRules
                                }]
                            }, 0));
                        }, 600);
                    }

                    if (window.location.href.indexOf('token=') !== -1) {
                        activateProjectKey(window.location.href);
                    }
                }, 200);
            }
        }
    }, [user, project, winners, activeView, showRules, dispatch, activateProjectKey]);

    useEffect(() => {
        window.addEventListener('online', () => {
            if (navigator.onLine) {
                dispatch(closeNotification());
            }
        });

        window.addEventListener('offline', () => {
            if (!navigator.onLine) {
                dispatch(showNotification(NOTIFICATION.OFFLINE, {}, 0));
            }
        });

        connect.subscribe(({ detail: { type, data } }) => {
            if (type === 'VKWebAppOpenQRResult') {
                activateProjectKey(data.qr_data);
            }

            if (type === 'VKWebAppGetClientVersionResult') {
                dispatch(setPlatform(data.platform));
            }
        });
    }, [activateProjectKey, dispatch]);

    useEffect(() => {
        connect.send('VKWebAppGetClientVersion');

        if (connect.supports('VKWebAppSetViewSettings')) {
            const scheme = document.body.getAttribute('scheme');
            if (scheme === 'client_dark' || scheme === 'space_gray') {
                connect.send('VKWebAppSetViewSettings', { status_bar_style: 'ligth', action_bar_color: '#1A222C' });
            } else {
                connect.send('VKWebAppSetViewSettings', { status_bar_style: 'dark', action_bar_color: '#fff' });
            }
        }
    }, []);

    const qrCodeRef = createRef();

    /**
     * Пробрасываем в debounce,
     * потому что бывают моменты,
     * когда пользователь нажимает на кнопку
     * несколько раз, при это сканер
     * ещё не открылся в силу мощности устройства.
     */
    const openQR = debounce(() => {
        if (currentPlatform === MOBILE_WEB || currentPlatform === WEB) {
            dispatch(showNotification(NOTIFICATION.MOBILE_SCANNER, {
                children: <Scanner onScanned={activateProjectKey} />
            }, 0));

            return;
        }

        connect.send('VKWebAppOpenQR');
    }, 200);

    const share = debounce(() => {
        if (qrCodeRef && qrCodeRef.current) {
            const svg = qrCodeRef.current.firstElementChild;
            dispatch(previewShareStory(connect, svg));

            return;
        }

        dispatch(showNotification(NOTIFICATION.SHARE_STORY_QR_ERROR));
    }, 200);

    function modalBack() {
        setActiveModal(null);
    }

    function handleRequestFundingSubmit(data) {
        modalBack();
        dispatch(fetchRequestFunding(data, showNotification));
    }

    const showPrize = useCallback(() => {
        dispatch(showNotification(NOTIFICATION.PRIZE, {
            actions: [{
                theme: 'info',
                title: 'Класс!',
                full: true,
                action: () => dispatch(closeNotification())
            }]
        }, 0));
    }, [dispatch]);

    const showThanskWWF = useCallback(() => {
        dispatch(showNotification(NOTIFICATION.THANKS_WWF, {
            title: (user.data && user.data.first_name)
                ? `Привет, ${user.data.first_name}!`
                : 'Привет!'
        }, 0))
    }, [dispatch, user]);

    const mainModal = (
        <ModalRoot activeModal={activeModal}>
            <ModalPage
                id={MODAL.REQUEST_FUNDING}
                header={<ModalPageHeader
                    left={(osname === ANDROID) &&
                        <HeaderButton children={<Icon24Cancel className="App__Cancel" />} onClick={modalBack} />}
                    right={(osname === IOS) &&
                        <HeaderButton children="Отмена" onClick={modalBack} />}
                    children="Подключение проекта" />}
                onClose={modalBack}>
                <RequestFundingForm onSubmit={handleRequestFundingSubmit} disabledSubmit={requestFunding.loading} />
            </ModalPage>
        </ModalRoot>
    );

    return <>
        <Root activeView={activeView}>
            <View id={VIEW.MAIN} activePanel="home" header={false} modal={mainModal}>
                <Home
                    id="home"
                    user={user.data}
                    project={project.data}
                    qrCodeRef={qrCodeRef}
                    openQR={openQR}
                    disabledOpenQR={user.loading}
                    share={share}
                    disabledShare={shareStory.sharing}
                    openDonateForm={() => dispatch(openDonateForm())}
                    showRules={showRules}
                    showPrize={showPrize}
                    openRequestFundingModal={() => setActiveModal(MODAL.REQUEST_FUNDING)} />
            </View>
            <View id={VIEW.FINISH} activePanel="finish" modal={mainModal}>
                <Finish
                    id="finish"
                    user={user.data}
                    project={project.data}
                    winners={winners.data}
                    openDonateForm={() => dispatch(openDonateForm())}
                    enableNotifications={enableNotifications}
                    openRequestFundingModal={() => setActiveModal(MODAL.REQUEST_FUNDING)}
                    showThanskWWF={showThanskWWF} />
            </View>
            <View id={VIEW.SPINNER} activePanel="spinner">
                <Spinner id="spinner" />
            </View>
        </Root>

        <PopupContainer>
            <Popup
                visible={donateForm.visible}
                {...NOTIFICATION.DONATE_FORM}
                onClose={() => dispatch(hideDonateForm())}>
                <DonateForm
                    className="Popup__DonateForm"
                    onSubmit={(amount) => dispatch(donate(connect, amount))}
                    onCancel={() => dispatch(hideDonateForm())}
                    disabledSubmit={donateForm.loading} />
            </Popup>

            {(notification) &&
                <Popup {...notification} onClose={() => dispatch(closeNotification())} />}

            <Popup
                visible={cheat.visible}
                {...NOTIFICATION.CHEAT}
                title={(cheat.symbol) ? `Символ “${cheat.symbol}” у тебя уже есть. Но есть ЧИТ!` : NOTIFICATION.CHEAT.title}
                actions={[
                    {
                        theme: 'info',
                        title: 'Отмена',
                        action: () => dispatch(hideCheat()),
                        disabled: cheat.loading
                    },
                    {
                        theme: 'primary',
                        title: 'Пожертвовать 50 ₽',
                        full: true,
                        action: () => dispatch(getCheat(connect)),
                        disabled: cheat.loading
                    }
                ]}
                onClose={() => dispatch(hideCheat())} />
        </PopupContainer>
    </>;
}