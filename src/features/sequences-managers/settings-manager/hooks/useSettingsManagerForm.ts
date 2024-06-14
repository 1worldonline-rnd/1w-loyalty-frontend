import { useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { useFormik, setNestedObjectValues } from 'formik';
import { useTranslation } from 'next-i18next';
import { useStore } from 'effector-react';
import { isEqual, cloneDeep } from 'lodash';
import { WidgetConfig } from '@/shared/api/widget-config/types';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { showMessage } from '@/shared/lib/messages';
import { $activeSequence } from '@/entities/feed/model/stores';
import { updateSequenceFx } from '@/entities/feed/model/effects';
import { userModel } from '@/entities/user';

type SettingManagerFormValues = {
    locale: { label: string; value: string };
    pageName: WidgetConfig['name'];
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
    });

    return { validationSchema };
};

export const useSettingsManagerForm = () => {
    const activeSequenceConfig = useStore($activeSequence);
    const partnerId = useStore(userModel.stores.$partnerId);
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
        locale: englishLocale,
        pageName: '',
    };

    const { validationSchema } = useSettingsFormValidationSchema();

    const form = useFormik<SettingManagerFormValues>({
        initialValues: cloneDeep(defaultValues),
        onSubmit: async ({ locale, pageName }) => {
            if (activeSequenceConfig) {
                const { status } = await updateSequenceFx({
                    sequence: {
                        ...activeSequenceConfig,
                        name: pageName.trim(),
                        locale: locale.value,
                    },
                    partnerId: String(partnerId),
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
        if (activeSequenceConfig) {
            const { name: pageName, locale } = activeSequenceConfig;

            const arePageNameValueChanged = !isEqual(pageName, values.pageName);
            const areLocaleValueChanged = !isEqual(locale, values.locale.value);

            return arePageNameValueChanged || areLocaleValueChanged;
        }
        return false;
    }, [activeSequenceConfig, values]);

    useEffect(() => {
        if (activeSequenceConfig) {
            setValues({
                pageName: activeSequenceConfig.name,
                locale: { value: activeSequenceConfig.locale, label: i18n.t(activeSequenceConfig.locale) },
            });
        }
    }, [activeSequenceConfig, setValues, i18n]);

    const setDefaultValues = async () => {
        await setValues(cloneDeep(defaultValues));

        const errors = await form.validateForm();

        if (Object.keys(errors).length !== 0) {
            form.setTouched(setNestedObjectValues(errors, true));
        }
    };

    return { form, localeOptions, areValuesChanged, setDefaultValues };
};
