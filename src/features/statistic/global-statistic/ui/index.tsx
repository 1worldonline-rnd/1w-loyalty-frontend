import styled from 'styled-components';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { widgetConfigModel } from '@/entities/widget-config';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import {
    ActivationsIcon,
    ArticlesIcon,
    ChartDescIcon,
    ChartAscIcon,
    EventsIcon,
    ParticipantsIcon,
} from '@/shared/ui/icons';
import { Select } from '@/shared/rsuite/admin-panel/select';
import { getGlobalStatisticsWidgetFx } from '../model/effects';
import { userModel } from '@/entities/user';
import { PayloadGlobalWidgetStatistic } from '@/shared/api/widget-config/types';
import { globalWidgetStatisticModel } from '../model';

export const GlobalStatistic = styled(({ className }: PropsWithClassName) => {
    const widgets = useStore(widgetConfigModel.stores.$widgetConfigs);
    const partnerId = useStore(userModel.stores.$partnerId);
    const globalWidgetStatistic = useStore(globalWidgetStatisticModel.stores.$globalWidgetStatistic);

    const selectDateOptions = [
        {
            label: '1 Week',
            value: 'week',
        },
        {
            label: '1 Month',
            value: 'month',
        },
        {
            label: '1 Quarter',
            value: 'quarter',
        },
        {
            label: 'All time',
            value: 'all',
        },
    ];
    const [selectedDateRange, setSelectedDateRange] = useState(selectDateOptions[3]);
    const [comparedText, setComparedText] = useState('Compared to all time');

    const numberFormat = (num: number) => {
        return num.toLocaleString('en-EN');
    };

    const dateFormat = (period: string) => {
        const currentDate = new Date();
        const previousDate = new Date(currentDate);
        // eslint-disable-next-line no-nested-ternary
        const selectedPeriod = period === 'week' ? 7 : period === 'month' ? 30 : 90;

        return {
            end: currentDate.getTime(),
            start: previousDate.setDate(currentDate.getDate() - selectedPeriod),
        };
    };

    const colorSelect = (isAscending: boolean) => {
        return isAscending ? '#219653' : '#EB5757';
    };

    const changeDate = (value: { label: string; value: string }) => {
        if (!partnerId) return;
        setSelectedDateRange(value);
        const requestStatisticObject: PayloadGlobalWidgetStatistic = {
            partner: partnerId,
        };

        if (value.value !== 'all') {
            requestStatisticObject.dateTimeRange = dateFormat(value.value);
        }
        getGlobalStatisticsWidgetFx(requestStatisticObject);
    };

    useEffect(() => {
        if (!partnerId) return;
        // First load
        getGlobalStatisticsWidgetFx({ partner: partnerId });
    }, []);

    useEffect(() => {
        const period = selectedDateRange.value;
        if (period === 'week') {
            setComparedText('Compared to previous week');
            return;
        }
        if (period === 'month') {
            setComparedText('Compared to previous month');
            return;
        }
        if (period === 'quarter') {
            setComparedText('Compared to previous quarter');
            return;
        }

        setComparedText('Compared to all time');
    }, [selectedDateRange]);

    return (
        <div className={className}>
            {widgets.length ? (
                <div className="description">
                    <div>
                        <div className="description__top">
                            <h3>Global statistic</h3>
                            <span className="dot"></span>
                            <span>{widgets.length} Pages</span>
                        </div>
                        <div className="description__bottom">
                            <p>Statistics for all your loyalty programs</p>
                        </div>
                    </div>
                    <Select
                        className="select"
                        size="xs"
                        options={selectDateOptions}
                        value={selectedDateRange}
                        onChange={(option) => {
                            if (option) {
                                changeDate(option);
                            }
                        }}
                    />
                </div>
            ): null}
            {globalWidgetStatistic ? (
                <div className="statistic-container">
                    <div className="statistic-item">
                        <div className="statistic-item__top">
                            <div className="counter">
                                <ParticipantsIcon />{' '}
                                <span> {numberFormat(globalWidgetStatistic.participants.count)} </span>
                            </div>
                            <span>Participants</span>
                        </div>
                        <div className="statistic-item__bottom">
                            {globalWidgetStatistic.participants.percentage ? (
                                <div className="percents">
                                    {globalWidgetStatistic.participants.isIncreased ? (
                                        <ChartAscIcon />
                                    ) : (
                                        <ChartDescIcon />
                                    )}
                                    <span
                                        style={{
                                            color: colorSelect(
                                                Boolean(globalWidgetStatistic.participants.isIncreased)
                                            ),
                                        }}
                                    >
                                        {globalWidgetStatistic.participants.percentage}%
                                    </span>
                                </div>
                            ) : (
                                <div className="percents"></div>
                            )}
                            <span className="compare-text">
                                {globalWidgetStatistic.participants.percentage ? comparedText : null}
                            </span>
                        </div>
                    </div>

                    <div className="statistic-item">
                        <div className="statistic-item__top">
                            <div className="counter">
                                <ActivationsIcon />
                                <span> {numberFormat(globalWidgetStatistic.activations.count)} </span>
                            </div>
                            <span>Activations</span>
                        </div>
                        <div className="statistic-item__bottom">
                            {globalWidgetStatistic.activations.percentage ? (
                                <div className="percents">
                                    {globalWidgetStatistic.activations.isIncreased ? (
                                        <ChartAscIcon />
                                    ) : (
                                        <ChartDescIcon />
                                    )}
                                    <span
                                        style={{
                                            color: colorSelect(
                                                Boolean(globalWidgetStatistic.activations.isIncreased)
                                            ),
                                        }}
                                    >
                                        {globalWidgetStatistic.activations.percentage}%
                                    </span>
                                </div>
                            ) : (
                                <div className="percents"></div>
                            )}
                            <span className="compare-text">
                                {globalWidgetStatistic.activations.percentage ? comparedText : null}
                            </span>
                        </div>
                    </div>

                    <div className="statistic-item">
                        <div className="statistic-item__top">
                            <div className="counter">
                                <EventsIcon />
                                <span> {numberFormat(globalWidgetStatistic.events.count)} </span>
                            </div>
                            <span>Events</span>
                        </div>
                        <div className="statistic-item__bottom">
                            {globalWidgetStatistic.events.percentage ? (
                                <div className="percents">
                                    {globalWidgetStatistic.events.isIncreased ? (
                                        <ChartAscIcon />
                                    ) : (
                                        <ChartDescIcon />
                                    )}
                                    <span
                                        style={{
                                            color: colorSelect(
                                                Boolean(globalWidgetStatistic.events.isIncreased)
                                            ),
                                        }}
                                    >
                                        {globalWidgetStatistic.events.percentage}%
                                    </span>
                                </div>
                            ) : (
                                <div className="percents"></div>
                            )}
                            <span className="compare-text">
                                {globalWidgetStatistic.events.percentage ? comparedText : null}
                            </span>
                        </div>
                    </div>

                    <div className="statistic-item">
                        <div className="statistic-item__top">
                            <div className="counter">
                                <ArticlesIcon />
                                <span> {numberFormat(globalWidgetStatistic.articleReads.count)} </span>
                            </div>
                            <span>Articles read</span>
                        </div>
                        <div className="statistic-item__bottom">
                            {globalWidgetStatistic.articleReads.percentage ? (
                                <div className="percents">
                                    {globalWidgetStatistic.articleReads.isIncreased ? (
                                        <ChartAscIcon />
                                    ) : (
                                        <ChartDescIcon />
                                    )}
                                    <span
                                        style={{
                                            color: colorSelect(
                                                Boolean(globalWidgetStatistic.articleReads.isIncreased)
                                            ),
                                        }}
                                    >
                                        {globalWidgetStatistic.articleReads.percentage}%
                                    </span>
                                </div>
                            ) : (
                                <div className="percents"></div>
                            )}
                            <span className="compare-text">
                                {globalWidgetStatistic.articleReads.percentage ? comparedText : null}
                            </span>
                        </div>
                    </div>
                </div> 
            ): null}
        </div>
    );
})`
    ${styles}
`;
