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

export const activeProjectKey = (projectId, data) =>
    requestPost(`/projects/${projectId}/activate-project-key`, data);

export const projectFacts = (projectId) =>
    requestGet(`/projects/${projectId}/project-facts`);