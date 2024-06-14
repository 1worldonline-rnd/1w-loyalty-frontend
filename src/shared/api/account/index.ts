import { axios } from '@/shared/lib/axios';
import { SLUG } from '@/shared/constants';
import {
    Account,
    PayloadForChangePassword,
    AccountRole,
    isAccountType,
    AccountAttachedToPartner,
} from './types';
import { Truthy } from '@/shared/utility-types';
import { PartnerId } from '../partner/types';
import { WidgetConfig } from '../widget-config/types';
import { getLoyaltyAmplitudeDeviceId } from '@/shared/lib/amplitudeProvider';
import { set1WDeviceIdentifier } from '@/shared/lib/deviceIdentifier';

export const fetchAccount = async () => {
    const { data, headers } = await axios.get<Account>('accounts', {
        params: {
            convertType: 'full',
        },
    });

    set1WDeviceIdentifier(headers);

    if (isAccountType(data) && data.roles.includes(AccountRole.synthetic)) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({ error: 401, message: 'Synthetic user can not be logged in' });
    }

    return data;
};

export const fetchAccountAttachedToPartner = (partnerExternalId: string) => {
    return axios.get<AccountAttachedToPartner>(`accounts-per-partners/${partnerExternalId}/LOYALTY`);
};

export const fetchChangePassword = (payload: PayloadForChangePassword) => {
    const { currentPassword, email, password, verifyPassword, partnerExternalId } = payload;

    return axios.patch(`accounts-per-partners/${partnerExternalId}/LOYALTY/changes/passwords`, {
        currentPassword,
        newPassword: password,
        verifyNewPassword: verifyPassword,
        email,
    });
};

export const fetchResendConfirmationEmail = (email: string) => {
    return axios.post('1ws/json/Member1ResendConfirmationEmail', {
        registerTarget: 'loyalty-platform',
        slug: SLUG,
        account: {
            email,
        },
    });
};

export const fetchAccountDetails = () => {
    // account is account ID
    return axios.get<{
        account: number;
        balanceTokens: number;
        wallet: string;
    }>('accounts/details');
};

export const fetchSetWalletAccount = (wallet: string) => {
    return axios.put('account/details', {
        wallet,
    });
};

export const fetchCryptoTransfer = (tokens: number) => {
    return axios.post<{
        accountBalance: number;
        success: boolean;
        txHash: string;
    }>('crypto/transfer', {
        tokens,
    });
};

export const fetchChangeFullname = ({
    partnerExternalId,
    first,
    last,
}: {
    partnerExternalId: string;
    first: string;
    last: string;
}) => {
    return axios.patch<{ firstName: string; lastName: string; target: 'LOYALTY' }>(
        `accounts-per-partners/${partnerExternalId}/first-and-last-names`,
        {
            firstName: first,
            lastName: last,
            target: 'LOYALTY',
        }
    );
};

export const fetchDeleteAccount = (payload: {
    currentPassword: string;
    accountId: Truthy<Account['accountId']>;
}) => {
    return axios.delete('/account/personal', {
        data: payload,
    });
};

export const fetchPartnerAccounts = (externalId: PartnerId) => {
    return axios.post<Pick<Account, 'id'>[]>('1ws/json/PartnerGetAccounts', {
        externalId,
    });
};

export const fetchPartnerAdminList = (partnerExternalId: PartnerId) => {
    return axios.get<Pick<Account, 'id'>[]>('1ws/json/PartnerFindAdminList', {
        params: {
            partnerExternalId,
        },
    });
};

export const fetchTrackingDailyLogin = (widgetId: WidgetConfig['guid']) => {
    return axios.post(`/events/daily/widgets/${widgetId}`, null, {
        headers: {
            ...getLoyaltyAmplitudeDeviceId(),
        },
    });
};
