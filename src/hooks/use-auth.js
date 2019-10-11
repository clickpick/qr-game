import useRequest from 'hooks/use-request';
import { auth } from 'api';

export default function useAuth() {
    const [{ data }, signIn] = useRequest(auth);

    return [data, signIn];
}