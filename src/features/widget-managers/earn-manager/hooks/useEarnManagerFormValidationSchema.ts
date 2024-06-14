import * as Yup from 'yup';
import { WidgetConfigSocialKey } from '@/shared/api/widget-config/types';
import { useLocalizedYupValidations } from '@/shared/hooks';

export const useEarnManagerFormValidationSchema = () => {
    const { validationMessages } = useLocalizedYupValidations();

    const validationSocialSchema = Yup.object({
        url: Yup.string().when('checked', {
            is: true,
            then: Yup.string()
                .url(validationMessages.incorrectUrl)
                .required(validationMessages.required),
        }),
    });

    const validationSchema = Yup.object({
        socials: Yup.object({
            [WidgetConfigSocialKey.facebook]: validationSocialSchema,
            [WidgetConfigSocialKey.instagram]: validationSocialSchema,
            [WidgetConfigSocialKey.twitter]: validationSocialSchema,
            [WidgetConfigSocialKey.youtube]: validationSocialSchema,
            [WidgetConfigSocialKey.telegram]: validationSocialSchema,
            [WidgetConfigSocialKey.tikTok]: validationSocialSchema,
            [WidgetConfigSocialKey.discord]: validationSocialSchema,
            [WidgetConfigSocialKey.flipBoard]: validationSocialSchema,
            [WidgetConfigSocialKey.cmc]: validationSocialSchema,
            [WidgetConfigSocialKey.linkedIn]: validationSocialSchema,
        }),
    });

    return {
        validationSchema,
    };
};
