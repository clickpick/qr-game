import { useState, useEffect } from 'react';

export default function useRequest(request) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    function fetch() {
        request()
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((e) => {
                setData(false);
                setError(e);
                setLoading(false);
            });
    }

    useEffect(fetch, []);

    return [{ loading, error, data }, fetch];
}