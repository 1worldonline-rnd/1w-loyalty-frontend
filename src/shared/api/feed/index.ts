import { axios } from '@/shared/lib/axios';
import { PartnerId } from '../partner/types';
import {
    Feed,
    PayloadToCreateFeed,
    PayloadToUpdateFeed,
    LinkedWidgetToFeed,
    FeedList,
    Sequence,
    PayloadToCreateSequence,
    PayloadToUpdateSequence,
    PayloadToUpdateSequenceItem,
    PayloadToCreateSequenceItem,
    SequenceItem,
    SequenceFeed,
    SequenceItemAdmin,
} from './types';
import { WidgetFeedRelation } from '../widget-config/types';

export const fetchFeedContent = (feedId: Feed['id']) => {
    return axios.get<Array<FeedList | SequenceFeed>>(
        `partners/feeds/relations/widgets/${feedId}?isContent=true`
    );
};

export const fetchFeeds = (partnerId: PartnerId) => {
    return axios.get(`/feeds/partners/${partnerId}`);
};

// export const fetchMixedFeeds = (partnerId: PartnerId) => {
//     return axios.get(`/feeds/partners/${partnerId}?types=SEQUENCE&types=COMMON`);
// };

export const fetchMixedFeeds = (payload: {
    feedSettings: {
        locales: String[];
        statuses: String[];
        types: String[];
    };
    partnerId: PartnerId;
}) => {
    return axios.post(`/feeds/partners/${payload.partnerId}`, payload.feedSettings);
};

export const fetchDeleteFeed = (feedId: Feed['id']) => {
    return axios.delete(`/feeds/${feedId}`);
};

export const fetchUpdateFeed = (payload: { feed: PayloadToUpdateFeed; partnerId: PartnerId }) => {
    return axios.put<Feed>(`/feeds?partnerId=${payload.partnerId}`, payload.feed);
};

export const fetchCreateFeed = (payload: { feed: PayloadToCreateFeed; partnerId: PartnerId }) => {
    return axios.put<Feed>(`/feeds?partnerId=${payload.partnerId}`, payload.feed);
};

export const fetchWidgetsFeeds = (feedId: LinkedWidgetToFeed['partnerFeed']) => {
    return axios.get<LinkedWidgetToFeed[]>(`loyalty/widgets/partners/feeds/${feedId}`);
};

export const fetchDeleteFeedFromPage = (widgetCode: LinkedWidgetToFeed['widgetCode']) => {
    return axios.delete(`/loyalty/widgets/${widgetCode}`);
};

export const fetchWidgetFeedRelations = (widgetId: string) => {
    return axios.get<WidgetFeedRelation[]>(`/partners/feeds/relations/widgets/${widgetId}`);
};

export const fetchCreateWidgetFeedRelation = (payload: WidgetFeedRelation) => {
    return axios.put<WidgetFeedRelation[]>(`/partners/feeds/relations`, payload);
};

export const fetchUpdateWidgetFeedRelations = (payload: WidgetFeedRelation[]) => {
    return axios.put<WidgetFeedRelation[]>(`/partners/feeds/relations/multiple`, payload);
};

export const fetchDeleteWidgetFeedRelation = (id: WidgetFeedRelation['id']) => {
    return axios.delete(`/partners/feeds/relations/${id}`);
};

export const fetchSequences = (partnerId: PartnerId) => {
    return axios.get(`/feeds/partners/${partnerId}?types=SEQUENCE`);
};

export const fetchDeleteSequence = (sequenceId: Sequence['id']) => {
    return axios.delete(`/feeds/${sequenceId}`);
};

export const fetchUpdateSequence = (payload: { sequence: PayloadToUpdateSequence; partnerId: PartnerId }) => {
    return axios.put(`/feeds?partnerId=${payload.partnerId}`, payload.sequence);
};

export const fetchCreateSequence = (payload: { sequence: PayloadToCreateSequence; partnerId: PartnerId }) => {
    return axios.put<Sequence>(`/feeds?partnerId=${payload.partnerId}`, payload.sequence);
};

export const fetchDeleteSequenceItem = (payload: { partnerId: PartnerId; sequenceItemId: string }) => {
    return axios.delete(`/partners/${payload.partnerId}/feeds/imu/${payload.sequenceItemId}`);
};

export const fetchSequenceItems = (payload: { partnerId: PartnerId; feedId: Feed['id'] }) => {
    return axios.get<SequenceItemAdmin[]>(`/partners/${payload.partnerId}/feeds/${payload.feedId}/items`);
};

export const fetchUpdateSequenceItem = (payload: {
    sequence: PayloadToUpdateSequenceItem;
    partnerId: PartnerId;
}) => {
    return axios.put<SequenceItem>(`/partners/${payload.partnerId}/feeds/items`, payload.sequence);
};

export const fetchCreateSequenceItem = (payload: {
    sequence: PayloadToCreateSequenceItem;
    partnerId: PartnerId;
}) => {
    return axios.post(`/partners/${payload.partnerId}/feeds/items`, payload.sequence);
};

export const fetchRewarderdIMUs = (params: { partnerId: PartnerId; imuType: string }) => {
    return axios.get(`/partners/${params.partnerId}/feeds/imus/${params.imuType}`);
};

export const fetchUpdateSequenceItemsOrdering = (payload: {
    sequenceItems: PayloadToUpdateSequenceItem[];
    partnerId: PartnerId;
    feedId: Feed['id'];
}) => {
    return axios.put(
        `/partners/${payload.partnerId}/feeds/${payload.feedId}/items/all`,
        payload.sequenceItems
    );
};

export const fetchChangeSequenceStatus = (payload: { feedId: Feed['id']; status: string }) => {
    return axios.patch(`/feeds/${payload.feedId}/statuses/${payload.status}`);
};
