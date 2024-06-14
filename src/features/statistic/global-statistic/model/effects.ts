import { createEffect } from 'effector';
import { widgetConfigApi } from '@/shared/api';

export const getGlobalStatisticsWidgetFx = createEffect(widgetConfigApi.fetchGlobalWidgetStatistic);
