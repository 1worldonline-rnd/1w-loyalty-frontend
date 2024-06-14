import { actionsByTypeNumber } from '@/shared/constants';
import {
    createCustomRewardsByPartnerIdFx,
    getPartnerImusByPartnerIdFx,
    getPartnerImusByTypeFx,
    deleteCustomRewardsByPartnerIdFx,
    updateCustomRewardsByPartnerIdFx,
} from './effects';
import { $IMUs, $customRewardedIMUs } from './stores';
import { sample } from 'effector';
import { userModel } from '@/entities/user';
import { IMU, IMUMetaData, ImuIncentives } from '@/shared/api/custom-rewards/types';
import { sanitizeHTML } from '@/shared/lib/sanitizeHTML';

const quizResultOptionsToIncentives = ({
    imu,
    incentives,
}: {
    imu: IMUMetaData;
    incentives: ImuIncentives;
}) => {
    if (!imu.quizResultOptions || !imu.quizResultOptions.length) {
        return [];
    }

    let quizResultOptionsIncentives: ImuIncentives = [];

    imu.quizResultOptions.map((option) => {
        const incentiveForQuizOption = incentives.find(
            (incentive) => 'entityId' in incentive && Number(incentive.entityId) === option.id
        );

        if (incentiveForQuizOption && 'entityId' in incentiveForQuizOption && Number(incentiveForQuizOption?.entityId) === option.id) {
            let newQuizName = '';
            if (option.rangeFrom === option.rangeTo) {
                newQuizName = `Result ${option.orderNumber + 1}: ${String(option.rangeFrom)}`
            } else if (option.rangeFrom !== option.rangeTo) {
                newQuizName = `Result ${String(option.orderNumber + 1)}: ${String(option.rangeFrom)} - ${String(option.rangeTo)}`
            } else {
                newQuizName = sanitizeHTML(option.title)
            }
            incentiveForQuizOption.name = newQuizName;
            option.title = newQuizName;
        }


        if (!incentiveForQuizOption) {
            quizResultOptionsIncentives.push({
                entityId: option.id,
                entityType: 'quiz_result',
                group: 'CUSTOM_REWARDED_IMU',
                actionType: 40,
                name: sanitizeHTML(option.title),
                position: option.orderNumber,
                points: 0,
                isRequired: false,
            });
        }
    });

    return quizResultOptionsIncentives;
};

const normalizeImuStructure = (
    imuResponse: {
        imu: IMUMetaData;
        incentives: ImuIncentives;
    }[]
): IMU[] => {
    const normalizedIMUs = imuResponse.map((imuItem) => {
        let incentives = imuItem.incentives || [];

        const quizResultOptionsIncentives = quizResultOptionsToIncentives(imuItem) || [];

        return {
            ...imuItem.imu,
            incentives: [...incentives, ...quizResultOptionsIncentives],
        };
    });

    return normalizedIMUs;
};

$IMUs.on(getPartnerImusByTypeFx.doneData, (_, data) => {
    const imuResponse = data.data;

    const result = imuResponse.map((imu) => {
        let incentives = imu?.incentives || [];

        imu.pointTypes.forEach((pointType) => {
            const incentiveForPointType = incentives.find((incentive) => incentive.actionType === pointType);

            if (!incentiveForPointType && pointType !== 40) {
                incentives.push({
                    group: 'CUSTOM_REWARDED_IMU',
                    actionType: pointType,
                    points: 0,
                    isRequired: false,
                    name: actionsByTypeNumber[pointType as keyof typeof actionsByTypeNumber],
                });
            }
        });

        const quizResultOptionsIncentives = quizResultOptionsToIncentives({ imu, incentives }) || [];

        return {
            ...imu,
            incentives: [...incentives, ...quizResultOptionsIncentives],
        };
    });

    return result;
});

$customRewardedIMUs
    .on(getPartnerImusByPartnerIdFx.doneData, (_, data) => {
        const imuResponse = data.data;

        return normalizeImuStructure(imuResponse);
    })
    .on(createCustomRewardsByPartnerIdFx.doneData, (state, data) => {
        const imuResponse = data.data;

        const result = normalizeImuStructure([imuResponse]);

        return [...state, ...result];
    })
    .on(updateCustomRewardsByPartnerIdFx.doneData, (state, data) => {
        const imuResponse = data.data;

        const result = normalizeImuStructure([imuResponse]);

        const existingImuIndex = state.findIndex((imu) => imu.id === imuResponse.imu.id);

        return [
            ...state.slice(0, existingImuIndex),
            ...result,
            ...state.slice(existingImuIndex + 1, state.length),
        ];
    })
    .on(deleteCustomRewardsByPartnerIdFx.done, (state, { params }) => {
        const { imuId } = params;

        const existingImuIndex = state.findIndex((imu) => imu.id === imuId);

        return [...state.slice(0, existingImuIndex), ...state.slice(existingImuIndex + 1, state.length)];
    });
