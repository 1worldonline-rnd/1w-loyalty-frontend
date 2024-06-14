import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { PropsWithClassName } from '@/shared/utility-types';
import { useProtectedRoute } from '@/processes/auth/useProtectedRoute';
import { ProductCatalog } from '@/features/redemption/product-catalog';
import { ProductDetailsModal } from '@/widgets/redemption';

const Spend: NextPage<PropsWithClassName> = ({ className }) => {
    const { t } = useTranslation('common', { keyPrefix: 'redemption' });

    useProtectedRoute({
        onlyForLoyaltyProgram: true,
    });

    return (
        <>
            <Head>
                <title>{t('redemption-title')}</title>
            </Head>

            <div className={className}>
                <ProductCatalog />
            </div>

            <ProductDetailsModal />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default styled(Spend)`
    .hidden-wallet {
        margin: auto;
        width: fit-content;
        font-size: 40px;
    }
`;
