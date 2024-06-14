import { axios } from '@/shared/lib/axios';
import { WidgetConfig } from '../widget-config/types';
import { ConvertibleBalance, CryptoConversion, EarningHistory, WalletTransferRestrictions } from './types';

export const fetchCryptoConversion = () => {
    return axios.post<CryptoConversion>('crypto/conversion');
};

export const fetchConvertibleBalance = (widgetId: string) => {
    return axios.get<ConvertibleBalance>(`crypto/conversion/convertible-balance/${widgetId}`);
};

export const fetchWalletTransferRestrictions = () => {
    return axios.get<WalletTransferRestrictions>('/config/1WOEconomy/base/transferSetings');
};

export const fetchEarningHistory = (payload: { pageNumber: number; widgetId: WidgetConfig['guid'] }) => {
    const { pageNumber, widgetId } = payload;

    return axios.get<EarningHistory>(`/scoring/histories/widgets/${widgetId}`, {
        params: {
            pageSize: 10,
            pageNumber,
        },
    });
};
