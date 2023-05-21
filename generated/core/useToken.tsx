import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { authAtom } from '../../app/state/atoms/atom';
import { OpenAPI } from './OpenAPI';

const useToken = () => {
    const [auth] = useAtom(authAtom);  // Получение данных об аутентификации
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (auth.isAuthenticated && auth.authToken) {
            setToken(auth.authToken);
            OpenAPI.TOKEN = auth.authToken;
        }
    }, [auth]);

    return token;
};

export default useToken;