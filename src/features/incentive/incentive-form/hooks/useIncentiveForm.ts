import * as Yup from 'yup';
import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { adminPanelModel } from '@/entities/admin-panel';
import { eventsModel } from '@/entities/events';
import { showMessage } from '@/shared/lib/messages';
import { userModel } from '@/entities/user';

export enum IncentiveFields {
    // value is key for translate
    actionType = 'action-type',
    name = 'event-name',
    rewardAmount = 'reward-amount',
    limitsDaily = 'limits-daily-per-user',
    limitsMonthly = 'limits-monthly-per-user',
}

export enum IncentiveActionType {
    // value is key for translate
    click = 'click',
}

export const useIncentiveForm = () => {
    const { validationMessages } = useLocalizedYupValidations();

    const { mode, entityIdToBeManage, onIncentiveSuccess, entity } = useStore(
        adminPanelModel.stores.$adminModal
    );
    const incentives = useStore(eventsModel.stores.$events);
    const partnerId = useStore(userModel.stores.$partnerId);

    const { t } = useTranslation('common', { keyPrefix: 'events' });

    const validationSchema = Yup.object({
        [IncentiveFields.name]: Yup.string()
            .trim()
            .max(50, validationMessages.maxCharacters(50))
            .required(validationMessages.required),
        [IncentiveFields.rewardAmount]: Yup.number()
            .max(2000000, validationMessages.maxNumber(2000000))
            .typeError(validationMessages.onlyDigits)
            .required(validationMessages.required)
            .positive(validationMessages.positive),
        [IncentiveFields.limitsDaily]: Yup.number()
            .when(IncentiveFields.limitsMonthly, (daily, schema) => {
                return daily ? schema.max(daily, validationMessages.ifMonthlyBiggerDaily) : schema;
            })
            .max(2000000, validationMessages.maxNumber(2000000))
            .typeError(validationMessages.onlyDigits)
            .required(validationMessages.required)
            .positive(validationMessages.positive),
        [IncentiveFields.limitsMonthly]: Yup.number()
            .max(2000000, validationMessages.maxNumber(2000000))
            .typeError(validationMessages.onlyDigits)
            .required(validationMessages.required)
            .positive(validationMessages.positive),
    });

    const closeModal = () => {
        adminPanelModel.events.adminModalToggled({
            isOpen: false,
            entityIdToBeManage: undefined,
        });
    };

    const form = useFormik({
        initialValues: {
            [IncentiveFields.name]: '',
            [IncentiveFields.actionType]: {
                label: String(t(IncentiveActionType.click)),
                value: '32',
            },
            [IncentiveFields.rewardAmount]: '',
            [IncentiveFields.limitsDaily]: '',
            [IncentiveFields.limitsMonthly]: '',
        },
        onSubmit: async (values, { resetForm }) => {
            if (partnerId && entity === 'incentive') {
                const actionType = Number(values['action-type'].value);
                const name = values[IncentiveFields.name];
                const points = Number(values[IncentiveFields.rewardAmount]);
                const userLimits = {
                    daily: Number(values[IncentiveFields.limitsDaily]),
                    monthly: Number(values[IncentiveFields.limitsMonthly]),
                };

                if (mode === 'create') {
                    const { status, data } = await eventsModel.effects.createEventFx({
                        actionType,
                        name,
                        points,
                        userLimits,
                        partner: partnerId,
                    });
                    if (status === 200) {
                        resetForm();
                        showMessage(t('message-if-event-successfully-created'));

                        if (onIncentiveSuccess) {
                            onIncentiveSuccess(data);
                        } else {
                            closeModal();
                        }
                    }
                } else if (entityIdToBeManage && mode === 'update') {
                    const { status, data } = await eventsModel.effects.updateEventFx({
                        actionType,
                        id: entityIdToBeManage,
                        name,
                        points,
                        partner: partnerId,
                        userLimits,
                    });

                    if (status === 200) {
                        showMessage(t('message-if-event-successfully-updated'));

                        if (onIncentiveSuccess) {
                            onIncentiveSuccess(data);
                        } else {
                            closeModal();
                        }
                    }
                }
            }
        },
        validationSchema,
    });

    const { setValues } = form;

    useEffect(() => {
        if (mode === 'update' && entityIdToBeManage) {
            const incentive = incentives.find(({ id }) => id === entityIdToBeManage);

            if (incentive) {
                setValues({
                    [IncentiveFields.name]: incentive.name,
                    [IncentiveFields.rewardAmount]: String(incentive.points),
                    [IncentiveFields.limitsDaily]: String(incentive.userLimits.daily),
                    [IncentiveFields.limitsMonthly]: String(incentive.userLimits.monthly),
                    [IncentiveFields.actionType]: {
                        label: String(t(IncentiveActionType.click)),
                        value: '32',
                    },
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode, entityIdToBeManage, incentives, setValues]);

    return { form };
};
