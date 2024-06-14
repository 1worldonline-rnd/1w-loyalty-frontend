import { ImuIncentive, IMUMetaData, ImuQuizResultIncentive } from '@/shared/api/custom-rewards/types';

export type ImuIncentiveWithGeneratedUUID = ImuIncentive & { generatedUUID: string };

export type ImuQuizResultIncentiveWithGeneratedUUID = ImuQuizResultIncentive & { generatedUUID: string };

export type IMUWithGeneratedUUID = IMUMetaData & {
    incentives?: Array<ImuIncentiveWithGeneratedUUID | ImuQuizResultIncentiveWithGeneratedUUID>;
};
