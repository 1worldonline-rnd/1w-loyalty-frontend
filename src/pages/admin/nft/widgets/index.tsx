import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AdminPanel, CreationButton } from '@/widgets/admin-panel';
import styled from 'styled-components';
import type { PropsWithClassName } from '@/shared/utility-types';
import { FlexboxGrid } from 'rsuite';
import { NftWidgetTable } from '@/features/nft-widgets';

const NftWidgets = styled(({ className }: PropsWithClassName) => {
    return (
        <AdminPanel>
            <div className={className}>
                <FlexboxGrid className="header" align="middle" justify="space-between" as="header">
                    <h2 className="title">NFT Widgets</h2>

                    <CreationButton entity="nft-widget" />
                </FlexboxGrid>

                <NftWidgetTable />
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

export default NftWidgets;
