import { createEffect } from 'effector';
import { widgetConfigApi } from '@/shared/api';

export const getWidgetConfigsByPartnerIdFx = createEffect(widgetConfigApi.fetchWidgetConfigsByPartnerId);

export const getWidgetConfigFx = createEffect(widgetConfigApi.fetchWidgetConfig);

export const getGlobalWidgetConfigFx = createEffect(widgetConfigApi.fetchWidgetConfig);

export const deleteWidgetConfigFx = createEffect(widgetConfigApi.fetchDeleteWidgetConfig);

export const updateWidgetConfigFx = createEffect(widgetConfigApi.fetchUpdateWidgetConfig);

export const createWidgetConfigFx = createEffect(widgetConfigApi.fetchCreateWidgetConfig);

export const updateProgressiveDailyPointsStreakFx = createEffect(widgetConfigApi.fetchWidgetConfig);

export const createLoyaltyProductTourView = createEffect(widgetConfigApi.fetchCreateLoyaltyProductTourView);
