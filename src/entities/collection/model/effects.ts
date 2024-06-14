import { collectionApi } from '@/shared/api';
import { createEffect } from 'effector';

export const getCollectionsFx = createEffect(collectionApi.fetchCollections);

export const createCollectionFx = createEffect(collectionApi.fetchCreateCollection);

export const deleteCollectionFx = createEffect(collectionApi.deleteCollection);

export const createTopicInCollectionFx = createEffect(collectionApi.createTopicInLoyaltyCollection);

export const getCollectionsTopicRelationsByCollectionIdFx = createEffect(
    collectionApi.getCollectionsTopicRelationsByCollectionId
);

export const updateTopicPositionsFx = createEffect(collectionApi.updateTopicPositions);

export const getTopicsWithPartnerFeedRelationsByIdsFx = createEffect(
    collectionApi.getTopicsWithPartnerFeedRelationsByIds
);
export const getCollectionRelationsFx = createEffect(collectionApi.fetchCollectionRelations);

export const createOrUpdateCollectionRelationsFx = createEffect(
    collectionApi.fetchCreateOrUpdateCollectionsRelations
);

export const deleteCollectionRelationFx = createEffect(collectionApi.deleteCollectionRelation);

export const deleteFeedRelationFromTopicFx = createEffect(collectionApi.deleteFeedRelationFromTopic);

export const deleteTopicFromCollectionFx = createEffect(collectionApi.deleteTopicFromCollection);

export const updateTopicTopicInLoyaltyCollectionFx = createEffect(
    collectionApi.updateTopicTopicInLoyaltyCollection
);

export const getCollectionsAndTopicsByLoyaltyWidgetIdFx = createEffect(
    collectionApi.getCollectionsAndTopicsByLoyaltyWidgetId
);
