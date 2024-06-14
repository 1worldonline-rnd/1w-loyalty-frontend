import { combine } from 'effector';
import { useStore } from 'effector-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { statisticsWidgetModel } from '../model';
import { userModel } from '@/entities/user';
import { feedModel } from '@/entities/feed';
import { widgetConfigModel } from '@/entities/widget-config';
import { PayloadToGetWidgetArticleStatistics } from '@/shared/api/widget-config/types';

const $selectedWidgetConfigId = statisticsWidgetModel.stores.$statisticsFilter.map(
    ({ widgetConfig }) => widgetConfig?.value
);

const $selectedWidgetConfig = combine(
    $selectedWidgetConfigId,
    widgetConfigModel.stores.$widgetConfigs,
    (widgetConfigId, widgetConfigs) => {
        return widgetConfigs.find(({ guid }) => guid === widgetConfigId);
    }
);

const $feedOfSelectedWidgetConfig = combine(
    $selectedWidgetConfig,
    feedModel.stores.$feeds,
    (widgetConfig, feeds) => {
        if (widgetConfig?.partnerFeed) {
            return feeds.find(({ id }) => id === widgetConfig.partnerFeed);
        }
        return null;
    }
);

export const useArticlesStatistics = () => {
    const searchArticleUrl = useStore(statisticsWidgetModel.stores.$searchArticleUrl);
    const statisticsFilter = useStore(statisticsWidgetModel.stores.$statisticsFilter);
    const partnerId = useStore(userModel.stores.$partnerId);
    const feedOfSelectedWidgetConfig = useStore($feedOfSelectedWidgetConfig);
    const articleStatistics = useStore(statisticsWidgetModel.stores.$articleStatistics);
    const statisticsOfAllArticles = useStore(statisticsWidgetModel.stores.$statisticsOfAllWidgetArticles);

    const { validationMessages } = useLocalizedYupValidations();

    const form = useFormik({
        initialValues: {
            searchArticleUrl,
        },
        onSubmit: async ({ searchArticleUrl }) => {
            const { endDate, startDate } = statisticsFilter;

            if (partnerId && endDate && startDate) {
                const payload: PayloadToGetWidgetArticleStatistics = {
                    partner: partnerId,
                    dateTimeRange: {
                        start: new Date(startDate.slice(0, 10)).getTime(),
                        end: new Date(endDate.slice(0, 10)).getTime(),
                    },
                    // parent: {
                    //     type: 'loyalty_widget',
                    //     id: widgetConfig.value,
                    // },
                    // source: {
                    //     type: 'feed',
                    //     id: feedOfSelectedWidgetConfig.id,
                    // },
                    actionFilter: {
                        blackList: false,
                        // actions: feedOfSelectedWidgetConfig.incentive.id,
                        actions: [],
                    },
                };

                await statisticsWidgetModel.effects.getWidgetArticleStatisticsFx({
                    ...payload,
                    entity: {
                        id: searchArticleUrl,
                        type: 'article',
                    },
                });

                await statisticsWidgetModel.effects.getStatisticsOfAllWidgetArticleFx(payload);
            }
        },
        validationSchema: Yup.object({
            searchArticleUrl: Yup.string()
                .trim()
                .required(validationMessages.required)
                .url(validationMessages.incorrectUrl),
        }),
    });

    return {
        form,
        articleStatistics,
        statisticsOfAllArticles,
    };
};
