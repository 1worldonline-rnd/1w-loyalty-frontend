import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PropsWithClassName } from '@/shared/utility-types';
import { TextWithShadow } from '@/shared/ui';

const Forbidden: NextPage<PropsWithClassName> = ({ className }) => {
    const { t } = useTranslation('common', { keyPrefix: 'forbidden-page' });

    return (
        <>
            <Head>
                <title>{t('tab-title')}</title>
            </Head>

            <div className={className}>
                <TextWithShadow text="403" htmlElement="h1" />

                <strong dangerouslySetInnerHTML={{ __html: t('description') }} />
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default styled(Forbidden)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-block-start: 55px;

    strong {
        color: var(--text-default-color);
        font-size: 24px;
        text-align: center;
    }
`;
