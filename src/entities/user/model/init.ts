import { i18n } from 'next-i18next';
import { combine, forward, guard, sample, split } from 'effector';
// import ThirdPartyAuthenticator from '@1world/1w-third-party-authenticator';
import * as effects from './effects';
import * as stores from './stores';
import * as events from './events';
import { appModel } from '@/entities/app';
import { isAccountType } from '@/shared/api/account/types';
import { Route } from '@/shared/constants';
import { widgetConfigModel } from '@/entities/widget-config';
import { showMessage } from '@/shared/lib/messages';

stores.$isAuthorized
    // the backend 'geniuses' returns 200 in case of an error
    // therefore, we check if not errors, then a request for account data was successful
    .on(effects.getAccountFx.doneData, (_, account) => isAccountType(account))
    .on([events.sessionEnded, effects.logoutFx.doneData, effects.getAccountFx.fail], () => false);

stores.$partnerId
    .on(appModel.events.urlSearchParamsSet, (_, { partnerId }) => partnerId || null)
    .reset([events.sessionEnded, effects.logoutFx.doneData]);

stores.$loyaltyPartner
    .on(effects.getLoyaltyPartnerFx.doneData, (_, { data }) => {
        return data.name ? data : null;
    })
    .reset([events.sessionEnded, effects.logoutFx.doneData]);

stores.$account
    // the backend 'geniuses' returns 200 in case of an error
    // therefore, we check if not errors, then a request for account data was successful
    .on(effects.getAccountFx.doneData, (_, account) => (isAccountType(account) ? account : null))
    // commented out because the request is probably deprecated
    // because app gets info about user balance from `effects.getBalanceConversionFx`
    // .on(effects.getBalanceTokenFx.doneData, (account, { data }) => {
    //     if (account?.id === data.account) {
    //         return {
    //             ...account,
    //             balanceTokens: data.balanceTokens,
    //             wallet: data.wallet,
    //         };
    //     }
    //     return account;
    // })
    .on(effects.getBalanceConversionFx.doneData, (account, { data }) => {
        if (account && typeof data?.balance === 'number') {
            return {
                ...account,
                balanceTokens: data.balance,
                convertiblePoints: data.convertiblePoints,
                score: data.points,
            };
        }
        return account;
    })
    .on(
        [effects.getConvertibleBalanceFx.doneData, effects.updateConvertibleBalanceFx.doneData],
        (account, { data }) => {
            if (account && typeof data?.points === 'number') {
                const { points, tokens } = data;

                return {
                    ...account,
                    convertiblePoints: points,
                    possibleTokens: tokens,
                };
            }
            return account;
        }
    )
    .on(effects.getWalletTransferRestrictionsFx.doneData, (account, { data = {} }) => {
        const { dailyTransferPerAccount = 0, minTransfer = 0 } = data;

        if (account) {
            return {
                ...account,
                walletTransferRestrictions: {
                    max: dailyTransferPerAccount,
                    min: minTransfer,
                },
            };
        }

        return account;
    })
    .on(effects.setWalletAccountFx.doneData, (account, { data }) => {
        if (account && typeof data?.wallet === 'string') {
            return {
                ...account,
                wallet: data.wallet,
            };
        }
        return account;
    })
    .on(effects.cryptoTransferFx.doneData, (account, { data }) => {
        if (account && typeof data?.accountBalance === 'number') {
            return {
                ...account,
                balanceTokens: data.accountBalance,
            };
        }
        return account;
    })
    // .on(effects.changeFullnameFx.doneData, (account, { data: { firstName, lastName } }) => {
    //     return account ? { ...account, first: firstName, last: lastName } : account;
    // })
    .reset([events.sessionEnded, effects.logoutFx.doneData]);

stores.$dataForPasswordChange
    // if the user wants to change the password,
    // then we save his email and a special key password
    .on(events.requestedPasswordChange, (_, { params }) => params)
    // if the password has been successfully changed, then we reset the data
    .reset(effects.changeForgottenPasswordFx.doneData);

