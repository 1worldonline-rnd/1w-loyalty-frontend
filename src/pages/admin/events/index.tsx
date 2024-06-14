import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AdminPanel, CreationButton } from '@/widgets/admin-panel';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { PropsWithClassName } from '@/shared/utility-types';
import { FlexboxGrid } from 'rsuite';
import { IncentivesList } from '@/features/incentive';

const Events = styled(({ className }: PropsWithClassName) => {
    const { t } = useTranslation('common', { keyPrefix: 'sideNavigation' });

    return (
        <AdminPanel>
            <div className={className}>
                <FlexboxGrid className="header" align="middle" justify="space-between" as="header">
                    <h2 className="title">{t('incentives')}</h2>

                    <CreationButton entity="incentive" />
                </FlexboxGrid>

                <IncentivesList />
            </div>
        </AdminPanel>
    );
})`
    .header {
        margin-block-end: 22px;
    }

    .title {
        font-size: 24px;
        color: var(--text-dark-color);
    }
`;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'features.collection'])),
    },
});

export default Events;
