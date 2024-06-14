import { Fragment } from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { PropsWithClassName } from '@/shared/utility-types';
import { statisticsWidgetModel } from '../../model';

export const StatisticsWidgetGeneral = styled(({ className }: PropsWithClassName) => {
    const statisticsWidget = useStore(statisticsWidgetModel.stores.$statisticsWidget);

    const { t, i18n } = useTranslation('common', { keyPrefix: 'loyalty-widgets.statistic' });

    const getReadableRetentionValue = (value: number) => {
        if (value < 0) {
            return t('message-if-retention-value-negative');
        }
        if (String(value).includes('.') && String(value).split('.')[1].length > 2) {
            return `${value.toFixed(2)}%`;
        }
        return `${value}%`;
    };

    return (
        <div className={className}>
            {statisticsWidget.general && (
                <>
                    <dl>
                        <dt>{t('total-participants-field-label')}</dt>
                        <dd>{statisticsWidget.general.totalParticipants}</dd>

                        <dt>{t('total-activations-field-label')}</dt>
                        <dd>{statisticsWidget.general.totalActivations}</dd>

                        <dt>{t('total-events-field-label')}</dt>
                        <dd>{statisticsWidget.general.totalEvents}</dd>

                        <dt>{t('unique-active-users-period-field-label')}</dt>
                        <dd>{statisticsWidget.general.uniqueActivationsForPeriod}</dd>

                        <dt>{t('unique-participants-perio-field-label')}</dt>
                        <dd>{statisticsWidget.general.uniqueParticipantsForPeriod}</dd>

                        <dt>{t('events-period-field-label')}</dt>
                        <dd>{statisticsWidget.general.eventsForPeriod}</dd>
                    </dl>

                    <figure>
                        <figcaption>{t('user-retention-field-label')}</figcaption>

                        <dl>
                            {Object.entries(statisticsWidget.general.userRetention).map(
                                ([daysInMilliseconds, value], index) => {
                                    const days = Number(daysInMilliseconds) / 1000 / 3600 / 24;
                                    return (
                                        <Fragment key={index}>
                                            <dt>
                                                {days} {i18n.t(days > 1 ? 'days' : 'day').toLowerCase()}
                                            </dt>
                                            <dd>{getReadableRetentionValue(value)}</dd>
                                        </Fragment>
                                    );
                                }
                            )}
                        </dl>
                    </figure>
                </>
            )}
        </div>
    );
})`
    dl {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-block-start: 20px;
    }

    figure {
        margin: 0;

        figcaption {
            font-weight: 700;
        }

        dl {
            padding-inline-start: 20px;
        }
    }
`;
