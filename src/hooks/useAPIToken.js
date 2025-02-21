import { useCallback } from 'react';
import useWebSocket from './useWebSocket';
import { useAuth } from '../hooks/useAuth.jsx';

const useAPIToken = () => {
    const { sendMessage } = useWebSocket();
    const { isAuthorized } = useAuth();

    const createToken = useCallback((tokenName, scopes = ['admin', 'read', 'trade']) => {
        if (!isAuthorized) {
            throw new Error('Client is not authorized');
        }

        return new Promise((resolve, reject) => {
            sendMessage({
                api_token: 1,
                new_token: tokenName,
                new_token_scopes: scopes
            }, (response) => {
                if (response.error) {
                    reject(response.error);
                } else {
                    resolve(response);
                }
            });
        });
    }, [sendMessage, isAuthorized]);

    const getTokens = useCallback(() => {
        if (!isAuthorized) {
            throw new Error('Client is not authorized');
        }

        return new Promise((resolve, reject) => {
            sendMessage({
                api_token: 1
            }, (response) => {
                if (response.error) {
                    reject(response.error);
                } else {
                    resolve(response);
                }
            });
        });
    }, [sendMessage, isAuthorized]);

    const deleteToken = useCallback((token) => {
        if (!isAuthorized) {
            throw new Error('Client is not authorized');
        }

        return new Promise((resolve, reject) => {
            sendMessage({
                api_token: 1,
                delete_token: token
            }, (response) => {
                if (response.error) {
                    reject(response.error);
                } else {
                    resolve(response);
                }
            });
        });
    }, [sendMessage, isAuthorized]);

    return {
        createToken,
        getTokens,
        deleteToken
    };
};

export default useAPIToken;
