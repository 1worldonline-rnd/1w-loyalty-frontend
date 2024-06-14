import { NormalizedFactQuizReward } from '@/shared/hooks/useFeedItemEvents';
import { CircleProgress } from '@/shared/ui';
import { ChevronRightIcon, GullIcon, RetryIcon } from '@/shared/ui/icons';
import { PropsWithClassName } from '@/shared/utility-types';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

type FactQuizEventProps = PropsWithClassName & {
    factQuizReward: NormalizedFactQuizReward;
    sequenceItemSourceUrl: string;
    accentColor: string;
    coinIcon: JSX.Element;
} & React.HTMLAttributes<HTMLDivElement>;

export const FactQuizEvent = ({
    className,
    factQuizReward,
    sequenceItemSourceUrl,
    accentColor,
    coinIcon,
    ...props
}: FactQuizEventProps) => {
    const { t } = useTranslation('common', { keyPrefix: 'earn-page.feed-content-list' });
    const isFactQuizStarted = factQuizReward.scoredPoints > 0;
    const isFactQuizCompleted = factQuizReward.scoredPoints === factQuizReward.totalPoints;

    return (
        <div
            className={classNames(className, {
                watched: isFactQuizCompleted,
                started: isFactQuizStarted,
            })}
            {...props}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="reward">{t('quiz')}</span>

                <CircleProgress
                    width={18}
                    radius={7}
                    strokeWidth={3}
                    color={accentColor}
                    percent={(factQuizReward.scoredPoints / factQuizReward.totalPoints) * 100}
                />

                <a
                    className="link href"
                    href={sequenceItemSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                >
                    <div
                        style={{
                            color:
                                factQuizReward.scoredPoints === factQuizReward.totalPoints
                                    ? `var(--text-default-color)`
                                    : accentColor,
                        }}
                        className={classNames('retry', {
                            'watched-retry': factQuizReward.scoredPoints === factQuizReward.totalPoints,
                        })}
                    >
                        <RetryIcon /> <span>{t('retry')}</span>
                    </div>
                </a>
            </div>

            <div className="event-counter">
                {isFactQuizStarted ? <GullIcon /> : null}
                <span className="points">
                    <span className="points-earned">{factQuizReward.scoredPoints}</span>/
                    {factQuizReward.totalPoints}
                </span>
                <span className="icon">{coinIcon}</span>
                <span className={classNames("arrow", { "arrow-disabled": isFactQuizCompleted })} ><ChevronRightIcon mainColor={accentColor} /></span>
            </div>
        </div>
    );
};
