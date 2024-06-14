import { guard } from 'effector';
import { feedModel } from '@/entities/feed';
import { userModel } from '@/entities/user';
import { getEventsFx, createEventFx, updateEventFx, deleteEventFx } from './effects';
import { attachEvent, unattachEvent } from './events';
import { $events, $unattachedEvents } from './stores';

$unattachedEvents
    .on(getEventsFx.doneData, (_, { data }) => {
        return data.values
            .filter((item) => !item.entities)
            .map((event) => ({
                label: event.name,
                value: event.id,
            }));
    })
    .on(attachEvent, (unattachedEvents, eventId) => {
        return unattachedEvents.filter((item) => item.value !== eventId);
    })
    .on(unattachEvent, (unattachedEvents, data) => {
        return unattachedEvents.concat([data]);
    })
    .on(createEventFx.doneData, (unattachedEvents, { data: { id, name } }) => {
        if (id) {
            return [
                {
                    label: name,
                    value: id,
                },
                ...unattachedEvents,
            ];
        }
        return unattachedEvents;
    })
    .on(deleteEventFx.done, (unattachedEvents, { params: eventId }) => {
        return unattachedEvents.filter((item) => item.value !== eventId);
    });

$events
    .on(getEventsFx.doneData, (_, { data }) => data.values)
    .on(createEventFx.doneData, (events, { data: newEvent }) => {
        if (newEvent.id) {
            return [newEvent, ...events];
        }
        return events;
    })
    .on(updateEventFx.doneData, (events, { data: newEvent }) => {
        if (newEvent.id) {
            return events.map((event) => (event.id === newEvent.id ? newEvent : event));
        }
        return events;
    })
    .on(deleteEventFx.done, (events, { params: eventId }) => {
        return events.filter((event) => event.id !== eventId);
    })
    .on(feedModel.effects.deleteFeedFx.done, (incentives, { params: feedId }) => {
        return incentives.map((incentive) => {
            if (incentive.entities?.find(({ entityId }) => entityId === feedId)) {
                return {
                    ...incentive,
                    entities: incentive.entities.filter(({ entityId }) => entityId !== feedId),
                };
            }
            return incentive;
        });
    });

/*
1. when store $isAdminPanelAvailable was changing
2. check $isAdminPanelAvailable true
3. take the value of userModel.stores.$partnerId
4. call request to get events
*/
guard({
    /* 1 */ clock: [userModel.stores.$isAdminPanelAvailable],
    /* 2 */ filter: userModel.stores.$isAdminPanelAvailable.map(Boolean),
    /* 3 */ source: userModel.stores.$partnerId.map(String),
    /* 4 */ target: getEventsFx,
});

/*
1. when a feed creation or update is successful
2. if value of userModel.stores.$partnerId not equal null
3. take the value of userModel.stores.$partnerId
4. and update events calling them from backend
*/
guard({
    /* 1 */ clock: [
        feedModel.effects.createFeedFx.done,
        feedModel.effects.updateFeedFx.done,
        feedModel.effects.deleteFeedFx.done,
    ],
    /* 2 */ filter: userModel.stores.$partnerId.map(Boolean),
    /* 3 */ source: userModel.stores.$partnerId.map(String),
    /* 4 */ target: getEventsFx,
});
