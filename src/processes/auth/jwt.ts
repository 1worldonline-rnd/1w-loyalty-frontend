import axios, { AxiosResponseHeaders } from 'axios';
import { userModel } from '@/entities/user';
import { LS_ACCESS_TOKENS_KEY, API_URL } from '@/shared/constants';
import { axios as axiosInstance } from '@/shared/lib/axios';
import { isAvailableLocalStorage } from '@/shared/lib/isAvailableLocalStorage';
import ThirdPartyAuthenticator from '@1world/1w-third-party-authenticator';
import { AccountRole } from '@/shared/api/account/types';

const $isNotSynthetic = userModel.stores.$account.map((account) => {
    return account && !account?.roles.includes(AccountRole.synthetic);
});

declare global {
    interface Window {
        ThirdPartyAuthenticator?: typeof ThirdPartyAuthenticator;
    }
}

const authHeaderKeys = ['refresh-token', 'x-auth-token', 'access-token'] as const;

const getTokens = () => {
    if (isAvailableLocalStorage()) {
        const tokensJson = localStorage.getItem(LS_ACCESS_TOKENS_KEY);

        if (tokensJson) {
            try {
                return JSON.parse(tokensJson) as Record<string, string>;
            } catch (_err) {
                return {};
            }
        }
    }
    return {};
};

const getAuthHeaders = (headers: AxiosResponseHeaders) => {
    return authHeaderKeys.reduce<Record<string, string>>((previousHeaders, currentKey) => {
        const headerValue = headers[currentKey];
        if (headerValue) {
            previousHeaders[currentKey] = headerValue;
        }
        return previousHeaders;
    }, {});
};

const removeTokensFromLocalStorage = () => {
    if (isAvailableLocalStorage()) {
        // localStorage.removeItem(LS_ACCESS_TOKENS_KEY);
    }
};

axiosInstance.interceptors.response.use(
    (response) => {
        const { headers } = response;

        if (Object.keys(getAuthHeaders(headers)).length && isAvailableLocalStorage()) {
            localStorage.setItem(LS_ACCESS_TOKENS_KEY, JSON.stringify(getAuthHeaders(headers)));
        }
        return response;
    },
    (error: unknown) => {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            // removeTokensFromLocalStorage();
        }
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use((request) => {
    const tokens = getTokens();

    if (request.headers) {
        request.headers = Object.assign(request.headers, tokens);
    } else {
        request.headers = tokens;
    }

    return request;
});

if (typeof window !== 'undefined') {
    try {
        ThirdPartyAuthenticator.init({
            apiUrl: API_URL,
        });

        if (process.env.ENV !== 'prod') {
            window.ThirdPartyAuthenticator = ThirdPartyAuthenticator;
        }

        $isNotSynthetic.watch((isNotSynthetic) => {
            if (isNotSynthetic) {
                const tokens = getTokens();

                if (Object.keys(tokens).length) {
                    ThirdPartyAuthenticator.instance?.auth(tokens);
                }
            }
        });

        userModel.effects.logoutFx.done.watch(() => {
            removeTokensFromLocalStorage();

            ThirdPartyAuthenticator.instance?.logout();
        });
    } catch (e: unknown) {
        // eslint-disable-next-line no-console
        console.log(e);
    }
}
