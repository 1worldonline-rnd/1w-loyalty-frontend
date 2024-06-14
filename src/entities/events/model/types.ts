import { Event } from '@/shared/api/event/types';

export type EventOption = {
    label: JSX.Element | string | Event['name'];
    // label: Event['name'];
    value: Event['id'];
    option?: any;
};
