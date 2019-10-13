import { useState, useEffect } from 'react';

export default function useRequest(instance) {
    const [state, setState] = useState({ loading: true, data: null, error: null });

    useEffect(() => {
        let ignore = false;

        async function fetch() {
            const res = await instance();
            if (!ignore) {
                setState((s) => ({
                    ...s,
                    loading: false,
                    data: res.data
                }));
            }
        }

        fetch();

        return () => {
            ignore = true;
        }
    }, [instance]);

    return [state, fetch];
}