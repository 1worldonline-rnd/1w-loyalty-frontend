import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { userModel } from '@/entities/user';
import { Route } from '@/shared/constants';
import { useCustomRouter } from '@/shared/hooks';
import type { AccountRole } from '@/shared/api/account/types';

type UseProtectedRouteParams = {
    byRoles?: AccountRole[];
    byAdminRights?: boolean;
    onlyForLoyaltyProgram?: boolean;
};

const $accountRoles = userModel.stores.$account.map((account) => account?.roles || []);

export const useProtectedRoute = (params: UseProtectedRouteParams = {}) => {
    const { byAdminRights, byRoles, onlyForLoyaltyProgram } = params;

    const isAuthorized = useStore(userModel.stores.$isAuthorized);
    const accountRoles = useStore($accountRoles);
    const isAdminPanelAvailable = useStore(userModel.stores.$isAdminPanelAvailable);
    const partnerPermittedAccountIds = useStore(userModel.stores.$partnerPermittedAccountIds);

    const { push, asPath, urlSearchParams } = useCustomRouter();

    const hasWidgetId = urlSearchParams?.loyaltyWidgetId;

    useEffect(() => {
        const pushToForbidden = () => {
            push(
                {
                    pathname: Route.forbidden,
                },
                asPath
            );
        };

        // if the user was checked for authorization and the user failed it
        // redirect to sign in page
        if (isAuthorized) {
            if (byAdminRights && isAdminPanelAvailable === false && partnerPermittedAccountIds) {
                pushToForbidden();
            } else if (byRoles?.some((role) => accountRoles.includes(role))) {
                pushToForbidden();
            } else if (onlyForLoyaltyProgram) {
                if (!hasWidgetId) {
                    push(
                        {
                            pathname: Route.notFound,
                        },
                        asPath
                    );
                }
            }
        } else if (isAuthorized === false) {
            push({ pathname: Route.signIn });
        }
    }, [
        isAuthorized,
        isAdminPanelAvailable,
        push,
        byAdminRights,
        asPath,
        byRoles,
        accountRoles,
        onlyForLoyaltyProgram,
        partnerPermittedAccountIds,
    ]);
};
