import { createEvent } from 'effector';
import { EventOption } from './types';

export const unattachEvent = createEvent<EventOption>();
export const attachEvent = createEvent<EventOption['value']>();
