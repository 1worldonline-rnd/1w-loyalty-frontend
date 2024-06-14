export type AccountDataArchive = {
    id: number;
    created: string;
    updated: string;
    status: 'completed' | 'notAccepted';
    accountId: number;
    reportUrl?: string;
};
