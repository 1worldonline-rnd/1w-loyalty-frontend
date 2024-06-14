import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useStore } from 'effector-react';
import * as Yup from 'yup';
import { useTranslation } from 'next-i18next';
import { Locale } from '@/shared/constants';
import { FeedPeriod, PayloadToCreateFeed } from '@/shared/api/feed/types';
import { feedModel } from '@/entities/feed';
import { userModel } from '@/entities/user';
import { showMessage } from '@/shared/lib/messages';
import { FeedFields, FeedFormValues, Option } from '../types';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { adminPanelModel } from '@/entities/admin-panel';
import { $feedFormValues, setCacheFeedFormValuesClear } from '../model';

export const useFeedForm = () => {
    const partnerId = useStore(userModel.stores.$partnerId);
    const savedFeedFormValues = useStore($feedFormValues);

    const feeds = useStore(feedModel.stores.$feeds);

    const { t, i18n } = useTranslation('common', { keyPrefix: 'feed' });

    const { mode, entityIdToBeManage, onFeedSuccess, entity } = useStore(adminPanelModel.stores.$adminModal);

    const [isRestoredFeedValues, setIsRestoredFeedValues] = useState(false);

    const { validationMessages } = useLocalizedYupValidations();

    const validationSchema = Yup.object({
        [FeedFields.name]: Yup.string()
            .trim()
            .max(50, validationMessages.maxCharacters(50))
            .required(validationMessages.required),
        [FeedFields.pollCount]: Yup.number()
            .max(2000000, validationMessages.maxNumber(2000000))
            .typeError(validationMessages.onlyDigits)
            .required(validationMessages.required)
            .positive(validationMessages.positive),
        [FeedFields.url]: Yup.string()
            .url(validationMessages.incorrectUrl)
            .required(validationMessages.required),
        [FeedFields.incentive]: Yup.object().nullable().required(validationMessages.required),
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

    const closeModal = () => {
        adminPanelModel.events.adminModalToggled({
            isOpen: false,
            entityIdToBeManage: undefined,
        });
    };

    const form = useFormik<FeedFormValues>({
        initialValues: {
            [FeedFields.name]: '',
            [FeedFields.period]: {
                label: i18n.t(FeedPeriod.day),
                value: FeedPeriod.day,
            },
            [FeedFields.incentive]: null,
            [FeedFields.locale]: englishLocale,
            [FeedFields.pollCount]: '',
            [FeedFields.url]: '',
        },
        onSubmit: async (values) => {
            const incentive = values[FeedFields.incentive];

            if (partnerId && entity === 'feed' && incentive) {
                const payload: PayloadToCreateFeed = {
                    incentive,
                    locale: values[FeedFields.locale].value as Locale,
                    name: values[FeedFields.name],
                    period: values[FeedFields.period].value,
                    pollCount: Number(values[FeedFields.pollCount]),
                    url: values[FeedFields.url],
                    type: 'COMMON',
                };

                if (mode === 'update' && entityIdToBeManage) {
                    const { status, data } = await feedModel.effects.updateFeedFx({
                        feed: {
                            id: entityIdToBeManage,
                            ...payload,
                        },
                        partnerId: partnerId,
                    });

                    if (status === 200) {
                        showMessage(t('message-if-feed-successfully-updated'));
                        if (onFeedSuccess) {
                            onFeedSuccess(data);
                        } else {
                            closeModal();
                        }
                    }
                } else if (mode === 'create') {
                    const { status, data } = await feedModel.effects.createFeedFx({
                        feed: {
                            ...payload,
                        },
                        partnerId: partnerId,
                    });

                    if (status === 200) {
                        showMessage(t('message-if-feed-successfully-created'));
                        if (onFeedSuccess) {
                            onFeedSuccess(data);
                        } else {
                            closeModal();
                        }
                        setCacheFeedFormValuesClear({})
                    }
                }
            }
        },
        validationSchema,
    });

    const { setValues } = form;

    useEffect(() => {
        if (!isRestoredFeedValues) {
            setValues((values) => {
                return { ...values, ...savedFeedFormValues };
            });
            setIsRestoredFeedValues(true);
        }
    }, [isRestoredFeedValues, savedFeedFormValues, setValues]);

    useEffect(() => {
        if (mode === 'update' && entityIdToBeManage) {
            const feed = feeds.find(({ id }) => id === entityIdToBeManage);

            if (feed) {
                setValues({
                    [FeedFields.name]: feed.name,
                    [FeedFields.period]: {
                        label: i18n.t(feed.period),
                        value: feed.period,
                    },
                    [FeedFields.incentive]: feed.incentive?.id ? { id: feed.incentive.id } : { id: '' },
                    [FeedFields.locale]: {
                        label: i18n.t(feed.locale),
                        value: feed.locale,
                    },
                    [FeedFields.pollCount]: feed.pollCount,
                    [FeedFields.url]: feed.url,
                    ...savedFeedFormValues,
                });
            }
        }
    }, [mode, entityIdToBeManage, feeds, setValues, i18n, savedFeedFormValues]);

    return {
        form,
        localeOptions,
    };
};
