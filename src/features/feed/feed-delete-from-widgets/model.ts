import { feedApi } from '@/shared/api';
import { LinkedWidgetToFeed } from '@/shared/api/feed/types';
import { createEffect, createEvent, createStore } from 'effector';

const $linkedWidgetsToFeed = createStore<LinkedWidgetToFeed[]>([]);

const getLinkedWidgetsToFeedFx = createEffect(feedApi.fetchWidgetsFeeds);

const clearLinkedWidgetsToFeed = createEvent();
const deleteLinkedWidget = createEvent<string>();

$linkedWidgetsToFeed
    .on(getLinkedWidgetsToFeedFx.doneData, (_, { data }) => data)
    .on(deleteLinkedWidget, (list, widgetId) => {
        return list.filter(({ widgetCode }) => widgetCode !== widgetId);
    })
    .reset(clearLinkedWidgetsToFeed);

export const model = {
    stores: {
        $linkedWidgetsToFeed,
    },
    effects: {
        getLinkedWidgetsToFeedFx,
    },
    events: {
        clearLinkedWidgetsToFeed,
        deleteLinkedWidget,
    },
};
