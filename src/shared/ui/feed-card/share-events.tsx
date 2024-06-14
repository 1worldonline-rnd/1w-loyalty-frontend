import { FeedReward } from '@/shared/api/feed/types';
import { ChevronRightIcon, FacebookIcon2, GullIcon, LinkedInIcon2, TwitterIcon2 } from '@/shared/ui/icons';
import { PropsWithClassName } from '@/shared/utility-types';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

const SocialIcons = {
    SHARE_FACEBOOK: FacebookIcon2,
    SHARE_TWITTER: TwitterIcon2,
    SHARE_LINKEDIN: LinkedInIcon2,
};

type ShareEventsProps = PropsWithClassName & {
    rewards: FeedReward[];
    accentColor: string;
    coinIcon: JSX.Element;
} & React.HTMLAttributes<HTMLDivElement>;

export const ShareEvents = ({ className, rewards, accentColor, coinIcon, ...props }: ShareEventsProps) => {
    const { t } = useTranslation('common', { keyPrefix: 'earn-page.feed-content-list' });

    const isSomeRewardScored = rewards.some((reward) => reward.isScored);
    const pointsTotal = rewards.reduce((acc, reward) => acc + reward.points, 0);
    const pointsEarned = rewards.reduce((acc, reward) => {
        if (reward.isScored) {
            return acc + reward.points;
        }
        return acc;
    }, 0);
    const isAllRewardsScored = pointsEarned === pointsTotal;

    if (rewards.length === 0) {
        return null;
    }

    return (
        <>
            <div className={classNames(className, {
                watched: isAllRewardsScored,
            })} {...props}>
                <span className="reward share">
                    {t('share')}
                    <div className="reward-icons">
                        {rewards.map((reward, index) => {
                            return (
                                <span
                                    className={classNames(`share-icon ${reward.scoringPointType}`, {
                                        'share-icon-shared': reward.isScored,
                                    })}
                                    key={index}
                                >
                                    {SocialIcons[reward.scoringPointType as keyof typeof SocialIcons]({
                                        isDisable: !reward.isScored,
                                    })}
                                </span>
                            );
                        })}
                    </div>
                </span>
                <div
                    className={classNames('event-counter', {
                        watched: isAllRewardsScored,
                        started: isSomeRewardScored,
                    })}
                >
                    {isSomeRewardScored && <GullIcon />}
                    <span className="points">
                        <span className="points-earned">{isSomeRewardScored ? pointsEarned : '0'}</span>/
                        {pointsTotal}
                    </span>
                    <span className="icon">{coinIcon}</span>
                    <span className={classNames("arrow", { "arrow-disabled": isAllRewardsScored })}><ChevronRightIcon mainColor={accentColor} /></span>
                </div>
            </div>
        </>
    );
};
