import { IMU, ImuIncentive } from '@/shared/api/custom-rewards/types';
import { TextBadge } from '@/shared/ui';
import { ExternalLinkIcon } from '@/shared/ui/icons';
import styled from 'styled-components';

type ImuTitleProps = {
    imu: IMU;
};

export const ImuTitle = ({ imu }: ImuTitleProps) => {
    const imuType = imu.type.slice(0, 1).toUpperCase() + imu.type.slice(1).toLowerCase();
    return (
        <ImuTitleStyled>
            <p>{imu.name}</p>
            <a
                href={`${process.env.NEXT_PUBLIC_PORTAL_URL}#!/admin/partners/quiz-manager/configuration/${imu.id}`}
                target="_blank"
                rel="noreferrer"
            >
                <TextBadge>{imuType.slice(0, 1)}</TextBadge>
                {imuType}
                <ExternalLinkIcon />
            </a>
        </ImuTitleStyled>
    );
};

const ImuTitleStyled = styled.div`
    p {
        margin-block-end: 6px;
        font-size: 18px;
        font-weight: 600;
    }

    a {
        color: var(--text-light-color);
        display: flex;
        gap: 4px;
        align-items: center;

        &:hover {
            cursor: pointer;
        }

        div {
            background-color: var(--text-light-color);
        }
    }
`;
