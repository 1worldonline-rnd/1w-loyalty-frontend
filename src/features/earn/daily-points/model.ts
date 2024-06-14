import { userModel } from '@/entities/user';
import { widgetConfigModel } from '@/entities/widget-config';
import type { WidgetConfig } from '@/shared/api/widget-config/types';
import { axios } from '@/shared/lib/axios';
import { Nullable, Truthy } from '@/shared/utility-types';
import { createEffect, createStore, sample } from 'effector';
import type { DailyPointsStreakItem } from './types';

export const $progressiveDailyPointsStreak =
    createStore<Nullable<WidgetConfig['progressiveDailyPointsStreak']>>(null);

export const unlockPointsFx = createEffect((historyId: Truthy<DailyPointsStreakItem['historyId']>) => {
    return axios.patch(`/scores/${historyId}/unlocks`);
});

$progressiveDailyPointsStreak.on(
    [
        widgetConfigModel.effects.getGlobalWidgetConfigFx.doneData,
        widgetConfigModel.effects.updateProgressiveDailyPointsStreakFx.doneData,
    ],
    (_, { data: { progressiveDailyPointsStreak } }) => progressiveDailyPointsStreak
);

sample({
    clock: [unlockPointsFx.doneData, userModel.effects.trackDailyLoginFx.doneData],
    source: widgetConfigModel.stores.$globalWidgetConfigId,
    filter: widgetConfigModel.stores.$globalWidgetConfigId.map(Boolean),
    fn: String,
    target: [widgetConfigModel.effects.updateProgressiveDailyPointsStreakFx],
});

export const dailyPointsModel = {
    stores: {
        $progressiveDailyPointsStreak,
    },
    effects: {
        unlockPointsFx,
    },
};
