import { combine, createStore } from 'effector';
import {
    Feed,
    FeedContentWithId,
    FeedList,
    Sequence,
    SequenceFeed,
    SequenceItemAdmin,
    SequenceRewardedOption,
} from '@/shared/api/feed/types';
import { WidgetFeedRelation } from '@/shared/api/widget-config/types';
import { earnFormSubmitted, earnFormSubmittedUpdate } from './events';
import { getWidgetFeedRelationsFx } from './effects';
import { Nullable } from '@/shared/utility-types';

export const $feedContentList = createStore<Array<Omit<FeedList, 'items'> & { items: FeedContentWithId[] }>>(
    []
);

export const $sequenceFeedList = createStore<SequenceFeed[]>([]);

export const $feeds = createStore<Feed[]>([]);
export const $mixedFeeds = createStore<Feed[]>([]);
export const $feedsCommon = createStore<Feed[]>([]);

export const $widgetFeedRelations = createStore<WidgetFeedRelation[]>([]);

export const $isFormSubmitted = createStore(false)
    .on(earnFormSubmitted, () => true)
    .on(getWidgetFeedRelationsFx.done, () => false)
    .on(earnFormSubmittedUpdate, (value) => value);

export const $sequences = createStore<Sequence[]>([]);
export const $sequenceFeedItems = createStore<SequenceItemAdmin[]>([]);

export const $activeSequenceId = createStore<Nullable<Sequence['id']>>(null);

export const $activeSequence = combine($sequences, $activeSequenceId, (sequences, activeSequenceId) => {
    return sequences.find(({ id }) => id === activeSequenceId) || null;
});

export const $rewardedIMUs = createStore<SequenceRewardedOption[]>([]);

export const $combinedFeeds = combine(
    $sequenceFeedList,
    $feedContentList,
    (sequenceFeedList, feedContentList) =>
        [...sequenceFeedList, ...feedContentList].sort((a, b) => a.position - b.position)
);
