import {
    $activeTab,
    $articleStatistics,
    $searchArticleUrl,
    $statisticsFilter,
    $statisticsWidget,
    $statisticsOfAllWidgetArticles,
} from './stores';
import {
    activeTabChanged,
    searchArticleUrlChanged,
    statisticsFilterChanged,
    statisticsWidgetModelReset,
} from './events';
import {
    getDetailedStatisticsWidgetFx,
    getGeneralStatisticsWidgetFx,
    getWidgetArticleStatisticsFx,
    getStatisticsOfAllWidgetArticleFx,
} from './effects';

$activeTab.on(activeTabChanged, (_, activeTab) => activeTab);

$statisticsWidget
    .on(getGeneralStatisticsWidgetFx.doneData, (statisticsWidget, generalStatistics) => ({
        ...statisticsWidget,
        general: generalStatistics,
    }))
    .on(getDetailedStatisticsWidgetFx.doneData, (statisticsWidget, { data: detailedStatistics }) => ({
        ...statisticsWidget,
        detailed: detailedStatistics,
    }))
    .reset(statisticsWidgetModelReset);

$statisticsFilter
    .on(statisticsFilterChanged, (_, statisticsFilter) => statisticsFilter)
    .reset(statisticsWidgetModelReset);

$searchArticleUrl
    .on(searchArticleUrlChanged, (_, searchArticleUrl) => searchArticleUrl)
    .reset(statisticsWidgetModelReset);

$articleStatistics
    .on(getWidgetArticleStatisticsFx.doneData, (_, { data }) => data)
    .reset(statisticsWidgetModelReset);

$statisticsOfAllWidgetArticles
    .on(getStatisticsOfAllWidgetArticleFx.doneData, (_, { data }) => data)
    .reset(statisticsWidgetModelReset);
