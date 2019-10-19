export const QR_LOAD = 'qr-load';
export const QR_SUCCESS = 'qr-success';
export const QR_ERROR = 'qr-error';
export const QR_LOAD_DELAY = 7000;

export const TOKEN_NOT_FOUND = 'token-not-found';

export const DONATE_FORM = {
    title: 'Пожертвование',
    message: 'Все деньги идут напрямую фонду через систему VK Pay'
};

export default {
    [QR_LOAD]: {
        type: 'info',
        imageType: 'loading',
        title: 'Обработка QR кода'
    },
    [QR_SUCCESS]: {
        type: 'success',
        imageType: 'success',
        title: 'Удачно!',
    },
    [QR_ERROR]: {
        type: 'danger',
        imageType: 'error',
        title: 'Хм...',
        message: 'Зачем ты сканируешь свой QR код?'
    },
    [TOKEN_NOT_FOUND]: {
        type: 'danger',
        imageType: 'error',
        title: 'Тут ничего нет',
        message: 'В этом QR коде нет никакого символа'
    }
};