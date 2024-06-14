import { WidgetCollectionRelation } from './../widget-config/types';
import { axios } from '@/shared/lib/axios';
import type { Collection, CollectionTopicRelation, Topic, TopicFeedRelation } from './types';
import type { PartnerId } from '../partner/types';
import { expandCommonFeeds } from '@/shared/lib/expandCommonFeeds';
import { FeedList } from '../feed/types';

export const fetchCollections = (partnerId: PartnerId) => {
    return axios.get<Collection[]>(`loyalty/collections/${partnerId}`);
};

export const fetchCreateCollection = ({
    collection,
    partnerId,
}: {
    collection: Pick<Collection, 'name' | 'type' | 'locale'>;
    partnerId: PartnerId;
}) => {
    return axios.post<Collection>('loyalty/collections', collection, {
        params: {
            partnerId,
        },
    });
};

export const createTopicInLoyaltyCollection = (payload: {
    partnerId: string;
    loyaltyCollectionId: Collection['id'];
    topic: {
        name: Topic['name'];
        description: Topic['description'];
        logo: Topic['logo'];
        locale: Topic['locale'];
        topicPartnerFeedRelations: Array<
            Pick<TopicFeedRelation, 'name' | 'position'> & { partnerFeed: { id: string; type: string } }
        >;
    };
}) => {
    const { partnerId, loyaltyCollectionId, topic } = payload;

    return axios.post(`loyalty/collections/topics/relations/partners/${partnerId}`, {
        loyaltyCollectionTopicRelation: {
            loyaltyCollectionId,
        },
        topic,
    });
};

export const getCollectionsTopicRelationsByCollectionId = (payload: {
    partnerId: PartnerId;
    loyaltyCollectionIds: Collection['id'][];
}) => {
    const { partnerId, loyaltyCollectionIds } = payload;

    return axios.post<CollectionTopicRelation[]>(
        `/loyalty/collections/topics/relations/partners/${partnerId}/loyalty-collection-ids`,
        loyaltyCollectionIds
    );
};

export const updateTopicPositions = (payload: {
    partnerId: PartnerId;
    topicRelations: CollectionTopicRelation[];
}) => {
    const { partnerId, topicRelations } = payload;

    return axios.put<CollectionTopicRelation[]>(
        `/loyalty/collections/topics/relations/partners/${partnerId}`,
        topicRelations
    );
};

export const getTopicsWithPartnerFeedRelationsByIds = (payload: {
    partnerId: PartnerId;
    topicIds: Topic['id'][];
}) => {
    const { partnerId, topicIds } = payload;

    return axios.post<Topic[]>(`topics/feeds/relations/partners/${partnerId}/topic-ids`, topicIds);
};

export const fetchCollectionRelations = ({
    partnerId,
    widgetId,
}: {
    partnerId: PartnerId;
    widgetId: string;
}) => {
    return axios.get<WidgetCollectionRelation[]>(
        `/loyalty/collections/relations/widgets/${widgetId}/partners/${partnerId}`
    );
};

export const fetchCreateOrUpdateCollectionsRelations = ({
    partnerId,
    collectionRelations,
}: {
    partnerId: PartnerId;
    collectionRelations: WidgetCollectionRelation[];
}) => {
    return axios.put<WidgetCollectionRelation[]>(
        `/loyalty/collections/relations/widgets/partners/${partnerId}`,
        collectionRelations
    );
};

export const deleteCollectionRelation = ({
    partnerId,
    collectionId,
}: {
    partnerId: PartnerId;
    collectionId: Collection['id'];
}) => {
    return axios.delete(`/loyalty/collections/relations/widgets/partners/${partnerId}/id/${collectionId}`);
};

export type PayloadForUpdateTopic = {
    partnerId: PartnerId;
    topic: Omit<Topic, 'topicPartnerFeedRelations'> & {
        topicPartnerFeedRelations: Array<
            Pick<TopicFeedRelation, 'name' | 'position'> & {
                id?: TopicFeedRelation['id'];
                createdBy?: TopicFeedRelation['createdBy'];
                updatedBy?: TopicFeedRelation['updatedBy'];
                partnerFeed: { id: string; type: string };
            }
        >;
    };
    type: 'SEQUENCE' | 'TOPIC';
};

export const updateTopicTopicInLoyaltyCollection = (payload: PayloadForUpdateTopic) => {
    const { partnerId, topic, type } = payload;

    return axios.post(`/topics/feeds/relations/partners/${partnerId}`, topic, {
        params: {
            type,
        },
    });
};

export const deleteFeedRelationFromTopic = (payload: {
    partnerId: PartnerId;
    feedRelationId: TopicFeedRelation['id'];
}) => {
    const { partnerId, feedRelationId } = payload;

    return axios.delete(`/topics/feeds/relations/partners/${partnerId}/id/${feedRelationId}`);
};

export const deleteTopicFromCollection = (payload: {
    partnerId: PartnerId;
    topicId: TopicFeedRelation['id'];
}) => {
    const { partnerId, topicId } = payload;

    return axios.delete(`/topics/feeds/relations/partners/${partnerId}/topics/${topicId}`);
};

export const getCollectionsAndTopicsByLoyaltyWidgetId = (payload: {
    partnerId: PartnerId;
    widgetId: string;
}) => {
    const { partnerId, widgetId } = payload;

    return axios
        .get<{
            loyaltyCollectionWidgetRelations: WidgetCollectionRelation[];
            loyaltyCollectionTopicRelations: CollectionTopicRelation[];
            topics: Topic[];
        }>(`loyalty/collections/relations/widgets/widget/${widgetId}/partners/${partnerId}/generals`)
        .then((res) => {
            return {
                ...res,
                data: {
                    ...res.data,
                    topics: res.data.topics.map((topic) => {
                        return {
                            ...topic,
                            topicPartnerFeedRelations: (topic.topicPartnerFeedRelations || []).map((feed) => {
                                if (feed.partnerFeed.type === 'COMMON') {
                                    return expandCommonFeeds(feed as unknown as FeedList);
                                }
                                return feed;
                            }),
                        };
                    }),
                },
            };
        });
};

export const deleteCollection = (payload: { partnerId: PartnerId; collectionId: Collection['id'] }) => {
    const { collectionId, partnerId } = payload;

    return axios.delete(`/loyalty/collections`, {
        params: {
            partnerId,
            id: collectionId,
        },
    });
};
