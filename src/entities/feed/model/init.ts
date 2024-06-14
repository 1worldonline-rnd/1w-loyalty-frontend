import { guard, sample } from 'effector';
import { nanoid } from 'nanoid';
import { userModel } from '@/entities/user';
import { widgetConfigModel } from '@/entities/widget-config';
import {
    changeSequenceStatusFx,
    createFeedFx,
    createSequenceFx,
    createSequenceItemFx,
    createWidgetFeedRelationFx,
    deleteFeedFx,
    deleteSequenceFx,
    deleteSequenceItemFx,
    deleteWidgetFeedRelationFx,
    feedContentWatchFx,
    getFeedContentFx,
    getFeedsFx,
    getMixedFeedsFx,
    getRewardedIMUsFx,
    getSequenceItemsFx,
    getSequencesFx,
    getWidgetFeedRelationsFx,
    updateFeedFx,
    updateSequenceFx,
    updateWidgetFeedRelationsFx,
} from './effects';
import {
    $activeSequenceId,
    $feedContentList,
    $feeds,
    $mixedFeeds,
    $rewardedIMUs,
    $sequenceFeedItems,
    $sequenceFeedList,
    $sequences,
    $widgetFeedRelations,
} from './stores';
import { getFeedContent, setActiveSequenceId } from './events';
import { FeedList, SequenceFeed } from '@/shared/api/feed/types';
import { getConvertibleBalanceFx } from '@/entities/user/model/effects';
import { expandCommonFeeds } from '@/shared/lib/expandCommonFeeds';

// prevent multiple requests. wait for finish first request
sample({
    clock: getFeedContent,
    filter: ({ widgetId, isLoadingFeedContent }) => {
        return Boolean(widgetId && isLoadingFeedContent === false);
    },
    fn: ({ widgetId }) => String(widgetId),
    source: {
        widgetId: widgetConfigModel.stores.$globalWidgetConfigId,
        isLoadingFeedContent: getFeedContentFx.pending,
    },
    target: getFeedContentFx,
});

$feedContentList
    .on(getFeedContentFx.doneData, (_, { data }) => {
        const commonFeeds = data.filter((feed) => feed.partnerFeed.type === 'COMMON') as FeedList[];

        return commonFeeds.map(expandCommonFeeds);
    })
    .on(feedContentWatchFx.done, (feedContentList, { params: { id }, result }) => {
        if (result.status >= 200 && result.status < 300) {
            return feedContentList.map((feedContent) => {
                return {
                    ...feedContent,
                    items: feedContent.items.map((item) => {
                        if (item.generatedId === id) {
                            return {
                                ...item,
                                userPreviousActions: {
                                    GENERAL_CLICK: {
                                        pointType: 32,
                                    },
                                },
                            };
                        }
                        return item;
                    }),
                };
            });
        }
        return feedContentList;
    });

$sequenceFeedList.on(getFeedContentFx.doneData, (_, { data }) => {
    return data.filter((feed) => feed.partnerFeed.type === 'SEQUENCE') as SequenceFeed[];
});

$feeds
    .on(getFeedsFx.doneData, (_, { data }) => data)
    .on(deleteFeedFx.done, (feedList, { params }) => {
        return feedList.filter((feed) => feed.id !== params);
    })
    .on(updateFeedFx.doneData, (feedList, { data: updatedFeed }) => {
        return feedList.map((feed) => {
            return feed.id === updatedFeed.id ? updatedFeed : feed;
        });
    })
    .on(createFeedFx.doneData, (feedList, { data: newFeed }) => {
        return [newFeed, ...feedList];
    });

$mixedFeeds.on(getMixedFeedsFx.doneData, (_, { data }) => {
    return data.sort((a: { type: string }, b: { type: string }) => {
        if (a.type === 'COMMON') return -1;
        if (b.type === 'SEQUENCE') return 1;

        return 0;
    });
});

