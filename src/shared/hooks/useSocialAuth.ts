import { useEffect, useRef, useState } from 'react';
import { parse } from 'query-string';
import { axios } from '@/shared/lib/axios';
import { userModel } from '@/entities/user';
import { REDIRECT_URL, SLUG as slug, GOOGLE_CLIENT_ID } from '@/shared/constants';
// import { toldOtherWindowsToAuthorize } from '../lib/thirdParty';
import type { Nullable } from '../utility-types';
import { appModel } from '@/entities/app';
import { useStore } from 'effector-react';
import queryString from 'query-string';
import { widgetConfigModel } from '@/entities/widget-config';
import { getLoyaltyAmplitudeDeviceId } from "@/shared/lib/amplitudeProvider";

type AuthWindowMessageType = {
    type: string;
    data: {
        location: string;
    };
};

type HandlerWindowMessageType = (event: MessageEvent<AuthWindowMessageType>) => Promise<void>;

const authSettings = {
    google: {
        api: '1ws/json/Member1GoogleOAuth2ByCode',
        oAuthUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
        search: {
            client_id: GOOGLE_CLIENT_ID,
            response_type: 'code',
            slug,
            scope: 'email profile',
            redirect_uri: REDIRECT_URL,
            include_granted_scopes: 'true',
            target: 'loyalty',
        },
    },
    twitter: {
        api: '1ws/json/Member1LoginService',
        params: {
            locale: 'en',
            rememberMe: true,
            service: 'twitter',
            target: 'loyalty',
        },
    },
};

export const useSocialAuth = () => {
    const [isLoadingSocialLogin, setIsLoadingSocialLogin] = useState(false);
    const [errorSocialLogin, setErrorSocialLogin] = useState<Nullable<string>>(null);
    const urlSearchParams = useStore(appModel.stores.$urlSearchParams);
    const parentPageUrl = useStore(appModel.stores.$parentPageUrl);
    const partnerGuid = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.partner.guid;
    const parentSearchParams = queryString.parse(parentPageUrl);

    let windowDocument: Document;

    useEffect(() => {
        if (typeof document === 'undefined') {
            windowDocument = document;
        }
    }, []);

    const handlerWindowMessageRef = useRef<HandlerWindowMessageType>();

    const openWindow = () => {
        const windowParams =
            'resizable=yes,height=620,width=660,toolbar=no,titlebar=no,menubar=no,scrollbars=yes';
        return window.open('about:blank', '', windowParams);
    };

    const handleWindowMessage = (callback: (location: string) => void) => {
        const handlerWindowMessage = async (event: MessageEvent<AuthWindowMessageType>) => {
            if (event.data.type === 'oAuth') {
                callback(event.data.data.location);
            }
        };

        handlerWindowMessageRef.current = handlerWindowMessage;

        window.addEventListener('message', handlerWindowMessage);
    };

    const fetchLogin = async (url: string, data: unknown, authWindow: Window) => {
        setIsLoadingSocialLogin(true);

        try {
            const response = await axios.post<{ id: number }>(url, data, {headers: getLoyaltyAmplitudeDeviceId()});

            if (response.data.id && response.status === 200) {
                // toldOtherWindowsToAuthorize(response.headers);
                userModel.events.authorizedWithSocial();
                authWindow.close();
            }
        } catch (e) {
            setErrorSocialLogin('Something went wrong');
        } finally {
            if (handlerWindowMessageRef.current) {
                window.removeEventListener('message', handlerWindowMessageRef.current);
            }

            setIsLoadingSocialLogin(false);
        }
    };

    const loginWithGoogle = () => {
        const authWindow = openWindow();

        if (!authWindow) {
            return;
        }

        const searchParams = new URLSearchParams(authSettings.google.search).toString();

        handleWindowMessage(async (location: string) => {
            const { code } = parse(new URL(location).search);
            if (urlSearchParams) {
                const data = {
                    code,
                    redirectUrl: REDIRECT_URL,
                    slug,
                    sourceType: 'loyalty_widget',
                    sourceCode: String(urlSearchParams.loyaltyWidgetId),
                    initial_referrer: document.referrer || null,
                    partnerGuid,
                    utm_source: parentSearchParams.utm_source || null,
                    target: 'loyalty',
                };

                fetchLogin(authSettings.google.api, data, authWindow);
            }
        });

        authWindow.location.href = `${authSettings.google.oAuthUrl}?${searchParams}`;
    };

    const loginWithTwitter = async () => {
        const authWindow = openWindow();

        if (!authWindow) {
            return;
        }

        handleWindowMessage(async (location: string) => {
            const { oauth_verifier, oauth_token } = parse(new URL(location).search);
            const data = {
                ...authSettings.twitter.params,
                code: oauth_verifier,
                redirectUrl: REDIRECT_URL,
                slug,
                token: oauth_token,
                initial_referrer: (document || {}).referrer || null,
                partnerGuid,
                utm_source: parentSearchParams.utm_source || null,
                target: 'loyalty',
            };

            fetchLogin(authSettings.twitter.api, data, authWindow);
        });

        const { data: url } = await axios.get('1ws/json/Member1GetLoginUrl', {
            params: {
                callbackUrl: REDIRECT_URL,
                service: authSettings.twitter.params.service,
                slug,
            },
        });

        authWindow.location.href = url;
    };

    return {
        loginWithGoogle,
        loginWithTwitter,
        isLoadingSocialLogin,
        errorSocialLogin,
    };
};
