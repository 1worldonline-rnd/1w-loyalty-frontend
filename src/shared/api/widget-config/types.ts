import { Partner, PartnerId } from '../partner/types';
import { PartialBy } from '@/shared/utility-types';
import { Event } from '../event/types';
import { Feed, FeedContent } from '../feed/types';
import { Collection } from '../collection/types';

// widget, payloads for create and update widget

export enum WidgetConfigSocialKey {
    facebook = 'facebook',
    twitter = 'twitter',
    instagram = 'instagram',
    telegram = 'telegram',
    youtube = 'youtube',
    tikTok = 'tikTok',
    discord = 'discord',
    flipBoard = 'flipBoard',
    cmc = 'cmc',
    linkedIn = 'linkedIn',
}

export type WidgetConfigSocial = {
    url: string;
    /**
     * @type {import('@/shared/api/events/types').Event}
     */
    // if event deleted
    // incentive doesn't have field 'points'
    incentive: Pick<Event, 'id'> & { points?: Event['points']; signature: string };
    userPreviousActions?: {
        GENERAL_CLICK?: {
            pointType: number;
        };
    };
};

export type WidgetConfig = {
    guid: string;
    created: string;
    hideWallet: boolean;
    isProductTourShown?: boolean;
    allowPointExchange?: boolean;
    allowTokenWithdraw?: boolean;
    name: string;
    partner: {
        id: Partner['id'];
        guid: Partner['externalId'];
        name: Partner['name'];
    };
    locale: string;
    tracker: {
        redirectUrl: string;
        offset: {
            horizontalOffset: number;
            verticalOffset: number;
        };
        pointsName: string;
    };
    settings: {
        imageLogo: string;
        widgetColor: string;
        theme?: 'dark' | 'light';
        lightBgColor: string;
        darkBgColor: string;
        fontFamily?: string;
        headerTitle?: string;
        description?: string;
        margin: string;
        logoPointIcon: string;
        logoLetterFontFamily: string;
        logoPointLetter: string;
        logoLetterFontSize: string;
        logoPointSrc: string;
        logoPointSrcLight?: string;
        logoPointSrcDark?: string;
        welcomeSlogan?: string;
        welcomeDetails?: string;
        welcomeBtnText?: string;
        referralUrl?: string;
    };
    userMenuSettings: {
        isShowHome: boolean;
        isShowProductTour: boolean;
        isShowActivityHistory: boolean;
        isShowAccountSettings: boolean;
        isShowLogout: boolean;
    };
    socialMedia: {
        [socialKey in WidgetConfigSocialKey]?: WidgetConfigSocial;
    };
    /**
     * @type {import('@/shared/api/feed/types').Feed}
     * */
    partnerFeed?: Feed['id'];
    progressiveDailyPointsStreak: {
        streak: number;
        lastScoredPosition?: number;
        maxPositionInCycle: number;
        items: Array<{
            isLocked: boolean;
            isScored: boolean;
            name: string;
            points: number;
            position: number;
            historyId?: string;
        }>;
    };
};

export type PayloadToCreateWidgetConfig = Omit<
    WidgetConfig,
    'guid' | 'socialMedia' | 'created' | 'progressiveDailyPointsStreak'
> & {
    socialMedia: {
        [socialKey in WidgetConfigSocialKey]?: Omit<WidgetConfigSocial, 'incentive'> & {
            incentive: Pick<Event, 'id'>;
        };
    };
    partner: {
        id: Partner['id'];
        guid: Partner['externalId'];
        name: Partner['name'];
    };
};

export type PayloadToUpdateWidgetConfig = Omit<WidgetConfig, 'socialMedia'> & {
    socialMedia: {
        [socialKey in WidgetConfigSocialKey]?:
            | (Omit<WidgetConfigSocial, 'incentive'> & {
                  incentive: Pick<Event, 'id'>;
              })
            | {};
    };
    partner: {
        id: Partner['id'];
        guid: Partner['externalId'];
        name: Partner['name'];
    };
};

// statistics of widget

