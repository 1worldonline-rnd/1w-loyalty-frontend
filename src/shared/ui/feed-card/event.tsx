import { FeedReward } from '@/shared/api/feed/types';
import { ChevronRightIcon, GullIcon } from '@/shared/ui/icons';
import { PropsWithClassName } from '@/shared/utility-types';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

type EventsProps = PropsWithClassName & {
    reward: FeedReward;
    accentColor: string;
    coinIcon: JSX.Element;
} & React.HTMLAttributes<HTMLDivElement>;

enum EventActionsEnum {
    READ_MORE = 'read-more',
    LEARN_MORE = 'learn-more',
    FEATURED_POLL_VOTE = 'vote-poll-for-article',
    POLL_VOTE = 'vote-on-poll',
    SURVEY_COMPLETION = 'survey-completion',
    QUIZ_COMPLETION = 'quiz-completion',
    QUIZ = 'quiz',
    SURVEY = 'survey',
}

export const Event = ({ className, reward, accentColor, coinIcon, ...props }: EventsProps) => {
    const { t } = useTranslation('common', { keyPrefix: 'earn-page.feed-content-list' });
    const tabValue = (input: string): EventActionsEnum => {
        return EventActionsEnum[input as keyof typeof EventActionsEnum];
    };

    if (!reward.points) {
        return null;
    }

    return (
        <div className={classNames(className, { watched: reward.isScored })} {...props}>
            <span className="reward">{t(tabValue(reward.scoringPointType))}</span>
            <div className="event-counter">
                {reward.isScored ? (
                    <GullIcon />
                ) : (
                    <span
                        style={{
                            color: reward.isScored ? `var(--text-default-color)` : accentColor,
                        }}
                    >
                        +
                    </span>
                )}
                <span
                    style={{
                        color: reward.isScored ? `var(--text-default-color)` : accentColor,
                    }}
                    className="points"
                >
                    {reward.points}
                </span>
                <span className="icon">{coinIcon}</span>
                <span className={classNames("arrow", { "arrow-disabled": reward.isScored })}><ChevronRightIcon mainColor={accentColor} /></span>
            </div>
        </div>
    );
};
