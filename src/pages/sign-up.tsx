import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { FlexboxGrid } from 'rsuite';
import { PropsWithClassName } from '@/shared/utility-types';
// import { SignUpForm } from '@/features/auth';
import { Route } from '@/shared/constants';
import { useCustomRouter } from '@/shared/hooks';
import { WidgetConfigLogotype } from '@/shared/ui';
import { useRedirectToStartPage } from '@/processes/auth/useRedirectToStartPage';
import { FastSignUp } from '@/features/auth';

const SignUp: NextPage<PropsWithClassName> = ({ className }) => {
    const { urlSearchParams } = useCustomRouter();

    const { t } = useTranslation('common', { keyPrefix: 'sign-up-page' });

    useRedirectToStartPage();

    return (
        <>
            <Head>
                <title>{t('tab-title')}</title>
            </Head>

            <div className={className}>
                <FlexboxGrid as="header" justify="end">
                    <Link href={{ pathname: Route.signIn, query: urlSearchParams }}>
                        <a className="link-to-sign-in">{t('link-to-sign-in')}</a>
                    </Link>
                </FlexboxGrid>

                <WidgetConfigLogotype />

                <FastSignUp />

                {/* <SignUpForm className="sign-up-form" /> */}
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default styled(SignUp)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-inline: auto;
    padding-block: 30px;

    .link-to-sign-in {
        color: rgb(var(--accent-primary-color));
        font-weight: bold;
        font-size: 17px;
    }
`;
