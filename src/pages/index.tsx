import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetServerSideProps, NextPage } from 'next';
import { Landing } from '@/widgets/landing';
import { useTranslation } from 'next-i18next';

const Index: NextPage = () => {
    const { t } = useTranslation('landing');

    return (
        <>
            <Head>
                <title>{t('page-title')}</title>
                <link
                    href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&f[]=clash-display@500,600&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <Landing />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['landing'])),
    },
});

export default Index;
