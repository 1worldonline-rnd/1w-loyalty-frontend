import { useStore } from 'effector-react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { FlexboxGrid, Input } from 'rsuite';
import { PropsWithClassName } from '@/shared/utility-types';
import { statisticsWidgetModel } from '../../model';
import { formatSeconds } from '@/shared/lib/date';
import { useArticlesStatistics } from '../../hooks/useArticlesStatistics';
import { ErrorMessage } from '@/shared/ui';

export const StatisticsWidgetDetailed = styled(({ className }: PropsWithClassName) => {
    const statisticsWidget = useStore(statisticsWidgetModel.stores.$statisticsWidget);

    const { form: f, articleStatistics, statisticsOfAllArticles } = useArticlesStatistics();

    const { t } = useTranslation('common', { keyPrefix: 'loyalty-widgets.statistic' });

    const getAvgReadingTime = (value: number) => {
        if (value && statisticsWidget.detailed) {
            return Number((statisticsWidget.detailed.totalTimeSpent / value / 1000).toFixed(1));
        }
        return 0;
    };

    return (
        <div className={className}>
            <section>
                <h2>{t('statistics-articles-fieldset-legend')}</h2>

                {statisticsWidget.detailed && (
                    <dl>
                        <dt>{t('total-account-sessions-field-label')}</dt>
                        <dd>{statisticsWidget.detailed.totalAccountSessions}</dd>

                        <dt>{t('avg-session-reading-time-field-label')}</dt>
                        <dd>
                            {formatSeconds(getAvgReadingTime(statisticsWidget.detailed.totalAccountSessions))}
                        </dd>

                        <dt>{t('avg-reading-time-per-article-field-label')}</dt>
                        <dd>{formatSeconds(getAvgReadingTime(statisticsWidget.detailed.entityCount))}</dd>

                        <dt>{t('avg-reading-time-per-user-field-label')}</dt>
                        <dd>{formatSeconds(getAvgReadingTime(statisticsWidget.detailed.totalAccounts))}</dd>
                    </dl>
                )}
            </section>

            <section>
                <h2>{t('article-statistics-fieldset-legend')}</h2>

                {statisticsOfAllArticles && (
                    <dl style={{ marginBlockEnd: 20 }}>
                        <dt>{t('article-total-reads-field-label')}</dt>
                        <dd>{statisticsOfAllArticles.totalReads}</dd>
                    </dl>
                )}

                <form onSubmit={f.handleSubmit}>
                    <label>
                        <FlexboxGrid align="middle">
                            <strong>{t('article-url-input-label')}</strong>
                        </FlexboxGrid>

                        <Input
                            data-error={Boolean(f.errors.searchArticleUrl && f.touched.searchArticleUrl)}
                            {...f.getFieldProps('searchArticleUrl')}
                            onChange={(value) => f.setFieldValue('searchArticleUrl', value)}
                            size="lg"
                            placeholder={t('article-url-input-placeholder')}
                        />

                        {f.touched.searchArticleUrl && f.errors.searchArticleUrl && (
                            <ErrorMessage className="error-message">{f.errors.searchArticleUrl}</ErrorMessage>
                        )}
                    </label>
                </form>

                {articleStatistics && (
                    <dl>
                        <dt>{t('article-title-field-label')}</dt>
                        <dd dangerouslySetInnerHTML={{ __html: articleStatistics.title }} />

                        <dt>{t('article-total-reads-field-label')}</dt>
                        <dd>{articleStatistics.totalReads}</dd>

                        <dt>{t('article-total-reading-time-field-label')}</dt>
                        <dd>{formatSeconds(articleStatistics.totalReadingTime / 1000)}</dd>

                        <dt>{t('article-avg-reading-time-field-label')}</dt>
                        <dd>{formatSeconds(articleStatistics.avgReadingTime / 1000)}</dd>
                    </dl>
                )}
            </section>
        </div>
    );
})`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding-block-start: 30px;

    section h2 {
        font-size: 24px;
        margin-block-end: 20px;
    }

    dl {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-block-start: 40px;
    }

    form label {
        display: grid;
        grid-template-columns: min-content 1fr;
        gap: 10px;

        .error-message {
            grid-column-start: 2;
        }

        strong {
            white-space: nowrap;
            font-size: 17px;
        }
    }
`;
