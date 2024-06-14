import { combine, createStore } from 'effector';
import {
    WidgetArticleStatistics,
    WidgetStatistics,
    StatisticsOfAllWidgetArticles,
} from '@/shared/api/widget-config/types';
import { StatisticsWidgetTab, StatisticsFilterFormValues } from '../types';
import {
    getDetailedStatisticsWidgetFx,
    getGeneralStatisticsWidgetFx,
    getWidgetArticleStatisticsFx,
} from './effects';
import { Nullable } from '@/shared/utility-types';

export const $activeTab = createStore<StatisticsWidgetTab>(StatisticsWidgetTab.general);

export const $statisticsWidget = createStore<WidgetStatistics>({});

export const $isLoadingWidgetStatisctics = combine(
    getGeneralStatisticsWidgetFx.pending,
    getDetailedStatisticsWidgetFx.pending,
    getWidgetArticleStatisticsFx.pending,
    (...pendingFlags) => pendingFlags.includes(true)
);

export const $statisticsFilter = createStore<StatisticsFilterFormValues>({});
export const $searchArticleUrl = createStore('');

export const $articleStatistics = createStore<Nullable<WidgetArticleStatistics>>(null);
export const $statisticsOfAllWidgetArticles = createStore<Nullable<StatisticsOfAllWidgetArticles>>(null);
