import styled from 'styled-components';
import { FlexboxGrid } from 'rsuite';
import { useTranslation } from 'next-i18next';
import { styles } from './styles';
import { PropsWithClassName, Nullable, NoNullable } from '@/shared/utility-types';
import { Button } from '@/shared/rsuite/admin-panel';
import { adminPanelModel } from '@/entities/admin-panel';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useEffect, useRef, useState } from 'react';
import { useStore } from 'effector-react';
import { feedModel } from '@/entities/feed';
import {
    deleteSequenceItemFx,
    deleteWidgetFeedRelationFx,
    getSequenceItemsFx,
    updateSequenceItemsOrderingFx,
} from '@/entities/feed/model/effects';
import { Modal } from '@/shared/rsuite/admin-panel';
import { ModalProps } from 'rsuite';
import { icons } from '@/widgets/admin-panel';
import { ButtonWithContextMenu, Loader, Table, TextWithEllipsis } from '@/shared/ui';
import type { WhisperInstance } from 'rsuite/esm/Whisper';
import { Feed, SequenceItemAdmin } from '@/shared/api/feed/types';
import { AdminModal } from '@/entities/admin-panel/model/types';
import { userModel } from '@/entities/user';
import { DragAndDropIcon, HrefIcon, LinkIcon } from '@/shared/ui/icons';
const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL;

const { Td, Th, Tr } = Table;

const QuizIcon = () => (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none">
        <rect y="0.5" width="20" height="20" rx="3" fill="#404854" />
        <path
            d="M10.0026 15.168C8.56529 15.168 7.37063 14.7153 6.41863 13.81C5.47596 12.9047 5.00463 11.7473 5.00463 10.338C5.00463 8.92867 5.47596 7.77133 6.41863 6.866C7.37063 5.96067 8.56529 5.508 10.0026 5.508C11.44 5.508 12.63 5.96067 13.5726 6.866C14.5153 7.77133 14.9866 8.92867 14.9866 10.338C14.9866 11.6167 14.5946 12.6947 13.8106 13.572L14.3986 14.286L12.7186 15.63L12.0326 14.79C11.3793 15.042 10.7026 15.168 10.0026 15.168ZM10.0026 13.04C10.208 13.04 10.39 13.0213 10.5486 12.984L9.69463 11.948L11.3606 10.604L12.2426 11.668C12.4386 11.248 12.5366 10.8047 12.5366 10.338C12.5366 9.56333 12.3033 8.91933 11.8366 8.406C11.37 7.89267 10.7586 7.636 10.0026 7.636C9.23729 7.636 8.62129 7.89267 8.15463 8.406C7.68796 8.91933 7.45463 9.56333 7.45463 10.338C7.45463 11.1127 7.68796 11.7567 8.15463 12.27C8.62129 12.7833 9.23729 13.04 10.0026 13.04Z"
            fill="white"
        />
    </svg>
);

export type FeedListProps = PropsWithClassName & {};
interface ImuTypes {
    [key: string]: {
        link: string;
        icon: JSX.Element;
    };
}
const imuTypes: ImuTypes = {
    QUIZ: {
        link: '#!/partner/quiz-manager/configuration/',
        icon: <QuizIcon />,
    },
    SURVEY: {
        link: '#!/partner/survey-manager/configuration/',
        icon: <QuizIcon />,
    },
};

type ContextMenuProps = PropsWithClassName<{
    feed: SequenceItemAdmin;
    onClose: () => void;
}>;

