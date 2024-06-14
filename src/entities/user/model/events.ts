import { createEvent } from 'effector';

export const authorizedWithSocial = createEvent();
export const registered = createEvent();
export const fastRegistered = createEvent();
// the event will be called if some request returns 401 status code
export const sessionEnded = createEvent();
export const requestedPasswordChange = createEvent<{ params: { password: string; email: string } }>();

export const remindedUserToConfirmEmail = createEvent();
export const getEarningHistoryWithCurrentPage = createEvent();
