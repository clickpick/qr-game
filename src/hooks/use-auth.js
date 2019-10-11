import { useState, useEffect } from 'react';
import { auth } from 'api';

export default function useAuth() {
    const [user, setUser] = useState(null);

    function signIn() {
        auth()
            .then(({ data }) => {
                setUser(data);
            })
            .catch(e => {
                setUser(false);
                console.log('auth', e);
            });
    }

    useEffect(signIn, []);

    return [user, signIn];
}