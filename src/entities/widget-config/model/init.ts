import { combine, guard, sample } from 'effector';
import { cloneDeep } from 'lodash';
import Color from 'color';
import {
    $activeWidgetConfigId,
    $globalWidgetConfig,
    $noHasWidgetConfig,
    $widgetConfigs,
    $widgetConfigsLoaded,
    $globalWidgetConfigId,
} from './stores';
import { setActiveWidgetConfigId, setWidgetTheme, widgetConfigSocialWatched } from './events';
import {
    getWidgetConfigFx,
    updateWidgetConfigFx,
    deleteWidgetConfigFx,
    getWidgetConfigsByPartnerIdFx,
    createWidgetConfigFx,
    getGlobalWidgetConfigFx,
} from './effects';
import { Route } from '@/shared/constants';
import { appModel } from '@/entities/app';
import { userModel } from '@/entities/user';
import { getAccountFx } from '@/entities/user/model/effects';

$globalWidgetConfigId.on(appModel.events.urlSearchParamsSet, (_, params) => {
    return params.loyaltyWidgetId || null;
});

guard({
    clock: [userModel.stores.$isAuthorized, $globalWidgetConfigId, appModel.stores.$parentPageUrl],
    source: combine(
        $globalWidgetConfigId.map((id) => String(id)),
        appModel.stores.$parentPageUrl,
        (loyaltyWidgetId, windowParentUrl) => ({ loyaltyWidgetId, windowParentUrl })
    ),
    filter: combine(
        userModel.stores.$isAuthorized,
        $globalWidgetConfigId,
        appModel.stores.$parentPageUrl,
        (...flags) => flags.every(Boolean)
    ),
    target: appModel.effects.trackInitializationEventFx,
});

guard({
    clock: [$globalWidgetConfigId, getAccountFx],
    source: $globalWidgetConfigId.map(String),
    filter: $globalWidgetConfigId.map(Boolean),
    target: getGlobalWidgetConfigFx,
});

$globalWidgetConfig
    .on(getGlobalWidgetConfigFx.doneData, (_, { data: widgetConfig }) => {
        return widgetConfig.guid ? widgetConfig : null;
    })
    .on(widgetConfigSocialWatched, (globalWidgetConfig, activity) => {
        const globalWidgetConfigCopy = cloneDeep(globalWidgetConfig);
        if (globalWidgetConfigCopy?.socialMedia[activity]) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            globalWidgetConfigCopy.socialMedia[activity]!.userPreviousActions = {
                GENERAL_CLICK: {
                    pointType: 32,
                },
            };
        }
        return globalWidgetConfigCopy;
    })
    .on(setWidgetTheme, (globalWidgetConfig, theme) => {
        if (globalWidgetConfig) {
            return {
                ...globalWidgetConfig,
                settings: {
                    ...globalWidgetConfig.settings,
                    theme,
                },
            };
        }
        return globalWidgetConfig;
    })
    .watch((globalWidgetConfig) => {
        if (typeof document !== 'undefined') {
            const documentStyle = document.body.style;
            const { widgetColor, fontFamily, theme, darkBgColor, lightBgColor } =
                globalWidgetConfig?.settings || {};
            if (theme === 'dark' && document.body.dataset.theme === 'dark' && darkBgColor) {
                documentStyle.setProperty('--body-background-color', darkBgColor);
            }
            if (theme === 'light' && document.body.dataset.theme === 'light' && lightBgColor) {
                documentStyle.setProperty('--body-background-color', lightBgColor);
            }
            if (fontFamily) documentStyle.setProperty('--font-family', fontFamily);
            if (widgetColor) {
                const color = Color(widgetColor);
                const rgb = color.rgb().array().join(',');
                documentStyle.setProperty('--accent-primary-color', rgb);
            }
        }
    });

$activeWidgetConfigId.on(setActiveWidgetConfigId, (_, id) => id);

$widgetConfigsLoaded.on(getWidgetConfigsByPartnerIdFx.doneData, () => true);

guard({
    // when event 'setActiveWidgetConfigId' called
    source: setActiveWidgetConfigId,
    // if we don't have widget in widget config list
    filter: $noHasWidgetConfig,
    // then call 'getWidgetConfigFx' with ID which passed to 'setActiveWidgetConfigId'
    target: getWidgetConfigFx,
});

$widgetConfigs
    .on(getWidgetConfigsByPartnerIdFx.doneData, (_, { data: newWidgetConfigs }) => newWidgetConfigs)
    .on(getWidgetConfigFx.doneData, (widgetConfigs, { data: newWidgetConfig }) => {
        // if response data has 'guid' so request is success
        if (newWidgetConfig.guid) {
            // if the widget is in the list we need to update
            if (widgetConfigs.find(({ guid }) => guid === newWidgetConfig.guid)) {
                return widgetConfigs.map((widgetConfig) => {
                    if (widgetConfig.guid === newWidgetConfig.guid) {
                        return newWidgetConfig;
                    }
                    return widgetConfig;
                });
            }
            // or add in the list
            return widgetConfigs.concat([newWidgetConfig]);
        }
        return widgetConfigs;
    })
    .on(updateWidgetConfigFx.doneData, (widgetConfigs, { data: updatedWidgetConfig }) => {
        // if response data has 'guid' so request is success
        if (updatedWidgetConfig.guid) {
            return widgetConfigs.map((widgetConfig) => {
                if (widgetConfig.guid === updatedWidgetConfig.guid) {
                    return updatedWidgetConfig;
                }
                return widgetConfig;
            });
        }
        return widgetConfigs;
    })
    .on(deleteWidgetConfigFx.done, (widgetConfigs, { params: widgetId }) => {
        return widgetConfigs.filter(({ guid }) => guid !== widgetId);
    })
    .on(createWidgetConfigFx.doneData, (widgetConfigs, { data: newWidgetConfig }) => {
        return [newWidgetConfig, ...widgetConfigs];
    });

/*
1. when store $isAdminPanelAvailable was changing
2. check $isAdminPanelAvailable on true
3. take the value of userModel.stores.$partnerId
4. call request to get widget configs
*/
guard({
    /* 1 */ clock: [userModel.stores.$isAdminPanelAvailable],
    /* 2 */ filter: userModel.stores.$isAdminPanelAvailable.map(Boolean),
    /* 3 */ source: userModel.stores.$partnerId.map(String),
    /* 4 */ target: getWidgetConfigsByPartnerIdFx,
});

sample({
    clock: getWidgetConfigFx.failData,
    fn: () => ({ pathname: Route.admin.widgets }),
    target: appModel.events.redirected,
});
