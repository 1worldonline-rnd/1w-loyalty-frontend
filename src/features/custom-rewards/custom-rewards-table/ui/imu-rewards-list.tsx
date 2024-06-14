import { ImuIncentive, ImuIncentives, ImuQuizResultIncentive } from '@/shared/api/custom-rewards/types';
import styled from 'styled-components';

type ImuRewardsListProps = {
    imuIncentives: ImuIncentives;
};

const ImuReward = ({ imuIncentive }: { imuIncentive: ImuIncentive | ImuQuizResultIncentive }) => {
    if (!imuIncentive.points) {
        return null;
    }

    const incentiveNameFormat = (name: string) => {
        if (name === 'Sharing Data on Facebook') {
            return 'Facebook'
        } else if (name === 'Sharing Data on Twitter') {
            return 'Twitter'
        } else {
            return name
        }
    }

    return (
        <div>
            <p className="reward-points">{imuIncentive.points}</p>
            <p className="reward-name">{incentiveNameFormat(imuIncentive.name)}</p>
        </div>
    );
};

export const ImuRewardsList = ({ imuIncentives }: ImuRewardsListProps) => {
    const sortedIncentives = imuIncentives.sort((a, b) => {
        // rewards without 'position' field should come first
        if (!('position' in a)) return -1;
        if (!('position' in b)) return 1;

        // if both have 'position' field, sort them by it
        return a.position - b.position;
    });

    return (
        <ImuRewardsListStyled>
            {sortedIncentives.map((imuIncentive, index) => (
                <ImuReward key={index} imuIncentive={imuIncentive} />
            ))}
        </ImuRewardsListStyled>
    );
};

const ImuRewardsListStyled = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 28px;
    row-gap: 8px;

    p + p {
        margin-block-start: 0;
    }

    .reward-points {
        font-size: 18px;
        font-weight: 600;
    }

    .reward-name {
        font-size: 16px;
        line-height: 20px;
        font-weight: 400;
        color: var(--text-light-color);
    }
`;
