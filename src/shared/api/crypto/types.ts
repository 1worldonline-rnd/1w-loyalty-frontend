export type CryptoConversion = {
    balance: number;
    convertiblePoints: number;
    points: number;
};

export type ConvertibleBalance = { points: number; tokens: number };

export type WalletTransferRestrictions = {
    dailyTransferPerAccount: number;
    accountTransfer: boolean;
    minTransfer: number;
};

export type EarningHistory = {
    events: Array<{
        accountId: number;
        actionName: string;
        awardDateTime: string;
        entityId: number;
        methodName: string;
        pointsAwarded: number;
        isLocked: boolean;
    }>;
    pageNumber: number;
    totalElements: number;
    totalPages: number;
};
