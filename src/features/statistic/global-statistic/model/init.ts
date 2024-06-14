import { $globalWidgetStatistic } from './stores';
import { getGlobalStatisticsWidgetFx } from './effects';

$globalWidgetStatistic.on(getGlobalStatisticsWidgetFx.doneData, (_, { data }) => data);
