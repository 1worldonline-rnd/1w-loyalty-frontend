/* eslint-disable @next/next/no-img-element */
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { PropsWithClassName } from '@/shared/utility-types';
import { FeedContent } from '@/shared/api/feed/types';
import {
    ChevronRightIcon,
    GullIcon,
    NoImageIcon,
    RequiredDoneIcon,
    RequiredUnDoneIcon,
    TimerIcon,
} from '@/shared/ui/icons';
import { useStore } from 'effector-react';
import { widgetConfigModel } from '@/entities/widget-config';
import { useFeedItemEvents, useWidgetAccentColor } from '@/shared/hooks';
import { FeedContentCardStyled } from './styles';
import { RewardsMap } from '@/shared/hooks/useFeedItemEvents';
import { Event } from './event';
import { ShareEvents } from './share-events';
import { FactQuizEvent } from './fact-quiz-event';
import { applicationTourStepTargetClassNames } from '@/shared/constants/application-tour';
import { whichCoinShow } from '@/shared/lib/whichCoinShow';
import { amplitudeLogEvent } from '@/shared/lib/amplitudeProvider';

enum AmplitudeEventsToRewardsEnum {
    READ_MORE = 'read_more_trigger',
    LEARN_MORE = 'learn_more_trigger',
    FEATURED_POLL_VOTE = 'vote_poll_trigger',
    POLL_VOTE = 'vote_poll_trigger',
    SURVEY_COMPLETION = 'complete_survey_trigger',
    QUIZ_COMPLETION = 'complete_quiz_trigger',
    QUIZ = 'complete_quiz_trigger',
    SURVEY = 'complete_survey_trigger',
    SHARE = 'share_imu_on_card_trigger',
}

type FeedCardProps = PropsWithClassName & {
    previewImageUrl: string;
    feedItemSourceUrl: string;
    previewTitle: string;
    isClicked: boolean;
    imuActionRewards: FeedContent['imuActionRewards'];
    timeToReward?: number;
    incentivePoints: number;
    sequenceId?: string;
    sequencePosition?: number;
    isCustomReward?: boolean;
};

