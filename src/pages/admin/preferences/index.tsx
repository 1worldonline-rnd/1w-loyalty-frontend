import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AdminPanel } from '@/widgets/admin-panel/ui';
import { PreferencesForm } from '@/features/preferences';

const Preferences: NextPage = () => (
    <AdminPanel>
        <PreferencesForm />
    </AdminPanel>
);

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default Preferences;
