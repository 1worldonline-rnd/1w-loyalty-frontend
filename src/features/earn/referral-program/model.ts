import { createEffect, createStore, sample } from 'effector';
import { axios } from '@/shared/lib/axios';
import type { WidgetConfig } from '@/shared/api/widget-config/types';
import type { Nullable, Truthy } from '@/shared/utility-types';
import { ReferralProgram } from './types';
import { widgetConfigModel } from '@/entities/widget-config';
import { userModel } from '@/entities/user';

export const $referralProgram = createStore<Nullable<ReferralProgram>>(null);

const getReferralProgramFx = createEffect(
    (payload: {
        widgetId: WidgetConfig['guid'];
        referralUrl: Truthy<WidgetConfig['settings']['referralUrl']>;
    }) => {
        const { widgetId, referralUrl } = payload;
        return axios.post<ReferralProgram>(`accounts/referrals/${widgetId}`, JSON.stringify(referralUrl), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
);

$referralProgram.on(getReferralProgramFx.doneData, (_, { data }) => {
    return data.url ? data : _;
});

const $referralUrl = widgetConfigModel.stores.$globalWidgetConfig.map((widget) => {
    return widget?.settings?.referralUrl;
});

sample({
    source: {
        widgetId: widgetConfigModel.stores.$globalWidgetConfigId,
        isAuthorized: userModel.stores.$isAuthorized,
        referralUrl: $referralUrl,
    },
    filter: ({ widgetId, isAuthorized, referralUrl }) => Boolean(widgetId && isAuthorized && referralUrl),
    fn: ({ widgetId, referralUrl }) => ({
        widgetId: widgetId!,
        referralUrl: referralUrl!,
    }),
    target: getReferralProgramFx,
});
