import { useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { useFormik, setNestedObjectValues } from 'formik';
import { useTranslation } from 'next-i18next';
import { useStore } from 'effector-react';
import { isEqual, cloneDeep } from 'lodash';
import { WidgetConfig } from '@/shared/api/widget-config/types';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { widgetConfigModel } from '@/entities/widget-config';
import { showMessage } from '@/shared/lib/messages';
import { Truthy } from '@/shared/utility-types';

type SettingManagerFormValues = {
    pointsName: WidgetConfig['tracker']['pointsName'];
    locale: { label: string; value: string };
    pageName: WidgetConfig['name'];
    referralUrl: Truthy<WidgetConfig['settings']['referralUrl']>;
    userMenuSettings: WidgetConfig['userMenuSettings'];
};

type Options = Array<{
    label: string;
    value: string;
}>;

const useSettingsFormValidationSchema = () => {
    const { validationMessages } = useLocalizedYupValidations();

    const validationSchema = Yup.object({
        pageName: Yup.string()
            .trim()
            .max(50, validationMessages.maxCharacters(50))
            .required(validationMessages.required),
        pointsName: Yup.string()
            .trim()
            .max(50, validationMessages.maxCharacters(50))
            .required(validationMessages.required),
        referralUrl: Yup.string().trim().url(validationMessages.incorrectUrl),
    });

    return { validationSchema };
};

export const useSettingsManagerForm = () => {
    const activeWidgetConfig = useStore(widgetConfigModel.stores.$activeWidgetConfig);

    const { t, i18n } = useTranslation('common', { keyPrefix: 'loyalty-widgets' });

    const englishLocale = {
        label: i18n.t('en'),
        value: 'en',
    };

    const localeOptions: Options = [
        { label: i18n.t('uk'), value: 'uk' },
        englishLocale,
        { label: i18n.t('fr'), value: 'fr' },
        { label: i18n.t('de'), value: 'de' },
        { label: i18n.t('es'), value: 'es' },
        { label: i18n.t('pt'), value: 'pt' },
        { label: i18n.t('pl'), value: 'pl' },
        { label: i18n.t('ru'), value: 'ru' },
    ];

    const defaultValues: SettingManagerFormValues = {
        pointsName: 'WO Points',
        locale: englishLocale,
        pageName: '',
        referralUrl: '',
        userMenuSettings: {
            isShowHome: true,
            isShowProductTour: true,
            isShowActivityHistory: true,
            isShowAccountSettings: true,
            isShowLogout: true,
        },
    };

    const { validationSchema } = useSettingsFormValidationSchema();

    const form = useFormik<SettingManagerFormValues>({
        initialValues: cloneDeep(defaultValues),
        onSubmit: async ({ pointsName, locale, pageName, referralUrl, userMenuSettings }) => {
            if (activeWidgetConfig) {
                const { status } = await widgetConfigModel.effects.updateWidgetConfigFx({
                    ...activeWidgetConfig,
                    name: pageName.trim(),
                    locale: locale.value,
                    tracker: { ...activeWidgetConfig.tracker, pointsName },
                    settings: { ...activeWidgetConfig.settings, referralUrl: referralUrl.trim() },
                    userMenuSettings: { ...userMenuSettings },
                });

                if (status === 200) {
                    showMessage(t('message-if-widget-successfully-updated'));
                }
            }
        },
        validationSchema,
    });

    const { setValues, values } = form;

    const areValuesChanged = useMemo(() => {
        if (activeWidgetConfig) {
            const {
                name: pageName,
                locale,
                tracker: { pointsName },
                settings: { referralUrl = '' },
                userMenuSettings,
            } = activeWidgetConfig;

            const isReferralUrl = !isEqual(referralUrl, values.referralUrl);
            const isPageNameValueChanged = !isEqual(pageName, values.pageName);
            const isLocaleValueChanged = !isEqual(locale, values.locale.value);
            const isPointsNameValueChanged = !isEqual(pointsName, values.pointsName);
            const isUserMenuSettingsChanged = !isEqual(userMenuSettings, values.userMenuSettings);

            return [
                isPageNameValueChanged,
                isLocaleValueChanged,
                isPointsNameValueChanged,
                isReferralUrl,
                isUserMenuSettingsChanged,
            ].some(Boolean);
        }
        return false;
    }, [activeWidgetConfig, values]);

    useEffect(() => {
        if (activeWidgetConfig) {
            setValues({
                pointsName: activeWidgetConfig.tracker.pointsName,
                pageName: activeWidgetConfig.name,
                locale: { value: activeWidgetConfig.locale, label: i18n.t(activeWidgetConfig.locale) },
                referralUrl: activeWidgetConfig.settings.referralUrl || '',
                userMenuSettings: activeWidgetConfig.userMenuSettings,
            });
        }
    }, [activeWidgetConfig, setValues, i18n]);

    const setDefaultValues = async () => {
        await setValues(cloneDeep(defaultValues));

        const errors = await form.validateForm();

        if (Object.keys(errors).length !== 0) {
            form.setTouched(setNestedObjectValues(errors, true));
        }
    };

    return { form, localeOptions, areValuesChanged, setDefaultValues };
};
