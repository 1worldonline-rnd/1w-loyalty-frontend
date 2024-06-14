import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { EarningHistoryList } from '@/features/account';
import type { PropsWithClassName } from '@/shared/utility-types';
import { useProtectedRoute } from '@/processes/auth/useProtectedRoute';

const EarningHistory: NextPage<PropsWithClassName> = ({ className }) => {
    useProtectedRoute({
        onlyForLoyaltyProgram: true,
    });

    const { t } = useTranslation('common', { keyPrefix: 'earning-history-page' });

    return (
        <>
            <Head>
                <title>{t('tab-title')}</title>
            </Head>

            <section>
                <div className={className}>
                    <h1>{t('title')}</h1>

                    <EarningHistoryList />
                </div>
            </section>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default styled(EarningHistory)`
    margin-block-end: 30px;

    h1 {
        text-align: center;
        font-size: 26px;
        margin-block-end: 25px;
        font-weight: bold;
        font-size: 24px;
        line-height: 36px;
        color: var(--text-dark-color);
    }
`;
