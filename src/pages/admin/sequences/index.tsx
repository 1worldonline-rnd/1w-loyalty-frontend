import type { GetStaticProps, NextPage } from 'next';
import { AdminPanel, CreationButton } from '@/widgets/admin-panel';
import { PropsWithClassName } from '@/shared/utility-types';
import styled from 'styled-components';
import { SequencesConfigList } from '@/features/sequences';
import { FlexboxGrid } from 'rsuite';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Sequences: NextPage = styled(({ className }: PropsWithClassName) => {
    const { t } = useTranslation('common', { keyPrefix: 'sequences' });

    return (
        <AdminPanel>
            <div className={className}>
                <FlexboxGrid className="header" align="middle" justify="space-between" as="header">
                    <h2 className="title">{t('sequences')}</h2>

                    <div>
                        <CreationButton entity="widget-sequence" />
                    </div>
                </FlexboxGrid>

                <SequencesConfigList />
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

export default Sequences;
