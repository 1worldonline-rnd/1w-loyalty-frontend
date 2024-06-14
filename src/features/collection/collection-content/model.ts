import { collectionModel } from '@/entities/collection';
import { CollectionTopicRelation, TopicFeedRelation } from '@/shared/api/collection/types';
import type { FeedContent, SequenceItem } from '@/shared/api/feed/types';

const isCommonFeed = (feed: FeedContent | SequenceItem): feed is FeedContent => {
    return 'incentive' in feed;
};

export const $collections = collectionModel.stores.$globalWidgetCollectionsAndTopics.map(
    (collectionsAndTopics) => {
        if (collectionsAndTopics) {
            const calculatePointsInFeeds = (feeds: (FeedContent | SequenceItem)[]) => {
                let commonPoints = 0;

                feeds.forEach((feed) => {
                    const { imuActionRewards: { rewards = [] } = {} } = feed;

                    if (isCommonFeed(feed) && feed.incentive?.points) {
                        commonPoints += feed.incentive.points;
                    }

                    rewards.forEach(({ points }) => (commonPoints += points));
                });

                return commonPoints;
            };

            const getArticleImage = (feed: FeedContent | SequenceItem | undefined) => {
                if (!feed) {
                    return '';
                }

                if (isCommonFeed(feed)) {
                    const {
                        visual,
                        summary: { content },
                    } = feed;

                    if (visual?.url) {
                        return visual.url;
                    } else if (typeof visual === 'string') {
                        return visual;
                    } else if (content) {
                        // cointribune source
                        const div = document.createElement('div');
                        div.innerHTML = content;
                        return div.querySelectorAll('img')[0]?.src || '';
                    }
                } else {
                    return feed.urlMetadata.previewImageUrl;
                }
            };

            const getArticleTitle = (feed: FeedContent | SequenceItem) => {
                if (!feed) {
                    return '';
                }
                if (isCommonFeed(feed)) {
                    return feed.title;
                }
                return feed.urlMetadata.title;
            };

            const { loyaltyCollectionTopicRelations, topics, loyaltyCollectionWidgetRelations } =
                collectionsAndTopics;

            const topicsIdsByCollectionId = loyaltyCollectionTopicRelations.reduce<Record<string, string[]>>(
                (acc, { loyaltyCollectionId, topicId }) => {
                    if (!acc[loyaltyCollectionId]) {
                        acc[loyaltyCollectionId] = [];
                    }

                    acc[loyaltyCollectionId].push(topicId);

                    return acc;
                },
                {}
            );

            const collectionTopicRelationsByTopicId = loyaltyCollectionTopicRelations.reduce<
                Record<string, CollectionTopicRelation>
            >((acc, collectionTopicRelation) => {
                acc[collectionTopicRelation.topicId] = collectionTopicRelation;

                return acc;
            }, {});

            return loyaltyCollectionWidgetRelations
                .sort((a, b) => a.position - b.position)
                .map(({ loyaltyCollectionId, name }) => {
                    const topicsIds = topicsIdsByCollectionId[loyaltyCollectionId] || [];

                    return {
                        id: loyaltyCollectionId,
                        name,
                        topics: topics
                            .filter(({ id }) => topicsIds.includes(id))
                            .map(({ id, description, logo, name, topicPartnerFeedRelations }) => {
                                return {
                                    id,
                                    description,
                                    logo,
                                    name,
                                    countNews: topicPartnerFeedRelations?.reduce(
                                        (acc, { items }) => acc + (items?.length || 0),
                                        0
                                    ),
                                    totalPoints:
                                        topicPartnerFeedRelations?.reduce((acc, topicFeedRelation) => {
                                            const { items, stats } = topicFeedRelation as TopicFeedRelation;

                                            if (topicFeedRelation.partnerFeed.type === 'COMMON') {
                                                acc += calculatePointsInFeeds(items || []);
                                            } else if (stats) {
                                                acc += stats.totalPoints;
                                            }

                                            return acc;
                                        }, 0) || 0,
                                    articleTitle: getArticleTitle(
                                        topicPartnerFeedRelations?.map(({ items = [] }) => items).flat()[0]
                                    ),
                                    articleImage: getArticleImage(
                                        topicPartnerFeedRelations?.map(({ items = [] }) => items).flat()[0]
                                    ),
                                    topicPosition: collectionTopicRelationsByTopicId[id].position,
                                };
                            })
                            .sort((a, b) => a.topicPosition - b.topicPosition),
                    };
                })
                .filter(({ topics }) => topics.length);
        }
        return null;
    }
);
