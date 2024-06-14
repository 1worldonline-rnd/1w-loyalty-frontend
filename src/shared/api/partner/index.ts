import { axios } from '@/shared/lib/axios';
import { Partner } from './types';

export const fetchPartnerOfCurrentUser = () => {
    return axios.get<Partner>('/partners/current');
};

export const fetchPartner = (partnerId: Partner['externalId']) => {
    return axios.get<Partner>(`/partners/${partnerId}`);
};
