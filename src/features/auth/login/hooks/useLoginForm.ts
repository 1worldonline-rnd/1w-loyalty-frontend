import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userModel } from '@/entities/user';
import { Route } from '@/shared/constants';
import { useCustomRouter, useLocalizedYupValidations } from '@/shared/hooks';
import { useStore } from 'effector-react';
import { widgetConfigModel } from '@/entities/widget-config';
// import { toldOtherWindowsToAuthorize } from '@/shared/lib/thirdParty';

export const useLoginForm = () => {
    const { push } = useCustomRouter();

    const { validationMessages } = useLocalizedYupValidations();

    const partnerId = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.partner.guid;

    const form = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ email, password }) => {
            if (partnerId) {
                const response = await userModel.effects.loginFx({
                    email,
                    password,
                    partnerExternalId: partnerId,
                    rememberMe: String(false),
                });
                // if the status code is 205, then the user wants to change the password
                if (response.status === 205) {
                    push({
                        pathname: Route.passwordRecovery,
                    });
                }
            }
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email(validationMessages.incorrectEmail)
                .required(validationMessages.required),
            password: Yup.string().required(validationMessages.required),
        }),
    });

    return { form };
};
