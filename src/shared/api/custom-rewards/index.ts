import { axios } from '@/shared/lib/axios';
import { PartnerId } from '../partner/types';
import { IMU, IMUMetaData, ImuIncentives, ImuRewardsCreatePayload } from './types';

export const fetchPartnerImusByType = async ({
    partnerId,
    imuType,
}: {
    partnerId: PartnerId;
    imuType: string;
}) => {
    return axios.get<IMU[]>(`/imu/partners/${partnerId}?imuType=${imuType}`);
};

export const fetchPartnerImusByPartnerId = async ({ partnerId }: { partnerId: PartnerId }) => {
    return axios.get<{ imu: IMUMetaData; incentives: ImuIncentives }[]>(
        `/custom-rewarded/imu/partners/${partnerId}`
    );
};

export const createCustomRewardsByPartnerId = async ({
    partnerId,
    payload,
}: {
    partnerId: PartnerId;
    payload: ImuRewardsCreatePayload;
}) => {
    return axios.post<{ imu: IMUMetaData; incentives: ImuIncentives }>(
        `/custom-rewarded/imu/partners/${partnerId}`,
        payload
    );
};

export const deleteCustomRewardsByPartnerId = async ({
    partnerId,
    imuId,
    widgetCode,
}: {
    partnerId: PartnerId;
    imuId: string;
    widgetCode: string;
}) => {
    return axios.delete(`/custom-rewarded/imu/${imuId}/partners/${partnerId}?widgetCode=${widgetCode}`);
};

export const updateCustomRewardsByPartnerId = async ({
    partnerId,
    payload,
}: {
    partnerId: PartnerId;
    payload: ImuRewardsCreatePayload;
}) => {
    return axios.put<{ imu: IMUMetaData; incentives: ImuIncentives }>(
        `/custom-rewarded/imu/partners/${partnerId}`,
        payload
    );
};
