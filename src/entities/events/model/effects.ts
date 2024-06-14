import { createEffect } from 'effector';
import { eventApi } from '@/shared/api';

export const getEventsFx = createEffect(eventApi.fetchAllEvents);
export const createEventFx = createEffect(eventApi.fetchCreateEvent);
export const deleteEventFx = createEffect(eventApi.fetchDeleteEvent);
export const updateEventFx = createEffect(eventApi.fetchUpdateEvent);
