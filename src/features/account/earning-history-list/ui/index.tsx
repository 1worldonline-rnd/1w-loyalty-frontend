import { useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import { userModel } from '@/entities/user';
import { Loader } from '@/shared/ui';
import { Button } from '@/shared/rsuite/loyalty-platform';
import { widgetConfigModel } from '@/entities/widget-config';

export const EarningHistoryList = styled(({ className }: PropsWithClassName) => {
    const earningHistory = useStore(userModel.stores.$earningHistory);
    const isPendingEarningHistory = useStore(userModel.effects.getEarningHistoryFx.pending);
    const globalWidgetConfigId = useStore(widgetConfigModel.stores.$globalWidgetConfigId);

    const { locale = 'en' } = useRouter();

    const { t } = useTranslation('common', { keyPrefix: 'earning-history-page' });

    useEffect(() => {
        if (!earningHistory && globalWidgetConfigId) {
            userModel.effects.getEarningHistoryFx({ pageNumber: 1, widgetId: globalWidgetConfigId });
        }
    }, [earningHistory, globalWidgetConfigId]);

    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(new Date(date));
    };

    return earningHistory?.events.length ? (
        <div className={className}>
            {isPendingEarningHistory && (
                <div className="loader">
                    <Loader />
                </div>
            )}

            <ul>
                {earningHistory.events.map(({ actionName, pointsAwarded, awardDateTime, isLocked }, index) =>
                    isLocked ? null : (
                        <li className="event" key={index}>
                            <div>
                                <p className="action-name">{actionName}</p>
                                <time>{formatDate(awardDateTime)}</time>
                            </div>

                            <span className="points">
                                <span>{pointsAwarded}</span> {t('points')}
                            </span>
                        </li>
                    )
                )}
            </ul>

            <div className="pagination">
                <nav className="pagination__buttons">
                    {earningHistory.pageNumber !== 1 && (
                        <Button
                            appearance="black"
                            size="md"
                            onClick={() => {
                                if (globalWidgetConfigId) {
                                    userModel.effects.getEarningHistoryFx({
                                        pageNumber: earningHistory.pageNumber - 1,
                                        widgetId: globalWidgetConfigId,
                                    });
                                }
                            }}
                        >
                            {t('previous-button')}
                        </Button>
                    )}

                    {earningHistory.pageNumber !== earningHistory.totalPages && (
                        <Button
                            appearance="black"
                            size="md"
                            onClick={() => {
                                if (globalWidgetConfigId) {
                                    userModel.effects.getEarningHistoryFx({
                                        pageNumber: earningHistory.pageNumber + 1,
                                        widgetId: globalWidgetConfigId,
                                    });
                                }
                            }}
                        >
                            {t('next-button')}
                        </Button>
                    )}
                </nav>

                <span className="pagination__counter">
                    {earningHistory.pageNumber} / {earningHistory.totalPages}
                </span>
            </div>
        </div>
    ) : (
        <p>{t('message-id-earning-history-empty')}</p>
    );
})`
    ${styles}
`;
