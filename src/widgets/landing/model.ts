import { createEvent, createStore } from 'effector';

export const $isOpenCalendar = createStore(false);

export const setIsOpenCalendar = createEvent<boolean | void>();

$isOpenCalendar.on(setIsOpenCalendar, (isOpenCalendar, payload) => payload ?? !isOpenCalendar);
