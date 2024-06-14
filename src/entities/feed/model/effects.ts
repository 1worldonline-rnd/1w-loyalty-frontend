import { createEffect } from 'effector';
import { feedApi, eventApi } from '@/shared/api';
import { FeedContentWithId } from '@/shared/api/feed/types';

export const getFeedContentFx = createEffect(feedApi.fetchFeedContent);

type FeedContentWatchFxParameters = {
    payload: Parameters<typeof eventApi.fetchTrackContentWatched>[0];
    id: FeedContentWithId['generatedId'];
};

export const feedContentWatchFx = createEffect(({ payload }: FeedContentWatchFxParameters) => {
    return eventApi.fetchTrackContentWatched(payload);
});

export const getFeedsFx = createEffect(feedApi.fetchFeeds);
export const getMixedFeedsFx = createEffect(feedApi.fetchMixedFeeds);
export const deleteFeedFx = createEffect(feedApi.fetchDeleteFeed);
export const updateFeedFx = createEffect(feedApi.fetchUpdateFeed);
export const createFeedFx = createEffect(feedApi.fetchCreateFeed);

export const getWidgetFeedRelationsFx = createEffect(feedApi.fetchWidgetFeedRelations);
export const createWidgetFeedRelationFx = createEffect(feedApi.fetchCreateWidgetFeedRelation);
export const updateWidgetFeedRelationsFx = createEffect(feedApi.fetchUpdateWidgetFeedRelations);
export const deleteWidgetFeedRelationFx = createEffect(feedApi.fetchDeleteWidgetFeedRelation);

export const getSequencesFx = createEffect(feedApi.fetchSequences);
export const deleteSequenceFx = createEffect(feedApi.fetchDeleteSequence);
export const updateSequenceFx = createEffect(feedApi.fetchUpdateSequence);
export const createSequenceFx = createEffect(feedApi.fetchCreateSequence);
export const changeSequenceStatusFx = createEffect(feedApi.fetchChangeSequenceStatus);

export const getSequenceItemsFx = createEffect(feedApi.fetchSequenceItems);
export const updateSequenceItemFx = createEffect(feedApi.fetchUpdateSequenceItem);
export const createSequenceItemFx = createEffect(feedApi.fetchCreateSequenceItem);
export const deleteSequenceItemFx = createEffect(feedApi.fetchDeleteSequenceItem);
export const updateSequenceItemsOrderingFx = createEffect(feedApi.fetchUpdateSequenceItemsOrdering);

export const getRewardedIMUsFx = createEffect(feedApi.fetchRewarderdIMUs);
