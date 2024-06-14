import { nanoid } from 'nanoid';
import { FeedContentWithId, FeedList } from '../api/feed/types';

export const expandCommonFeeds = (feed: FeedList) => {
    const unScored: FeedContentWithId[] = [];
    const someDoneList: FeedContentWithId[] = [];
    const doneList: FeedContentWithId[] = [];

    feed.items.forEach((feedItem) => {
        const requiredItems = feedItem.imuActionRewards?.rewards.filter((item) => item.isRequired);

        const expandedItem = {
            ...feedItem,
            generatedId: nanoid(),

            isImuActionsFinished:
                feedItem.imuActionRewards?.rewards.every(({ isScored }) => isScored) || true,

            isRequiredActionsFinished: requiredItems?.every(({ isScored }) => isScored) || false,

            isSomeNotRequiredActionsFinished: requiredItems?.length
                ? false
                : feedItem.imuActionRewards?.rewards.some((reward) => reward.isScored),
        };

        if (expandedItem.isImuActionsFinished) {
            // for all scored rewards
            doneList.push(expandedItem);
        } else if (expandedItem.isRequiredActionsFinished) {
            // for all REQUIRED
            someDoneList.push(expandedItem);
        } else if (!requiredItems?.length && expandedItem.isSomeNotRequiredActionsFinished) {
            // only for some OPTIONAL
            someDoneList.push(expandedItem);
        } else {
            unScored.push(expandedItem);
        }
    });

    return {
        ...feed,
        items: [...unScored, ...someDoneList, ...doneList],
    };
};
