import { FeedContentWithId, FeedList, SequenceFeed } from '@/shared/api/feed/types';
import { EarnAccordion, EarnAccordionItem } from '@/shared/ui';
import { useMemo } from 'react';
import { Sequence } from '@/features/earn';
import { FeedContentList } from '@/features/feed';
import { useTranslation } from 'next-i18next';

type CommonFeed = Pick<FeedList, 'partnerFeed' | 'id'> & {
    items: FeedContentWithId[];
};

type AccordionFeedsProps = {
    commonFeeds: CommonFeed[];
    allFeeds: (Pick<SequenceFeed, 'partnerFeed' | 'id' | 'items'> | CommonFeed)[];
};

export const AccordionFeeds = (props: AccordionFeedsProps) => {
    const { allFeeds, commonFeeds } = props;

    const { t } = useTranslation('common', { keyPrefix: 'earn-page' });

    const rewardsCounter = useMemo(() => {
        return commonFeeds.reduce<
            Record<string, { rewardsTotalCount: number; receivedRewardsCount: number }>
        >((rewards, { id, items }) => {
            if (!rewards[id]) {
                rewards[id] = {
                    rewardsTotalCount: items.length,
                    receivedRewardsCount: 0,
                };
            }

            items.forEach(({ isImuActionsFinished, userPreviousActions }) => {
                if (isImuActionsFinished && userPreviousActions?.GENERAL_CLICK?.pointType === 32) {
                    rewards[id].receivedRewardsCount++;
                }
            });

            return rewards;
        }, {});
    }, [commonFeeds]);

    return (
        <EarnAccordion>
            {allFeeds
                .filter(({ items }) => items.length)
                .map((feed, index) => {
                    if (feed.partnerFeed.type === 'SEQUENCE') {
                        const sequenceFeed = feed as SequenceFeed;
                        return (
                            <EarnAccordionItem
                                key={index}
                                header={sequenceFeed.name}
                                completedText={t('social-activity-completed-button')}
                                completedCount={sequenceFeed.stats.imusPassed}
                                itemCount={sequenceFeed.stats.totalSteps}
                            >
                                <Sequence sequenceFeed={sequenceFeed} />
                            </EarnAccordionItem>
                        );
                    } else {
                        const commonFeed = feed as Omit<FeedList, 'items'> & {
                            items: FeedContentWithId[];
                        };
                        return (
                            <EarnAccordionItem
                                key={index}
                                header={commonFeed.name}
                                completedText={t('social-activity-completed-button')}
                                completedCount={rewardsCounter[String(commonFeed.id)]?.receivedRewardsCount}
                                itemCount={commonFeed.items.length}
                            >
                                <FeedContentList feed={commonFeed.items} feedId={commonFeed.partnerFeed.id} />
                            </EarnAccordionItem>
                        );
                    }
                })}
        </EarnAccordion>
    );
};
