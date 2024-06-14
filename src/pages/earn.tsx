import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { combine } from 'effector';
import { useStore } from 'effector-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Loader } from 'rsuite';
import { feedModel } from '@/entities/feed';
import { DailyPoints, ReferralProgram, SocialActivity } from '@/features/earn';
import { PropsWithClassName } from '@/shared/utility-types';
import { widgetConfigModel } from '@/entities/widget-config';
import { useProtectedRoute } from '@/processes/auth/useProtectedRoute';
import { CollectionContent } from '@/features/collection';
import { collectionModel } from '@/entities/collection';
import { EarnAccordion, EarnAccordionItem } from '@/shared/ui';
import { AccordionFeeds } from '@/widgets/accordion-feeds';

const $isLoadingData = combine(
    feedModel.effects.getFeedContentFx.pending,
    widgetConfigModel.effects.getGlobalWidgetConfigFx.pending,
    collectionModel.effects.getCollectionsAndTopicsByLoyaltyWidgetIdFx.pending,
    (...flags) => flags.some(Boolean)
);

const EarnPageLoader = () => {
    const isLoadingData = useStore($isLoadingData);

    return <>{isLoadingData && <Loader />}</>;
};

const SocialsBlock = () => {
    const globalWidgetConfig = useStore(widgetConfigModel.stores.$globalWidgetConfig);
    const { socialMedia } = globalWidgetConfig || {};
    const isShowSocialsBlock = Boolean(Object.keys(globalWidgetConfig?.socialMedia || {}).length);
    const { t } = useTranslation('common', { keyPrefix: 'earn-page' });

    const { finishedSocials, totalSocials } = useMemo(() => {
        const socialsStats = { finishedSocials: 0, totalSocials: 0 };

        if (!socialMedia) {
            return socialsStats;
        }

        Object.values(socialMedia).forEach((social) => {
            if (social.incentive && social.url) {
                socialsStats.totalSocials++;

                if (social?.userPreviousActions?.GENERAL_CLICK) {
                    socialsStats.finishedSocials++;
                }
            }
        });

        return socialsStats;
    }, [socialMedia]);

    if (!isShowSocialsBlock) {
        return null;
    }
    return (
        <EarnAccordionItem
            header={t('social-activity.title')}
            completedText={t('social-activity-completed-button')}
            completedCount={finishedSocials}
            itemCount={totalSocials}
        >
            <SocialActivity />
        </EarnAccordionItem>
    );
};

const Feeds = () => {
    const feeds = useStore(feedModel.stores.$feedContentList);
    const combinedFeeds = useStore(feedModel.stores.$combinedFeeds);

    return <AccordionFeeds allFeeds={combinedFeeds} commonFeeds={feeds} />;
};

const Earn: NextPage<PropsWithClassName> = ({ className }) => {
    useProtectedRoute({
        onlyForLoyaltyProgram: true,
    });

    const { t } = useTranslation('common', { keyPrefix: 'earn-page' });

    return (
        <>
            <Head>
                <title>{t('tab-title')}</title>
            </Head>

            <section className={className}>
                <EarnPageLoader />

                <EarnAccordion>
                    <SocialsBlock />

                    <DailyPoints />

                    <CollectionContent />

                    <Feeds />

                    <ReferralProgram />
                </EarnAccordion>
            </section>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'features.earn.referral-program'])),
    },
});

export default styled(Earn)`
    .counter {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3px;
        margin-inline-start: 10px;
        height: 24px;
        min-width: 24px;
        background-color: var(--text-default-color);
        ${({ theme: { mode } }) => css`
            color: ${mode === 'dark' ? 'var(--grey-3-color)' : '#fff'};
        `};
        font-weight: 500;
        font-size: 14px;
        letter-spacing: -0.2px;
        border-radius: 4px;
    }
`;
