import { PartnerId } from '../partner/types';

export type Event = {
    id: string;
    actionType: number;
    created: string;
    name: string;
    points: number;
    userLimits: {
        monthly: number;
        daily: number;
    };
    entities?: Array<{
        entityType: string;
        entityId: string;
    }>;
};

export type PayloadToCreateEvent = Pick<Event, 'actionType' | 'name' | 'points' | 'userLimits'> & {
    partner: PartnerId;
};

export type PayloadToUpdateEvent = Pick<Event, 'actionType' | 'name' | 'points' | 'userLimits' | 'id'> & {
    partner: PartnerId;
};

export type PayloadToTrackContentWatched = {
    entity: {
        id: string;
        type: 'socialMedia' | 'article';
    };
    source: {
        id: string;
        type: 'loyalty_widget' | 'feed';
    };
    action: {
        guid: string;
        signature: string;
    };
    location: string;
    deviceType: string;
};