export type PayloadToGetDetailedWidgetStatistics = {
    partnerId: PartnerId;
    entity?: string;
    sourceId?: string;
    sourceType?: string;
    parentId: WidgetConfig['guid'];
    parentType: 'loyalty_widget';
    dateFrom: number;
    dateTo: number;
};

export type PayloadToGetWidgetArticleStatistics = {
    partner: PartnerId;
    entity?: {
        id: FeedContent['sourceUrl'];
        type: 'article';
    };
    // source: {
    //     id: Feed['id'];
    //     type: 'feed';
    // };
    // parent: {
    //     id: WidgetConfig['guid'];
    //     type: 'loyalty_widget';
    // };
    dateTimeRange: {
        start: number;
        end: number;
    };
    actionFilter: {
        // you need to throw an id incentive there that is tied to the feed to click on the article
        // actions: Event['id'];
        // actions: Array<Event['id']>;
        actions: [];
        // if the black list is set to true, then the data associated with the `actions` will be excluded
        blackList: false;
    };
};

export type DetailedWidgetStatistics = {
    entityCount: number;
    totalTimeSpent: number;
    totalAccountSessions: number;
    totalAccounts: number;
};

export type PayloadToGetGeneralWidgetStatistics = {
    partner?: PartnerId;
    sources?: Array<{
        type: 'loyalty_widget';
        id: WidgetConfig['guid'];
    }>;
    dateTimeRange?: {
        start: number;
        end: number;
    };
};

export type GeneralWidgetStatistics = {
    totalEvents: number;
    eventsForPeriod: number;
    totalParticipants: number;
    uniqueParticipantsForPeriod: number;
    totalActivations: number;
    uniqueActivationsForPeriod: number;
    userRetention: {
        [dayInSeconds: string]: number;
    };
};

export type WidgetStatistics = {
    detailed?: DetailedWidgetStatistics;
    general?: GeneralWidgetStatistics;
};

export type WidgetArticleStatistics = {
    title: string;
    totalReads: number;
    totalReadingTime: number;
    avgReadingTime: number;
};

export type StatisticsOfAllWidgetArticles = {
    topArticles: unknown[];
    totalReads: number;
};

export type PayloadGlobalWidgetStatistic = {
    partner: PartnerId;
    dateTimeRange?: {
        start: number;
        end: number;
    };
};

export type GlobalWidgetStatistic = {
    participants: {
        count: number;
        isIncreased?: boolean;
        percentage?: number;
    };
    activations: {
        count: number;
        isIncreased?: boolean;
        percentage?: number;
    };
    events: {
        count: number;
        isIncreased?: boolean;
        percentage?: number;
    };
    articleReads: {
        count: number;
        isIncreased?: boolean;
        percentage?: number;
    };
};

export type PreferenceIncentive = {
    id: string;
    created: string;
    actionType: number;
    name: string;
    points: number;
    isUserLimitsEditable: boolean;
    isRequired: boolean;
    userLimits: {
        daily: number;
    };
};

export type PreferenceIncentives = {
    progressiveDailyPoints: PreferenceIncentive[];
    poller: PreferenceIncentive[];
    quiz: PreferenceIncentive[];
    survey: PreferenceIncentive[];
    profileEvents: PreferenceIncentive[];
    // earnPageEvents: PreferenceIncentive[];
    other: PreferenceIncentive[];
};

export type PreferenceIncentiveKey = keyof PreferenceIncentives;

export type PreferenceIncentivesPayload = {
    payload: Record<PreferenceIncentiveKey, PartialBy<PreferenceIncentive, 'id' | 'created'>[]>;
    partnerGuid: PartnerId;
};

export type WidgetFeedRelation = {
    id: string;
    isActive: boolean;
    name: string;
    partnerFeed: {
        id: Feed['id'];
    };
    position: number;
    widgetId: WidgetConfig['guid'];
};

export type WidgetCollectionRelation = {
    id: string;
    isActive: boolean;
    name: string;
    loyaltyCollectionId: Collection['id'];
    position: number;
    widgetId: WidgetConfig['guid'];
};
