import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'next-i18next';
import { fetchForgotPassword } from '@/shared/api/auth';
import { showMessage } from '@/shared/lib/messages';
import { Route } from '@/shared/constants';
import { useCustomRouter, useLocalizedYupValidations } from '@/shared/hooks';
import { useStore } from 'effector-react';
import { widgetConfigModel } from '@/entities/widget-config';

export const useForgotPasswordForm = () => {
    const { push } = useCustomRouter();

    const { t } = useTranslation('common', { keyPrefix: 'forgot-password-page' });

    const { validationMessages } = useLocalizedYupValidations();

    const widget = useStore(widgetConfigModel.stores.$globalWidgetConfig);
    const partnerId = widget?.partner.guid;

    const validationSchema = Yup.object({
        email: Yup.string().required(validationMessages.required).email(validationMessages.incorrectEmail),
    });

    const form = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: async ({ email }) => {
            if (partnerId) {
                const { status } = await fetchForgotPassword(email, partnerId);

                if (status === 204) {
                    showMessage(t('message-if-email-send'), 'warning');
                    push({
                        pathname: Route.signIn,
                    });
                }
            }
        },
        validationSchema,
    });

    return { form };
};
