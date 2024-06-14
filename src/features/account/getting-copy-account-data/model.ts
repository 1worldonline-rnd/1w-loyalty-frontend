import { combine, createEffect, createStore, sample } from 'effector';
import axios from 'axios';
import type { Nullable } from '@/shared/utility-types';
import type { AccountDataArchive } from './types';
import { createReport, getActiveReport, deleteReport } from './api';
import { showMessage } from '@/shared/lib/messages';

export const $accountDataArchive = createStore<Nullable<AccountDataArchive>>(null);

export const createReportFx = createEffect(createReport);
export const getActiveReportFx = createEffect(getActiveReport);
export const deleteReportFx = createEffect(deleteReport);

$accountDataArchive
    .on([getActiveReportFx.doneData, createReportFx.doneData], (state, { data: archive }) => {
        return archive.id ? archive : state;
    })
    .reset(deleteReportFx.done);

const createReportIfReportIsNotExistsFx = sample({
    clock: getActiveReportFx.failData,
    filter: (error) => {
        return axios.isAxiosError(error) && error.response?.status === 404;
    },
    target: createReportFx,
});

export const $isFetchingReport = combine(
    getActiveReportFx.pending,
    createReportIfReportIsNotExistsFx.pending,
    (...flags) => flags.some(Boolean)
);

getActiveReportFx.failData.watch((error) => {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
        showMessage('Incorrect password', 'error');
    }
});
