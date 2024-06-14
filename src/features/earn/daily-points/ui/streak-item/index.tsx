import { styles } from './styles';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import type { DailyPointsStreakItem } from '../../types';
import type { Nullable, PropsWithClassName } from '@/shared/utility-types';
import type { SVGProps } from 'react';
import { dailyPointsModel } from '../../model';
import { useStore } from 'effector-react';
import { widgetConfigModel } from '@/entities/widget-config';
import { userModel } from '@/entities/user';
import { getSecondsUntilNextDayByUTC } from '../../lib';
import { whichCoinShow } from '@/shared/lib/whichCoinShow';

const CheckMarkIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" {...props}>
        <path
            d="M16.25 5.5L7.5 15.5L3.75 11.75"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

type StreakItemProps = PropsWithClassName<{
    data: DailyPointsStreakItem;
    lastScoredPosition: number | null;
    maxPositionInCycle: number;
}>;

export const StreakItem = styled((props: StreakItemProps) => {
    const {
        // streak item data
        data: { isLocked, isScored, points, position, historyId },
        lastScoredPosition,
        maxPositionInCycle,
        className,
    } = props;

    const globalWidgetConfig = useStore(widgetConfigModel.stores.$globalWidgetConfig);

    const { t } = useTranslation('common', { keyPrefix: 'daily-points' });

    const timerOfNextStreakDay = useRef<NodeJS.Timer>();
    const [timeDifference, setTimeDifference] = useState<Nullable<number>>(null);

    // points already earned, but locked
    const canUnlockPoints = isScored && isLocked && historyId;
    // points earned and locked
    const areUnlockedPoints = isScored && !isLocked;
    // points locked and not yet earned
    const unavailablePoints = !isScored;

    const isRunningTimer = useMemo(() => {
        if (maxPositionInCycle === Number(lastScoredPosition) && position === 0) {
            return true;
        }
        return Number(lastScoredPosition) + 1 === position && unavailablePoints;
    }, [maxPositionInCycle, lastScoredPosition, position, unavailablePoints]);

    const initTimer = () => {
        if (timerOfNextStreakDay.current) {
            clearInterval(timerOfNextStreakDay.current);
        }

        const interval = setInterval(() => {
            setTimeDifference((prevState) => {
                if (prevState) {
                    return prevState - 1000;
                }
                return prevState;
            });
        }, 1000);

        timerOfNextStreakDay.current = interval;
    };

    useEffect(() => {
        if (isRunningTimer) {
            const timeDifference = getSecondsUntilNextDayByUTC();

            setTimeDifference(timeDifference);

            initTimer();
        }
    }, [isRunningTimer]);

    useEffect(() => {
        if (timeDifference && timeDifference % 30_000 === 0) {
            const timeDifference = getSecondsUntilNextDayByUTC();

            setTimeDifference(timeDifference);

            initTimer();
        }
    }, [timeDifference]);

    useEffect(() => {
        if (timeDifference && timeDifference <= 0 && timerOfNextStreakDay.current && globalWidgetConfig) {
            clearInterval(timerOfNextStreakDay.current);

            userModel.effects.trackDailyLoginFx(globalWidgetConfig.guid).then(() => {
                widgetConfigModel.effects.updateProgressiveDailyPointsStreakFx(globalWidgetConfig.guid);
            });
        }
    }, [timeDifference]);

    const unlockPoints = () => {
        if (canUnlockPoints && historyId) {
            dailyPointsModel.effects.unlockPointsFx(historyId);
        }
    };

    const getReadableTime = () => {
        if (timeDifference) {
            const totalSeconds = Math.floor(timeDifference / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');

            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }
        return '';
    };

    const StreakItemHeader = () => {
        if (isRunningTimer) {
            return <span className="btn-unlock">{getReadableTime()}</span>;
        } else if (canUnlockPoints) {
            return (
                <button className="btn-unlock" onClick={unlockPoints}>
                    {t('unlock-button-text')}
                </button>
            );
        } else {
            return (
                <h3 className="streak-item__title">
                    {t('day')} {position + 1}
                </h3>
            );
        }
    };

    const isShowButtonUnlock = () => {
        if (isRunningTimer) {
            return false;
        } else if (canUnlockPoints) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <li className={classNames(className, { unavailable: unavailablePoints })}>
            <StreakItemHeader />

            <div
                className={classNames('points', {
                    'unlocked-points': areUnlockedPoints,
                    'unlockable-points': canUnlockPoints,
                })}
            >
                {areUnlockedPoints ? <CheckMarkIcon /> : <span>+</span>}

                <span>{points}</span>

                <div className="coin-icon">
                    {globalWidgetConfig && whichCoinShow(!isShowButtonUnlock(), globalWidgetConfig)}
                </div>
            </div>
        </li>
    );
})`
    ${styles}
`;
