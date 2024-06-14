import { createEvent } from 'effector';
import { StatisticsWidgetTab, StatisticsFilterFormValues } from '../types';

export const activeTabChanged = createEvent<StatisticsWidgetTab>();
export const statisticsFilterChanged = createEvent<StatisticsFilterFormValues>();
export const searchArticleUrlChanged = createEvent<string>();
export const statisticsWidgetModelReset = createEvent();
