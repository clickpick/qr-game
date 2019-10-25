export const NOTIFICATION_DELAY = 5000;

export const QR_LOAD = 'qr-load';
export const QR_SUCCESS = 'qr-success';
export const QR_ERROR = 'qr-error';
export const QR_NOT_FOUND = 'qr-not-found';
export const QR_SERVER_ERROR = 'qr-server-error';
export const QR_FINISH_GAME = 'qr-finish-game';
export const QR_LOAD_DELAY = 7000;

export const TOKEN_NOT_FOUND = 'token-not-found';

export const SHARE_STORY_PREVIEW = 'share-story-preview';
export const SHARE_STORY_PREVIEW_ERROR = 'share-story-preview-error';
export const SHARE_STORY_LOAD = 'share-story-load';
export const SHARE_STORY_SUCCESS = 'share-story-success';
export const SHARE_STORY_ERROR = 'share-story-error';
export const SHARE_STORY_QR_ERROR = 'share-story-qr-error';

export const RULES = 'rules';

export const GAME_INFO = 'game-info';

export const FETCH_USER_ERROR = 'fetch-user-error';
export const FETCH_PROJECT_ERROR = 'fetch-project-error';

export const DONATE_FORM = {
    title: 'Пожертвование',
    message: 'Все деньги идут напрямую фонду через систему VK Pay'
};
export const DONATE_FORM_SUCCESS = 'donate-form-success';
export const DONATE_FORM_ERROR = 'donate-form-error';
export const DONATE_FORM_SERVER_ERROR = 'donate-form-server-error';

export const FETCH_REQUEST_FUNDING_LOAD = 'fetch-request-funding-load';
export const FETCH_REQUEST_FUNDING_SUCCESS = 'fetch-request-funding-success';
export const FETCH_REQUEST_FUNDING_ERROR = 'fetch-request-funding-error';
export const FETCH_REQUEST_FUNDING_DELAY = 2000;

export const OFFLINE = 'offline';

export const CHEAT = {
    type: 'danger',
    imageType: 'cheat',
    title: 'Неудачно, но есть ЧИТ!',
    message: 'Поддержи фонд и получи новый символ!'
};
export const CHEAT_PROCESSING = 'cheat-processing';
export const CHEAT_SUCCESS = 'cheat-success';
export const CHEAT_ERROR = 'cheat-error';
export const CHEAT_NOT_FOUND = 'cheat-not-found';

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
    [QR_NOT_FOUND]: {
        type: 'danger',
        imageType: 'error',
        title: 'Ой...',
        message: 'А тут ничего нет'
    },
    [QR_SERVER_ERROR]: {
        type: 'info',
        imageType: 'error',
        title: 'Ой...',
        message: 'На нашей стороне какие-то неполадки. Мы их уже решаем'
    },
    [QR_FINISH_GAME]: {
        type: 'success',
        imageType: 'cheat',
        title: 'Поздравляем, ты выиграл!'
    },

    [TOKEN_NOT_FOUND]: {
        type: 'danger',
        imageType: 'error',
        title: 'Тут ничего нет',
        message: 'В этом QR коде нет никакого символа'
    },

    [SHARE_STORY_PREVIEW]: {
        type: 'info',
        title: 'Так будет выглядить твоя история',
    },
    [SHARE_STORY_PREVIEW_ERROR]: {
        type: 'danger',
        imageType: 'info',
        title: 'Упс...',
        message: 'Что-то не получилось у нас показать тебе твою историю'
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
    [SHARE_STORY_QR_ERROR]: {
        type: 'info',
        imageType: 'connect',
        title: 'Погоди-погоди...',
        message: 'Твой QR код ещё не готов, поэтому пока мы не можем опубликовать твою историю'
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
        message: `Снежный барс – один из самых скрытных крупных хищников. В России их осталось всего 90. Ты можешь помочь сохранить редких кошек, сыграв в “QR Game”. Также ты можешь поддержать пожертвованием Всемирному фонду дикой природы.`,
    },

    [FETCH_USER_ERROR]: {
        type: 'info',
        imageType: 'info',
        title: 'Ой...',
        message: 'Мы не смогли тебя авторизовать :(',
    },
    [FETCH_PROJECT_ERROR]: {
        type: 'info',
        imageType: 'info',
        title: 'Ой...',
        message: 'Мы не смогли загрузить проект :(',
    },

    [DONATE_FORM_SUCCESS]: {
        type: 'success',
        imageType: 'info',
        title: 'Спасибо!',
        message: 'Твои средства были направлены во Всемирный фонд дикой природы. Продолжай играть! А если хочешь помочь ещё больше, то поделись историей или расскажи своим друзьям об игре!'
    },
    [DONATE_FORM_ERROR]: {
        type: 'info',
        imageType: 'info',
        title: 'Ничего страшного',
        message: 'Ты сможешь сделать пожертвование в другой раз'
    },
    [DONATE_FORM_SERVER_ERROR]: {
        type: 'danger',
        imageType: 'info',
        title: 'Хм...',
        message: 'У нас какие-то неполадки. Мы уже устраняем их'
    },

    [OFFLINE]: {
        type: 'info',
        imageType: 'connect',
        title: 'Погоги-погоди',
        message: 'А где доступ в Интернет?'
    },

    [FETCH_REQUEST_FUNDING_LOAD]: {
        type: 'info',
        imageType: 'loading',
        title: 'Отправляем твою заявку'
    },
    [FETCH_REQUEST_FUNDING_SUCCESS]: {
        type: 'success',
        imageType: 'success',
        title: 'Твоя завяка отправлена!',
        message: 'Скоро мы свяжемся с тобой'
    },
    [FETCH_REQUEST_FUNDING_ERROR]: {
        type: 'danger',
        imageType: 'error',
        title: 'Что-то пошло не так...',
        message: 'Твоя заявка, к сожалению, не отправлена. Мы уже работаем над этой проблемой'
    },

    [CHEAT_PROCESSING]: {
        type: 'info',
        imageType: 'loading',
        title: 'Отлично!',
        message: 'Твой платёж обрабатывается. Мы сообщим, когда ты получишь новый символ'
    },
    [CHEAT_SUCCESS]: {
        type: 'success',
        imageType: 'cheat',
        title: 'Умничка!',
    },
    [CHEAT_ERROR]: {
        type: 'info',
        imageType: 'info',
        title: 'Ничего страшного',
        message: 'Восмпользуешься ЧИТом в следующий раз'
    },
    [CHEAT_NOT_FOUND]: {
        type: 'danger',
        imageType: 'error',
        title: 'С твоим ЧИТом что-то не так...'
    }
};