import { createEvent, createStore } from 'effector';
import type { FeedFormValues } from './types';
import { adminPanelModel } from '@/entities/admin-panel';

export const $feedFormValues = createStore<Partial<FeedFormValues>>({});

export const setCacheFeedFormValues = createEvent<Partial<FeedFormValues>>();
export const setCacheFeedFormValuesClear = createEvent<Partial<FeedFormValues>>();

$feedFormValues.on(setCacheFeedFormValues, (a, b) => ({ ...a, ...b })).reset(adminPanelModel.events.closeModal)
    .on(setCacheFeedFormValuesClear, () => ({})).reset();