sample({
    clock: createFeedFx.doneData,
    source: {
        partnerId: userModel.stores.$partnerId,
        widget: widgetConfigModel.stores.$activeWidgetConfig,
    },
    filter: ({ partnerId, widget }) => Boolean(partnerId && widget),
    fn: ({ partnerId, widget }) => {
        return {
            partnerId: String(partnerId),

            feedSettings: {
                locales: [widget!.locale],
                statuses: ['ACTIVE'],
                types: ['COMMON', 'SEQUENCE'],
            },
        };
    },
    target: getMixedFeedsFx,
});

/*
1. when store $isAdminPanelAvailable was changing
2. check $isAdminPanelAvailable on true
3. take the value of userModel.stores.$partnerId
4. call request to get feeds
*/
guard({
    /* 1 */ clock: [userModel.stores.$isAdminPanelAvailable],
    /* 2 */ filter: userModel.stores.$isAdminPanelAvailable.map(Boolean),
    /* 3 */ source: userModel.stores.$partnerId.map(String),
    /* 4 */ target: getFeedsFx,
});

// guard({
//     clock: [userModel.stores.$isAuthorized, widgetConfigModel.stores.$globalWidgetConfig],
//     source: widgetConfigModel.stores.$globalWidgetConfig.map((globalWidgetConfig) => {
//         return String(globalWidgetConfig?.guid);
//     }),
//     filter: combine(
//         userModel.stores.$isAuthorized,
//         widgetConfigModel.stores.$globalWidgetConfig.map((w) => Boolean(w?.guid)),
//         (...flags) => flags.every(Boolean)
//     ),
//     target: getConvertibleBalanceFx,
// });

$widgetFeedRelations
    .on(getWidgetFeedRelationsFx.doneData, (_, { data }) => data)
    .on(updateWidgetFeedRelationsFx.doneData, (_, { data }) => data);

sample({
    clock: [createWidgetFeedRelationFx.done, deleteWidgetFeedRelationFx.done],
    source: {
        widget: widgetConfigModel.stores.$activeWidgetConfig,
    },
    fn: ({ widget }) => {
        return String(widget?.guid);
    },
    target: getWidgetFeedRelationsFx,
});

sample({
    clock: [getConvertibleBalanceFx.doneData],
    source: widgetConfigModel.stores.$globalWidgetConfig.map((globalWidgetConfig) => {
        return String(globalWidgetConfig?.guid);
    }),
    target: getFeedContent,
});

$sequences
    .on(getSequencesFx.doneData, (_, { data }) => data)
    .on(deleteSequenceFx.done, (feedList, { params }) => {
        return feedList.filter((feed) => feed.id !== params);
    })
    .on(updateSequenceFx.doneData, (feedList, { data: updatedFeed }) => {
        return feedList.map((feed) => {
            return feed.id === updatedFeed.id ? updatedFeed : feed;
        });
    })
    .on(createSequenceFx.doneData, (feedList, { data: newFeed }) => {
        return [newFeed, ...feedList];
    })
    .on(changeSequenceStatusFx.done, (feedList, { params: { feedId, status } }) => {
        return feedList.map((feed) => {
            return feed.id === feedId ? { ...feed, status } : feed;
        });
    });

$sequenceFeedItems
    .on(getSequenceItemsFx.doneData, (_, { data }) => data)
    .on(deleteSequenceItemFx.done, (feedList, { params }) => {
        return feedList.filter((feed) => feed.id !== params.sequenceItemId);
    })
    .on(createSequenceItemFx.doneData, (feedList, { data }) => {
        return [...feedList, data];
    });
// .on(updateSequenceItemFx.doneData, (feedList, { data }) => {
//     return feedList.map((feed) => {
//         return feed.id === data.id ? data : feed;
//     });
// });

$activeSequenceId.on(setActiveSequenceId, (_, id) => id);

$rewardedIMUs.on(getRewardedIMUsFx.doneData, (_, { data }) => {
    return data
        .sort(
            (
                a: { imuId: string; imuName: string; isUsed: boolean },
                b: { imuId: string; imuName: string; isUsed: boolean }
            ) => {
                if (a.isUsed === false) return -1;
                if (b.isUsed === false) return 1;

                return 0;
            }
        )
        .map((item: { imuId: string; imuName: string; isUsed: boolean }) => {
            return {
                label: item.imuName,
                value: item.imuId,
                isDisabled: item.isUsed,
            };
        });
});
