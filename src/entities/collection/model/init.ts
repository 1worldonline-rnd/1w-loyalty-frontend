import * as stores from './stores';
import * as effects from './effects';
import * as events from './events';
import { sample } from 'effector';
import { widgetConfigModel } from '@/entities/widget-config';
import { userModel } from '@/entities/user';
import { collectionModel } from '..';

stores.$collections
    .on(effects.getCollectionsFx.doneData, (_, { data }) => data)
    .on(effects.deleteCollectionFx.done, (collections, { params: { collectionId } }) => {
        return collections.filter(({ id }) => id !== collectionId);
    });

stores.$activeCollectionId.on(events.setActiveCollectionId, (_, collectionId) => collectionId);

sample({
    clock: [stores.$activeCollectionId, userModel.stores.$partnerId],
    source: {
        activeCollectionId: stores.$activeCollectionId,
        partnerId: userModel.stores.$partnerId,
    },
    filter: ({ activeCollectionId, partnerId }) => {
        return Boolean(activeCollectionId && partnerId);
    },
    fn: ({ activeCollectionId, partnerId }) => {
        return {
            partnerId: String(partnerId),
            loyaltyCollectionIds: [String(activeCollectionId)],
        };
    },
    target: effects.getCollectionsTopicRelationsByCollectionIdFx,
});

stores.$collectionTopicRelations.on(
    effects.getCollectionsTopicRelationsByCollectionIdFx.doneData,
    (_, { data }) => {
        return data.sort((a, b) => a.position - b.position);
    }
);

sample({
    clock: effects.deleteTopicFromCollectionFx.doneData,
    source: {
        partnerId: userModel.stores.$partnerId,
        activeCollection: collectionModel.stores.$activeCollection,
    },
    filter: ({ partnerId, activeCollection }) => Boolean(partnerId) && Boolean(activeCollection?.id),
    fn: ({ partnerId, activeCollection }) => {
        return {
            partnerId: String(partnerId),
            loyaltyCollectionIds: [String(activeCollection?.id)],
        };
    },
    target: effects.getCollectionsTopicRelationsByCollectionIdFx,
});

sample({
    clock: effects.getCollectionsTopicRelationsByCollectionIdFx.doneData,
    source: {
        partnerId: userModel.stores.$partnerId,
    },
    filter: ({ partnerId }) => Boolean(partnerId),
    fn: ({ partnerId }, { data }) => {
        return {
            partnerId: String(partnerId),
            topicIds: data.map(({ topicId }) => topicId),
        };
    },
    target: effects.getTopicsWithPartnerFeedRelationsByIdsFx,
});

stores.$topics.on(effects.getTopicsWithPartnerFeedRelationsByIdsFx.doneData, (_, { data }) => {
    return data;
});

sample({
    clock: effects.createTopicInCollectionFx.done,
    fn: ({ params }) => {
        return {
            partnerId: String(params.partnerId),
            loyaltyCollectionIds: [params.loyaltyCollectionId],
        };
    },
    target: effects.getCollectionsTopicRelationsByCollectionIdFx,
});

sample({
    clock: [effects.updateTopicTopicInLoyaltyCollectionFx.done, effects.deleteFeedRelationFromTopicFx.done],
    source: {
        partnerId: userModel.stores.$partnerId,
        collectionId: stores.$activeCollectionId,
    },
    filter: ({ partnerId, collectionId }) => Boolean(partnerId && collectionId),
    fn: ({ collectionId, partnerId }) => {
        return {
            partnerId: String(partnerId),
            loyaltyCollectionIds: [String(collectionId)],
        };
    },
    target: effects.getCollectionsTopicRelationsByCollectionIdFx,
});

stores.$collectionRelations
    .on(effects.getCollectionRelationsFx.doneData, (_, { data }) => data)
    .on(effects.createOrUpdateCollectionRelationsFx.doneData, (_, { data }) => data);

sample({
    clock: [effects.createOrUpdateCollectionRelationsFx.done, effects.deleteCollectionRelationFx.done],
    source: {
        widgetId: widgetConfigModel.stores.$activeWidgetConfigId,
        partnerId: userModel.stores.$partnerId,
    },
    filter: ({ widgetId, partnerId }) => Boolean(widgetId && partnerId),
    fn: ({ widgetId, partnerId }) => {
        return { widgetId: String(widgetId), partnerId: String(partnerId) };
    },
    target: effects.getCollectionRelationsFx,
});

stores.$globalWidgetCollectionsAndTopics.on(
    effects.getCollectionsAndTopicsByLoyaltyWidgetIdFx.doneData,
    (_, { data }) => data
);

sample({
    clock: [widgetConfigModel.stores.$globalWidgetConfig, userModel.stores.$isAuthorized],
    source: {
        globalWidgetConfig: widgetConfigModel.stores.$globalWidgetConfig,
        isAuthorized: userModel.stores.$isAuthorized,
    },
    filter: ({ globalWidgetConfig, isAuthorized }) => Boolean(globalWidgetConfig && isAuthorized),
    fn: ({ globalWidgetConfig }) => ({
        partnerId: globalWidgetConfig!.partner.guid,
        widgetId: globalWidgetConfig!.guid,
    }),
    target: effects.getCollectionsAndTopicsByLoyaltyWidgetIdFx,
});
