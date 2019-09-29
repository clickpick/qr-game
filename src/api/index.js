import { default as pureAxios } from 'axios';

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

export const shareStory = (urn, base64image) => {
    let arr = base64image.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    const body = new FormData();
    body.append("file", new File([u8arr], "story.png", { type: mime }));
    return pureAxios.post(`https://cors-anywhere.herokuapp.com/${urn}`, body);
};

export const projectFacts = (projectId) =>
    requestGet(`/projects/${projectId}/project-facts`);