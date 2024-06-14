/* eslint-disable @next/next/no-img-element */
import { forwardRef } from 'react';
import classNames from 'classnames';
import { ProductContentCardStyled } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import { useSequenceContentCard } from '../../hooks/useSequenceContentCard';
import { useWidgetAccentColor } from '@/shared/hooks';
import { FeedCard } from '@/shared/ui';
import { SequenceItem } from '@/shared/api/feed/types';

type SequenceContentCardProps = PropsWithClassName & {
    sequenceItem: SequenceItem;
    currentStep: number;
};

export const SequenceContentCard = forwardRef<HTMLLIElement, SequenceContentCardProps>(
    ({ sequenceItem, className, currentStep }, ref) => {
        const accentColor = useWidgetAccentColor();
        const isCustomReward = sequenceItem.partnerFeedItem.incentive.group === 'CUSTOM';

        const descriptionColor =
            sequenceItem.partnerFeedItem.position === currentStep - 1  ? accentColor : 'var(--text-disabled-color)';
        let opacity = 1;
        const positionDiff = sequenceItem.partnerFeedItem.position - currentStep + 1;

        if (positionDiff > 0) {
            opacity = 1 / Math.pow(2, positionDiff);
            opacity = Math.max(opacity, 0.25); // make sure the opacity does not go below 0.25
        }

        const {
            previewImageUrl,
            sequenceItemSourceUrl,
            previewTitle,
            isClicked,
            imuActionRewards,
            points,
            timeToReward,
        } = useSequenceContentCard(sequenceItem);

        return (
            <ProductContentCardStyled
                className={classNames(className, { watched: isClicked })}
                ref={ref}
                descriptionColor={descriptionColor}
                style={{ opacity }}
            >
                <div className="item-description">
                    <span className="item-position">{sequenceItem.partnerFeedItem.position + 1}</span>
                    <h3 className="item-title">{sequenceItem.partnerFeedItem.name}</h3>
                </div>
                <FeedCard
                    previewImageUrl={previewImageUrl}
                    feedItemSourceUrl={sequenceItemSourceUrl}
                    previewTitle={previewTitle}
                    isClicked={isClicked}
                    imuActionRewards={imuActionRewards}
                    incentivePoints={points}
                    timeToReward={timeToReward}
                    sequenceId={sequenceItem.partnerFeedItem.feedId}
                    sequencePosition={sequenceItem.partnerFeedItem.position}
                    isCustomReward={isCustomReward}
                />
            </ProductContentCardStyled>
        );
    }
);
