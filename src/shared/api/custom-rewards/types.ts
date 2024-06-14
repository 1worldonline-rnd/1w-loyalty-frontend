export type ImuIncentive = {
    group: string;
    actionType: number;
    isRequired: boolean;
    points: number;
    name: string;
};

export type ImuQuizResultIncentive = {
    group: string;
    entityId: number;
    entityType?: 'quiz_result';
    actionType: 40;
    name: string;
    position: number;
    points: number;
    isRequired: boolean;
};

export type ImuIncentives = Array<ImuIncentive | ImuQuizResultIncentive>;

export type ImuRewardsCreatePayload = {
    imu: {
        id: string;
        widgetCode: string;
        type: string;
    };
    incentives: ImuIncentives;
};

export type ImuQuizResultOption = {
    id: number;
    title: string;
    orderNumber: number;
    rangeFrom: number;
    rangeTo: number;
};

export type IMUMetaData = {
    id: string;
    widgetCode: string;
    name: string;
    language: string;
    type: string;
    pointTypes: number[];
    quizResultOptions?: ImuQuizResultOption[];
};

export type IMU = IMUMetaData & {
    incentives?: ImuIncentives;
};
