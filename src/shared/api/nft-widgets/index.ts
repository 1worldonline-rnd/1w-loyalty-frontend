import { axios } from '@/shared/lib/axios';
import { NftWidgetQuery, NftWidgetCommand, NftWidgetCriteria } from './types';

export const fetchCreateNftWidget = (payload: NftWidgetCommand) => {
    return axios.post<NftWidgetCommand>('/nft/widgets', payload);
};

export const fetchUpdateNftWidget = (payload: NftWidgetCommand) => {
    return axios.put<NftWidgetCommand>('/nft/widgets', payload);
};

export const fetchNftWidgets = (payload: NftWidgetCriteria) => {
    return axios.post<{ content: NftWidgetQuery[] }>('/nft/widgets/criteria', payload);
};
