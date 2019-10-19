export const QR_LOAD = 'qr-load';
export const QR_SUCCESS = 'qr-success';
export const QR_ERROR = 'qr-error';
export const QR_LOAD_DELAY = 7000;

export const TOKEN_NOT_FOUND = 'token-not-found';

export const SHARE_STORY_LOAD = 'share-story-load';
export const SHARE_STORY_SUCCESS = 'share-story-success';
export const SHARE_STORY_ERROR = 'share-story-error';

export const RULES = 'rules';

export const GAME_INFO = 'game-info';

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
    },

    [SHARE_STORY_LOAD]: {
        type: 'info',
        imageType: 'loading',
        title: 'Публикуем твою историю'
    },
    [SHARE_STORY_SUCCESS]: {
        type: 'success',
        imageType: 'success',
        title: 'Круто!',
        message: 'История опубликована'
    },
    [SHARE_STORY_ERROR]: {
        type: 'danger',
        imageType: 'error',
        title: 'Что-то пошло не так...',
        message: 'История не опубликована'
    },

    [RULES]: {
        type: 'info',
        imageType: 'rules',
        title: 'Правила',
        message: 'У тебя и твоих друзей есть QR коды с зашифрованными символами. Твоя задача отыскать 5 уникальных символов для выигрышной комбинации!'
    },

    [GAME_INFO]: {
        type: 'info',
        imageType: 'leopard',
        title: 'Защитим снежного барса',
        message: `Снежный барс – один из самых скрытных крупных хищников. В России их осталось всего 90. Ты можешь помочь сохранить редких кошек, сыграв в “QR Game”. Также ты можешь поддержать пожертвованием Всемирный фонд дикой природы.`,
    }
};