import { useMemo } from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import {
    YouTubeIcon,
    TwitterIcon,
    FacebookIcon,
    GullIcon,
    TelegramIcon,
    InstagramIcon,
    TikTokIcon,
    DiscordIcon,
    FlipboardIcon,
    CMCIcon,
    LinkedInIcon,
} from '@/shared/ui/icons';
import { widgetConfigModel } from '@/entities/widget-config';
import { WidgetConfig, WidgetConfigSocialKey } from '@/shared/api/widget-config/types';
import { eventApi } from '@/shared/api';
import { getDeviceType } from '@/shared/lib/deviceType';
import { appModel } from '@/entities/app';
import { SocialActivityCard } from './social-activity-card';
import { amplitudeLogEvent } from '@/shared/lib/amplitudeProvider';

const icons: Record<WidgetConfigSocialKey, () => JSX.Element> = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    twitter: TwitterIcon,
    youtube: YouTubeIcon,
    telegram: TelegramIcon,
    tikTok: TikTokIcon,
    discord: DiscordIcon,
    flipBoard: FlipboardIcon,
    cmc: CMCIcon,
    linkedIn: LinkedInIcon,
};

export const SocialActivity = styled(({ className }: PropsWithClassName) => {
    const { t } = useTranslation('common', { keyPrefix: 'earn-page.social-activity' });
    const partnerExternalId = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.partner.guid;
    const globalWidgetConfig = useStore(widgetConfigModel.stores.$globalWidgetConfig);
    const parentPageUrl = useStore(appModel.stores.$parentPageUrl);

    const socials = useMemo<WidgetConfig['socialMedia']>(() => {
        const filledSocials: WidgetConfig['socialMedia'] = {};

        if (globalWidgetConfig?.socialMedia) {
            Object.entries(globalWidgetConfig.socialMedia).forEach(([key, social]) => {
                if (social.incentive && social.url) {
                    // used 'as' because
                    // Object.entries transformed from 'WidgetConfigSocialKey' to 'string'
                    filledSocials[key as WidgetConfigSocialKey] = social;
                }
            });
        }
        return filledSocials;
    }, [globalWidgetConfig]);

    const activityCall = async (activity: WidgetConfigSocialKey) => {
        const social = socials[activity];

        if (social) {
            window.open(social?.url, '_blank');

            const eventData = {
                social_media_type: activity,
                points_value: social?.incentive?.points,
                partner_id: partnerExternalId,
            };

            amplitudeLogEvent('follow_social_media_trigger', eventData);
        }

        if (social && globalWidgetConfig && !social?.userPreviousActions?.GENERAL_CLICK) {
            const { status } = await eventApi.fetchTrackContentWatched({
                entity: {
                    id: social.url,
                    type: 'socialMedia',
                },
                source: {
                    id: globalWidgetConfig.guid,
                    type: 'loyalty_widget',
                },
                action: {
                    guid: social.incentive.id,
                    signature: social.incentive.signature,
                },
                location: parentPageUrl,
                deviceType: getDeviceType(),
            });

            if (status >= 200 && status < 300) {
                widgetConfigModel.events.widgetConfigSocialWatched(activity);
            }
        }
    };

    return (
        <div className={className}>
            {Object.keys(socials).length ? (
                <ul>
                    {Object.entries(socials).map(([key, social]) => {
                        const Icon = icons[key as WidgetConfigSocialKey];
                        const title = key === 'cmc' ? 'CoinMarketCap' : key[0].toUpperCase() + key.slice(1);
                        const isActivityItemFinished = Boolean(social?.userPreviousActions?.GENERAL_CLICK);

                        return typeof social.incentive?.points === 'number' ? (
                            <li
                                key={key}
                                className={classNames('activity-item', {
                                    'activity-item-finished': isActivityItemFinished,
                                })}
                                onClick={() => activityCall(key as WidgetConfigSocialKey)}
                            >
                                <SocialActivityCard
                                    icon={<Icon />}
                                    title={title}
                                    isFinished={isActivityItemFinished}
                                    points={social.incentive.points}
                                    className="activity-item__card"
                                />
                            </li>
                        ) : null;
                    })}
                </ul>
            ) : (
                <p style={{ marginBlockStart: 20 }}>{t('message-if-social-activity-not-exist')}</p>
            )}
        </div>
    );
})`
    ${styles}
`;
