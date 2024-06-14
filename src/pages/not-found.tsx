import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TextWithShadow } from '@/shared/ui';
import { PropsWithClassName } from '@/shared/utility-types';

const NotFound: NextPage<PropsWithClassName> = ({ className }) => {
    const { t } = useTranslation('common', { keyPrefix: 'not-found-page' });

    return (
        <>
            <Head>
                <title>{t('tab-title')}</title>
            </Head>

            <div className={className}>
                <TextWithShadow text="404" htmlElement="h1" />

                <strong>{t('description')}</strong>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default styled(NotFound)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-block-start: 55px;

    strong {
        color: var(--text-default-color);
        font-size: 24px;
        margin-block-end: 15px;
        text-align: center;
    }

    a {
        max-width: 320px;
        width: 100%;
    }
`;
