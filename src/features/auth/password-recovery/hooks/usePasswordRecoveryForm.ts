import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { userModel } from '@/entities/user';
import { Route } from '@/shared/constants';
import { useCustomRouter, useLocalizedYupValidations } from '@/shared/hooks';
import { widgetConfigModel } from '@/entities/widget-config';

type PasswordRecoveryFormValues = {
    password: string;
    repeatPassword: string;
};

export const usePasswordRecoveryForm = () => {
    const account = useStore(userModel.stores.$account);
    const dataForPasswordChange = useStore(userModel.stores.$dataForPasswordChange);
    const { push } = useCustomRouter();

    const { validationSchemes } = useLocalizedYupValidations();

    const partnerId = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.partner.guid;

    useEffect(() => {
        if (Object.keys(dataForPasswordChange).length === 0 && account) {
            push({
                pathname: Route.earn,
            });
        }
    }, [account, dataForPasswordChange, push]);

    const validationSchema = Yup.object({
        password: validationSchemes.passwordWithRegExp,
        repeatPassword: validationSchemes.repeatPassword('password'),
    });

    const form = useFormik<PasswordRecoveryFormValues>({
        initialValues: {
            password: '',
            repeatPassword: '',
        },
        onSubmit: async ({ password, repeatPassword }) => {
            if (dataForPasswordChange.email && dataForPasswordChange.password && partnerId) {
                await userModel.effects.changeForgottenPasswordFx({
                    currentPassword: dataForPasswordChange.password,
                    email: dataForPasswordChange.email,
                    password,
                    verifyPassword: repeatPassword,
                    partnerExternalId: partnerId,
                });
            }
        },
        validationSchema,
    });

    return { form };
};
