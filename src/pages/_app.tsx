import '@/processes/auth/jwt';
// import customization rsuite
import '@/app/styles/rsuite.less';
// our global styles
import '@/app/styles/globals.scss';
// import of logic implemented using the 'effector'
import '@/app/models';
import type { AppProps } from 'next/app';
import queryString from 'query-string';
import { appWithTranslation } from 'next-i18next';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useStore } from 'effector-react';
import { Layout } from '@/app/layout';
import { appModel } from '@/entities/app';
import {
    API_URL,
    LOYALTY_WIDGET_RENDERED_EVENT,
    TRACKER_WIDGET_OPEN_SSE_EVENT,
    publicRoutes,
    Route,
    LOYALTY_WIDGET_READY_OPEN_SSE_EVENT,
} from '@/shared/constants';
import { userModel } from '@/entities/user';
import { useRouteSave, useRouteRedirect } from '@/processes/routing/usePageRouteSaving';
import { widgetConfigModel } from '@/entities/widget-config';
import { axios } from '@/shared/lib/axios';
import { amplitudeInit, amplitudeLogEvent, loyaltyAmplitude } from '@/shared/lib/amplitudeProvider';
import { WidgetConfig } from '@/shared/api/widget-config/types';
import { ProductTour } from '@/features/onboarding';

if (typeof window !== 'undefined') {
    amplitudeInit();
}

const useAmplitudeWithUserId = () => {
    const account = useStore(userModel.stores.$account);

    if (account) {
        loyaltyAmplitude.setUserId(account.guid);
    }
};

appModel.events.wentToTheApplication();

const useForcedRedirect = () => {
    const { push, locale } = useRouter();
    const isAuthorized = useStore(userModel.stores.$isAuthorized);
    const parentPageUrl = useStore(appModel.stores.$parentPageUrl);

    const location = parentPageUrl ? new URL(parentPageUrl) : null;
    const redirectSrc = location?.searchParams.get('1wRedirectSrc');
    const { url: pathname, query } = queryString.parseUrl(redirectSrc ?? '');

    useEffect(() => {
        if (isAuthorized && redirectSrc && pathname) {
            push(
                {
                    pathname: pathname.toString(),
                    query,
                },
                undefined,
                { locale }
            );
        }
    }, [isAuthorized, parentPageUrl]);
};

const useRedirectWatcher = () => {
    const { push, query, locale, pathname: currentPathname } = useRouter();
    const isAuthorized = useStore(userModel.stores.$isAuthorized);

    useEffect(() => {
        // when event 'redirected' called, then redirect to specified path
        const unsubscribeWatcher = appModel.events.redirected.watch(({ pathname, withoutChecks }) => {
            // if the user is on a public page and a redirect to the authorization page is called,
            // then the redirect is not called
            if (
                !withoutChecks &&
                publicRoutes.includes(pathname) &&
                publicRoutes.includes(currentPathname) &&
                pathname === Route.signIn
            ) {
                return;
            }
            // redirect preserving get parameters (query) and locale
            push({ pathname, query }, undefined, { locale });
        });
        return () => unsubscribeWatcher();
    }, [locale, push, query, isAuthorized, currentPathname]);
};

/**
 * the application listens the height of the available content,
 * to set height for iframe on parent page
 * this solves the problem of unnecessary scrolling
 */
if (typeof window !== 'undefined') {
    new ResizeObserver((entries) => {
        window.parent.postMessage(
            JSON.stringify({
                message: 'loyalty-widget-height-changed',
                payload: entries[0].target.clientHeight,
            }),
            '*'
        );
    }).observe(document.body);

    window.parent.postMessage(LOYALTY_WIDGET_RENDERED_EVENT, '*');
}

const useUrlSearchParamsWatcher = () => {
    const urlSearchParams = useStore(appModel.stores.$urlSearchParams);

    useEffect(() => {
        if (!urlSearchParams) {
            // using one event to give access to get parameters in any store model
            appModel.events.urlSearchParamsSet(queryString.parse(window.location.search));
        }
    }, [urlSearchParams]);
};

const useDefinitionThemeMode = (theme: DefaultTheme['mode']) => {
    return useMemo(() => {
        if (typeof window !== 'undefined') {
            return document.body.dataset.theme || 'light';
        }
        return theme;
    }, [theme]) as DefaultTheme['mode'];
};