export const SequenceListCreation = styled((props: FeedListProps) => {
    const { className } = props;
    const { t } = useTranslation('common', { keyPrefix: 'sequences' });
    const { t: translationEvents } = useTranslation('common', { keyPrefix: 'events' });
    const partnerId = useStore(userModel.stores.$partnerId);
    const activeSequenceId = useStore(feedModel.stores.$activeSequenceId);
    const activeSequenceConfig = useStore(feedModel.stores.$activeSequence);
    const widgetFeedRelations = useStore(feedModel.stores.$sequenceFeedItems); //!!!!!!!!!!!!!!!!!!

    const [draggableFeeds, setDraggableFeeds] = useState<SequenceItemAdmin[]>([]);
    const [feedItemToDelete, setFeedItemToDelete] = useState<Nullable<SequenceItemAdmin>>(null);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const triggerRef = useRef<WhisperInstance | undefined>();
    const isPendingOnDrag = useStore(feedModel.effects.updateSequenceItemsOrderingFx.pending);

    const deleteFeed = async (feedId: string) => {
        setIsConfirmDeleteModalOpen(false);
        setFeedItemToDelete(null);

        const { status } = await deleteWidgetFeedRelationFx(feedId);

        if (status === 200) {
            const updatedFeedList = draggableFeeds.filter((item) => item.id !== feedId);
            setDraggableFeeds(updatedFeedList);
        }
    };

    const handleDrop = async (droppedItem: DropResult) => {
        if (!droppedItem.destination) return;
        const updatedList = [...draggableFeeds];
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

        const newUpdatedList = updatedList.map((feed, index) => {
            return { ...feed, position: index };
        });

        setDraggableFeeds(newUpdatedList);

        const { status } = await updateSequenceItemsOrderingFx({
            sequenceItems: newUpdatedList,
            partnerId: String(partnerId),
            feedId: String(activeSequenceId),
        });

        if (status && partnerId) {
            getSequenceItemsFx({
                partnerId: partnerId,
                feedId: String(activeSequenceId),
            });
        }
    };
    useEffect(() => {
        if (partnerId) {
            getSequenceItemsFx({
                partnerId: partnerId,
                feedId: String(activeSequenceId),
            });
        }
    }, []);

    useEffect(() => {
        if (widgetFeedRelations) {
            setDraggableFeeds(widgetFeedRelations);
        }
    }, [widgetFeedRelations]);

    const Options = styled((props: ContextMenuProps) => {
        const { feed, className, onClose } = props;

        return (
            <FlexboxGrid className={className} as="nav" align="bottom">
                <Button
                    appearance="link"
                    onClick={() => {
                        adminPanelModel.events.adminModalToggled({
                            isOpen: true,
                            entity: 'sequence-item',
                            mode: 'update',
                            entityIdToBeManage: feed.id,
                        });
                        onClose();
                    }}
                >
                    {t('edit')}
                </Button>
                <Button
                    onClick={() => {
                        deleteSequenceItemFx({ partnerId: String(partnerId), sequenceItemId: feed.id });
                        getSequenceItemsFx({ partnerId: String(partnerId), feedId: String(activeSequenceId) });
                        onClose();
                    }}
                    appearance="link"
                    className="delete-button"
                >
                    {t('remove')}
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

    const openCreationModal = (entity: NoNullable<AdminModal['entity']>) => {
        adminPanelModel.events.adminModalToggled({
            isOpen: true,
            entity,
            mode: 'create',
        });
        triggerRef?.current?.close();
    };

    return (
        <div className={className}>
            <section>
                <ConfirmDeleteFeedFromListModal
                    open={isConfirmDeleteModalOpen}
                    onClose={() => setIsConfirmDeleteModalOpen(false)}
                    onConfirm={() => deleteFeed(String(feedItemToDelete?.id))}
                    feedName={String(feedItemToDelete?.name)}
                />

                <div className="add-sequence-container">
                    <Button
                        className="create-sequence"
                        appearance="primary"
                        onClick={() => {
                            openCreationModal('sequence-item');
                        }}
                        disabled={activeSequenceConfig?.status === 'ACTIVE'}
                    >
                        <icons.PlusIcon />
                    </Button>
                    <span className="setting-label">{t('create-item')}</span>
                </div>

                {draggableFeeds ? (
                    <div className="table-container">
                        {isPendingOnDrag ? <div className="loader-container">
                            <div className="loader">
                                <Loader />
                            </div>
                        </div> : null}
                        <Table
                            noDataComponent={translationEvents('message-if-pages-not-exist')}
                            templateColumns={[2, 1, 2, 2, 0.3]}
                            head={
                                <Tr>
                                    <Th>{t('name')}</Th>
                                    <Th>{t('article-url')}</Th>
                                    <Th>{t('imu')}</Th>
                                    <Th>{t('read-reward-points')}</Th>
                                    <Th></Th>
                                </Tr>
                            }
                            body={
                                <DragDropContext onDragEnd={handleDrop}>
                                    <Droppable droppableId="feed-container">
                                        {(provided) => (
                                            <div
                                                className="feed-container"
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                            >
                                                {draggableFeeds.map((feed, index) => {
                                                    return (
                                                        <Draggable
                                                            key={feed.id}
                                                            draggableId={feed.id}
                                                            index={index}
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    className="feed"
                                                                >
                                                                    <Tr key={feed.id}>
                                                                        <Td style={{
                                                                            pointerEvents:
                                                                                activeSequenceConfig?.status === 'ACTIVE'
                                                                                    ? 'none'
                                                                                    : 'initial',
                                                                        }}>
                                                                            <div className="td-name">
                                                                                <FlexboxGrid
                                                                                    className="drag-icon"
                                                                                    {...provided.dragHandleProps}
                                                                                >
                                                                                    <DragAndDropIcon />
                                                                                </FlexboxGrid>
                                                                                <span>{index + 1}</span>
                                                                                {feed.name}
                                                                            </div>
                                                                        </Td>
                                                                        <Td>
                                                                            <div className="link">
                                                                                <HrefIcon />
                                                                                <a
                                                                                    target="_blank"
                                                                                    href={feed.url}
                                                                                >
                                                                                    Link
                                                                                </a>
                                                                            </div>
                                                                        </Td>

                                                                        <Td>
                                                                            <div className="link">
                                                                                <div className="imu-icon">
                                                                                    <span>
                                                                                        {feed.imuType
                                                                                            ? feed.imuType.substr(
                                                                                                0,
                                                                                                1
                                                                                            )
                                                                                            : ''}
                                                                                    </span>
                                                                                </div>

                                                                                <span className="short">
                                                                                    {feed.imuName}
                                                                                </span>
                                                                            </div>

                                                                        </Td>
                                                                        <Td>{feed.incentive.points}</Td>
                                                                        <Td style={{
                                                                            pointerEvents:
                                                                                activeSequenceConfig?.status === 'ACTIVE'
                                                                                    ? 'none'
                                                                                    : 'initial',
                                                                        }}>
                                                                            <FlexboxGrid
                                                                                justify="end"
                                                                                style={{ width: '100%' }}
                                                                            >
                                                                                <ButtonWithContextMenu
                                                                                    menuStyle={{
                                                                                        minWidth: 148,
                                                                                    }}
                                                                                >
                                                                                    {(ref) => {
                                                                                        triggerRef.current =
                                                                                            ref.current;
                                                                                        return (
                                                                                            <Options
                                                                                                onClose={() => {
                                                                                                    ref.current?.close();
                                                                                                }}
                                                                                                feed={feed}
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
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            }
                        />
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
    feedName: string;
};

export const ConfirmDeleteFeedFromListModal = styled(
    ({ onConfirm, feedName, ...props }: ConfirmDeleteCatalogModalProps) => {
        return (
            <Modal backdrop={true} size="xs" {...props}>
                <Modal.Header>
                    <h3>Delete Feed from list? </h3>
                </Modal.Header>
                <Modal.Body>
                    <p className="description">{feedName}</p>

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
                            Cancel
                        </Button>

                        <Button size="sm" color="red" onClick={onConfirm}>
                            Delete
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
