import { useStore } from 'effector-react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { userModel } from '@/entities/user';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { widgetConfigModel } from '@/entities/widget-config';
import { isAccountAttachedToPartner } from '@/shared/api/account/types';

export const useAccountInfoForm = () => {
    const account = useStore(userModel.stores.$accountAttachedToPartner);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const { validationMessages } = useLocalizedYupValidations();

    const partnerId = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.partner.guid;

    const validationSchema = Yup.object({
        first: Yup.string()
            .required(validationMessages.required)
            .max(50, validationMessages.maxCharacters(50)),
        last: Yup.string()
            .required(validationMessages.required)
            .max(30, validationMessages.maxCharacters(30)),
    });

    const form = useFormik({
        initialValues: {
            first: '',
            last: '',
        },
        onSubmit: async (values) => {
            if (partnerId) {
                const { data } = await userModel.effects.changeFullnameFx({
                    ...values,
                    partnerExternalId: partnerId,
                });

                if (data.target === 'LOYALTY') {
                    setIsFormOpen(false);
                }
            }
        },
        validationSchema,
    });

    const { setValues } = form;

    const first = (isAccountAttachedToPartner(account) ? account?.firstName : '') || '';
    const last = (isAccountAttachedToPartner(account) ? account?.lastName : '') || '';

    useEffect(() => {
        if (first || last) {
            setValues({ first, last });
        }
    }, [first, last, setValues]);

    const isFullnameChanged = first !== form.values.first || last !== form.values.last;

    return { form, isFormOpen, isFullnameChanged, setIsFormOpen };
};
