import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { FlexboxGrid } from 'rsuite';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { LoginForm } from '@/features/auth';
import { PropsWithClassName } from '@/shared/utility-types';
import { Route } from '@/shared/constants';
import { useCustomRouter } from '@/shared/hooks';
import { WidgetConfigLogotype } from '@/shared/ui';
import { useRedirectToStartPage } from '@/processes/auth/useRedirectToStartPage';

const SignIn: NextPage<PropsWithClassName> = ({ className }) => {
    const { urlSearchParams } = useCustomRouter();

    const { t } = useTranslation('common', { keyPrefix: 'sign-in-page' });

    useRedirectToStartPage();

    return (
        <>
            <Head>
                <title>{t('tab-title')}</title>
            </Head>

            <div className={className}>
                <FlexboxGrid as="header" justify="end">
                    <Link href={{ pathname: Route.signUp, query: urlSearchParams }}>
                        <a className="link-to-sign-up">{t('link-to-sign-up')}</a>
                    </Link>
                </FlexboxGrid>

                <div className="greetings">
                    <WidgetConfigLogotype />

                    <h1>{t('title')}</h1>
                </div>

                <LoginForm className="login-form" />

                <Link href={{ pathname: Route.forgotPassword, query: urlSearchParams }}>
                    <a className="link-to-forgot-password">{t('link-to-forgot-password')}</a>
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

export default styled(SignIn)`
    display: flex;
    flex-direction: column;
    justify-content: center;
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

    .link-to-sign-up {
        color: rgb(var(--accent-primary-color));
        font-weight: bold;
        font-size: 17px;
    }

    .login-form {
        max-width: 504px;
        width: 100%;
        margin-inline: auto;
        margin-block-end: 17px;
    }

    .link-to-forgot-password {
        align-self: center;
        color: var(--text-default-color);
        font-weight: 700;
    }
`;
