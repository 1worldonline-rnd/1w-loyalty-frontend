import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'next-i18next';
import { useStore } from 'effector-react';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { userModel } from '@/entities/user';
import { showMessage } from '@/shared/lib/messages';
import { appModel } from '@/entities/app';
import { useEffect } from 'react';
import queryString from 'query-string';
import { widgetConfigModel } from '@/entities/widget-config';
// import { toldOtherWindowsToAuthorize } from '@/shared/lib/thirdParty';

export const useEmailForm = () => {
    const { t } = useTranslation('common', { keyPrefix: 'sign-up-page.fast-registration' });
    const parentPageUrl = useStore(appModel.stores.$parentPageUrl);
    const partnerGuid = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.partner.guid;
    const urlSearchParams = useStore(appModel.stores.$urlSearchParams);
    const { validationMessages } = useLocalizedYupValidations();
    let windowDocument: Document;
    const parentSearchParams = queryString.parse(parentPageUrl);
    
    useEffect(() => {
        if (typeof document !== 'undefined') {
            windowDocument = document;
        }
    }, []);

    const validationSchema = Yup.object({
        email: Yup.string().email(validationMessages.incorrectEmail).required(validationMessages.required),
        agree: Yup.boolean().oneOf([true]),
    });

    const form = useFormik({
        initialValues: {
            email: '',
            agree: false,
        },
        onSubmit: async ({ email }) => {
            if (urlSearchParams) {
                const { data } = await userModel.effects.fastRegisterFx({
                    email,
                    redirectUrl: parentPageUrl || window.location.href,
                    sourceCode: String(urlSearchParams.loyaltyWidgetId),
                    initial_referrer: document.referrer || null,
                    partnerGuid: partnerGuid || '',
                    utm_source: parentSearchParams.utm_source || null,
                });

                if (data.accountId) {
                    // toldOtherWindowsToAuthorize(headers);

                    showMessage(t('message-if-user-fast-registered'));
                }
            }
        },
        validationSchema,
    });

    return { form };
};
