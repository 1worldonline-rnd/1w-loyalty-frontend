import { adminPanelModel } from '@/entities/admin-panel';
import { Button, Modal } from '@/shared/rsuite/admin-panel';
import { Nullable, PropsWithClassName } from '@/shared/utility-types';
import styled from 'styled-components';
import { icons } from '@/widgets/admin-panel';
import { useStore } from 'effector-react';
import { collectionModel } from '@/entities/collection';
import { CollectionTopicRelation, Topic } from '@/shared/api/collection/types';
import { ButtonWithContextMenu, Table, TextWithEllipsis } from '@/shared/ui';
import { FlexboxGrid, Loader } from 'rsuite';
import { useEffect, useRef, useState } from 'react';
import { WhisperInstance } from 'rsuite/esm/Whisper';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { DragAndDropIcon } from '@/shared/ui/icons';
import { $partnerId } from '@/entities/user/model/stores';
import { showMessage } from '@/shared/lib/messages';
import { combine } from 'effector';

const { Td, Th, Tr } = Table;

const $topicsByIds = collectionModel.stores.$topics.map((topics) => {
    return topics.reduce<Record<Topic['id'], Topic>>((acc, topic) => {
        acc[topic.id] = topic;

        return acc;
    }, {});
});

type ContextMenuProps = PropsWithClassName<{
    onClose: () => void;
    onEdit: () => void;
    setIsOpenDeleteModal: (value: boolean) => void;
    setDeletingTopicId: () => void;
}>;

const Options = styled((props: ContextMenuProps) => {
    const { className, onClose, onEdit, setIsOpenDeleteModal, setDeletingTopicId } = props;

    return (
        <FlexboxGrid className={className} as="nav" align="bottom">
            <Button
                appearance="link"
                onClick={() => {
                    onEdit();
                    onClose();
                }}
            >
                Edit
            </Button>
            <Button
                onClick={() => {
                    setDeletingTopicId();
                    setIsOpenDeleteModal(true);
                    onClose();
                }}
                appearance="link"
                className="delete-button"
            >
                Delete
            </Button>
        </FlexboxGrid>
    );
})`
    flex-direction: column;

    button {
        background-color: transparent;
        padding: 6px;
        font-weight: 600;
        font-size: 18px;
        color: var(--text-default-color);
    }

    .delete-button {
        color: rgb(var(--error-color));
    }

    .link-to-related-feed {
        display: flex;
        align-items: center;
        gap: 8px;

        svg {
            width: 18px;
            height: 18px;
        }
    }
`;

const $isLoadingTable = combine(
    collectionModel.effects.getTopicsWithPartnerFeedRelationsByIdsFx.pending,
    collectionModel.effects.updateTopicPositionsFx.pending,
    (...pendingFlags) => pendingFlags.some(Boolean)
);

