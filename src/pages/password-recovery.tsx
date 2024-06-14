import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { PasswordRecoveryForm } from '@/features/auth';
import { userModel } from '@/entities/user';
import { PropsWithClassName } from '@/shared/utility-types';
import { WidgetConfigLogotype } from '@/shared/ui';
import { useRedirectToStartPage } from '@/processes/auth/useRedirectToStartPage';

const PasswordRecovery: NextPage<PropsWithClassName> = ({ className }) => {
    const { email, password } = useStore(userModel.stores.$dataForPasswordChange);

    const { t } = useTranslation('common', { keyPrefix: 'password-recovery-page' });

    useRedirectToStartPage();

    return (
        <>
            <Head>
                <title>{t('tab-title')}</title>
            </Head>

            {email && password && (
                <div className={className}>
                    <div className="greetings">
                        <WidgetConfigLogotype />

                        <h1>{t('title')}</h1>
                    </div>

                    <PasswordRecoveryForm />
                </div>
            )}
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default styled(PasswordRecovery)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .greetings {
        text-align: center;

        h1 {
            font-weight: 600;
            font-size: 20px;
            color: var(--text-dark-color);
            margin-block: 15px 30px;
        }
    }
`;
