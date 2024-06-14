import { combine, createStore } from 'effector';
import { Account, AccountRole, AccountAttachedToPartner } from '@/shared/api/account/types';
import type { Partner, PartnerId } from '@/shared/api/partner/types';
import type { EarningHistory } from '@/shared/api/crypto/types';
import type { Nullable } from '@/shared/utility-types';

// the user is authorized or not
// if it equals `null`, then the verification has not yet passed
export const $isAuthorized = createStore<Nullable<boolean>>(null);

export const $account = createStore<Nullable<Account>>(null);

export const $isNotSynthetic = $account.map((account) => {
    return account && !account?.roles.includes(AccountRole.synthetic);
});

/**
 * @description In addition to the main account in the loyalty system,
 * the user has an account that is associated with a loyalty partner
 */
export const $accountAttachedToPartner = createStore<Nullable<AccountAttachedToPartner> | 'DOES_NOT_EXIST'>(
    null
);

export const $dataForPasswordChange = createStore<{ email?: string; password?: string }>({});

export const $partnerId = createStore<Nullable<PartnerId>>(null);

export const $loyaltyPartner = createStore<Nullable<Partner>>(null);

export const $partnerAccounts = createStore<Nullable<Pick<Account, 'id'>[]>>(null);

export const $partnerAdmins = createStore<Nullable<Pick<Account, 'id'>[]>>(null);

export const $partnerPermittedAccountIds = combine(
    $partnerAccounts,
    $partnerAdmins,
    (partnerAccounts, partnerAdmins) => {
        if (partnerAdmins && partnerAccounts) {
            return [...partnerAdmins, ...partnerAccounts].map(({ id }) => id);
        }
        return null;
    }
);

// is admin panel available or not for user
// if it equals `null`, then the verification has not yet passed
export const $isAdminPanelAvailable = combine(
    $isAuthorized,
    $partnerPermittedAccountIds,
    $account,
    $account.map((account) => {
        if (account) {
            const availableRoles = [AccountRole.admin, AccountRole.partner, AccountRole.superAdmin];
            return account.roles.some((role) => {
                return availableRoles.includes(role);
            });
        }
        return false;
    }),
    $partnerId,
    (isAuthorized, partnerPermittedAccountIds, account, areTheseRolesAvailable, partnerId) => {
        if (isAuthorized !== null && account) {
            return (
                (areTheseRolesAvailable || partnerPermittedAccountIds?.includes(account.id)) &&
                Boolean(partnerId)
            );
        }
        return null;
    }
);

export const $earningHistory = createStore<Nullable<EarningHistory>>(null);

export const $isEmailConfirmed = $account.map((account) => account?.isEmailConfirmed);
