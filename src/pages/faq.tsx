import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { usePageTitle } from '@/processes/layout/usePageTitle';

const FAQ: NextPage = () => {
    usePageTitle({ title: 'FAQ', isShowOnMobile: true });

    return (
        <>
            <Head>
                <title>FAQ</title>
            </Head>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default FAQ;
