const requestPost = (urn, data) =>
    window.axios.post(urn, data)
        .then(({ data: { data }, status }) => ({ data, status }));

const requestGet = (urn) =>
    window.axios.get(urn)
        .then(({ data: { data }, status }) => ({ data, status }));

export const auth = (data) => requestPost('/auth', data);

export const activeProject = () => requestGet('/active-project');

export const userProjectKey = (projectId) =>
    requestGet(`/projects/${projectId}/user-project-key`);

export const activatedProjectKeys = (projectId) =>
    requestGet(`/projects/${projectId}/activated-project-keys`);

export const activeProjectKey = (projectId, token) =>
    requestPost(`/projects/${projectId}/activate-project-key`, { token });

export const projectFacts = (projectId) =>
    requestGet(`/projects/${projectId}/project-facts`);

export const toggleNotifications = (enabled) =>
    requestPost('/notifications', { enabled });

export const requestFunding = (data) =>
    requestPost('/request-funding', data);

export const getVKPayParams = (amount) => requestPost('/vk-pay-order', { amount });

export const getVKPayParamsWithCheat = () => requestPost('/vk-pay-cheat-order');

export const activateCheat = (order_id) => requestPost('/activate-cheat', { order_id });

export const postStory = (upload_url, image) => requestPost('/post-story', { upload_url, image });