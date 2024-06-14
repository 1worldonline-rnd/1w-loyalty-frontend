import { adminPanelModel } from '@/entities/admin-panel';
import { nftModel } from '@/entities/nft';
import { userModel } from '@/entities/user';
import { NftCollectionMeta, NftWidgetConfig } from '@/shared/api/nft-widgets/types';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { showMessage } from '@/shared/lib/messages';
import { useStore } from 'effector-react';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import * as Yup from 'yup';

export type Option = {
    label: string;
    value: string;
};

export type NftWidgetCreationFormValues = {
    name: string;
    description?: string;
    collectionIds: string[];
    locale: Option;
    config?: NftWidgetConfig;
    widgetCode?: string;
};

export const useNftWidgetForm = () => {
    const { validationMessages } = useLocalizedYupValidations();
    const partnerId = useStore(userModel.stores.$partnerId);
    const nftCollectionOptions = useStore(nftModel.stores.$nftCollectionOptions);
    const editedNftWidget = useStore(nftModel.stores.$editedNftWidget);
    const { t, i18n } = useTranslation('common', { keyPrefix: 'feed' });

    const { mode } = useStore(adminPanelModel.stores.$adminModal);

    const validationSchema = Yup.object({
        name: Yup.string()
            .trim()
            .required(validationMessages.required)
            .max(128, validationMessages.maxCharacters(128)),
        description: Yup.string().trim().max(256, validationMessages.maxCharacters(256)),
        collectionIds: Yup.array().required(validationMessages.required),
    });

    const englishLocale = {
        label: i18n.t('en'),
        value: 'en',
    };

    const localeOptions: Option[] = [
        { label: i18n.t('uk'), value: 'uk' },
        englishLocale,
        { label: i18n.t('fr'), value: 'fr' },
        { label: i18n.t('de'), value: 'de' },
        { label: i18n.t('es'), value: 'es' },
        { label: i18n.t('pt'), value: 'pt' },
        { label: i18n.t('pl'), value: 'pl' },
        { label: i18n.t('ru'), value: 'ru' },
    ];

    const form = useFormik<NftWidgetCreationFormValues>({
        initialValues: {
            name: '',
            locale: englishLocale,
            collectionIds: [],
        },
        onSubmit: async ({ name, description, collectionIds, locale }) => {
            if (mode === 'create' && partnerId) {
                const { status } = await nftModel.effects.createNftWidgetFx({
                    name,
                    description,
                    collectionIds,
                    locale: locale.value,
                    partnerId,
                });
                if (status === 200) {
                    adminPanelModel.events.closeModal();
                    showMessage('NFT widget created successfully');
                }
            } else if (mode === 'update' && editedNftWidget && partnerId) {
                const { collections, ...data } = editedNftWidget;
                const { status } = await nftModel.effects.updateNftWidgetFx({
                    ...data,
                    name,
                    description,
                    collectionIds,
                    locale: locale.value,
                    partnerId,
                });
                if (status === 200) {
                    adminPanelModel.events.closeModal();
                    showMessage('NFT widget updated successfully');
                }
            }
        },
        validationSchema,
    });

    useEffect(() => {
        if (editedNftWidget) {
            form.setValues({
                name: editedNftWidget.name,
                description: editedNftWidget.description,
                widgetCode: editedNftWidget.widgetCode,
                collectionIds: editedNftWidget.collections[0] ? [editedNftWidget.collections[0].id] : [],
                locale: {
                    label: i18n.t(editedNftWidget.locale),
                    value: editedNftWidget.locale,
                },
                config: editedNftWidget.config,
            });
        }
    }, [editedNftWidget]);

    return { form, nftCollectionOptions, localeOptions };
};
