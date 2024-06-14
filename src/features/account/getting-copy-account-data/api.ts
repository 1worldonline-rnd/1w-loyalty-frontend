import { axios } from '@/shared/lib/axios';
import type { AccountDataArchive } from './types';

export const getActiveReport = (password: string) => {
    return axios.post<AccountDataArchive>('accounts/reports/active', JSON.stringify(password), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const createReport = () => {
    return axios.post<AccountDataArchive>('accounts/reports');
};

export const deleteReport = (id: AccountDataArchive['id']) => {
    return axios.delete(`/accounts/reports/${id}`);
};
