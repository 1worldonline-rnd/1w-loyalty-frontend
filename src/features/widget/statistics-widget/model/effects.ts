import { createEffect } from 'effector';
import { widgetConfigApi } from '@/shared/api';

export const getGeneralStatisticsWidgetFx = createEffect(widgetConfigApi.fetchGeneralWidgetStatistics);
export const getDetailedStatisticsWidgetFx = createEffect(widgetConfigApi.fetchDetailedWidgetStatistics);
export const getWidgetArticleStatisticsFx = createEffect(widgetConfigApi.fetchWidgetArticleStatistics);
export const getStatisticsOfAllWidgetArticleFx = createEffect(
    widgetConfigApi.fetchStatisticsOfAllWidgetArticles
);
