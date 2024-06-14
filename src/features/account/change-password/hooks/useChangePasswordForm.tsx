import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStore } from 'effector-react';
import { useTranslation } from 'next-i18next';
import { accountApi } from '@/shared/api';
import { userModel } from '@/entities/user';
import { showMessage } from '@/shared/lib/messages';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { widgetConfigModel } from '@/entities/widget-config';

export const useChangePasswordForm = () => {
    const account = useStore(userModel.stores.$account);
    const partnerExternalId = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.partner?.guid;

    const { validationMessages, validationSchemes } = useLocalizedYupValidations();

    const { t } = useTranslation('common', { keyPrefix: 'account-settings-page.change-password' });

    const validationSchema = Yup.object({
        currentPassword: Yup.string().required(validationMessages.required),
        newPassword: validationSchemes.passwordWithRegExp,
    });

    const form = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
        },
        onSubmit: async ({ currentPassword, newPassword }, { resetForm }) => {
            if (account?.id && partnerExternalId) {
                const { status, data } = await accountApi.fetchChangePassword({
                    currentPassword,
                    password: newPassword,
                    verifyPassword: newPassword,
                    email: String(account?.email),
                    partnerExternalId,
                });

                if (status === 200 && data === '') {
                    resetForm();
                    showMessage(t('message-if-password-successfully-changed'));
                }
            }
        },
        validationSchema,
    });

    return { form };
};
