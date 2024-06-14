import { axios } from '@/shared/lib/axios';
import { PayloadForFetchFastRegister, PayloadForFetchLogin, PayloadForFetchSignUp } from './types';
import { getLoyaltyAmplitudeDeviceId } from '@/shared/lib/amplitudeProvider';
import { get1WDeviceIdentifier } from '@/shared/lib/deviceIdentifier';

export const fetchLogout = async () => {
    return axios.delete('session', {
        params: {
            includeOtherDevices: true,
        },
    });
};

export const fetchLogin = ({ email, partnerExternalId, password, rememberMe }: PayloadForFetchLogin) => {
    // if response data has id then axios succeeded
    // if has message then axios failed
    return axios.post<{ id?: number; message?: string }>(
        '1ws/auth',
        new URLSearchParams({
            username: email,
            partnerGuid: partnerExternalId,
            password,
            rememberMe,
            target: 'loyalty',
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...getLoyaltyAmplitudeDeviceId(),
                ...get1WDeviceIdentifier(),
            },
        }
    );
};

export const fetchForgotPassword = (email: string, partnerExternalId: string) => {
    return axios.patch(`accounts-per-partners/${partnerExternalId}/LOYALTY/resets/passwords`, { email });
};

export const fetchSignUp = (payload: PayloadForFetchSignUp) => {
    // in any case, the backend gives the status 200
    // therefore we have to check what is in data
    // if data has 'accountId' - success
    // if has 'message' so it is error
    return axios.post<{ accountId?: number; message?: string }>('1ws/json/Member1Register', payload, {
        headers: {
            ...getLoyaltyAmplitudeDeviceId(),
            ...get1WDeviceIdentifier(),
        },
    });
};

export const fetchFastRegister = (payload: PayloadForFetchFastRegister) => {
    const { email, initial_referrer, partnerGuid, redirectUrl, sourceCode, utm_source } = payload;

    return axios.post<{ accountId?: number; message?: string }>(
        '1ws/json/Member1FastRegister',
        {
            account: { email },
            sourceCode,
            redirectUrl,
            initial_referrer,
            partnerGuid,
            utm_source,
            sourceType: 'loyalty_widget',
            target: 'loyalty',
        },
        {
            headers: {
                ...getLoyaltyAmplitudeDeviceId(),
                ...get1WDeviceIdentifier(),
            },
        }
    );
};
