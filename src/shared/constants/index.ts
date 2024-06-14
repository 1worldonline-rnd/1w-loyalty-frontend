export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const REDIRECT_URL = process.env.NEXT_PUBLIC_AUTH_BY_SOCIAL_REDIRECT_URL;

export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export const PORTAL_URL = process.env.NEXT_PUBLIC_PORTAL_URL;

export const Route = {
    account: '/account',
    earn: '/earn',
    spend: '/spend',
    redemption: '/redemption',
    earningHistory: '/earning-history',
    events: '/admin/events',
    faq: '/faq',
    forgotPassword: '/forgot-password',
    forbidden: '/forbidden',
    home: '/',
    passwordRecovery: '/password-recovery',
    privacy: '/privacy',
    signIn: '/sign-in',
    signUp: '/sign-up',
    terms: '/terms',
    topic: (topicId: string) => `/topic/${topicId}`,
    // admin pages
    admin: {
        feed: '/admin/feed',
        rewards: '/admin/custom-rewards',
        events: '/admin/events',
        widgets: '/admin/widgets',
        statistic: (widgetId = '') => {
            const baseRoute = '/admin/statistic';
            return widgetId ? [baseRoute, widgetId].join('/') : baseRoute;
        },
        widgetManager: (widgetId: string) => `/admin/widgets/${widgetId}`,
        widgetStatistic: (widgetId: string) => `/admin/widgets/${widgetId}/statistic`,
        catalogs: '/admin/catalogs',
        catalogManager: (catalogId: string) => `/admin/catalogs/${catalogId}`,
        products: '/admin/products',
        preferences: () => '/admin/preferences',
        tools: () => '/admin/tools',
        nftCollections: '/admin/nft/collections',
        nftWidgets: '/admin/nft/widgets',
        nftCollectionManager: (collectionId: string) => `/admin/nft/collections/${collectionId}`,
        sequences: '/admin/sequences',
        sequenceManager: (sequenceId: string) => `/admin/sequences/${sequenceId}`,
        collections: '/admin/collections',
        collectionManager: (collectionId: string) => `/admin/collections/${collectionId}`,
    },
    notFound: '/not-found',
};

export const publicRoutes = [
    Route.signIn,
    Route.signUp,
    Route.faq,
    Route.forbidden,
    Route.forgotPassword,
    Route.terms,
    Route.passwordRecovery,
    Route.privacy,
    Route.notFound,
];

export const SLUG = '1worldonline';

export enum Locale {
    // value is key for translate from i18n
    en = 'en',
    fr = 'fr',
    de = 'de',
    es = 'es',
    pt = 'pt',
    ru = 'ru',
    pl = 'pl',
    uk = 'uk',
}

export const LS_ACCESS_TOKENS_KEY = 'ed01aa9d-4285-4af1-93a2-055640d7b939';

export const actionsByTypeNumber = {
    16: 'Share Facebook',
    35: 'Share Twitter',
    37: 'Finish quiz',
    38: 'Finish survey',
    40: 'Result reward',
} as const;

export const LOYALTY_WIDGET_RENDERED_EVENT = 'loyalty_widget_rendered';

export const TRACKER_WIDGET_OPEN_SSE_EVENT = 'tracker_widget_open_sse';

export const LOYALTY_WIDGET_READY_OPEN_SSE_EVENT = 'loyalty_widget_ready_open_sse_event';
