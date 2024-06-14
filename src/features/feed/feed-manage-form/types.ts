import type { ReactText } from 'react';
import type { FeedPeriod } from '@/shared/api/feed/types';
import type { Event } from '@/shared/api/event/types';
import type { Nullable } from '@/shared/utility-types';

export enum FeedFields {
    // value is key for translate from i18n
    name = 'feed-name',
    period = 'period',
    incentive = 'incentives',
    locale = 'locale',
    pollCount = 'pollCount',
    url = 'url',
}

export type Option<T = string> = {
    label: string;
    value: T;
};

export type FeedFormValues = {
    [FeedFields.name]: string;
    [FeedFields.locale]: Option;
    [FeedFields.period]: Option<FeedPeriod>;
    [FeedFields.pollCount]: ReactText;
    [FeedFields.url]: string;
    [FeedFields.incentive]: Nullable<Pick<Event, 'id'>>;
};
