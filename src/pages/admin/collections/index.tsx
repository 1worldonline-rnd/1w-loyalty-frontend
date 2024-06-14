import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AdminPanel, CreationButton } from '@/widgets/admin-panel';
import { PropsWithClassName } from '@/shared/utility-types';
import styled from 'styled-components';
import { FlexboxGrid } from 'rsuite';
import { CollectionTable } from '@/features/collection';
import { useTranslation } from 'next-i18next';

const Widgets: NextPage = styled(({ className }: PropsWithClassName) => {
    const { t } = useTranslation('features.collection');

    return (
        <AdminPanel>
            <div className={className}>
                <FlexboxGrid className="header" align="middle" justify="space-between" as="header">
                    <h2 className="title">{t('collections')}</h2>

                    <CreationButton entity="collection" />
                </FlexboxGrid>

                <CollectionTable />
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
