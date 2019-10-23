export const USER_INITIAL_STATE = {
    error: false,
    loading: false,
    data: null
};

export const PROJECT_INITIAL_STATE = {
    error: false,
    loading: false,
    data: null
};

export const SHARE_STORY_INITIAL_STATE = {
    sharing: false,
    error: false
};

export const DONATE_FORM_INITIAL_STATE = {
    loading: false,
    visible: false
};

export const REQUEST_FUNDING_INITIAL_STATE = {
    loading: false,
};

export const NOTIFICATION_INITIAL_STATE = null;

export const CHEAT_INITIAL_STATE = {
    loading: false,
    visible: false
};

export const INITIAL_STATE = {
    user: USER_INITIAL_STATE,
    project: PROJECT_INITIAL_STATE,
    shareStory: SHARE_STORY_INITIAL_STATE,
    donateForm: DONATE_FORM_INITIAL_STATE,
    notification: NOTIFICATION_INITIAL_STATE,
    requestFunding: REQUEST_FUNDING_INITIAL_STATE,
    cheat: CHEAT_INITIAL_STATE
};