import * as types from 'constants/types';
import NOTIFICATIONS, { NOTIFICATION_DELAY } from 'constants/notifications';
import connect from '@vkontakte/vk-connect';

const notificationTypes = {
    info: 'warning',
    success: 'success',
    danger: 'error',
};

const addNotification = (entities) => ({
    type: types.NOTIFICATION_ADD,
    entities
});

const closeNotification = () => ({
    type: types.NOTIFICATION_CLOSE
});

const showNotification = (notificationId, props = {}, timeout = NOTIFICATION_DELAY) => (dispatch, getState) => {
    const { notification } = getState();
    const hasActiveNotifications = notification && notification.visible;
    let delay = 0;

    if (hasActiveNotifications) {
        delay = 500;
        dispatch(closeNotification());
    }    

    setTimeout(() => {
        const notificationProps = {
            ...NOTIFICATIONS[notificationId],
            ...props
        };

        dispatch(addNotification(notificationProps));

        if (connect.supports('VKWebAppTapticNotificationOccurred')) {
            connect.send('VKWebAppTapticNotificationOccurred', { type: notificationTypes[notificationProps.type || 'info'] });
        }

        if (timeout) {
            setTimeout(() => { dispatch(closeNotification()); }, timeout);
        }
    }, delay);
};

export { showNotification, closeNotification };

