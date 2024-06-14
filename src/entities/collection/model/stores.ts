import { combine, createStore } from 'effector';
import type { Collection, CollectionTopicRelation, Topic } from '@/shared/api/collection/types';
import { Nullable } from '@/shared/utility-types';
import { WidgetCollectionRelation } from '@/shared/api/widget-config/types';
import { collectionApi } from '@/shared/api';

export const $collections = createStore<Collection[]>([]);

export const $activeCollectionId = createStore<Nullable<Collection['id']>>(null);

export const $activeCollection = combine(
    $collections,
    $activeCollectionId,
    (collections, activeCollectionId) => {
        return collections.find(({ id }) => id === activeCollectionId) || null;
    }
);

export const $collectionTopicRelations = createStore<CollectionTopicRelation[]>([]);

export const $topics = createStore<Topic[]>([]);

export const $collectionRelations = createStore<WidgetCollectionRelation[]>([]);

export const $globalWidgetCollectionsAndTopics = createStore<
    Awaited<ReturnType<typeof collectionApi.getCollectionsAndTopicsByLoyaltyWidgetId>>['data']
>({
    loyaltyCollectionTopicRelations: [],
    loyaltyCollectionWidgetRelations: [],
    topics: [],
});
