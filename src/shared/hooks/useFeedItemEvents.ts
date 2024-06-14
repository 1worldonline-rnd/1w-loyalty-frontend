import { FeedContent, FeedReward } from '@/shared/api/feed/types';
import { useEffect, useMemo, useState } from 'react';

type FeedRewardWithSocialName = FeedReward & {
    socialMedia?: string;
};

export type NormalizedFactQuizReward = {
    scoredPoints: number;
    totalPoints: number;
    isScored: boolean;
    required: boolean;
};

export type RewardsMap = Partial<{
    shared: Array<FeedRewardWithSocialName>;
    regular: Array<FeedReward>;
    factQuiz: NormalizedFactQuizReward;
}>;

type SortedRewards = {
    required: RewardsMap;
    notRequired: RewardsMap;
};

export const useFeedItemEvents = (imuActionRewards: FeedContent['imuActionRewards']) => {
    const [rewards, setRewards] = useState<SortedRewards>({
        required: {},
        notRequired: {},
    });

    const [isRequiredCompleted, setIsRequiredCompleted] = useState(false);

    const shareRewards = imuActionRewards?.rewards
        .filter((reward) => {
            return reward.scoringPointType.includes('SHARE');
        })
        .map((reward) => {
            return {
                ...reward,
                socialMedia: reward.scoringPointType.split('_')[1].toLowerCase(),
            };
        });

    const regularRewards = imuActionRewards?.rewards.filter((reward) => {
        return (
            !reward.scoringPointType.includes('SHARE') &&
            reward.scoringPointType !== 'FACT_QUIZ_RESULT_REWARD'
        );
    });

    const factQuizReward = useMemo(() => {
        return imuActionRewards?.rewards
            .filter((reward) => {
                return reward.scoringPointType === 'FACT_QUIZ_RESULT_REWARD';
            })
            .reduce(
                (acc: NormalizedFactQuizReward, reward) => {
                    acc.totalPoints += reward.points;
                    if (reward.isScored) {
                        acc.scoredPoints += reward.points;
                    }

                    if (reward.isRequired) {
                        acc.required = true;
                        acc.isScored = reward.isScored;
                    }

                    return acc;
                },
                {
                    scoredPoints: 0,
                    totalPoints: 0,
                    isScored: false,
                    required: false,
                }
            );
    }, [imuActionRewards?.rewards]);

    useEffect(() => {
        if (imuActionRewards?.rewards) {
            let rewards: SortedRewards = {
                required: {
                    shared: [],
                    regular: [],
                },
                notRequired: {
                    shared: [],
                    regular: [],
                },
            };

            let isRequired = 0;
            let isScored = 0;

            const assignReward = (
                rewardElement: FeedRewardWithSocialName,
                category: 'shared' | 'regular'
            ) => {
                if (rewardElement.isRequired) {
                    rewards.required[category]!.push(rewardElement);
                    isRequired += 1;
                    if (rewardElement.isScored) {
                        isScored += 1;
                    }
                } else {
                    rewards.notRequired[category]!.push(rewardElement);
                }
            };

            regularRewards?.forEach((reward) => assignReward(reward, 'regular'));
            shareRewards?.forEach((reward) => assignReward(reward, 'shared'));

            if (factQuizReward?.required) {
                rewards.required.factQuiz = factQuizReward;
                isRequired += 1;
                isScored += Number(factQuizReward.isScored);
            } else {
                rewards.notRequired.factQuiz = factQuizReward;
            }

            if (isScored === isRequired) {
                setIsRequiredCompleted(true);
            }

            rewards.required.regular?.sort((a, b) => {
                return a.isScored === b.isScored ? 0 : a.isScored ? -1 : 1;
            });

            rewards.notRequired.regular?.sort((a, b) => {
                return a.isScored === b.isScored ? 0 : a.isScored ? -1 : 1;
            });

            setRewards(rewards);
        }
    }, [imuActionRewards]);

    const isRequiredRewards = useMemo(() => {
        return (
            Boolean(rewards.required.regular?.length || rewards.required.shared?.length) ||
            Boolean(rewards.required.factQuiz?.totalPoints)
        );
    }, [rewards]);

    const isNotRequiredRewards = useMemo(() => {
        return (
            Boolean(rewards.notRequired.regular?.length || rewards.notRequired.shared?.length) ||
            Boolean(rewards.notRequired.factQuiz?.totalPoints)
        );
    }, [rewards]);

    return {
        rewards,
        isRequiredCompleted: isRequiredCompleted || false,
        isRequiredRewards: isRequiredRewards || false,
        isNotRequiredRewards: isNotRequiredRewards || false,
    };
};
