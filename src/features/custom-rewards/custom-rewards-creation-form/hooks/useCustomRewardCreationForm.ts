import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { useStore } from 'effector-react';
import { userModel } from '@/entities/user';
import { adminPanelModel } from '@/entities/admin-panel';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { incentivesModel } from '@/entities/preference-incentives';
import { customRewardsModel } from '../../model';
import type {
    IMUWithGeneratedUUID,
    ImuIncentiveWithGeneratedUUID,
    ImuQuizResultIncentiveWithGeneratedUUID,
} from '../types';
import type { Nullable } from '@/shared/utility-types';
import { v4 as uuidv4 } from 'uuid';
import { ImuIncentive, ImuQuizResultIncentive, ImuQuizResultOption } from '@/shared/api/custom-rewards/types';
import { sanitizeHTML } from '@/shared/lib/sanitizeHTML';

export type Option = {
    label: string;
    value: string;
};

export type CustomRewardCreationFormValuesIncentives =
    | ImuIncentiveWithGeneratedUUID
    | ImuQuizResultIncentiveWithGeneratedUUID;

export type CustomRewardCreationFormValues = {
    imuData: {
        imuType: Nullable<Option>;
        imu: Nullable<Option>;
    };
    incentives: Nullable<{
        [key: string]: CustomRewardCreationFormValuesIncentives;
    }>;
};

