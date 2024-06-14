import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { useCustomRouter } from '@/shared/hooks';
import { userModel } from '@/entities/user';
import { Route } from '@/shared/constants';
import { widgetConfigModel } from '@/entities/widget-config';

/**
 * @description after authorization or password recovery, you need to transfer to the start page
 * for admin: `Route.admin.widgets`
 * for the user who uses the widget: `Route.earn`
 */
export const useRedirectToStartPage = () => {
    const { push } = useCustomRouter();
    const isAuthorized = useStore(userModel.stores.$isAuthorized);
    const isAdminPanelAvailable = useStore(userModel.stores.$isAdminPanelAvailable);
    const globalWidgetConfigId = useStore(widgetConfigModel.stores.$globalWidgetConfigId);

    useEffect(() => {
        if (isAuthorized) {
            // default pathname
            let pathname = Route.home;
            // for user who uses the widget
            if (globalWidgetConfigId) {
                pathname = Route.earn;
            // for admin
            } else if (isAdminPanelAvailable) {
                pathname = Route.admin.widgets;
            }

            push({ pathname });
        }
    }, [isAuthorized, isAdminPanelAvailable, globalWidgetConfigId, push]);
};
