import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStore } from 'effector-react';
import { widgetConfigModel } from '@/entities/widget-config';
import { statisticsWidgetModel } from '../model';
import { userModel } from '@/entities/user';
import { StatisticsFilterFormValues, StatisticsWidgetTab } from '../types';

const $widgetConfigsOptions = widgetConfigModel.stores.$widgetConfigs.map((widgetConfigs) => {
    return widgetConfigs.map(({ name, guid }) => ({ label: name, value: guid }));
});

const $activeWidgetConfigOption = widgetConfigModel.stores.$activeWidgetConfig.map((activeWidgetConfig) => {
    if (activeWidgetConfig) {
        return {
            value: activeWidgetConfig.guid,
            label: activeWidgetConfig.name,
        };
    }
    return undefined;
});

export const useStatisticsFilterForm = () => {
    const widgetConfigsOptions = useStore($widgetConfigsOptions);
    const activeWidgetConfigOption = useStore($activeWidgetConfigOption);
    const partnerId = useStore(userModel.stores.$partnerId);
    const activeTab = useStore(statisticsWidgetModel.stores.$activeTab);
    const activeWidgetConfig = useStore(widgetConfigModel.stores.$activeWidgetConfig);

    const handleSubmit = async ({ endDate, startDate, widgetConfig }: StatisticsFilterFormValues) => {
        if (endDate && startDate && widgetConfig) {
            if (activeTab === StatisticsWidgetTab.general && endDate && startDate && widgetConfig) {
                await statisticsWidgetModel.effects.getGeneralStatisticsWidgetFx({
                    dateTimeRange: {
                        start: new Date(startDate.slice(0, 10)).getTime(),
                        end: new Date(endDate.slice(0, 10)).getTime(),
                    },
                    sources: [
                        {
                            type: 'loyalty_widget',
                            id: widgetConfig.value,
                        },
                    ],
                });
            } else if (
                activeTab === StatisticsWidgetTab.detailed &&
                partnerId &&
                activeWidgetConfig?.partner
            ) {
                await statisticsWidgetModel.effects.getDetailedStatisticsWidgetFx({
                    partnerId,
                    dateFrom: new Date(startDate.slice(0, 10)).getTime(),
                    dateTo: new Date(endDate.slice(0, 10)).getTime(),
                    parentId: widgetConfig.value,
                    parentType: 'loyalty_widget',
                    sourceType: 'feed',
                });
            }
        }
    };

    const form = useFormik<StatisticsFilterFormValues>({
        initialValues: {},
        onSubmit: handleSubmit,
        validationSchema: Yup.object({
            endDate: Yup.string().when('startDate', (startDate: string, schema: Yup.StringSchema) => {
                return schema.test({
                    test: (endDate) => {
                        if (startDate && endDate) {
                            return new Date(endDate) >= new Date(startDate);
                        }
                        return true;
                    },
                    message: 'endDate should be > startDate',
                });
            }),
        }),
    });

    const { dirty, setFieldValue, values } = form;

    useEffect(() => {
        if (!dirty && activeWidgetConfigOption) {
            // set widget id
            if (activeWidgetConfigOption) {
                widgetConfigModel.events.setActiveWidgetConfigId(activeWidgetConfigOption.value);
                setFieldValue('widgetConfig', activeWidgetConfigOption);
            }

            const startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 1);
            setFieldValue('startDate', startDate.toISOString());

            const endDate = new Date();
            setFieldValue('endDate', endDate.toISOString());
        }
    }, [dirty, activeWidgetConfigOption, setFieldValue]);

    useEffect(() => {
        statisticsWidgetModel.events.statisticsFilterChanged(values);
    }, [values]);

    return {
        form,
        widgetConfigsOptions,
        activeWidgetConfigOption,
    };
};