export const FeedCard = ({
    previewImageUrl,
    feedItemSourceUrl,
    previewTitle,
    isClicked,
    imuActionRewards,
    timeToReward,
    incentivePoints,
    sequenceId,
    sequencePosition,
    isCustomReward,
    className,
}: FeedCardProps) => {
    const widgetConfig = useStore(widgetConfigModel.stores.$globalWidgetConfig);
    const accentColor = useWidgetAccentColor();
    const { t } = useTranslation('common', { keyPrefix: 'earn-page.feed-content-list' });
    const partnerExternalId = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.partner.guid;

    const { rewards, isRequiredCompleted, isRequiredRewards, isNotRequiredRewards } =
        useFeedItemEvents(imuActionRewards);

    const handleFeedCardClick = () => {
        const eventData = {
            imu_type: imuActionRewards?.imuType.toLowerCase(),
            imu_id: imuActionRewards?.imuId,
            points_value: incentivePoints,
            timer_value: timeToReward,
            partner_id: partnerExternalId,
        };

        amplitudeLogEvent('on_activity_card_click', eventData);
    };

    const handleEventClick = ({
        eventName,
        ...eventInfo
    }: {
        eventName: string;
        points_value?: number;
        social_media_type?: string[];
        max_points_value?: number;
        sequence_id?: string;
        sequence_position?: number;
        is_custom?: boolean;
    }) => {
        const eventData = {
            imu_type: imuActionRewards?.imuType.toLowerCase(),
            imu_id: imuActionRewards?.imuId,
            partner_id: partnerExternalId,
            ...eventInfo,
        };

        amplitudeLogEvent(eventName, eventData);
        window.open(feedItemSourceUrl, '_blank');
    };

    const showRewards = (rewards: RewardsMap, isRequired: boolean) => {
        if (widgetConfig !== null) {

            const regularRewards =
                rewards.regular?.map((reward) => ({
                    component: (
                        <Event
                            key={reward.scoringPointType}
                            reward={reward}
                            accentColor={accentColor}
                            coinIcon={whichCoinShow(reward.isScored, widgetConfig)}
                            className="event"
                            onClick={() => {
                                const isQuizReward = reward.scoringPointType.includes('QUIZ');
                                handleEventClick({
                                    eventName:
                                        AmplitudeEventsToRewardsEnum[
                                        reward.scoringPointType as keyof typeof AmplitudeEventsToRewardsEnum
                                        ],
                                    [isQuizReward ? 'max_points_values' : 'points_value']: reward.points,
                                    sequence_id: sequenceId,
                                    sequence_position: sequencePosition,
                                    is_custom: isCustomReward,
                                });
                            }}
                        />
                    ),
                    isScored: reward.isScored,
                })) || [];

            const sharedRewards = {
                component: rewards.shared ? (
                    <ShareEvents
                        rewards={rewards.shared}
                        accentColor={accentColor}
                        coinIcon={whichCoinShow(rewards.shared?.every((reward) => reward.isScored), widgetConfig)}
                        className="event"
                        onClick={() => {
                            handleEventClick({
                                eventName: AmplitudeEventsToRewardsEnum.SHARE,
                                social_media_type: rewards.shared?.map((reward) => reward.socialMedia!),
                                points_value: rewards.shared?.reduce((acc, reward) => acc + reward.points, 0),
                                sequence_id: sequenceId,
                                sequence_position: sequencePosition,
                                is_custom: isCustomReward,
                            });
                        }}
                    />
                ) : null,
                isScored: rewards.shared?.some((reward) => reward.isScored),
            };

            const FactQuizResultReward =
                rewards.factQuiz && rewards.factQuiz.totalPoints
                    ? {
                        component: (
                            <FactQuizEvent
                                factQuizReward={rewards.factQuiz}
                                accentColor={accentColor}
                                coinIcon={whichCoinShow(rewards.factQuiz?.totalPoints === rewards.factQuiz.scoredPoints, widgetConfig)}
                                sequenceItemSourceUrl={feedItemSourceUrl}
                                className="event"
                                onClick={() => {
                                    handleEventClick({
                                        eventName: AmplitudeEventsToRewardsEnum.QUIZ,
                                        points_value: rewards.factQuiz?.totalPoints,
                                        sequence_id: sequenceId,
                                        sequence_position: sequencePosition,
                                        is_custom: isCustomReward,
                                    });
                                }}
                            />
                        ),
                        isScored: rewards.factQuiz.scoredPoints > 0,
                    }
                    : null;

            const incentiveReward =
                !isRequired && incentivePoints
                    ? {
                        component: (
                            <a
                                href={feedItemSourceUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={handleFeedCardClick}
                                className={classNames('event read-article', { watched: isClicked })}
                            >
                                <div className="reward-title">
                                    <span>{t('message-to-watch-feed-content')}</span>
                                    {timeToReward ? (
                                        <div className="timer">
                                            <TimerIcon />
                                            <span>{timeToReward}s</span>
                                        </div>
                                    ) : null}
                                </div>
                                <p className="event-counter">
                                    {isClicked ? <GullIcon /> : <span>+</span>}
                                    <span className="points">{incentivePoints}</span>
                                    {widgetConfig && <span className="icon">{whichCoinShow(isClicked, widgetConfig)}</span>}
                                    <span className={classNames("arrow", { "arrow-disabled": isClicked })}><ChevronRightIcon mainColor={accentColor} /></span>
                                </p>
                            </a>
                        ),
                        isScored: isClicked,
                    }
                    : null;

            const rewardsComponents = [
                ...regularRewards,
                sharedRewards,
                FactQuizResultReward,
                incentiveReward,
            ];

            rewardsComponents.sort((a, b) => (a?.isScored === b?.isScored ? 0 : a?.isScored ? 1 : -1));

            return rewardsComponents.map((item) => item?.component || null);
        }

    };

    return (
        <FeedContentCardStyled
            className={classNames(className, { watched: isClicked })}
            accentColor={accentColor}
        >
            <a
                className="link"
                href={feedItemSourceUrl}
                target="_blank"
                rel="noreferrer"
                onClick={handleFeedCardClick}
            >
                <header>
                    <h3 className="title">{previewTitle}</h3>
                </header>

                <div className="image" data-has-image={Boolean(previewImageUrl)}>
                    {previewImageUrl ? <img src={previewImageUrl} alt="Preview" /> : <NoImageIcon />}
                </div>
            </a>

            <div className={classNames('events', applicationTourStepTargetClassNames.FEED_CARD_EVENTS)}>
                <div className="tasks">
                    {isRequiredRewards ? (
                        <div
                            className={classNames('required-tasks', {
                                'required-tasks--completed': isRequiredCompleted,
                            })}
                        >
                            <div className="required-icon">
                                {isRequiredCompleted ? <RequiredDoneIcon /> : <RequiredUnDoneIcon />}
                            </div>
                            {showRewards(rewards.required, true)}
                        </div>
                    ) : null}
                    <div className="regular-tasks">
                        {isNotRequiredRewards || incentivePoints
                            ? showRewards(rewards.notRequired, false)
                            : null}
                    </div>
                </div>
            </div>
        </FeedContentCardStyled>
    );
};
