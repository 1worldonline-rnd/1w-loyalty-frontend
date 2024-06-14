import type { Feed, FeedContentWithId, SequenceFeed, SequenceItem } from '../feed/types';

export type Collection = {
    id: string;
    name: string;
    type: 'SEQUENCE' | 'TOPIC';
    locale: string;
    isCollection: boolean;
    createdBy: number;
    updatedBy: number;
};

export type TopicFeedRelation = {
    id: string;
    partnerFeed: Feed;
    name: string;
    position: number;
    createdBy: number;
    updatedBy: number;
    items: Array<FeedContentWithId | SequenceItem>;
    topicId: string;
    stats?: SequenceFeed['stats'];
};

export type Topic = {
    id: string;
    name: string;
    description: string;
    logo: string;
    locale: string;
    topicPartnerFeedRelations?: TopicFeedRelation[];
    createdBy: number;
    updatedBy: number;
    partner: number;
};

export type CollectionTopicRelation = {
    id: string;
    loyaltyCollectionId: Collection['id'];
    topicId: Topic['id'];
    position: number;
};
