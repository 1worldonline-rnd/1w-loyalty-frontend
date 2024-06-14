import type { GetServerSideProps, NextPage } from 'next';
import styled from 'styled-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { PropsWithClassName } from '@/shared/utility-types';
import { useProtectedRoute } from '@/processes/auth/useProtectedRoute';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';
import { TopicLabels, collectionModel } from '@/entities/collection';
import { AccordionFeeds } from '@/widgets/accordion-feeds';
import { useMemo } from 'react';
import type { TopicFeedRelation } from '@/shared/api/collection/types';
import { FeedContentWithId } from '@/shared/api/feed/types';

const Topic: NextPage<PropsWithClassName> = ({ className }) => {
    useProtectedRoute({
        onlyForLoyaltyProgram: true,
    });

    const { query } = useRouter();
    const topicId = query.topicId as string;

    const collectionsAndTopics = useStore(collectionModel.stores.$globalWidgetCollectionsAndTopics);

    const topic = collectionsAndTopics.topics.find(({ id }) => id === topicId);

    const stats = useMemo(() => {
        return (topic?.topicPartnerFeedRelations || []).reduce(
            (acc, topicFeedRelation) => {
                const { partnerFeed, stats, items } = topicFeedRelation as TopicFeedRelation;

                if (partnerFeed.type === 'COMMON') {
                    items.forEach((item) => {
                        const {
                            incentive,
                            imuActionRewards: { rewards = [] } = {},
                            userPreviousActions,
                        } = item as FeedContentWithId;

                        if (incentive) {
                            acc.points += incentive.points;

                            if (userPreviousActions?.GENERAL_CLICK?.pointType === 32) {
                                acc.earnedPoints += incentive.points;
                            }
                        }

                        rewards.forEach(({ points, isScored }) => {
                            acc.tasks++;
                            acc.points += points;

                            if (isScored) {
                                acc.earnedPoints += points;
                                acc.completedTasks++;
                            }
                        });
                    });
                } else if (partnerFeed.type === 'SEQUENCE' && stats) {
                    acc.tasks += stats.totalRewards;
                    acc.completedTasks += stats.earnedRewards;
                    acc.points += stats.totalPoints;
                    acc.earnedPoints += stats.earnedPoints;
                }

                return acc;
            },
            {
                tasks: 0,
                completedTasks: 0,
                points: 0,
                earnedPoints: 0,
            }
        );
    }, [topic]);

    const allFeeds = topic?.topicPartnerFeedRelations || [];
    const commonFeeds = allFeeds.filter(({ partnerFeed }) => partnerFeed.type === 'COMMON');

    return (
        <div className={className}>
            <img className="topic-logo" src={topic?.logo} alt={topic?.name} />

            <h1 className="topic-name">{topic?.name}</h1>

            <p className="topic-description">{topic?.description}</p>

            <TopicLabels
                className="topic-labels"
                cardLabel={`${stats.completedTasks}/${stats.tasks} Completed`}
                pointsLabel={`${stats.earnedPoints}/${stats.points} Earned`}
            />

            {/* @ts-ignore */}
            <AccordionFeeds allFeeds={allFeeds} commonFeeds={commonFeeds} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default styled(Topic)`
    .topic-logo {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        object-fit: cover;
        display: block;
        margin-inline: auto;
        margin-block-end: 10px;
    }

    .topic-name {
        font-size: 20px;
        font-weight: 700;
        line-height: 28px;
        text-align: center;
        color: var(--text-dark-color);
        margin-block-end: 12px;
    }

    .topic-description {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        text-align: center;
        margin-block-end: 16px;
        max-width: 400px;
        margin-inline: auto;
        color: var(--text-default-color);
    }

    .topic-labels {
        margin-block-end: 32px;
        justify-content: center;
    }
`;
