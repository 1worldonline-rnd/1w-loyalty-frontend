export type PayloadForChangePassword = {
    currentPassword: string;
    password: string;
    verifyPassword: string;
    email: string;
    partnerExternalId: string;
};

export enum AccountRole {
    partner = 'partner',
    superAdmin = 'super_admin',
    member = 'member',
    admin = 'admin',
    synthetic = 'synthetic',
    expert = 'expert',
    advertiser = 'advertiser',
    partnerAdmin = 'partner_admin',
}

export type Account = {
    guid: string;
    accountId?: number;
    categories?: string;
    citizenship?: string;
    created: string;
    email?: string;
    first?: string;
    fullName?: string;
    id: number;
    walletTransferRestrictions: {
        max: number;
        min: number;
    };
    isEmailConfirmed: boolean;
    last?: string;
    locale?: string;
    location2?: {
        city: string;
        country: string;
        countryShort: string;
        description: string;
        id: number;
        isoState: string;
        latitude: number;
        longitude: number;
        state: string;
    };
    roles: AccountRole[];
    score?: number; // points
    balanceTokens?: number;
    convertiblePoints?: number;
    possibleTokens?: number;
    thumbnailUrl?: string;
    username: string;
    wallet?: string;
};

export const isAccountType = (data: Account | unknown): data is Account => {
    return Boolean((data as Account).accountId || (data as Account).id);
};

export type AccountAttachedToPartner = {
    target: 'LOYALTY';
    partnerGuid: string;
    firstName?: string;
    lastName?: string;
};

export const isAccountAttachedToPartner = (
    data: AccountAttachedToPartner | unknown
): data is AccountAttachedToPartner => {
    return Boolean(data && typeof data === 'object' && 'target' in data);
};
