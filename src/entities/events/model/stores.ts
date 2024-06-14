import { createStore } from 'effector';
import { Event } from '@/shared/api/event/types';
import { EventOption } from './types';

export const $events = createStore<Event[]>([]);
export const $eventsLoaded = createStore(false);
export const $eventNamesById = $events.map((events) => {
    return events.reduce<Record<Event['id'], Event['name']>>((previousValue, currentValue) => {
        previousValue[currentValue.id] = currentValue.name;
        return previousValue;
    }, {});
});
// events that are not attached to any entity, for example, to a feed
export const $unattachedEvents = createStore<EventOption[]>([]);
