import * as types from 'constants/types';
import NOTIFICATIONS from 'constants/notifications';

const addNotification = (entities) => ({
    type: types.NOTIFICATION_ADD,
    entities
});

const closeNotification = () => ({
    type: types.NOTIFICATION_CLOSE
});

const showNotification = (notificationId, props = {}, timeout = 5000) => (dispatch, getState) => {
    const { notification } = getState();
    const hasActiveNotifications = notification && notification.visible;
    let delay = 0;

    if (hasActiveNotifications) {
        delay = 500;
        dispatch(closeNotification());
    }    

    setTimeout(() => {
        dispatch(addNotification({
            ...NOTIFICATIONS[notificationId],
            ...props
        }));

        if (timeout) {
            setTimeout(() => { dispatch(closeNotification()); }, timeout);
        }
    }, delay);
};

export { showNotification, closeNotification };