export const useCustomRewardCreationForm = () => {
    const { validationMessages } = useLocalizedYupValidations();
    // const incentives = useStore(incentivesModel.stores.$preferenceIncentives) || {};
    const IMUs = useStore(customRewardsModel.stores.$IMUs);
    const isImusLoading = useStore(customRewardsModel.effects.getPartnerImusByTypeFx.pending);
    const customRewardedIMUs = useStore(customRewardsModel.stores.$customRewardedIMUs);
    const partnerId = useStore(userModel.stores.$partnerId);
    const editedImu = useStore(customRewardsModel.stores.$editedImu);
    const isEditing = Boolean(editedImu);

    const [selectedIMUType, setSelectedIMUType] = useState('');
    const [selectedIMU, setSelectedIMU] = useState<IMUWithGeneratedUUID>();

    useEffect(() => {
        if (partnerId) {
            customRewardsModel.effects.getPartnerImusByPartnerIdFx({ partnerId });
        }
    }, [partnerId]);

    useEffect(() => {
        if (partnerId && selectedIMUType) {
            customRewardsModel.effects.getPartnerImusByTypeFx({ partnerId, imuType: selectedIMUType });
        }
    }, [selectedIMUType]);

    const initialFormValues: CustomRewardCreationFormValues = {
        imuData: {
            imuType: null,
            imu: null,
        },
        incentives: null,
    };

    const validationSchema = Yup.object({
        imuData: Yup.object().shape({
            imuType: Yup.object()
                .typeError(validationMessages.required)
                .required(validationMessages.required),
            imu: Yup.object().typeError(validationMessages.required).required(validationMessages.required),
        }),
        incentives: Yup.object().shape(
            selectedIMU?.incentives?.reduce((schema: Record<string, Yup.ObjectSchema<any>>, incentive) => {
                schema[incentive.generatedUUID] = Yup.object().shape({
                    points: Yup.number()
                        .typeError(validationMessages.onlyDigits)
                        .min(0, validationMessages.minNumber(0))
                        .notRequired()
                        .integer(validationMessages.onlyIntegers)
                        .when('isRequired', (isRequired: boolean, schema: Yup.NumberSchema) =>
                            isRequired
                                ? schema.min(
                                    0,
                                    validationMessages.minNumber(0) + ' if the completion is required'
                                )
                                    .integer(validationMessages.onlyIntegers)
                                : schema
                        ),
                    isRequired: Yup.boolean().notRequired(),
                });
                return schema;
            }, {}) || {}
        ),
    });

    const form = useFormik<CustomRewardCreationFormValues>({
        initialValues: initialFormValues,
        onSubmit: async ({ imuData, incentives }) => {
            if (partnerId && selectedIMU) {
                const sendData = {
                    imu: {
                        id: selectedIMU.id,
                        widgetCode: selectedIMU.widgetCode,
                        type: 'QUIZ',
                    },
                    incentives: Object.values(incentives || {}).map((incentive) => {
                        return {
                            ...incentive,
                            points: Number(incentive.points),
                        };
                    }),
                };
                if (isEditing) {
                    await customRewardsModel.effects.updateCustomRewardsByPartnerIdFx({
                        partnerId,
                        payload: sendData,
                    });
                } else {
                    await customRewardsModel.effects.createCustomRewardsByPartnerIdFx({
                        partnerId,
                        payload: sendData,
                    });
                }
                adminPanelModel.events.adminModalToggled({
                    isOpen: false,
                });
            }
        },
        validationSchema,
    });

    // const imuTypeOptions = Object.keys(incentives).map((imuType) => ({
    //     label: imuType.charAt(0).toUpperCase() + imuType.slice(1),
    //     value: imuType,
    // }));

    const imuTypeOptions = [
        {
            label: 'Quiz',
            value: 'QUIZ',
        },
    ];

    const imuOptions = useMemo(() => {
        return IMUs.filter((imu) => {
            const isImuAlreadyExist = customRewardedIMUs.find((customRewardedIMU) => {
                return customRewardedIMU.id === imu.id;
            });
            return !isImuAlreadyExist && imu.type.toLowerCase() === selectedIMUType.toLowerCase();
        }).map((imu) => ({
            label: imu.name,
            value: imu.id,
        }));
    }, [IMUs, selectedIMUType]);

    const handleIMUSelection = useCallback(
        (selectedOption: Option) => {
            // Find the full IMU object from store using the selectedOption's value
            const selectedIMUObject = isEditing
                ? editedImu
                : IMUs.find((imu) => imu.id === selectedOption.value);

            if (!selectedIMUObject) {
                return;
            }

            if (selectedIMUObject.incentives) {
                selectedIMUObject.incentives = selectedIMUObject.incentives?.map((incentive) => {
                    let preparedIncentive = prepareIncentiveName(incentive, selectedIMUObject.quizResultOptions || []);
                    return {
                        ...preparedIncentive,
                        generatedUUID: uuidv4(),
                    }
                });
            }

            // defined variable for redefine type
            const IMUObject = selectedIMUObject as IMUWithGeneratedUUID;

            // Set the found IMU object as selectedIMU state
            setSelectedIMU(IMUObject);

            const newInitialValues = {
                imuData: {
                    imuType: {
                        label:
                            IMUObject.type.charAt(0).toUpperCase() +
                            IMUObject.type.slice(1).toLowerCase(),
                        value: IMUObject.type.toLowerCase(),
                    },
                    imu: selectedOption,
                },
                incentives: IMUObject.incentives!.reduce(
                    (values: Record<string, CustomRewardCreationFormValuesIncentives>, incentive) => {
                        values[incentive.generatedUUID] = incentive;
                        return values;
                    },
                    {}
                ),
            };

            form.resetForm({ values: newInitialValues });
        },
        [IMUs, form.values.imuData.imu]
    );

    useEffect(() => {
        if (editedImu) {
            form.setFieldValue('imuType', {
                label: editedImu.type.charAt(0).toUpperCase() + editedImu.type.slice(1),
                value: editedImu.type,
            });

            handleIMUSelection({
                label: editedImu.name,
                value: editedImu.id,
            });
        }
    }, [editedImu]);

    const imuIncentives = selectedIMU?.incentives || [];

    const prepareIncentiveName = (incentive: ImuIncentive | ImuQuizResultIncentive, quizResultOptions: ImuQuizResultOption[]) => {
        let updatedIncentive;
        quizResultOptions.map((option) => {
            if (incentive && 'entityId' in incentive && Number(incentive?.entityId) === option.id) {
                let newQuizName = '';
                if (option.rangeFrom === option.rangeTo) {
                    newQuizName = `Result ${option.orderNumber + 1}: ${String(option.rangeFrom)}`
                } else if (option.rangeFrom !== option.rangeTo) {
                    newQuizName = `Result ${String(option.orderNumber + 1)}: ${String(option.rangeFrom)} - ${String(option.rangeTo)}`
                } else {
                    newQuizName = sanitizeHTML(option.title)
                }
                incentive.name = newQuizName;
                updatedIncentive = incentive
            }
        });

        return updatedIncentive || incentive
    }

    const prepareSeparateIncentives = (incetives: Array<ImuIncentiveWithGeneratedUUID | ImuQuizResultIncentiveWithGeneratedUUID> = []) => {
        const separeatedIncentives: {
            quiz: Array<ImuIncentiveWithGeneratedUUID | ImuQuizResultIncentiveWithGeneratedUUID>,
            sharing: Array<ImuIncentiveWithGeneratedUUID | ImuQuizResultIncentiveWithGeneratedUUID>
        } = {
            quiz: [],
            sharing: []
        };

        for (let index = 0; index < incetives.length; index++) {
            const element = incetives[index];
            if (element.actionType === 16 || element.actionType === 7 ||
                element.actionType === 35 || element.actionType === 36) {
                separeatedIncentives.sharing.push(element)
            }

            if (element.actionType === 37 || element.actionType === 40 ||
                element.actionType === 41 || element.actionType === 42 ||
                element.actionType === 43) {
                separeatedIncentives.quiz.push(element)
            }

        }
        return separeatedIncentives;
    };

    const imuIncentivesSeparated = prepareSeparateIncentives(selectedIMU?.incentives);

    return {
        form,
        setSelectedIMUType,
        handleIMUSelection,
        selectedIMU,
        imuTypeOptions,
        imuOptions,
        imuIncentives,
        imuIncentivesSeparated,
        isEditing,
        isImusLoading,
    };
};
