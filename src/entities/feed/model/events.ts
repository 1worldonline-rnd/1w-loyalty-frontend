import { createEvent } from 'effector';

export const earnFormSubmitted = createEvent();

export const earnFormSubmittedUpdate = createEvent<boolean>();

export const setActiveSequenceId = createEvent<string>();

export const feedCardRendered = createEvent<boolean>();

export const getFeedContent = createEvent<string>();

