import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AdminPanel } from '@/widgets/admin-panel/ui';
import styled from 'styled-components';
import type { PropsWithClassName } from '@/shared/utility-types';
import { GlobalStatistic } from '@/features/statistic';
import { FlexboxGrid } from 'rsuite';
import { useTranslation } from 'next-i18next';

const Statistic = styled(({ className }: PropsWithClassName) => {
    const { t } = useTranslation('common', { keyPrefix: 'sideNavigation' });

    return (
        <AdminPanel>
            <div className={className}>
                <FlexboxGrid className="header" align="middle" justify="space-between" as="header">
                    <h2 className="title">{t('statistic')} </h2>
                </FlexboxGrid>

                <GlobalStatistic />

                <div className="divider"></div>

                {/* <h3>Statistic by single loyalty</h3>

                <div style={{ display: 'flex' }}>
                    <StatisticsWidget />
                    <div style={{ border: '1px solid grey', width: '30%' }}> top 3 articles</div>
                </div> */}
            </div>
        </AdminPanel>
    );
})`
    .header {
        margin-block-end: 14px;
    }

    .title {
        font-size: 24px;
        color: var(--text-dark-color);
    }

    .divider {
        width: 100%;
        margin: 16px 0;
        border-bottom: 1px solid var(--grey-5-color);
    }

    h3 {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: #404854;
    }
`;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default Statistic;
