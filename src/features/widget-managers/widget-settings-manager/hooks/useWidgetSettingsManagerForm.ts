import { useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { useFormik, setNestedObjectValues } from 'formik';
import { useTranslation } from 'next-i18next';
import { useStore } from 'effector-react';
import { isEqual, cloneDeep } from 'lodash';
import { WidgetConfig } from '@/shared/api/widget-config/types';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { $webfontList, webfontListRequested } from '../model';
import { widgetConfigModel } from '@/entities/widget-config';
import { showMessage } from '@/shared/lib/messages';

type WidgetSettingManagerFormValues = {
    tracker: Omit<WidgetConfig['tracker'], 'pointsName'>;
    settings: WidgetConfig['settings'];
};

const useSettingsFormValidationSchema = () => {
    const { validationMessages, validationSchemes } = useLocalizedYupValidations();

    const offsetValidation = Yup.number()
        .typeError(validationMessages.onlyDigits)
        .max(50, validationMessages.maxOffset(50))
        .required(validationMessages.required);

    const validationSchema = Yup.object({
        settings: Yup.object({
            widgetColor: validationSchemes.hex,

            imageLogo: Yup.string().url(validationMessages.incorrectUrl),
            logoPointSrc: Yup.string(),

            headerTitle: Yup.string()
                .max(50, validationMessages.maxCharacters(50))
                .required(validationMessages.required),
            description: Yup.string()
                .max(180, validationMessages.maxCharacters(180))
                .required(validationMessages.required),

            welcomeSlogan: Yup.string()
                .max(30, validationMessages.maxCharacters(30))
                .required(validationMessages.required),
            welcomeDetails: Yup.string().max(400, validationMessages.maxCharacters(400)),
            welcomeBtnText: Yup.string()
                .max(20, validationMessages.maxCharacters(20))
                .required(validationMessages.required),

            logoPointIcon: Yup.string(),
            margin: Yup.number().required(validationMessages.required),
            logoLetterFontSize: Yup.number().required(validationMessages.required),
            logoLetterFontFamily: Yup.string(),
            logoPointLetter: Yup.string()
                .max(2, validationMessages.maxCharacters(2))
                .required(validationMessages.required),
        }),
        tracker: Yup.object({
            offset: Yup.object({
                horizontalOffset: offsetValidation,
                verticalOffset: offsetValidation,
            }),
            redirectUrl: Yup.string()
                .url(validationMessages.incorrectUrl)
                .required(validationMessages.required),
        }),
    });

    return { validationSchema };
};

const $webfontOptions = $webfontList.map((webfontList) => {
    return webfontList.map((webfont) => ({
        label: webfont,
        value: webfont,
    }));
});

const defaultValues: WidgetSettingManagerFormValues = {
    settings: {
        imageLogo: '',
        fontFamily: 'Monrope',
        theme: 'light',
        lightBgColor: '#FFFFFF',
        darkBgColor: '#252A32',
        widgetColor: '#fd5b16',
        margin: '0',
        logoLetterFontSize: '15',
        logoLetterFontFamily: 'Monrope',
        logoPointLetter: 'CT',
        logoPointIcon: 'EmptyCircleIcon',
        logoPointSrc: '',
        welcomeSlogan: '',
        welcomeDetails: '',
        welcomeBtnText: '',
    },
    tracker: {
        offset: {
            horizontalOffset: 20,
            verticalOffset: 20,
        },
        redirectUrl: '',
    },
};

export const useWidgetSettingsManagerForm = () => {
    const activeWidgetConfig = useStore(widgetConfigModel.stores.$activeWidgetConfig);
    const webfontOptions = useStore($webfontOptions);

    const { t } = useTranslation('common', { keyPrefix: 'loyalty-widgets' });

    const { validationSchema } = useSettingsFormValidationSchema();

    const form = useFormik<WidgetSettingManagerFormValues>({
        initialValues: cloneDeep(defaultValues),
        onSubmit: async ({ settings, tracker }) => {
            if (activeWidgetConfig) {
                const { status } = await widgetConfigModel.effects.updateWidgetConfigFx({
                    ...activeWidgetConfig,
                    tracker: {
                        ...activeWidgetConfig.tracker,
                        offset: tracker.offset,
                        redirectUrl: tracker.redirectUrl,
                    },
                    settings,
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
            const { tracker, settings } = activeWidgetConfig;

            const areTrackerValuesChanged = !isEqual(tracker, values.tracker);
            const areSettingsValuesChanged = !isEqual(settings, values.settings);

            return areTrackerValuesChanged || areSettingsValuesChanged;
        }
        return false;
    }, [activeWidgetConfig, values]);

    useEffect(() => {
        webfontListRequested();
    }, []);

    useEffect(() => {
        if (activeWidgetConfig) {
            setValues({
                settings: {
                    ...activeWidgetConfig.settings,
                    // activeWidgetConfig may not have theme and fontFamily
                    widgetColor: activeWidgetConfig.settings.widgetColor.toUpperCase() || '#FD5B16',
                    theme: activeWidgetConfig.settings.theme || 'light',
                    lightBgColor: activeWidgetConfig.settings.lightBgColor || '#FFFFFF',
                    darkBgColor: activeWidgetConfig.settings.darkBgColor || '#252A32',
                    fontFamily: activeWidgetConfig.settings.fontFamily || 'Monrope',
                    headerTitle:
                        activeWidgetConfig.settings.headerTitle || 'Hello 👋 and welcome to Loyalty Program',
                    description:
                        activeWidgetConfig.settings.description ||
                        // eslint-disable-next-line max-len
                        'This program allows you to earn cryptocurrency for performing various actions on the site.',
                    welcomeSlogan: activeWidgetConfig.settings.welcomeSlogan,
                    welcomeDetails: activeWidgetConfig.settings.welcomeDetails,
                    welcomeBtnText: activeWidgetConfig.settings.welcomeBtnText,
                    margin: activeWidgetConfig.settings.margin || '0',
                    logoLetterFontFamily: activeWidgetConfig.settings.logoLetterFontFamily || 'Monrope',
                    logoPointLetter: activeWidgetConfig.settings.logoPointLetter || 'CT',
                    logoPointIcon: activeWidgetConfig.settings.logoPointIcon || 'EmptyCircleIcon',
                    logoLetterFontSize: activeWidgetConfig.settings.logoLetterFontSize || '15',
                    logoPointSrc: activeWidgetConfig.settings.logoPointSrc || '',
                },
                tracker: activeWidgetConfig.tracker,
            });
        }
    }, [activeWidgetConfig, setValues]);

    const setDefaultValues = async () => {
        await setValues(cloneDeep(defaultValues));

        const errors = await form.validateForm();

        if (Object.keys(errors).length !== 0) {
            form.setTouched(setNestedObjectValues(errors, true));
        }
    };
    return { form, areValuesChanged, webfontOptions, setDefaultValues };
};