stores.$earningHistory
    .on(effects.getEarningHistoryFx.doneData, (_, { data }) => data)
    .reset([events.sessionEnded, effects.logoutFx.doneData]);

split({
    // we take the data that returns 'loginFx'
    // 'loginFx.done', unlike 'loginFx.doneData', contains arguments
    // which are passed to the 'loginFx'
    source: effects.loginFx.done,
    match: {
        // case when code status 200
        loggedIn: ({ result: { status } }) => status === 200,
        // case when code status 205
        requestedPasswordChange: ({ result: { status } }) => status === 205,
    },
    cases: {
        // if the status code is 200, then you need to call a request for account data
        loggedIn: effects.getAccountFx,
        // if the status code is 205, then the user wants to change the password
        requestedPasswordChange: events.requestedPasswordChange,
    },
});

split({
    source: effects.fastRegisterFx.done,
    match: {
        successfullyRegistered: ({ result }) => Boolean(result.data.accountId),
    },
    cases: {
        successfullyRegistered: events.fastRegistered,
    },
});

sample({
    // if the password has been successfully changed
    clock: effects.changeForgottenPasswordFx.done,
    // then we take the data passed from the arguments of 'changeForgottenPasswordFx'
    fn: ({ params: { email, password, partnerExternalId } }) => ({
        email,
        password,
        rememberMe: String(false),
        partnerExternalId,
    }),
    // and call the login by passing email and a new password
    target: effects.loginFx,
});

const $widgetPartnerId = widgetConfigModel.stores.$globalWidgetConfig.map((widget) => {
    return widget?.partner.guid;
});

sample({
    source: {
        widgetId: widgetConfigModel.stores.$globalWidgetConfigId,
        urlSearchParams: appModel.stores.$urlSearchParams,
        widgetPartnerId: $widgetPartnerId,
    },
    filter: ({ urlSearchParams, widgetId, widgetPartnerId }) => {
        if (widgetId && urlSearchParams && widgetPartnerId) {
            return Boolean(urlSearchParams.token);
        }
        return false;
    },
    fn: ({ urlSearchParams, widgetId, widgetPartnerId }) => {
        if (urlSearchParams?.token && widgetId) {
            const payload: Parameters<typeof effects.getSessionFx>[0] = {
                token: String(urlSearchParams.token),
                sourceCode: widgetId,
                partnerGuid: widgetPartnerId,
            };

            if (urlSearchParams.utmMedium) {
                payload.utmMedium = String(urlSearchParams.utmMedium);
            }

            return payload;
        }
        return { token: '', sourceCode: '' };
    },
    target: effects.getSessionFx,
});

forward({
    // if the user entered the application or logged in using social networks or registered
    from: [
        appModel.events.wentToTheApplication,
        events.authorizedWithSocial,
        events.registered,
        events.fastRegistered,
        effects.getSessionFx.done,
    ],
    // call a request for account data
    to: effects.getAccountFx,
});

sample({
    clock: effects.logoutFx.done,
    fn: () => ({ pathname: Route.signIn }),
    target: appModel.events.redirected,
});

sample({
    clock: [stores.$partnerId, stores.$isAuthorized],
    filter: combine(stores.$partnerId, stores.$isAuthorized, (...flags) => flags.every(Boolean)),
    fn: String,
    source: stores.$partnerId,
    target: effects.getLoyaltyPartnerFx,
});

guard({
    clock: [stores.$isAuthorized, widgetConfigModel.stores.$globalWidgetConfig],
    filter: combine(
        stores.$isAuthorized,
        widgetConfigModel.stores.$globalWidgetConfig,
        (isAuthorized, globalWidgetConfig) => {
            return Boolean(isAuthorized && globalWidgetConfig);
        }
    ),
    target: [effects.getBalanceTokenFx, effects.getWalletTransferRestrictionsFx],
});

