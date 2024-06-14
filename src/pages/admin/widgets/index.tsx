import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AdminPanel, CreationButton } from '@/widgets/admin-panel';
import { PropsWithClassName } from '@/shared/utility-types';
import styled from 'styled-components';
import { WidgetConfigList } from '@/features/widget';
import { FlexboxGrid } from 'rsuite';
import { useTranslation } from 'next-i18next';

const Widgets: NextPage = styled(({ className }: PropsWithClassName) => {
    const { t } = useTranslation('common', { keyPrefix: 'widget-managers-tabs' });

    return (
        <AdminPanel>
            <div className={className}>
                <FlexboxGrid className="header" align="middle" justify="space-between" as="header">
                    <h2 className="title">{t('link-to-loyalty-widgets')}</h2>

                    <CreationButton entity="loyalty page" />
                </FlexboxGrid>

                <WidgetConfigList />
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

export default Widgets;
