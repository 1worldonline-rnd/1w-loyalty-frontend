import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'next-i18next';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { Collection } from '@/shared/api/collection/types';
import { collectionModel } from '@/entities/collection';
import { userModel } from '@/entities/user';
import { useStore } from 'effector-react';
import { showMessage } from '@/shared/lib/messages';
import { adminPanelModel } from '@/entities/admin-panel';

type Option<L = string, V = string> = {
    label: L;
    value: V;
};

type FormValues = {
    name: string;
    type: Option;
    locale: Option;
};

const COLLECTION_NAME_MAX_LENGTH = 250;

export const useCollectionCreationForm = () => {
    const partnerId = useStore(userModel.stores.$partnerId);

    const commonTranslation = useTranslation('common');
    const collectionTranslation = useTranslation('features.collection');

    const { onCollectionSuccess } = useStore(adminPanelModel.stores.$adminModal);

    const { validationMessages } = useLocalizedYupValidations();

    const englishLocale = {
        label: commonTranslation.t('en'),
        value: 'en',
    };

    const localeOptions: Option[] = [
        { label: commonTranslation.t('uk'), value: 'uk' },
        englishLocale,
        { label: commonTranslation.t('fr'), value: 'fr' },
        { label: commonTranslation.t('de'), value: 'de' },
        { label: commonTranslation.t('es'), value: 'es' },
        { label: commonTranslation.t('pt'), value: 'pt' },
        { label: commonTranslation.t('pl'), value: 'pl' },
        { label: commonTranslation.t('ru'), value: 'ru' },
    ];

    const collectionTypeOptions: Option<string, Collection['type']>[] = [
        { label: collectionTranslation.t('collection-type-sequence'), value: 'SEQUENCE' },
        { label: collectionTranslation.t('collection-type-topic'), value: 'TOPIC' },
    ];

    const form = useFormik<FormValues>({
        initialValues: {
            name: '',
            type: collectionTypeOptions[0],
            locale: englishLocale,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .trim()
                .max(COLLECTION_NAME_MAX_LENGTH, validationMessages.maxCharacters(COLLECTION_NAME_MAX_LENGTH))
                .required(validationMessages.required),
        }),
        onSubmit: async ({ locale, name, type }) => {
            if (partnerId) {
                const { status, data } = await collectionModel.effects.createCollectionFx({
                    collection: {
                        locale: locale.value,
                        name,
                        type: type.value as Collection['type'],
                    },
                    partnerId,
                });

                if (status === 201) {
                    showMessage(
                        collectionTranslation.t('creation-form.message-if-collection-successfully-created')
                    );

                    if (onCollectionSuccess) {
                        onCollectionSuccess(data);
                    } else {
                        adminPanelModel.events.adminModalToggled({
                            isOpen: false,
                            entityIdToBeManage: undefined,
                        });
                    }
                }
            }
        },
    });

    return { form, localeOptions, collectionTypeOptions };
};
