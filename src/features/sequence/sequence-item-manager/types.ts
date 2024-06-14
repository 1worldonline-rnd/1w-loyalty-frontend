import { Feed } from '@/shared/api/feed/types';
import { WidgetConfigSocialKey } from '@/shared/api/widget-config/types';

export type EarnSocialValue = {
    url: string;
    checked: boolean;
    eventId?: string;
};

export type EarnSocialValues = {
    [WidgetConfigSocialKey.facebook]?: EarnSocialValue;
    [WidgetConfigSocialKey.instagram]?: EarnSocialValue;
    [WidgetConfigSocialKey.twitter]?: EarnSocialValue;
    [WidgetConfigSocialKey.youtube]?: EarnSocialValue;
    [WidgetConfigSocialKey.telegram]?: EarnSocialValue;
    [WidgetConfigSocialKey.tikTok]?: EarnSocialValue;
    [WidgetConfigSocialKey.discord]?: EarnSocialValue;
    [WidgetConfigSocialKey.flipBoard]?: EarnSocialValue;
    [WidgetConfigSocialKey.cmc]?: EarnSocialValue;
    [WidgetConfigSocialKey.linkedIn]?: EarnSocialValue;
};

export type EarnValues = {
    socials: EarnSocialValues;
    feed: {
        checked: boolean;
        feedId?: Feed['id'];
    };
};
