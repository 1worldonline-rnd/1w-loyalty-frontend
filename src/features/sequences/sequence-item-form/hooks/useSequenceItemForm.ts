import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useStore } from 'effector-react';
import { useTranslation } from 'next-i18next';
import { userModel } from '@/entities/user';
import { showMessage } from '@/shared/lib/messages';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { adminPanelModel } from '@/entities/admin-panel';
import { feedModel } from '@/entities/feed';
import { useEffect } from 'react';
import { getRewardedIMUsFx, getSequenceItemsFx } from '@/entities/feed/model/effects';

type Options = Array<{
    label: string;
    value: string;
}>;

export const useSequenceItemForm = () => {
    const partnerId = useStore(userModel.stores.$partnerId);
    const rewardedIMUs = useStore(feedModel.stores.$rewardedIMUs);
    const activeSequenceId = useStore(feedModel.stores.$activeSequenceId);
    const { mode, entityIdToBeManage } = useStore(adminPanelModel.stores.$adminModal);
    const sequenceFeedItems = useStore(feedModel.stores.$sequenceFeedItems);

    const { t, i18n } = useTranslation('common', { keyPrefix: 'loyalty-widgets' });

    const { validationMessages } = useLocalizedYupValidations();

    const imuOptions: Options = [
        { label: 'Quiz', value: 'QUIZ' },
        { label: 'Survey', value: 'SURVEY' },
    ];

    const validationSchema = Yup.object({
        name: Yup.string().required(validationMessages.required),
        url: Yup.string().trim().required(validationMessages.required).url(validationMessages.incorrectUrl),
        imuType: Yup.string().required(validationMessages.required),
        imuId: Yup.string().required(validationMessages.required),
        incentive: Yup.object({
            points: Yup.number()
                .typeError(validationMessages.onlyDigits)
                .max(2_000_000, validationMessages.maxNumber(2_000_000))
                .min(0, validationMessages.maxNumber(0))
                .integer(validationMessages.onlyDigits)
                .required(validationMessages.required),
            timeToReward: Yup.number()
                .typeError(validationMessages.onlyDigits)
                .max(2_000_000, validationMessages.maxNumber(2_000_000))
                .min(0, validationMessages.maxNumber(0))
                .integer(validationMessages.onlyDigits),
        }),
    });

    const form = useFormik({
        initialValues: {
            name: '',
            imuId: '',
            url: '',
            feedId: activeSequenceId,
            imuType: '',
            position: sequenceFeedItems.length,
            incentive: {
                points: 0,
                timeToReward: 0,
            },
        },
        onSubmit: async ({ name, url, imuType, position, incentive: { points, timeToReward }, imuId }, { resetForm }) => {
            if (mode === 'update') {
                const edited = sequenceFeedItems.find((item) => item.id === entityIdToBeManage);
                if (partnerId && activeSequenceId && entityIdToBeManage && edited) {
                    const { status } = await feedModel.effects.updateSequenceItemFx({
                        sequence: {
                            id: entityIdToBeManage,
                            imuId: imuId,
                            imuName: edited.imuName,
                            name: name.trim(),
                            url: url,
                            feedId: activeSequenceId,
                            imuType: imuType,
                            position: position,
                            incentive: {
                                ...edited.incentive,
                                points: points,
                                timeToReward: timeToReward,
                            },
                        },
                        partnerId: partnerId,
                    });

                    if (status === 200) {
                        showMessage(t('message-if-widget-successfully-created'));

                        adminPanelModel.events.adminModalToggled({
                            isOpen: false,
                        });
                        getSequenceItemsFx({ partnerId: partnerId, feedId: String(activeSequenceId) });
                        resetForm();
                    }
                }
            } else {
                if (partnerId && activeSequenceId) {
                    const selectedImu = rewardedIMUs.find((item) => item.value === form.values.imuId);
                    const { status } = await feedModel.effects.createSequenceItemFx({
                        sequence: {
                            imuId: imuId,
                            imuName: selectedImu?.label ? selectedImu?.label : '',
                            name: name.trim(),
                            url: url,
                            feedId: activeSequenceId,
                            imuType: imuType,
                            position: sequenceFeedItems.length,
                            incentive: {
                                points: points,
                                timeToReward: timeToReward,
                            },
                        },
                        partnerId: partnerId,
                    });

                    if (status === 200) {
                        showMessage(t('message-if-widget-successfully-created'));

                        adminPanelModel.events.adminModalToggled({
                            isOpen: false,
                        });
                        getSequenceItemsFx({ partnerId: partnerId, feedId: String(activeSequenceId) });
                        resetForm();
                    }
                }
            }
        },
        validationSchema,
    });

    const { setValues } = form;

    useEffect(() => {
        if (mode === 'update') {
            const edited = sequenceFeedItems.find((item) => item.id === entityIdToBeManage);

            if (edited) {
                if (partnerId) {
                    getRewardedIMUsFx({ partnerId: partnerId, imuType: edited.imuType });
                }

                setValues({
                    name: edited.name,
                    url: edited.url,
                    position: edited.position,
                    feedId: edited.feedId,
                    incentive: {
                        points: edited.incentive.points,
                        timeToReward: edited.incentive.timeToReward,
                    },
                    imuType: edited.imuType,
                    imuId: edited.imuId,
                });
            }
        }
    }, [setValues]);

    return { form, imuOptions, rewardedIMUs, entityIdToBeManage };
};