const useTheme = (setTheme: Dispatch<SetStateAction<'light' | 'dark'>>) => {
    const globalWidgetConfig = useStore(widgetConfigModel.stores.$globalWidgetConfig);
    const { darkBgColor, lightBgColor, theme } = globalWidgetConfig?.settings || {};

    const applyTheme = useCallback(
        (theme: 'light' | 'dark') => {
            widgetConfigModel.events.setWidgetTheme(theme);
            setTheme(theme);
            document.body.dataset.theme = theme;
            if (theme === 'dark' && darkBgColor) {
                document.body.style.setProperty('--body-background-color', darkBgColor);
            }
            if (theme === 'light' && lightBgColor) {
                document.body.style.setProperty('--body-background-color', lightBgColor);
            }
        },
        [darkBgColor, lightBgColor]
    );

    useEffect(() => {
        if (theme) {
            applyTheme(theme);
        }
    }, [theme, applyTheme]);

    useEffect(() => {
        const handleMessage = ({ data }: MessageEvent) => {
            if (typeof data === 'object' && data.hasOwnProperty('theme')) {
                applyTheme(data.theme);
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [globalWidgetConfig?.settings, applyTheme]);
};

const usePointEarningListener = () => {
    const widgetId = useStore(widgetConfigModel.stores.$globalWidgetConfigId);
    const isAuthorized = useStore(userModel.stores.$isAuthorized);

    const [isTrackerWidgetRendered, setIsTrackerWidgetRendered] = useState(false);

    const openConnection = useCallback(async (widgetId: string) => {
        let hasOpened = false; // flag to rack whether the connection has been opened

        return new Promise<void>((resolve) => {
            const sse = new EventSource(new URL('/notifications', API_URL), {
                withCredentials: true,
            });
            // don't remove ignore, Argument of type '"EARN_NOTIFICATION"' is not assignable to parameter of type 'keyof EventSourceEventMap'.
            // @ts-ignore
            sse.addEventListener('EARN_NOTIFICATION', (e: MessageEvent<string>) => {
                if (typeof e.data === 'string') {
                    userModel.effects.getConvertibleBalanceFx(widgetId);
                    userModel.events.getEarningHistoryWithCurrentPage();
                }
            });
            // don't remove ignore, Argument of type '"INITIAL_DATA"' is not assignable to parameter of type 'keyof EventSourceEventMap'.
            // @ts-ignore
            sse.addEventListener('INITIAL_DATA', (e: MessageEvent<string>) => {
                if (!hasOpened && typeof e.data === 'string') {
                    const subscriptionId = e.data.replace(/[^a-zA-Z0-9-]/g, '');
                    resolve();

                    hasOpened = true; // set the flag to true if the connection has been opened

                    setTimeout(() => {
                        openConnection(widgetId).then(() => {
                            sse.close();
                            axios.delete(`/notifications/subscriptions/${subscriptionId}`);
                        });
                    }, 1000 * 50); // connection closes after 60 seconds on backend
                }
            });
        });
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('message', ({ data }) => {
                if (data === TRACKER_WIDGET_OPEN_SSE_EVENT) {
                    setIsTrackerWidgetRendered(true);
                }
            });

            window.parent.postMessage(LOYALTY_WIDGET_READY_OPEN_SSE_EVENT, '*');
        }
    }, []);

    useEffect(() => {
        if (!(typeof window !== 'undefined' && widgetId && isAuthorized && isTrackerWidgetRendered)) {
            return;
        }

        openConnection(widgetId);
    }, [widgetId, isAuthorized, isTrackerWidgetRendered]);
};

const useListenToComingOfNewDayByUTC = (widgetId: WidgetConfig['guid'] | null) => {
    useEffect(() => {
        if (widgetId) {
            // calculate current UTC time
            const now = new Date();
            const currentUTC = new Date(
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate(),
                now.getUTCHours(),
                now.getUTCMinutes(),
                now.getUTCSeconds()
            );
            // calculate UTC time for the next day
            const nextDayUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
            nextDayUTC.setUTCDate(nextDayUTC.getUTCDate() + 1);
            // calculate time difference between current UTC and next day UTC
            const timeDifference = Number(nextDayUTC) - Number(currentUTC);
            // wait for the time difference and send request
            setTimeout(() => {
                userModel.effects.trackDailyLoginFx(widgetId);
            }, timeDifference);
        }
    }, [widgetId]);
};

const useRunOnboarding = () => {
    const isAuthorized = useStore(userModel.stores.$isAuthorized);
    const isProductTourShown = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.isProductTourShown;
    const isNotSynthetic = useStore(userModel.stores.$isNotSynthetic);

    useEffect(() => {
        if (
            typeof isProductTourShown !== 'undefined' &&
            !isProductTourShown &&
            isAuthorized &&
            isNotSynthetic
        ) {
            appModel.events.toggleOnboarding({ toggle: true, isInitial: true });
        }
    }, [isAuthorized, isProductTourShown, isNotSynthetic]);
};

const App = ({ Component, pageProps, ...otherProps }: AppProps & { 'data-theme': DefaultTheme['mode'] }) => {
    const DATA_ADMIN_PANEL = 'data-admin-panel';
    const ADMIN = 'admin';

    // initial theme is set from widget settings
    const [theme, setTheme] = useState(useDefinitionThemeMode(otherProps['data-theme']));
    const account = useStore(userModel.stores.$account);
    const widgetId = useStore(widgetConfigModel.stores.$globalWidgetConfigId);
    const partnerExternalId = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.partner.guid;
    const isAuthorized = useStore(userModel.stores.$isAuthorized);
    const { pathname } = useRouter();
    const isAdminPage = pathname.includes('admin');

    useAmplitudeWithUserId();

    useTheme(setTheme);

    useUrlSearchParamsWatcher();

    usePointEarningListener();

    useRedirectWatcher();

    useRouteRedirect();

    useRouteSave();

    useRunOnboarding();

    useForcedRedirect();

    useEffect(() => {
        if (widgetId && account?.guid) {
            const eventData = {
                widgetId: widgetId,
                page_domain: document.domain,
                page_location: window.location.href,
                page_path: window.location.pathname,
                page_title: document.title,
                page_url: location.href.split('?')[0],
                referrer: document.referrer || '',
                referring_domain: document.referrer ? new URL(document.referrer).hostname : '',
                partner_id: partnerExternalId,
            };

            amplitudeLogEvent('loyalty_page_view', eventData);
        }
    }, [widgetId, account?.guid]);

    useListenToComingOfNewDayByUTC(widgetId);

    useEffect(() => {
        const isAdmin = typeof window !== 'undefined' && window.location.href.includes(ADMIN);
        if (isAdmin && document.body.getAttribute(DATA_ADMIN_PANEL) === 'false') {
            document.body.setAttribute(DATA_ADMIN_PANEL, 'true');
        }
    }, []);

    return (
        <ThemeProvider
            theme={{
                mode: theme,
            }}
        >
            {isAuthorized && !isAdminPage && <ProductTour />}

            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
};

export default appWithTranslation(App);
