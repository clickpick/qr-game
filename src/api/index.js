const request = (urn, data) =>
    window.axios.post(urn, data)
        .then(({ data: { data }, status }) => ({ data, status }));

export const auth = (data) => request('/auth', data);