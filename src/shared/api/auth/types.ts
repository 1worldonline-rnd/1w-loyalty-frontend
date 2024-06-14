export type PayloadForFetchLogin = {
    email: string;
    password: string;
    rememberMe: string;
    partnerExternalId: string;
};

export type PayloadForFetchSignUp = {
    'account.email': string;
    'account.first'?: string;
    'account.last'?: string;
    'account.password': string;
    verifyPassword: string;
    partner?: string;
    registerSource: string;
};

export type PayloadForFetchChangePassword = {
    email: string;
    currentPassword: string;
    password: string;
    verifyPassword: string;
    partnerExternalId: string;
};

export type PayloadForFetchFastRegister = {
    email: string;
    redirectUrl: string;
    sourceCode: string;
    initial_referrer: string | null;
    partnerGuid: string;
    utm_source: string | string[] | null;
};
