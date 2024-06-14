import { createStore } from 'effector';
import { GlobalWidgetStatistic } from '@/shared/api/widget-config/types';
import { Nullable } from '@/shared/utility-types';

export const $globalWidgetStatistic = createStore<Nullable<GlobalWidgetStatistic>>(null);
