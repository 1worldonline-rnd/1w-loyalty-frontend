import { axios } from '@/shared/lib/axios';
import { PartnerId } from '../partner/types';
import { Event, PayloadToCreateEvent, PayloadToUpdateEvent, PayloadToTrackContentWatched } from './types';
import { getLoyaltyAmplitudeDeviceId } from "@/shared/lib/amplitudeProvider";

export const fetchCreateEvent = (payload: PayloadToCreateEvent) => {
    return axios.post<Event>('/event/incentive', payload);
};

export const fetchAllEvents = (partnerId: PartnerId) => {
    return axios.get<{ values: Event[] }>(`/event/incentives/${partnerId}`, {
        params: { pageNumber: 1, pageSize: 200 },
    });
};

export const fetchDeleteEvent = (eventId: Event['id']) => {
    return axios.delete(`/event/incentive/${eventId}`);
};

export const fetchUpdateEvent = (payload: PayloadToUpdateEvent) => {
    return axios.put<Event>('/event/incentive', payload);
};

export const fetchTrackContentWatched = (payload: PayloadToTrackContentWatched) => {
    return axios.post('/event/custom/track', payload, {
        headers: {
            ...getLoyaltyAmplitudeDeviceId(),
        },
    });
};
