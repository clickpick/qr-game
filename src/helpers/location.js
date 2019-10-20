export const parseQueryString = (string) =>
    string.slice(1).split('&')
        .map((queryParam) => {
            const [key, value] = queryParam.split('=');

            return { key, value };
        })
        .reduce((query, kvp) => {
            query[kvp.key] = kvp.value;

            return query;
        }, {});

export const getHash = (link) => {
    // eslint-disable-next-line no-unused-vars
    const [_, hash] = link.split('#');

    if (hash) {
        return hash.replace('#', '');
    }

    return '';
};