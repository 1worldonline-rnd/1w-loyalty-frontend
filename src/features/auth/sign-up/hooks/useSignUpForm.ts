import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { userModel } from '@/entities/user';
import { useLocalizedYupValidations } from '@/shared/hooks';
// import { toldOtherWindowsToAuthorize } from '@/shared/lib/thirdParty';

type SignUpFormValues = {
    email: string;
    password: string;
    repeatPassword: string;
    agree: boolean;
};

const initialValues: SignUpFormValues = {
    email: '',
    password: '',
    repeatPassword: '',
    agree: false,
};

export const useSignUpForm = () => {
    const [step, setStep] = useState<'email' | 'passwords'>('email');
    const [isSuccessfulRegistration, setIsSuccessfulRegistration] = useState(false);

    const { validationMessages, validationSchemes } = useLocalizedYupValidations();

    const onSubmit = async ({ email, password, repeatPassword }: SignUpFormValues) => {
        // const { data, headers } = await userModel.effects.signUpFx({
        const { data } = await userModel.effects.signUpFx({
            'account.email': email,
            'account.password': password,
            registerSource: 'loyalty',
            verifyPassword: repeatPassword,
        });

        if (data.accountId) {
            // toldOtherWindowsToAuthorize(headers);
            setIsSuccessfulRegistration(true);
            userModel.events.registered();
        }
    };

    const validationSchema = Yup.object({
        agree: Yup.boolean().oneOf([true]),
        email: Yup.string()
            .email(validationMessages.incorrectEmail)
            .required(validationMessages.required),
        password: validationSchemes.passwordWithRegExp,
        repeatPassword: validationSchemes.repeatPassword('password'),
    });

    const form = useFormik<SignUpFormValues>({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return { form, step, isSuccessfulRegistration, setStep };
};
