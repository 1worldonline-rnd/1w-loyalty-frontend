import { Locale } from '@/shared/constants';
import { PartnerId } from '../partner/types';
import { Event } from '../event/types';

export enum FeedPeriod {
    // value is key for translate from i18n
    day = 'day',
    week = 'week',
}

export type Feed = {
    id: string;
    incentive: Event;
    locale: Locale;
    name: string;
    period: FeedPeriod;
    pollCount: number;
    url: string;
    type?: string;
    lockedRedemptionItems?: LockedRedemptionItem[];
};

export type LockedRedemptionItem = {
    id: string;
    catalogId: string;
    catalogWidgetId: string;
    title: string;
};

export type PayloadToCreateFeed = Omit<Feed, 'id' | 'incentive'> & {
    incentive: Pick<Event, 'id'>;
};

export type PayloadToUpdateFeed = Omit<Feed, 'incentive'> & {
    incentive: Pick<Event, 'id'>;
};

export type FeedReward = {
    isRequired: boolean;
    scoringPointType: string; //"SHARE_FACEBOOK",
    points: number;
    isScored: boolean;
};

export type FeedContent = {
    title: string;
    sourceUrl: string;
    signature: string;
    pointsToReward: string;
    summary: {
        content: string;
        direction?: string;
    };
    visual?: {
        url?: string;
    };
    userPreviousActions?: {
        GENERAL_CLICK?: {
            pointType: number;
        };
    };
    incentive: {
        id: Event['id'];
        points: Event['points'];
        signature: string;
    };
    published: number;

    timeToReward?: number;
    imuActionRewards?: {
        imuId: string;
        imuType: string; // 'TRIVIA' | 'POLLER' 'QUIZ' | 'SURVEY'
        rewards: FeedReward[];
    };

    isImuActionsFinished?: boolean; //added for sorting
    isRequiredActionsFinished?: boolean; // added for sorting
    isSomeNotRequiredActionsFinished?: boolean; // added for sorting
};

export type FeedContentWithId = FeedContent & { generatedId: string };

export type LinkedWidgetToFeed = {
    name: string;
    locale: string;
    widgetCode: string;
    partnerFeed: string;
};

export type FeedList = {
    id: string;
    isActive: boolean;
    items: FeedContent[];
    name: string;
    partnerFeed: Feed;
    position: number;
    widgetId: string;
};

export type SequenceFeed = {
    id: string;
    partnerFeed: Feed;
    items: SequenceItem[];
    widgetId: string;
    name: string;
    position: number;
    isActive: boolean;
    stats: {
        lockedPoints: number;
        earnedPoints: number;
        totalPoints: number;
        currentStep: number;
        totalSteps: number;
        imusPassed: number;
        earnedRewards: number;
        isCompleted: boolean;
        totalRewards: number;
    };
};

export type SequenceItem = {
    urlMetadata: {
        url: string;
        title: string;
        previewImageUrl: string;
    };
    partnerFeedItem: {
        id: string;
        partnerId: number;
        imuId: string;
        imuName: string;
        imuType: string;
        name: string;
        url: string;
        feedId: string;
        position: number;
        incentive: {
            id: string;
            actionType: number;
            group: string;
            name: string;
            partnerId: number;
            influenceAccount: number;
            created: string;
            startDateTime: string;
            points: number;
            isRequired: boolean;
            userLimits: Record<string, unknown>;
            timeToReward: number;
        };
        createdBy: number;
        updatedBy: number;
    };
    userPreviousActions?: {
        GENERAL_CLICK?: {
            pointType: number;
            points: number;
            isLocked: boolean;
        };
    };
    imuActionRewards: {
        imuId: string;
        imuType: string;
        rewards: FeedReward[];
    };
};
export type Sequence = {
    id: string;
    locale: string;
    name: string;
    type: string;
    status: string;
};

export type PayloadToCreateSequence = Omit<Sequence, 'id' | 'status'>;

export type PayloadToUpdateSequence = Sequence;

export type SequenceItemAdmin = {
    id: string;
    imuId: string;
    partnerId: string;
    imuName: string;
    name: string;
    url: string;
    feedId: string;
    imuType: string;
    position: number;
    incentive: {
        points: number;
        name?: string;
        timeToReward: number;
    };
};

export type PayloadToCreateSequenceItem = Omit<SequenceItemAdmin, 'id' | 'partnerId'>;

export type PayloadToUpdateSequenceItem = Omit<SequenceItemAdmin, 'partnerId'>;

export type SequenceRewardedOption = {
    label: string;
    isDisabled: boolean;
    value: string;
};
