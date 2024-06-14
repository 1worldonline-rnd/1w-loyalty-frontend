import { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import { useStore } from 'effector-react';
import { useTranslation } from 'next-i18next';
import { WidgetConfig } from '@/shared/api/widget-config/types';
import { widgetConfigModel } from '@/entities/widget-config';
import { showMessage } from '@/shared/lib/messages';
import { redemptionModel } from '@/entities/redemption';
import { Catalog } from '@/shared/api/redemption/types';
import { $catalogOptions } from '../model';
import { useLocalizedYupValidations } from '@/shared/hooks';
import * as Yup from 'yup';
import { Nullable } from '@/shared/utility-types';
import { userModel } from '@/entities/user';

type SpendManagerFormValues = {
    hideWallet: WidgetConfig['hideWallet'];
    catalogId: Nullable<Catalog['id']>;
    catalogChecked: boolean;
    // allowPointExchange: WidgetConfig['allowPointExchange'];
    // allowTokenWithdraw: WidgetConfig['allowTokenWithdraw'];
};

export const useSpendManagerForm = () => {
    const { t } = useTranslation('common', { keyPrefix: 'loyalty-widgets' });

    const { validationMessages } = useLocalizedYupValidations();

    const activeWidgetConfig = useStore(widgetConfigModel.stores.$activeWidgetConfig);
    const catalogsOfPartner = useStore(redemptionModel.stores.$catalogsOfPartner);
    const partnerId = useStore(userModel.stores.$partnerId);
    const catalogOptions = useStore($catalogOptions);

    const linkedCatalog = catalogsOfPartner.find(
        ({ widgetCodeId }) => widgetCodeId === activeWidgetConfig?.guid
    );

    const [snapshotValues, setSnapshotValues] = useState<Nullable<SpendManagerFormValues>>(null);

    const form = useFormik<SpendManagerFormValues>({
        initialValues: {
            hideWallet: false,
            catalogChecked: false,
            catalogId: null,
        },
        onSubmit: async ({ hideWallet, catalogId, catalogChecked }) => {
            if (activeWidgetConfig && partnerId) {
                const previousLinkedCatalogsToCurrentWidget = catalogsOfPartner.filter(
                    ({ widgetCodeId }) => widgetCodeId === activeWidgetConfig.guid
                );

                await Promise.all(
                    previousLinkedCatalogsToCurrentWidget.map(({ id }) => {
                        return redemptionModel.effects.detachWidgetFromCatalogFx({
                            catalogId: id,
                            partnerId,
                        });
                    })
                );

                if (catalogChecked && catalogId) {
                    await redemptionModel.effects.attachWidgetToCatalogFx({
                        widgetId: activeWidgetConfig.guid,
                        catalogId,
                        partnerId,
                    });
                }

                const { status } = await widgetConfigModel.effects.updateWidgetConfigFx({
                    ...activeWidgetConfig,
                    hideWallet,
                });

                if (status === 200) {
                    showMessage(t('message-if-widget-successfully-updated'));
                }
            }
        },
        validationSchema: Yup.object({
            catalogChecked: Yup.boolean(),
            catalogId: Yup.string()
                .nullable()
                .when('catalogChecked', {
                    is: true,
                    then: Yup.string().nullable().required(validationMessages.required),
                }),
        }),
    });

    const { values } = form;

    const areValuesChanged = useMemo(() => {
        return JSON.stringify(values) !== JSON.stringify(snapshotValues);
    }, [, values, snapshotValues]);

    useEffect(() => {
        if (activeWidgetConfig) {
            const values: SpendManagerFormValues = {
                catalogChecked: Boolean(linkedCatalog),
                catalogId: linkedCatalog?.id || null,
                hideWallet: activeWidgetConfig.hideWallet,
            };

            form.setValues(values);
            setSnapshotValues(values);
        }
    }, [activeWidgetConfig, linkedCatalog]);

    return { form, areValuesChanged, catalogOptions };
};
