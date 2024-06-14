import {
    WidgetConfig,
    PayloadToUpdateWidgetConfig,
    PayloadToCreateWidgetConfig,
    DetailedWidgetStatistics,
    PayloadToGetDetailedWidgetStatistics,
    PayloadToGetGeneralWidgetStatistics,
    PayloadToGetWidgetArticleStatistics,
    WidgetArticleStatistics,
    StatisticsOfAllWidgetArticles,
    GlobalWidgetStatistic,
    PayloadGlobalWidgetStatistic,
    PreferenceIncentives,
    PreferenceIncentivesPayload,
} from './types';
import { axios } from '@/shared/lib/axios';
import { PartnerId } from '../partner/types';

export const fetchWidgetConfigsByPartnerId = (partnerId: PartnerId) => {
    return axios.get<WidgetConfig[]>(`loyalty/widgets/${partnerId}`);
};

export const fetchWidgetConfig = (widgetId: WidgetConfig['guid']) => {
    return axios.get<WidgetConfig>(`loyalty/widget/${widgetId}`);
};

export const fetchCreateWidgetConfig = (widgetConfig: PayloadToCreateWidgetConfig) => {
    return axios.post<WidgetConfig>('loyalty/widget', widgetConfig);
};

export const fetchUpdateWidgetConfig = (widgetConfig: PayloadToUpdateWidgetConfig) => {
    return axios.put<WidgetConfig>('loyalty/widget', widgetConfig);
};

export const fetchDeleteWidgetConfig = (widgetId: WidgetConfig['guid']) => {
    return axios.delete(`loyalty/widget/${widgetId}`);
};

export const fetchCreateLoyaltyProductTourView = (widgetId: WidgetConfig['guid']) => {
    return axios.post('loyalty/products/tours/views', {
        widgetId,
    });
};

export const fetchDetailedWidgetStatistics = ({
    partnerId,
    ...filters
}: PayloadToGetDetailedWidgetStatistics) => {
    return axios.post<DetailedWidgetStatistics>(`/session/stats/partner/${partnerId}`, filters);
};

export const fetchGeneralWidgetStatistics = async (payload: PayloadToGetGeneralWidgetStatistics) => {
    const [
        { data: totalEvents },
        { data: eventsForPeriod },
        { data: uniqueParticipantsForPeriod },
        { data: totalParticipants },
        { data: totalActivations },
        { data: uniqueActivationsForPeriod },
        { data: userRetention },
    ] = await Promise.all([
        axios.post<number>('/event/count', {
            partner: payload.partner,
            sources: payload.sources,
        }),
        axios.post<number>('/event/count', {
            partner: payload.partner,
            sources: payload.sources,
            dateTimeRange: payload.dateTimeRange,
        }),
        axios.post<number>('/event/stats/user/participated/count', {
            partner: payload.partner,
            dateTimeRange: payload.dateTimeRange,
            entities: payload.sources,
        }),
        axios.post<number>('/event/stats/user/participated/count', {
            partner: payload.partner,
            entities: payload.sources,
        }),
        axios.post<number>('/event/stats/user/activated/count', {
            partner: payload.partner,
            sources: payload.sources,
        }),
        axios.post<number>('/event/stats/user/count', payload),
        axios.post<{
            [dayInSeconds: string]: number;
        }>(
            '/event/stats/user/retention',
            Object.assign(payload, {
                // days in ms
                cohortIntervals: [1 * 24 * 3600 * 1000, 7 * 24 * 3600 * 1000],
            })
        ),
    ]);
    return {
        totalEvents,
        eventsForPeriod,
        totalParticipants,
        uniqueParticipantsForPeriod,
        totalActivations,
        uniqueActivationsForPeriod,
        userRetention,
    };
};

export const fetchWidgetArticleStatistics = (payload: PayloadToGetWidgetArticleStatistics) => {
    return axios.post<WidgetArticleStatistics>('/loyalty/article/stats', payload);
};

export const fetchStatisticsOfAllWidgetArticles = (
    payload: Omit<PayloadToGetWidgetArticleStatistics, 'entity'>
) => {
    return axios.post<StatisticsOfAllWidgetArticles>('/loyalty/articles/stats', payload);
};

export const fetchGlobalWidgetStatistic = (params: PayloadGlobalWidgetStatistic) => {
    return axios.post<GlobalWidgetStatistic>('/loyalty/general/stats', params);
};

export const fetchPreferenceIncentives = (partnerId: PartnerId) => {
    return axios.get<PreferenceIncentives>(`/incentives/default/partners/${partnerId}`);
};

export const fetchUpdatePreferenceIncentives = (payload: PreferenceIncentivesPayload) => {
    return axios.put(`/incentives/default/partners/${payload.partnerGuid}`, payload.payload);
};
