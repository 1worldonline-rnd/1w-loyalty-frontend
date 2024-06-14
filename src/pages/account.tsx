import { useStore } from 'effector-react';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { userModel } from '@/entities/user';
import {
    ChangePassword,
    AccountEmailManagement,
    ChangeAccountInfo,
    GettingCopyAccountData,
    DeletingAccount,
} from '@/features/account';
import type { PropsWithClassName } from '@/shared/utility-types';
import { useProtectedRoute } from '@/processes/auth/useProtectedRoute';
import { usePageTitle } from '@/processes/layout/usePageTitle';

const AccountSettings: NextPage<PropsWithClassName> = ({ className }) => {
    useProtectedRoute({
        onlyForLoyaltyProgram: true,
    });

    const { t } = useTranslation('common', { keyPrefix: 'account-settings-page' });

    usePageTitle({ title: t('page-title') });

    const account = useStore(userModel.stores.$account);

    return (
        <>
            <Head>
                <title>{t('page-title')}</title>
            </Head>

            {account && (
                <div className={className}>
                    <ChangeAccountInfo />

                    <ChangePassword />

                    <AccountEmailManagement />

                    <GettingCopyAccountData />

                    <DeletingAccount />
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

export default styled(AccountSettings)`
    @media screen and (max-width: 768px) {
        section:first-child {
            // its height of header
            margin-block-start: -24px;
        }
    }

    section {
        max-width: 636px;
        margin-inline: auto;
        padding-block: 20px;

        &:not(:last-child) {
            border-block-end: 1px solid
                var(${({ theme: { mode } }) => (mode === 'dark' ? '--grey-4-color' : '--grey-6-color')});
        }

        &:last-child {
            padding-block-end: 0;
        }

        @media screen and (min-width: 769px) {
            display: flex;

            .account-page__section-title {
                min-width: 220px;
            }

            & > .account-page__section-content {
                flex-grow: 1;
            }
        }

        .account-page__section-title {
            margin-block-end: 12px;
            line-height: 27px;
            font-size: 20px;
            color: var(--text-dark-color);
            padding-inline-end: 24px;
        }
    }
`;
