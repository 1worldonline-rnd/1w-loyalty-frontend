import { createEffect } from 'effector';
import { authApi, accountApi, cryptoApi, partnerApi } from '@/shared/api';
import { axios } from '@/shared/lib/axios';
import { get1WDeviceIdentifier } from '@/shared/lib/deviceIdentifier';

export const loginFx = createEffect(authApi.fetchLogin);

export const logoutFx = createEffect(authApi.fetchLogout);

export const getAccountFx = createEffect(accountApi.fetchAccount);

export const getAccountAttachedToPartnerFx = createEffect(accountApi.fetchAccountAttachedToPartner);

export const getSessionFx = createEffect(
    (payload: { token: string; sourceCode: string; utmMedium?: string; partnerGuid?: string }) => {
        const { sourceCode, token, utmMedium, partnerGuid } = payload;

        return axios.post(
            'session/sso',
            { token },
            {
                params: {
                    sourceCode,
                    partnerGuid,
                    sourceType: 'loyalty_widget',
                    utm_medium: utmMedium,
                    target: 'LOYALTY',
                },
                headers: {
                    ...get1WDeviceIdentifier(),
                },
            }
        );
    }
);

export const getLoyaltyPartnerFx = createEffect(partnerApi.fetchPartner);

export const signUpFx = createEffect(authApi.fetchSignUp);

export const changeForgottenPasswordFx = createEffect(accountApi.fetchChangePassword);

export const getBalanceTokenFx = createEffect(accountApi.fetchAccountDetails);

export const getBalanceConversionFx = createEffect(cryptoApi.fetchCryptoConversion);

export const getConvertibleBalanceFx = createEffect(cryptoApi.fetchConvertibleBalance);

export const updateConvertibleBalanceFx = createEffect(cryptoApi.fetchConvertibleBalance);

export const getWalletTransferRestrictionsFx = createEffect(cryptoApi.fetchWalletTransferRestrictions);

export const setWalletAccountFx = createEffect(accountApi.fetchSetWalletAccount);

export const cryptoTransferFx = createEffect(accountApi.fetchCryptoTransfer);

export const changeFullnameFx = createEffect(accountApi.fetchChangeFullname);

export const getEarningHistoryFx = createEffect(cryptoApi.fetchEarningHistory);

export const fastRegisterFx = createEffect(authApi.fetchFastRegister);

export const deleteAccountFx = createEffect(accountApi.fetchDeleteAccount);

export const getPartnerAccountsFx = createEffect(accountApi.fetchPartnerAccounts);

export const getPartnerAdminListFx = createEffect(accountApi.fetchPartnerAdminList);

export const trackDailyLoginFx = createEffect(accountApi.fetchTrackingDailyLogin);