export const CollectionTopics = styled((props: PropsWithClassName) => {
    const { className } = props;

    const triggerRef = useRef<WhisperInstance>();

    const isTopicDeletingLoading = useStore(collectionModel.effects.deleteTopicFromCollectionFx.pending);
    const topicsByIds = useStore($topicsByIds);
    const collectionTopicRelations = useStore(collectionModel.stores.$collectionTopicRelations);
    const partnerId = useStore($partnerId);
    const currentCollection = useStore(collectionModel.stores.$activeCollection);
    const currentCollectionId = currentCollection?.id;
    const isLoadingTable = useStore($isLoadingTable);

    const [draggableTopics, setDraggableTopics] = useState<CollectionTopicRelation[]>([]);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [deletingTopicId, setDeletingTopicId] = useState<Nullable<CollectionTopicRelation['id']>>(null);

    const closeDeleteModal = () => {
        setIsOpenDeleteModal(false);
    };

    const onTopicDeleteFromModal = () => {
        if (deletingTopicId && partnerId) {
            collectionModel.effects.deleteTopicFromCollectionFx({ partnerId, topicId: deletingTopicId });
            setIsOpenDeleteModal(false);
            showMessage('Topic successfully deleted!');
        }
    };

    const handleDrop = (droppedItem: DropResult) => {
        if (!droppedItem.destination) return;
        const updatedList = [...draggableTopics];

        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

        const newUpdatedList = updatedList.map((topic, index) => {
            return { ...topic, position: index };
        });

        setDraggableTopics(newUpdatedList);

        if (partnerId && currentCollectionId) {
            collectionModel.effects.updateTopicPositionsFx({ topicRelations: newUpdatedList, partnerId });
        }
    };

    useEffect(() => {
        if (collectionTopicRelations) {
            setDraggableTopics(collectionTopicRelations);
        }
    }, [collectionTopicRelations]);

    return (
        <div className={className}>
            <Modal open={isOpenDeleteModal} onClose={closeDeleteModal}>
                <Modal.Header>
                    <h3 style={{ fontSize: 18, color: 'var(--text-dark-color)' }}>Delete topic</h3>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ fontSize: 18 }}>Do you really want to delete topic ?</p>
                    <FlexboxGrid justify="end" style={{ marginBlockStart: 20, gap: 8 }}>
                        <Button size="sm" appearance="subtle" onClick={closeDeleteModal}>
                            Cancel
                        </Button>
                        <Button size="sm" color="red" onClick={onTopicDeleteFromModal}>
                            {isTopicDeletingLoading ? <Loader /> : 'Delete'}
                        </Button>
                    </FlexboxGrid>
                </Modal.Body>
            </Modal>

            <label className="btn-create-topic">
                <Button
                    appearance="primary"
                    onClick={() => {
                        adminPanelModel.events.adminModalToggled({
                            isOpen: true,
                            entity: 'topic-in-collection',
                            mode: 'create',
                        });
                    }}
                >
                    <icons.PlusIcon />
                </Button>
                Add content item
            </label>

            <Table
                isLoading={isLoadingTable}
                templateColumns={[5, 5, 1]}
                head={
                    <Tr>
                        <Th>Themes</Th>
                        <Th>Feeds</Th>
                        <Th />
                    </Tr>
                }
                body={
                    Boolean(draggableTopics.length) && (
                        <DragDropContext onDragEnd={handleDrop}>
                            <Droppable droppableId="topic-container">
                                {(provided) => (
                                    <div
                                        className="topic-container"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {draggableTopics.map(({ id, topicId }, index) => {
                                            const topic = topicsByIds[topicId];

                                            if (!topic) {
                                                return null;
                                            }
                                            return (
                                                <Draggable key={id} draggableId={id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className="topic"
                                                        >
                                                            <Tr key={id}>
                                                                <Td>
                                                                    <div className="drag-name-container">
                                                                        <FlexboxGrid
                                                                            className="drag-icon"
                                                                            {...provided.dragHandleProps}
                                                                        >
                                                                            <DragAndDropIcon />
                                                                        </FlexboxGrid>
                                                                        <FlexboxGrid
                                                                            style={{ width: '100%', gap: 14 }}
                                                                            align="middle"
                                                                        >
                                                                            <img
                                                                                className="topic-logo"
                                                                                src={topic.logo}
                                                                                alt={topic.name}
                                                                            />

                                                                            <TextWithEllipsis>
                                                                                {topic.name}
                                                                            </TextWithEllipsis>
                                                                        </FlexboxGrid>
                                                                    </div>
                                                                </Td>

                                                                <Td>
                                                                    {topic.topicPartnerFeedRelations
                                                                        ?.length || 0}
                                                                </Td>

                                                                <Td>
                                                                    <FlexboxGrid
                                                                        style={{ width: '100%' }}
                                                                        justify="end"
                                                                    >
                                                                        <ButtonWithContextMenu
                                                                            menuStyle={{ minWidth: 148 }}
                                                                        >
                                                                            {(ref) => {
                                                                                triggerRef.current =
                                                                                    ref.current;
                                                                                return (
                                                                                    <Options
                                                                                        onClose={() => {
                                                                                            ref.current?.close();
                                                                                        }}
                                                                                        onEdit={() => {
                                                                                            adminPanelModel.events.adminModalToggled(
                                                                                                {
                                                                                                    entity: 'topic-in-collection',
                                                                                                    entityIdToBeManage:
                                                                                                        topicId,
                                                                                                    isOpen: true,
                                                                                                    mode: 'update',
                                                                                                }
                                                                                            );
                                                                                        }}
                                                                                        setIsOpenDeleteModal={(
                                                                                            value: boolean
                                                                                        ) =>
                                                                                            setIsOpenDeleteModal(
                                                                                                value
                                                                                            )
                                                                                        }
                                                                                        setDeletingTopicId={() =>
                                                                                            setDeletingTopicId(
                                                                                                topic.id
                                                                                            )
                                                                                        }
                                                                                    />
                                                                                );
                                                                            }}
                                                                        </ButtonWithContextMenu>
                                                                    </FlexboxGrid>
                                                                </Td>
                                                            </Tr>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    )
                }
            />
        </div>
    );
})`
    padding-block-start: 14px;

    .btn-create-topic {
        display: flex;
        font-weight: 600;
        font-size: 16px;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        margin-block-end: 14px;

        button {
            padding: 6px;
            display: flex;
            color: #fff;

            svg {
                width: 16px;
                height: 16px;
            }
        }
    }

    .topic-logo {
        width: 42px;
        height: 42px;
        border-radius: 50%;
    }

    .drag-name-container {
        display: flex;
        gap: 10px;
        align-items: center;
    }
`;
