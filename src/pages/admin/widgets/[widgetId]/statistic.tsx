import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { StatisticsWidget } from '@/features/widget';
import { useProtectedRoute } from '@/processes/auth/useProtectedRoute';

const StatisticsWidgetPage: NextPage = () => {
    useProtectedRoute({
        byAdminRights: true,
    });

    return <StatisticsWidget />;
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default StatisticsWidgetPage;
