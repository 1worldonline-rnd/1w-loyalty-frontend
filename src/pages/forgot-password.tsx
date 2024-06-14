import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Route } from '@/shared/constants';
import type { PropsWithClassName } from '@/shared/utility-types';
import { ForgotPasswordForm } from '@/features/auth';
import { WidgetConfigLogotype } from '@/shared/ui';
import { useCustomRouter } from '@/shared/hooks';
import { useRedirectToStartPage } from '@/processes/auth/useRedirectToStartPage';

const ForgotPassword: NextPage<PropsWithClassName> = ({ className }) => {
    const { urlSearchParams } = useCustomRouter();

    const { t } = useTranslation('common', { keyPrefix: 'forgot-password-page' });

    useRedirectToStartPage();

    return (
        <>
            <Head>
                <title>{t('tab-title')}</title>
            </Head>

            <div className={className}>
                <div className="greetings">
                    <WidgetConfigLogotype />

                    <h1>{t('title')}</h1>
                </div>

                <ForgotPasswordForm />

                <Link href={{ pathname: Route.signIn, query: urlSearchParams }}>
                    <a>{t('link-to-sign-in')}</a>
                </Link>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default styled(ForgotPassword)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-inline: auto;
    padding-block: 30px;

    .greetings {
        text-align: center;

        h1 {
            font-weight: 600;
            font-size: 20px;
            color: var(--text-dark-color);
            margin-block: 15px 30px;
        }
    }

    a {
        display: block;
        margin-block-start: 17px;
        align-self: center;
        color: var(--text-default-color);
        font-weight: 700;
    }
`;
