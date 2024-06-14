import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

const Terms: NextPage = () => (
    <>
        <Head>
            <title>Terms</title>
        </Head>
        <span>Terms</span>
    </>
);

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default Terms;
