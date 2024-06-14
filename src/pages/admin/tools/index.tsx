import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AdminPanel } from '@/widgets/admin-panel/ui';
import { NftTools, ToolsForm } from '@/features/tools';

const Tools: NextPage = () => (
    <AdminPanel>
        <NftTools />
        <ToolsForm />
    </AdminPanel>
);

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default Tools;
