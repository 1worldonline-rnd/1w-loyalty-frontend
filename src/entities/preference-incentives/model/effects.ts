import { createEffect } from 'effector';
import { widgetConfigApi } from '@/shared/api';

export const getPreferenceIncentivesFx = createEffect(widgetConfigApi.fetchPreferenceIncentives);
export const updatePreferenceIncentivesFx = createEffect(widgetConfigApi.fetchUpdatePreferenceIncentives);
