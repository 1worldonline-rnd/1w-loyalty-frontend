/* eslint-disable @next/next/no-img-element */
import { forwardRef } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import { Feed, FeedContentWithId } from '@/shared/api/feed/types';
import { useFeedContentCard } from './hooks/useFeedContentCard';
import { FeedCard } from '@/shared/ui';
import { applicationTourStepTargetClassNames } from '@/shared/constants/application-tour';

type FeedContentCardProps = PropsWithClassName & {
    feedCard: FeedContentWithId;
    feedId: Feed['id'];
};

export const FeedContentCard = styled(
    forwardRef<HTMLLIElement, FeedContentCardProps>(({ feedCard, className, feedId }, ref) => {
        const {
            imageUrl,
            sourceUrl,
            title,
            isClicked,
            imuActionRewards,
            timeToReward,
            points,
        } = useFeedContentCard(feedCard, feedId);

        return (
            <li className={classNames(className, { watched: isClicked })} ref={ref}>
                <article>
                    <FeedCard
                        previewImageUrl={imageUrl}
                        previewTitle={title}
                        feedItemSourceUrl={sourceUrl}
                        isClicked={isClicked}
                        imuActionRewards={imuActionRewards}
                        incentivePoints={points}
                        timeToReward={timeToReward}
                        className={classNames('feed-card', applicationTourStepTargetClassNames.FEED_CARD)}
                    />
                </article>
            </li>
        );
    })
)`
    ${styles}
`;
