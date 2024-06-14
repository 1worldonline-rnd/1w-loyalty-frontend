import styled from 'styled-components';
import { FlexboxGrid } from 'rsuite';
import { styles } from './styles';
import { PropsWithClassName, Nullable } from '@/shared/utility-types';
import { DeleteIcon, AddIcon } from '@/shared/ui/icons';
import { Select, Toggle, Button, Input } from '@/shared/rsuite/admin-panel';
import type { BaseOption } from '@/shared/rsuite/admin-panel/select';
import { adminPanelModel } from '@/entities/admin-panel';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { feedModel } from '@/entities/feed';
import { deleteWidgetFeedRelationFx, updateWidgetFeedRelationsFx } from '@/entities/feed/model/effects';
import { Modal } from '@/shared/rsuite/admin-panel';
import { ModalProps } from 'rsuite';
import { $isFormSubmitted } from '@/entities/feed/model/stores';
import { WidgetCollectionRelation, WidgetFeedRelation } from '@/shared/api/widget-config/types';
import { widgetConfigModel } from '@/entities/widget-config';
import classNames from 'classnames';
import { userModel } from '@/entities/user';
import {
    createOrUpdateCollectionRelationsFx,
    deleteCollectionRelationFx,
} from '@/entities/collection/model/effects';
import { useTranslation } from 'next-i18next';
import { SingleValue } from 'react-select';

const DragAndDropIcon = () => (
    <svg width="16" height="16" fill="none">
        <g clipPath="url(#a)">
            <path
                fill="#B7B9BF"
                fillRule="evenodd"
                d="M10.667 1.334a1.333 1.333 0 1 1 0 2.667 1.333 1.333 0 0 1 0-2.667Zm0 5.333a1.333 1.333 0 1 1 0 2.667 1.333 1.333 0 0 1 0-2.667Zm-5.334 5.334a1.333 1.333 0 1 1 0 2.666 1.333 1.333 0 0 1 0-2.666Zm5.334 0a1.333 1.333 0 1 1 0 2.666 1.333 1.333 0 0 1 0-2.666ZM5.333 1.334a1.333 1.333 0 1 1 0 2.667 1.333 1.333 0 0 1 0-2.667Zm0 5.333a1.333 1.333 0 1 1 0 2.667 1.333 1.333 0 0 1 0-2.667Z"
                clipRule="evenodd"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h16v16H0z" />
            </clipPath>
        </defs>
    </svg>
);

export type FeedListProps = PropsWithClassName & {
    onChanged: (value: boolean) => void;
};

