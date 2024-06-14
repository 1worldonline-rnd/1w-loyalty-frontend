import { adminPanelModel } from '@/entities/admin-panel';
import { collectionModel } from '@/entities/collection';
import { feedModel } from '@/entities/feed';
import { userModel } from '@/entities/user';
import { PayloadForUpdateTopic } from '@/shared/api/collection';
import { TopicFeedRelation } from '@/shared/api/collection/types';
import { useStore } from 'effector-react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

export type Option<L = string, V = string> = {
    label: L;
    value: V;
    feedType: string;
};

export type TopicFormValues = {
    name: string;
    description: string;
    logo: string;
    feedBlocks: Array<{
        id?: string;
        title: string;
        feed: Option | null;
        feedType: string;
        createdBy?: number;
        updatedBy?: number;
    }>;
};

const $feedOptions = feedModel.stores.$mixedFeeds.map((feeds) => {
    return feeds.map(({ name, id, type }) => {
        return {
            label: name,
            value: id,
            feedType: String(type),
        };
    });
});

export const useTopicManage = () => {
    const { mode, entityIdToBeManage, entity } = useStore(adminPanelModel.stores.$adminModal);
    const activeCollection = useStore(collectionModel.stores.$activeCollection);
    const partnerId = useStore(userModel.stores.$partnerId);
    const feedOptions = useStore($feedOptions);
    const topics = useStore(collectionModel.stores.$topics);

    const collectionLocale = activeCollection?.locale || 'en';

    const [areLoadedFeeds, setAreLoadedFeeds] = useState(false);

    const form = useFormik<TopicFormValues>({
        initialValues: {
            name: '',
            description: '',
            logo: '',
            feedBlocks: [
                {
                    feed: null,
                    title: '',
                    feedType: '',
                },
            ],
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required('Required').max(255, 'Max 255 characters'),
            description: Yup.string().required('Required').max(255, 'Max 255 characters'),
            logo: Yup.string().url('Not correct url').required('Required'),
            feedBlocks: Yup.array().of(
                Yup.object().shape({
                    feed: Yup.object().nullable().required('Required'),
                    title: Yup.string(),
                })
            ),
        }),
        onSubmit: async ({ name, logo, description, feedBlocks }) => {
            if (mode === 'create' && activeCollection && partnerId) {
                const { status } = await collectionModel.effects.createTopicInCollectionFx({
                    loyaltyCollectionId: activeCollection.id,
                    partnerId,
                    topic: {
                        description,
                        locale: 'en',
                        logo,
                        name,
                        topicPartnerFeedRelations: feedBlocks.map(({ feed, title, feedType }) => ({
                            name: title,
                            partnerFeed: {
                                id: String(feed?.value),
                                type: feedType,
                            },
                            position: 0,
                        })),
                    },
                });

                if (status === 201) {
                    form.resetForm();
                    adminPanelModel.events.adminModalToggled({
                        isOpen: false,
                    });
                }
            } else if (mode === 'update' && partnerId && entityIdToBeManage && activeCollection) {
                const topic = topics.find((topic) => topic.id === entityIdToBeManage);

                if (!topic) return;

                const { status } = await collectionModel.effects.updateTopicTopicInLoyaltyCollectionFx({
                    partnerId,
                    topic: {
                        id: entityIdToBeManage,
                        description,
                        logo,
                        name,
                        locale: 'en',
                        topicPartnerFeedRelations: feedBlocks.map(
                            ({ id, feed, title, createdBy, updatedBy, feedType }) => {
                                const topicFeedRelation: PayloadForUpdateTopic['topic']['topicPartnerFeedRelations'][number] =
                                    {
                                        name: title,
                                        partnerFeed: {
                                            id: String(feed?.value),
                                            type: feedType,
                                        },
                                        position: 0,
                                    };

                                if (id) topicFeedRelation.id = id;
                                if (createdBy) topicFeedRelation.createdBy = createdBy;
                                if (updatedBy) topicFeedRelation.updatedBy = updatedBy;

                                return topicFeedRelation;
                            }
                        ),
                        createdBy: topic.createdBy,
                        updatedBy: topic.updatedBy,
                        partner: topic.partner,
                    },
                    type: activeCollection.type,
                });

                if (status === 201) {
                    form.resetForm();
                    adminPanelModel.events.adminModalToggled({
                        isOpen: false,
                    });
                }
            }
        },
    });

    const addFeedField = () => {
        form.setFieldValue('feedBlocks', [
            ...form.values.feedBlocks,
            {
                id: null,
                title: '',
                feedType: '',
            },
        ]);
    };

    const deleteFeedField = (index: number) => {
        form.setFieldValue(
            'feedBlocks',
            form.values.feedBlocks.filter((_, i) => i !== index)
        );
    };

    useEffect(() => {
        if (areLoadedFeeds === false && partnerId) {
            feedModel.effects
                .getMixedFeedsFx({
                    partnerId: partnerId,
                    feedSettings: {
                        locales: [collectionLocale],
                        statuses: ['ACTIVE'],
                        types: ['COMMON', 'SEQUENCE'],
                    },
                })
                .then(() => setAreLoadedFeeds(true));
        }
    }, [areLoadedFeeds, collectionLocale]);

    const { setValues } = form;

    useEffect(() => {
        if (mode === 'update' && entity === 'topic-in-collection' && entityIdToBeManage && partnerId) {
            const topic = topics.find((topic) => topic.id === entityIdToBeManage);

            if (topic) {
                setValues({
                    name: topic.name,
                    description: topic.description,
                    logo: topic.logo,
                    feedBlocks: (topic.topicPartnerFeedRelations || []).map(
                        ({ id, partnerFeed, name, createdBy, updatedBy }) => {
                            return {
                                title: name,
                                feed: feedOptions.find(({ value }) => value === partnerFeed.id) || null,
                                id,
                                createdBy,
                                updatedBy,
                                feedType: partnerFeed.type || '',
                            };
                        }
                    ),
                });
            }
        }
    }, [mode, entityIdToBeManage, entity, topics, setValues, feedOptions, partnerId]);

    const deleteFeedFeedRelationFromTopic = (feedRelationId: TopicFeedRelation['id']) => {
        if (partnerId) {
            collectionModel.effects
                .deleteFeedRelationFromTopicFx({
                    feedRelationId,
                    partnerId,
                })
                .then(() => {
                    form.setFieldValue(
                        'feedBlocks',
                        form.values.feedBlocks.filter(({ id }) => id !== feedRelationId)
                    );
                });
        }
    };

    return { form, addFeedField, deleteFeedField, feedOptions, deleteFeedFeedRelationFromTopic };
};
