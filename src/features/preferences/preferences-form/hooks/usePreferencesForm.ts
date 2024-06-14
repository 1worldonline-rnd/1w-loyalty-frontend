import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { useFormik } from 'formik';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { userModel } from '@/entities/user';
import { PreferenceIncentive, PreferenceIncentiveKey } from '@/shared/api/widget-config/types';
import { PartialBy } from '@/shared/utility-types';
import { incentivesModel } from '@/entities/preference-incentives';
import { cloneDeep } from 'lodash';

const dummyDailyLoginValues = [
    {
        id: '1',
        points: 0,
        name: 'First',
        actionType: 1,
        isRequired: false,
        isUserLimitsEditable: false,
        userLimits: {
            daily: 2,
        },
    },
    {
        id: '2',
        points: 0,
        name: 'Second',
        actionType: 1,
        isRequired: false,
        isUserLimitsEditable: false,
        userLimits: {
            daily: 2,
        },
    },
    {
        id: '3',
        points: 0,
        name: 'Third',
        actionType: 1,
        isRequired: false,
        isUserLimitsEditable: false,
        userLimits: {
            daily: 2,
        },
    },
    {
        id: '4',
        points: 0,
        name: 'Fourth',
        actionType: 1,
        isRequired: false,
        isUserLimitsEditable: false,
        userLimits: {
            daily: 2,
        },
    },
    {
        id: '5',
        points: 0,
        name: 'Fifth',
        actionType: 1,
        isRequired: false,
        isUserLimitsEditable: false,
        userLimits: {
            daily: 2,
        },
    },
    {
        id: '6',
        points: 0,
        name: 'Sixth',
        actionType: 1,
        isRequired: false,
        isUserLimitsEditable: false,
        userLimits: {
            daily: 2,
        },
    },
    {
        id: '7',
        points: 0,
        name: 'Seventh',
        actionType: 1,
        isRequired: false,
        isUserLimitsEditable: false,
        userLimits: {
            daily: 2,
        },
    },
];

export const usePreferencesForm = () => {
    const { validationMessages } = useLocalizedYupValidations();
    const preferences = useStore(incentivesModel.stores.$preferenceIncentives);
    const partnerId = useStore(userModel.stores.$partnerId);
    const [snapshotInitialValues, setSnapshotInitialValues] = useState('');

    const getPreferenceValidationSchema = () => {
        return Yup.array().of(
            Yup.object({
                points: Yup.number()
                    .min(0, validationMessages.minNumber(0))
                    .max(2000000, validationMessages.maxNumber(2000000))
                    .required(validationMessages.required),
                userLimits: Yup.object({
                    daily: Yup.number()
                        .notOneOf([0], 'cant be zero')
                        .min(-1, validationMessages.minNumber(-1))
                        .max(2_000_000, validationMessages.maxNumber(2000000)),
                }),
            })
        );
    };

    const validationSchema = Yup.object({
        progressiveDailyPoints: Yup.array().of(
            Yup.object({
                points: Yup.number()
                    .min(0, validationMessages.minNumber(0))
                    .max(2_000_000, validationMessages.maxNumber(2_000_000))
                    .required(validationMessages.required),
            })
        ),
        poller: getPreferenceValidationSchema(),
        quiz: getPreferenceValidationSchema(),
        survey: getPreferenceValidationSchema(),
        profileEvents: getPreferenceValidationSchema(),
        // earnPageEvents: getPreferenceValidationSchema(),
        other: getPreferenceValidationSchema(),
    });

    const form = useFormik<
        Record<PreferenceIncentiveKey, PartialBy<PreferenceIncentive, 'id' | 'created'>[]> //move to types in preferences form
    >({
        initialValues: {
            progressiveDailyPoints: cloneDeep(dummyDailyLoginValues),
            poller: [],
            quiz: [],
            survey: [],
            profileEvents: [],
            // earnPageEvents: [],
            other: [],
        },
        onSubmit: async (values) => {
            if (partnerId) {
                const { status } = await incentivesModel.effects.updatePreferenceIncentivesFx({
                    partnerGuid: partnerId,
                    payload: values,
                });
                if (status === 202) {
                    incentivesModel.effects.getPreferenceIncentivesFx(partnerId);
                }
            }
        },
        validationSchema,
    });

    const { setValues } = form;

    useEffect(() => {
        if (preferences) {
            const values = {
                other: preferences.other,
                poller: preferences.poller,
                profileEvents: preferences.profileEvents,
                quiz: preferences.quiz,
                survey: preferences.survey,
                progressiveDailyPoints: preferences.progressiveDailyPoints,
            };
            setValues(values).then(() => {
                setSnapshotInitialValues(JSON.stringify(values));
            });
        }
    }, [preferences]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (snapshotInitialValues !== JSON.stringify(form.values)) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [snapshotInitialValues, form.values]);

    const handleSharingCheckboxChange = (value: boolean) => {
        form.setFieldValue(
            'other',
            form.values.other.map((item) => {
                if (item.name.includes('Sharing')) {
                    return {
                        ...item,
                        isRequired: value,
                    };
                }
                return item;
            })
        );
    };

    return { form, handleSharingCheckboxChange };
};
