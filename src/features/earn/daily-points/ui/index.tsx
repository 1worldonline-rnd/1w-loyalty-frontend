import type { PropsWithClassName } from '@/shared/utility-types';
import { useStore } from 'effector-react';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import styled from 'styled-components';
import { dailyPointsModel } from '../model';
import { StreakItem } from './streak-item';
import { styles } from './styles';

export const DailyPoints = styled((props: PropsWithClassName) => {
    const { className } = props;

    const { t } = useTranslation('common', { keyPrefix: 'daily-points' });

    const dailyPointsStreak = useStore(dailyPointsModel.stores.$progressiveDailyPointsStreak);

    const allRewardsEqualZero = useMemo(() => {
        return dailyPointsStreak?.items.every((item) => item.points === 0);
    }, [dailyPointsStreak]);

    const streakItemsEmpty = dailyPointsStreak?.items.length === 0;

    if (!dailyPointsStreak || streakItemsEmpty || allRewardsEqualZero) {
        return null;
    }

    const { items, lastScoredPosition = null, maxPositionInCycle } = dailyPointsStreak;

    return (
        <div className={className}>
            <h2 className="title">{t('title')}</h2>

            <div className="streak-wrapper">
                <ul className="streak">
                    {items.map((item, index) => (
                        <StreakItem
                            className="streak-item"
                            key={index}
                            data={item}
                            lastScoredPosition={lastScoredPosition}
                            maxPositionInCycle={maxPositionInCycle}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
})`
    ${styles}
`;
