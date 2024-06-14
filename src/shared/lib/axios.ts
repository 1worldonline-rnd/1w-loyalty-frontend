/* eslint-disable indent */
import axiosFactory, { AxiosError } from 'axios';
// import ThirdPartyAuthenticator from '@1world/1w-third-party-authenticator';
import { API_URL, Route } from '@/shared/constants';
import { showMessage } from '@/shared/lib/messages';
import { appModel } from '@/entities/app';

const axios = axiosFactory.create({
    baseURL: API_URL,
    withCredentials: true,
});

const ignoredRequestsInInterceptors: Array<{ pathname: string }> = [
    {
        pathname: 'accounts/reports/active',
    },
    {
        pathname: 'account/personal',
    },
    {
        pathname: 'session/sso',
    }
];

// if (typeof window !== 'undefined') {
//     axios.interceptors.request.use((config) => {
//         // @ts-ignore
//         const headers = ThirdPartyAuthenticator.instance.authHeaders || {};
//         return {
//             ...config,
//             headers: {
//                 ...headers,
//                 ...config.headers,
//             },
//         };
//     });
// }

axios.interceptors.response.use(
    (response) => {
        if (typeof response.data.message === 'string') {
            showMessage(response.data.message, 'error');
        }
        return response;
    },
    (error: AxiosError) => {
        if (ignoredRequestsInInterceptors.find(({ pathname }) => error.config.url?.includes(pathname))) {
            return Promise.reject(error);
        }

        // listen status code
        if (error.response?.status) {
            switch (error.response.status) {
                case 401:
                    appModel.events.redirected({ pathname: Route.signIn });
                    break;
                case 403:
                    appModel.events.redirected({ pathname: Route.forbidden });
                    break;
                default:
                    // eslint-disable-next-line no-console
                    console.warn('Unknown code status');
            }
        }

        let errorMessage = 'Something went wrong, try later';

        // show error messages
        if (typeof error.response?.data?.message === 'string') {
            errorMessage = error.response?.data?.message;

            if (!['No message available'].includes(errorMessage.trim())) {
                showMessage(errorMessage, 'error');
            }
        }
        if (Array.isArray(error.response?.data?.errorDetails)) {
            error?.response?.data?.errorDetails?.forEach((element: string) => {
                showMessage(element, 'error');
            });
        }

        return Promise.reject(error);
    }
);

export { axios };