export const FeedListCreation = styled((props: FeedListProps) => {
    const { className, onChanged } = props;
    const { t } = useTranslation('common', { keyPrefix: 'loyalty-widgets.editing' });
    const newContentPrefix = 'newContent-';

    const createNewFeed = t('create-new-feed');
    const createNewCollection = t('create-new-collection');

    const content = useStore(widgetConfigModel.stores.$content);

    const [contentOptions, setContentOptions] = useState<
        {
            label: JSX.Element;
            value: string;
        }[]
    >([]);
    const activeWidgetConfig = useStore(widgetConfigModel.stores.$activeWidgetConfig);

    const contentRelations = useStore(widgetConfigModel.stores.$contentRelations);

    const isEarnFormSubmitted = useStore($isFormSubmitted);
    const partnerId = useStore(userModel.stores.$partnerId);

    // Already used content
    const [draggableContent, setDraggableContent] = useState<
        (WidgetFeedRelation | WidgetCollectionRelation)[]
    >([]);
    const [contentItemToDelete, setContentItemToDelete] =
        useState<Nullable<WidgetFeedRelation | WidgetCollectionRelation>>(null);
    const [isShowFeedList, setIsShowFeedList] = useState(true);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

    const [filteredFeedOptions, setFilteredContentOptions] = useState<
        {
            label: JSX.Element;
            value: string;
        }[]
    >([]);

    const afterContentDelete = (contentId: string) => {
        const updatedContentList = draggableContent.filter((item) => item.id !== contentId);
        setDraggableContent(updatedContentList);
    };

    const deleteContent = async (contentId: string, isCollection: boolean) => {
        if (contentId.includes(newContentPrefix)) {
            setIsConfirmDeleteModalOpen(false);
            setContentItemToDelete(null);
            const updatedContentList = draggableContent.filter((item) => item.id !== contentId);
            setDraggableContent(updatedContentList);
        } else {
            setIsConfirmDeleteModalOpen(false);
            setContentItemToDelete(null);
            onChanged(false);

            if (isCollection && partnerId) {
                const { status } = await deleteCollectionRelationFx({ partnerId, collectionId: contentId });
                if (status === 204) {
                    afterContentDelete(contentId);
                }
            } else {
                const { status } = await deleteWidgetFeedRelationFx(contentId);
                if (status === 200) {
                    afterContentDelete(contentId);
                }
            }
        }
    };

    const contentToDelete = (content: WidgetFeedRelation | WidgetCollectionRelation) => {
        setContentItemToDelete(content);
    };

    const isCollectionRelation = (
        relation: WidgetFeedRelation | WidgetCollectionRelation
    ): relation is WidgetCollectionRelation => {
        return typeof relation === 'object' && 'loyaltyCollectionId' in relation;
    };

    const getCollectionRelations = (relations: (WidgetFeedRelation | WidgetCollectionRelation)[]) => {
        return relations.filter(isCollectionRelation);
    };

    const isFeedRelation = (
        relation: WidgetFeedRelation | WidgetCollectionRelation
    ): relation is WidgetFeedRelation => {
        return typeof relation === 'object' && !('loyaltyCollectionId' in relation);
    };

    const getFeedRelations = (relations: (WidgetFeedRelation | WidgetCollectionRelation)[]) => {
        return relations.filter(isFeedRelation);
    };

    const controlFeedList = (newValue: boolean) => {
        if (newValue === false && draggableContent.length) {
            const updatedDraggableContent = draggableContent
                .filter((item) => item.name !== '')
                .map((item) => {
                    return { ...item, isActive: newValue };
                });

            if (updatedDraggableContent.length && partnerId) {
                createOrUpdateCollectionRelationsFx({
                    partnerId,
                    collectionRelations: getCollectionRelations(updatedDraggableContent),
                });
                updateWidgetFeedRelationsFx(getFeedRelations(updatedDraggableContent));
            }
        }
        setIsShowFeedList(newValue);
    };

    const handleDrop = (droppedItem: DropResult) => {
        if (!droppedItem.destination) return;
        const updatedList = [...draggableContent];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

        const newUpdatedList = updatedList.map((feed, index) => {
            return { ...feed, position: index };
        });

        setDraggableContent(newUpdatedList);
    };

    const addCleanContent = () => {
        if (activeWidgetConfig) {
            let newContent = [
                ...draggableContent,
                {
                    id: `${newContentPrefix}${draggableContent.length}`,
                    partnerFeed: {
                        id: '',
                    },
                    loyaltyCollectionId: '',
                    widgetId: activeWidgetConfig.guid,
                    name: '',
                    position: draggableContent.length,
                    isActive: true,
                },
            ];
            setDraggableContent(newContent);
        }
    };

    const handleCollectionRelationUpdate = (
        item: WidgetFeedRelation | WidgetCollectionRelation,
        option?: any
    ) => {
        if ('partnerFeed' in item) {
            const { partnerFeed, ...relation } = {
                ...item,
                loyaltyCollectionId: option,
            };

            if (partnerFeed && partnerFeed.id) {
                const { id, ...newRelation } = relation;

                return newRelation;
            } else {
                return relation;
            }
        } else {
            return {
                ...item,
                loyaltyCollectionId: option,
            };
        }
    };

    const handleFeedRelationUpdate = (item: WidgetFeedRelation | WidgetCollectionRelation, option?: any) => {
        if ('loyaltyCollectionId' in item) {
            const { loyaltyCollectionId, ...relation } = {
                ...item,
                partnerFeed: { id: option },
            };

            if (loyaltyCollectionId) {
                const { id, ...newRelation } = relation;

                return newRelation;
            } else {
                return relation;
            }
        } else {
            return {
                ...item,
                partnerFeed: { id: option },
            };
        }
    };

    const changeContent = (
        option: SingleValue<BaseOption>,
        index: number,
        content: WidgetFeedRelation | WidgetCollectionRelation
    ) => {
        if (option) {
            if (option.value === 'create-new-feed') {
                adminPanelModel.events.adminModalToggled({
                    entity: 'feed',
                    mode: 'create',
                    isOpen: true,
                    onFeedSuccess: (createdFeed) => {
                        feedSettingsChange({
                            index,
                            content,
                            name: 'contentId',
                            option: createdFeed.id,
                            optionType: 'feed',
                        });
                        adminPanelModel.events.adminModalToggled({
                            isOpen: false,
                            onFeedSuccess: undefined,
                        });
                    },
                });
            } else if (option.value === 'create-new-collection') {
                adminPanelModel.events.adminModalToggled({
                    entity: 'collection',
                    mode: 'create',
                    isOpen: true,
                    onCollectionSuccess: (createdCollection) => {
                        feedSettingsChange({
                            index,
                            content,
                            name: 'contentId',
                            option: createdCollection.id,
                            optionType: 'collection',
                        });
                        adminPanelModel.events.adminModalToggled({
                            isOpen: false,
                            onCollectionSuccess: undefined,
                        });
                    },
                });
            } else {
                feedSettingsChange({
                    index,
                    content,
                    name: 'contentId',
                    option: option.value,
                    optionType: typeof option.label === 'string' ? '' : option.label.key?.toString(),
                });
            }
        }
    };

    const getCurrentOptionValue = (content: WidgetCollectionRelation | WidgetFeedRelation) => {
        return (
            contentOptions.find(({ value }) => {
                if (isCollectionRelation(content)) {
                    return value === content?.loyaltyCollectionId;
                } else {
                    return value === content.partnerFeed?.id;
                }
            }) || null
        );
    };

    const feedSettingsChange = (updatedContent: {
        index: number;
        content?: WidgetFeedRelation | WidgetCollectionRelation;
        name: string;
        newValue?: any;
        option?: any;
        optionType?: string;
    }) => {
        if (updatedContent.name === 'name') {
            const newDraggableContent = draggableContent.map((item) => {
                if (updatedContent.content && item.id === updatedContent.content.id) {
                    return {
                        ...item,
                        name: updatedContent.newValue,
                    };
                }
                return item;
            });
            setDraggableContent(newDraggableContent);
        }

        if (updatedContent.name === 'toggle') {
            const newDraggableContent = draggableContent.map((item) => {
                if (updatedContent.content && item.id === updatedContent.content.id) {
                    return {
                        ...item,
                        isActive: updatedContent.newValue,
                    };
                }
                return item;
            });
            setDraggableContent(newDraggableContent);
        }

        if (
            updatedContent.name === 'contentId' &&
            updatedContent.content &&
            updatedContent.optionType === 'collection'
        ) {
            const newDraggableContent = draggableContent.map((item) => {
                if (updatedContent.content && item.id === updatedContent.content.id) {
                    return handleCollectionRelationUpdate(item, updatedContent.option);
                }
                return item;
            });
            // @ts-ignore
            setDraggableContent(newDraggableContent);
        } else if (
            updatedContent.name === 'contentId' &&
            updatedContent.content &&
            updatedContent.optionType === 'feed'
        ) {
            const newDraggableContent = draggableContent.map((item) => {
                if (updatedContent.content && item.id === updatedContent.content.id) {
                    return handleFeedRelationUpdate(item, updatedContent.option);
                }
                return item;
            });
            // @ts-ignore
            setDraggableContent(newDraggableContent);
        }
    };

    // detection can click on save button
    // if any feed changed
    // if clean feed added and filled
    useEffect(() => {
        if (JSON.stringify(contentRelations) === JSON.stringify(draggableContent)) {
            onChanged(false);
        } else {
            if (contentRelations.length === draggableContent.length) {
                onChanged(true);
            } else {
                const hasError = draggableContent.filter((item) => {
                    if (isCollectionRelation(item)) {
                        const itemAsCollection = item as WidgetCollectionRelation;
                        if (!itemAsCollection.name || !itemAsCollection.loyaltyCollectionId) {
                            return item;
                        }
                    } else {
                        const itemAsFeed = item as WidgetFeedRelation;
                        if (!itemAsFeed.name || !itemAsFeed.partnerFeed.id) {
                            return item;
                        }
                    }
                });

                if (hasError.length) {
                    onChanged(false);
                } else {
                    onChanged(true);
                }
            }
        }
    }, [contentRelations, draggableContent]);

    useEffect(() => {
        const isListOpen = contentRelations.find((item) => {
            return item.isActive === true;
        });
        setIsShowFeedList(Boolean(isListOpen));
        setDraggableContent([...contentRelations]);
    }, [contentRelations]);

    useEffect(() => {
        if (isEarnFormSubmitted && partnerId) {
            const newDraggableContent = draggableContent.map((item) => {
                if (item.id && item.id.includes('newContent')) {
                    //@ts-ignore
                    delete item.id;
                    return item;
                }
                return item;
            });
            createOrUpdateCollectionRelationsFx({
                partnerId,
                collectionRelations: getCollectionRelations(newDraggableContent),
            });
            updateWidgetFeedRelationsFx(getFeedRelations(newDraggableContent));
        }
    }, [isEarnFormSubmitted]);

    useEffect(() => {
        if (partnerId && activeWidgetConfig) {
            feedModel.effects.getMixedFeedsFx({
                partnerId: partnerId,
                feedSettings: {
                    locales: [activeWidgetConfig.locale],
                    statuses: ['ACTIVE'],
                    types: ['COMMON', 'SEQUENCE'],
                },
            });
        }
    }, [partnerId, activeWidgetConfig]);

    const getFilteredOptions = (
        contentOptions: {
            label: JSX.Element;
            value: string;
        }[]
    ) => {
        return contentOptions.filter((option) => {
            const content = draggableContent.find((item) => {
                if (isCollectionRelation(item)) {
                    return item.loyaltyCollectionId === option.value;
                }

                return item.partnerFeed.id === option.value;
            });

            if (!content) return true;

            if (isCollectionRelation(content) && content.loyaltyCollectionId !== option.value) {
                return true;
            } else if (isFeedRelation(content) && content.partnerFeed.id !== option.value) {
                return true;
            }

            return false;
        });
    };

    useEffect(() => {
        if (content) {
            const optionsFromContent = content.map((content) => {
                if ('isCollection' in content) {
                    return {
                        label: (
                            <span style={{ display: 'flex' }} key="collection">
                                <p>{t('collection')}: </p>&nbsp;{content.name}
                            </span>
                        ),
                        value: content.id,
                    };
                } else {
                    return {
                        label: (
                            <span style={{ display: 'flex' }} key="feed">
                                <p>{content.type === 'SEQUENCE' ? `${t('sequence')}: ` : `${t('feed')}: `}</p>
                                &nbsp;
                                {content.name}
                            </span>
                        ),
                        value: content.id,
                    };
                }
            });
            setContentOptions(optionsFromContent);
        }
    }, [content]);

    useEffect(() => {
        if (contentOptions) {
            const filteredOptions = getFilteredOptions(contentOptions);
            setFilteredContentOptions(filteredOptions);
        }
    }, [contentOptions, draggableContent, content]);

    useEffect(() => {
        // Set clean feed if list empty
        if (!draggableContent.length) {
            addCleanContent();
        }
    }, [draggableContent]);

    return (
        <div className={className}>
            <section>
                <header>
                    <label className="field">
                        <FlexboxGrid justify="space-between">
                            <div className="description">
                                <p className="setting-label">{t('feed-checkbox-label')}</p>
                                <h3 className="field__label field__label--xl">{t('news-content')}</h3>
                            </div>
                            <Toggle
                                className="toggle__main"
                                checked={isShowFeedList}
                                onChange={(newValue) => {
                                    controlFeedList(newValue);
                                }}
                            />
                        </FlexboxGrid>
                    </label>
                </header>

                <ConfirmDeleteContentFromListModal
                    open={isConfirmDeleteModalOpen}
                    onClose={() => setIsConfirmDeleteModalOpen(false)}
                    onConfirm={() =>
                        deleteContent(
                            String(contentItemToDelete?.id),
                            contentItemToDelete ? isCollectionRelation(contentItemToDelete) : false
                        )
                    }
                    contentName={String(contentItemToDelete?.name)}
                />

                {isShowFeedList ? (
                    <div>
                        <DragDropContext onDragEnd={handleDrop}>
                            <Droppable droppableId="feed-container">
                                {(provided) => (
                                    <div
                                        className="feed-container"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {draggableContent.map((content, index) => {
                                            return (
                                                <Draggable
                                                    key={content.id}
                                                    draggableId={content.id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className="feed"
                                                        >
                                                            <FlexboxGrid
                                                                className="drag-icon"
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <DragAndDropIcon />
                                                            </FlexboxGrid>
                                                            <div className="subfields">
                                                                <div>
                                                                    <fieldset>
                                                                        <div>
                                                                            <label className="field__label">
                                                                                {t('select-content')}
                                                                            </label>

                                                                            <Select<BaseOption>
                                                                                placeholder={t('select')}
                                                                                size="md"
                                                                                className={classNames({
                                                                                    'not-applied':
                                                                                        isCollectionRelation(
                                                                                            content
                                                                                        )
                                                                                            ? !content?.loyaltyCollectionId
                                                                                            : !content
                                                                                                  .partnerFeed
                                                                                                  ?.id,
                                                                                })}
                                                                                options={[
                                                                                    {
                                                                                        label: createNewFeed,
                                                                                        value: 'create-new-feed',
                                                                                        color: 'var(--main-color)',
                                                                                        icon: (
                                                                                            <svg
                                                                                                width="10"
                                                                                                height="10"
                                                                                                viewBox="0 0 10 10"
                                                                                                fill="none"
                                                                                            >
                                                                                                <path
                                                                                                    d="M5 0.916992V9.08366"
                                                                                                    stroke="currentColor"
                                                                                                    strokeWidth="1.8"
                                                                                                    strokeLinecap="round"
                                                                                                />
                                                                                                <path
                                                                                                    d="M0.916016 5H9.08268"
                                                                                                    stroke="currentColor"
                                                                                                    strokeWidth="1.8"
                                                                                                    strokeLinecap="round"
                                                                                                />
                                                                                            </svg>
                                                                                        ),
                                                                                    },
                                                                                    {
                                                                                        label: createNewCollection,
                                                                                        value: 'create-new-collection',
                                                                                        color: 'var(--main-color)',
                                                                                        icon: (
                                                                                            <svg
                                                                                                width="10"
                                                                                                height="10"
                                                                                                viewBox="0 0 10 10"
                                                                                                fill="none"
                                                                                            >
                                                                                                <path
                                                                                                    d="M5 0.916992V9.08366"
                                                                                                    stroke="currentColor"
                                                                                                    strokeWidth="1.8"
                                                                                                    strokeLinecap="round"
                                                                                                />
                                                                                                <path
                                                                                                    d="M0.916016 5H9.08268"
                                                                                                    stroke="currentColor"
                                                                                                    strokeWidth="1.8"
                                                                                                    strokeLinecap="round"
                                                                                                />
                                                                                            </svg>
                                                                                        ),
                                                                                    },
                                                                                    ...filteredFeedOptions,
                                                                                ]}
                                                                                isDropdownIndependent={true}
                                                                                value={getCurrentOptionValue(
                                                                                    content
                                                                                )}
                                                                                onChange={(option) =>
                                                                                    changeContent(
                                                                                        option,
                                                                                        index,
                                                                                        content
                                                                                    )
                                                                                }
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <label className="field__label">
                                                                                {t('content-block-name')}
                                                                            </label>

                                                                            <Input
                                                                                size="lg"
                                                                                value={content.name}
                                                                                className={classNames({
                                                                                    'not-applied':
                                                                                        !content.name,
                                                                                })}
                                                                                onChange={(newValue) => {
                                                                                    feedSettingsChange({
                                                                                        index,
                                                                                        content,
                                                                                        name: 'name',
                                                                                        newValue,
                                                                                    });
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </fieldset>
                                                                    <div className="feed-controls">
                                                                        <div className="toggle">
                                                                            <Toggle
                                                                                className="toggle__main"
                                                                                size="sm"
                                                                                checked={content.isActive}
                                                                                onChange={(newValue) => {
                                                                                    feedSettingsChange({
                                                                                        index,
                                                                                        content,
                                                                                        name: 'toggle',
                                                                                        newValue,
                                                                                    });
                                                                                }}
                                                                            />
                                                                            <span className="setting-label">
                                                                                {t('content-visibility')}
                                                                            </span>
                                                                        </div>

                                                                        <div
                                                                            className="delete"
                                                                            onClick={() => {
                                                                                contentToDelete(content);
                                                                                setIsConfirmDeleteModalOpen(
                                                                                    true
                                                                                );
                                                                            }}
                                                                        >
                                                                            <span className="setting-label">
                                                                                {t('delete-content')}
                                                                            </span>
                                                                            <DeleteIcon />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <div
                            className="add-feed-container"
                            onClick={() => {
                                addCleanContent();
                            }}
                        >
                            <span className="icon-container">
                                <AddIcon />
                            </span>
                            <span className="setting-label">{t('add-content')}</span>
                        </div>
                    </div>
                ) : null}
            </section>
        </div>
    );
})`
    ${styles}
`;

type ConfirmDeleteCatalogModalProps = ModalProps & {
    onConfirm: () => void;
    contentName: string;
};

export const ConfirmDeleteContentFromListModal = styled(
    ({ onConfirm, contentName, ...props }: ConfirmDeleteCatalogModalProps) => {
        const { t } = useTranslation('common', { keyPrefix: 'loyalty-widgets.editing' });

        return (
            <Modal backdrop={true} size="xs" {...props}>
                <Modal.Header>
                    <h3>{t('delete-content-question')}</h3>
                </Modal.Header>
                <Modal.Body>
                    <p className="description">{contentName}</p>

                    <FlexboxGrid className="buttons" align="middle" justify="end">
                        <Button
                            size="sm"
                            appearance="subtle"
                            onClick={(event) => {
                                if (props.onClose) {
                                    props.onClose(event);
                                }
                            }}
                        >
                            {t('cancel')}
                        </Button>

                        <Button size="sm" color="red" onClick={onConfirm}>
                            {t('delete')}
                        </Button>
                    </FlexboxGrid>
                </Modal.Body>
            </Modal>
        );
    }
)`
    .rs-modal-dialog {
        width: 350px;
    }

    h3 {
        font-size: 18px;
        color: var(--text-dark-color);
    }

    .description {
        font-size: 16px;
        line-height: 19px;
        color: var(--text-default-color);
    }

    .buttons {
        margin-block-start: 18px;
        gap: 8px;
    }
`;