sample({
    source: widgetConfigModel.stores.$globalWidgetConfig,
    clock: [stores.$isAuthorized, widgetConfigModel.stores.$globalWidgetConfig],
    filter: combine(
        stores.$isAuthorized,
        widgetConfigModel.stores.$globalWidgetConfig,
        (isAuthorized, globalWidgetConfig) => {
            return Boolean(isAuthorized && globalWidgetConfig);
        }
    ),
    fn: (widget) => String(widget?.guid),
    target: effects.getConvertibleBalanceFx,
});

guard({
    clock: [stores.$isEmailConfirmed],
    filter: stores.$isEmailConfirmed.map((isEmailConfirmed) => isEmailConfirmed === false),
    target: [events.remindedUserToConfirmEmail],
});

events.remindedUserToConfirmEmail.watch(() => {
    showMessage(i18n?.t('message-to-remind-you-to-confirm-email'), 'warning');
});

sample({
    clock: effects.deleteAccountFx.done,
    target: events.sessionEnded,
});

stores.$partnerAccounts.on(effects.getPartnerAccountsFx.doneData, (_, { data }) => data);

stores.$partnerAdmins.on(effects.getPartnerAdminListFx.doneData, (_, { data }) => data);

sample({
    source: { partnerId: stores.$partnerId, isAuthorized: stores.$isAuthorized },
    filter: ({ partnerId, isAuthorized }) => Boolean(partnerId && isAuthorized),
    fn: ({ partnerId }) => String(partnerId),
    target: [effects.getPartnerAccountsFx, effects.getPartnerAdminListFx],
});

sample({
    clock: events.getEarningHistoryWithCurrentPage,
    source: {
        earningHistory: stores.$earningHistory,
        widgetId: widgetConfigModel.stores.$globalWidgetConfigId,
    },
    filter: ({ earningHistory, widgetId }) => Boolean(earningHistory && widgetId),
    fn: ({ earningHistory, widgetId }) => {
        return { pageNumber: Number(earningHistory?.pageNumber), widgetId: String(widgetId) };
    },
    target: effects.getEarningHistoryFx,
});

sample({
    clock: [widgetConfigModel.stores.$globalWidgetConfigId, stores.$isAuthorized],
    source: {
        widgetId: widgetConfigModel.stores.$globalWidgetConfigId,
        isAuthorized: stores.$isAuthorized,
    },
    filter: ({ widgetId, isAuthorized }) => Boolean(widgetId && isAuthorized),
    fn: ({ widgetId }) => {
        return String(widgetId);
    },
    target: effects.trackDailyLoginFx,
});

stores.$accountAttachedToPartner
    .on(effects.getAccountAttachedToPartnerFx.doneData, (_, { data }) => {
        return data?.target === 'LOYALTY' ? data : 'DOES_NOT_EXIST';
    })
    .on(effects.logoutFx.doneData, () => null)
    .on(effects.changeFullnameFx.doneData, (account, { data: { firstName, lastName } }) => {
        if (typeof account === 'object' && account !== null) {
            return {
                ...account,
                firstName,
                lastName,
            };
        }
        return account;
    });

sample({
    clock: [widgetConfigModel.stores.$globalWidgetConfig, stores.$isAuthorized],
    source: {
        widget: widgetConfigModel.stores.$globalWidgetConfig,
        isAuthorized: stores.$isAuthorized,
    },
    filter: ({ widget, isAuthorized }) => Boolean(widget?.partner?.guid && isAuthorized),
    fn: ({ widget }) => String(widget?.partner?.guid),
    target: effects.getAccountAttachedToPartnerFx,
});

sample({
    clock: stores.$accountAttachedToPartner,
    filter: (account) => {
        const isNotExist = account === 'DOES_NOT_EXIST';

        if (isNotExist) {
            showMessage('Account per partner does not exist', 'error');
        }
        return isNotExist;
    },
    target: effects.logoutFx,
});
