import { combine, createStore } from 'effector';
import type { WidgetConfig } from '@/shared/api/widget-config/types';
import type { Nullable } from '@/shared/utility-types';
import { collectionModel } from '@/entities/collection';
import { feedModel } from '@/entities/feed';

export const $widgetConfigs = createStore<Readonly<WidgetConfig>[]>([]);

export const $widgetConfigsLoaded = createStore(false);

// config widget that changes in the form
export const $activeWidgetConfigId = createStore<Nullable<string>>(null);

export const $activeWidgetConfig = combine(
    $widgetConfigs,
    $activeWidgetConfigId,
    (configs, activeConfigId) => {
        return configs.find(({ guid }) => guid === activeConfigId) || null;
    }
);

export const $noHasWidgetConfig = $activeWidgetConfig.map((widget) => !widget);

// global widget config is the config, the ID of which was taken from the get parameters
export const $globalWidgetConfig = createStore<Nullable<WidgetConfig>>(null);
export const $globalWidgetConfigId = createStore<Nullable<WidgetConfig['guid']>>(null);

// user menu settings
export const $userMenuSettings = $globalWidgetConfig.map((config) => {
    return config?.userMenuSettings;
});

export const $content = combine(
    collectionModel.stores.$collections,
    feedModel.stores.$mixedFeeds,
    (collections, mixedFeeds) => [...collections, ...mixedFeeds]
);

export const $contentRelations = combine(
    collectionModel.stores.$collectionRelations,
    feedModel.stores.$widgetFeedRelations,
    (collectionRelations, feedRelations) =>
        [...feedRelations, ...collectionRelations].sort((a, b) => a.position - b.position)
);
