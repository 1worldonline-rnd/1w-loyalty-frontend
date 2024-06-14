import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStore } from 'effector-react';
import { useTranslation } from 'next-i18next';
import { userModel } from '@/entities/user';
import { showMessage } from '@/shared/lib/messages';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { adminPanelModel } from '@/entities/admin-panel';
import { feedModel } from '@/entities/feed';

type Options = Array<{
    label: string;
    value: string;
}>;

export const useSequenceCreationForm = () => {
    const partnerId = useStore(userModel.stores.$partnerId);

    const { t, i18n } = useTranslation('common', { keyPrefix: 'loyalty-widgets' });

    const { validationMessages } = useLocalizedYupValidations();

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

    const validationSchema = Yup.object({
        name: Yup.string()
            .trim()
            .max(50, validationMessages.maxCharacters(50))
            .required(validationMessages.required),
    });

    const form = useFormik({
        initialValues: {
            name: '',
            locale: englishLocale,
        },
        onSubmit: async ({ name, locale: localeOption }) => {
            if (partnerId) {
                const { status } = await feedModel.effects.createSequenceFx({
                    sequence: {
                        locale: localeOption.value,
                        name: name.trim(),
                        type: 'SEQUENCE',
                    },
                    partnerId: partnerId,
                });

                if (status === 200) {
                    showMessage(t('message-if-widget-successfully-created'));

                    adminPanelModel.events.adminModalToggled({
                        isOpen: false,
                    });
                }
            }
        },
        validationSchema,
    });

    return { form
        , localeOptions 
    };
};
