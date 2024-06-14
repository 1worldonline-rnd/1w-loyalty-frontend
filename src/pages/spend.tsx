import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useStore } from 'effector-react';
import { ReactText } from 'react';
import { Wallet } from '@/features/spend';
import { widgetConfigModel } from '@/entities/widget-config';
import { TextWithShadow } from '@/shared/ui';
import { PropsWithClassName } from '@/shared/utility-types';
import { useProtectedRoute } from '@/processes/auth/useProtectedRoute';

const Spend: NextPage<PropsWithClassName> = ({ className }) => {
    const { t } = useTranslation('common', { keyPrefix: 'spend' });

    const activeWidgetConfig = useStore(widgetConfigModel.stores.$globalWidgetConfig);

    useProtectedRoute({
        onlyForLoyaltyProgram: true,
    });

    return (
        <>
            <Head>
                <title>{t('spend-title')}</title>
            </Head>
            <div className={className}>
                {activeWidgetConfig &&
                    (activeWidgetConfig.hideWallet ? (
                        <TextWithShadow
                            text={t('not-available-yet') as ReactText}
                            className="hidden-wallet"
                        />
                    ) : (
                        <Wallet />
                    ))}
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
};

export default styled(Spend)`
    .hidden-wallet {
        margin: auto;
        width: fit-content;
        font-size: 40px;
    }
`;
