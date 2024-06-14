import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useStore } from 'effector-react';
import { FlexboxGrid } from 'rsuite';
import { useEffect, useRef, useState } from 'react';
import type { WhisperInstance } from 'rsuite/esm/Whisper';
import { Nullable, PropsWithClassName } from '@/shared/utility-types';
import { styles } from './styles';
import { ButtonWithContextMenu, SortingDirection, Table, TextWithEllipsis } from '@/shared/ui';
import { feedModel } from '@/entities/feed';
import { useInfiniteScrollingEntities, useSortable } from '@/shared/hooks';
import { Button, Modal, Select } from '@/shared/rsuite/admin-panel';
import { adminPanelModel } from '@/entities/admin-panel';
import type { Feed } from '@/shared/api/feed/types';
import { eventsModel } from '@/entities/events';
import type { Event } from '@/shared/api/event/types';
import { userModel } from '@/entities/user';
import { showMessage } from '@/shared/lib/messages';
import type { BaseOption } from '@/shared/rsuite/admin-panel/select';
import { HrefIcon } from '@/shared/ui/icons';

const { Td, Th, Tr } = Table;

type ContextMenuProps = PropsWithClassName<{
    feed: Feed
    onClose: () => void;
}>;

export const FeedList = styled(({ className }: PropsWithClassName) => {
    const feedList = useStore(feedModel.stores.$feeds);

    const partnerId = useStore(userModel.stores.$partnerId);

    const { sortedData, handleSorting, sortField, sortOrder } = useSortable<(typeof feedList)[0]>(feedList);

    const { entities: feeds, onLastEntityRefChange } = useInfiniteScrollingEntities({
        entities: sortedData,
    });

    const triggerRef = useRef<WhisperInstance | undefined>();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [feedToManageId, setFeedToManageId] = useState<Nullable<Feed['id']>>(null);

    const isDeleting = useStore(feedModel.effects.deleteFeedFx.pending);
    const isUpdating = useStore(feedModel.effects.updateFeedFx.pending);

    const { t, i18n } = useTranslation('common', { keyPrefix: 'feed' });
    const { t: translateFeeds } = useTranslation('common', { keyPrefix: 'feeds' });
    const { t: translateModals } = useTranslation('common', { keyPrefix: 'modals' });

    const unattachedEvents = useStore(eventsModel.stores.$unattachedEvents);

    const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);

    useEffect(() => {
        feedModel.effects.updateFeedFx.done.watch(({ result: { status } }) => {
            if (status === 200) {
                setIsUpdateSuccessful(true);

                setTimeout(() => setIsUpdateSuccessful(false), 2000);
            }
        });
    }, []);

    const handleDelete = async () => {
        if (feedToManageId) {
            setIsDeleteModalOpen(false);

            const { status } = await feedModel.effects.deleteFeedFx(feedToManageId);

            if (status === 200) {
                setFeedToManageId(null);
            }
        }
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setFeedToManageId(null);
    };

    const handleChangeIncentive = async (incentiveId: Event['id'], feed: Feed) => {
        if (partnerId) {
            setFeedToManageId(feed.id);

            const { status } = await feedModel.effects.updateFeedFx({
                feed: {
                    ...feed,
                    incentive: { id: incentiveId },
                },
                partnerId: partnerId,
            });

            if (status === 200) {
                showMessage(t('message-if-feed-successfully-updated'));
            }
        }
    };

    // TODO: move to separate file
    const Options = styled((props: ContextMenuProps) => {
        const { feed, className, onClose } = props;

        return (
            <FlexboxGrid className={className} as="nav" align="bottom">
                <Button
                    appearance="link"
                    onClick={() => {
                        adminPanelModel.events.adminModalToggled({
                            isOpen: true,
                            entity: 'feed',
                            mode: 'update',
                            entityIdToBeManage: feed.id,
                        });
                        onClose();
                    }}
                >
                    {translateModals('edit')}
                </Button>
                <Button
                    onClick={() => {
                        adminPanelModel.events.adminModalToggled({
                            isOpen: true,
                            entity: 'feed',
                            mode: 'delete',
                            entityIdToBeManage: feed.id,
                        });
                        onClose();
                    }}
                    appearance="link"
                    className="delete-button"
                >
                    {translateModals('delete')}
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

    return (
        <div className={className}>
            {/* TODO: move to separate component and file */}
            <Modal open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
                <Modal.Header>
                    <h3 style={{ fontSize: 18, color: 'var(--text-dark-color)' }}>
                        {translateModals('delete-feed')}
                    </h3>
                </Modal.Header>

                <Modal.Body>
                    <p style={{ fontSize: 18 }}>{translateModals('by-delete-feed')}</p>

                    <FlexboxGrid justify="end" style={{ marginBlockStart: 20, gap: 8 }}>
                        <Button size="sm" appearance="subtle" onClick={handleCloseDeleteModal}>
                            {translateModals('cancel')}
                        </Button>

                        <Button size="sm" color="red" onClick={handleDelete}>
                            {translateModals('delete')}
                        </Button>
                    </FlexboxGrid>
                </Modal.Body>
            </Modal>

            <Table
                noDataComponent={t('message-if-feed-list-is-empty')}
                templateColumns={[1, 1, 1, 1, 1, 1]}
                head={
                    <Tr>
                        <Th>
                            <button onClick={() => handleSorting('name')}>
                                {translateFeeds('name')}
                                {sortField === 'name' && <SortingDirection order={sortOrder} />}
                            </button>
                        </Th>
                        <Th>
                            <button onClick={() => handleSorting('locale')}>
                                {translateFeeds('language')}
                                {sortField === 'locale' && <SortingDirection order={sortOrder} />}
                            </button>
                        </Th>
                        <Th>{translateFeeds('incentive')}</Th>
                        <Th>
                            <button onClick={() => handleSorting('url')}>
                                {translateFeeds('url')}
                                {sortField === 'url' && <SortingDirection order={sortOrder} />}
                            </button>
                        </Th>
                        <Th>
                            <button onClick={() => handleSorting('pollCount', { numeric: true })}>
                                {translateFeeds('polls-creation')}
                                {sortField === 'pollCount' && <SortingDirection order={sortOrder} />}
                            </button>
                        </Th>
                        <Th />
                    </Tr>
                }
                body={feeds.map((feed, index) => {
                    const props: Parameters<typeof Tr>[0] = {};

                    if (index === feeds.length - 1) {
                        props.ref = onLastEntityRefChange;
                    }

                    return (
                        <Tr
                            key={feed.id}
                            {...props}
                            isLoading={Boolean((isDeleting || isUpdating) && feedToManageId === feed.id)}
                            isSuccess={Boolean(isUpdateSuccessful && feedToManageId === feed.id)}
                        >
                            <Td>
                                <TextWithEllipsis>{feed.name}</TextWithEllipsis>
                            </Td>
                            <Td>
                                <TextWithEllipsis>{i18n.t(feed.locale)}</TextWithEllipsis>
                            </Td>
                            <Td>
                                <Select<BaseOption>
                                    size="sm"
                                    options={[
                                        {
                                            label: 'Create new',
                                            value: 'create-new',
                                            color: 'var(--main-color)',
                                            icon: (
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
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
                                        ...unattachedEvents,
                                    ]}
                                    isDropdownIndependent={true}
                                    value={{
                                        label: feed.incentive?.name,
                                        value: feed.incentive?.id,
                                    }}
                                    isDisabled={isUpdating || isUpdateSuccessful}
                                    onChange={(option) => {
                                        if (option) {
                                            if (option.value === 'create-new') {
                                                adminPanelModel.events.adminModalToggled({
                                                    entity: 'incentive',
                                                    mode: 'create',
                                                    isOpen: true,
                                                    onIncentiveSuccess: ({ id }) => {
                                                        handleChangeIncentive(id, feed);

                                                        adminPanelModel.events.adminModalToggled({
                                                            isOpen: false,
                                                            onIncentiveSuccess: undefined,
                                                        });
                                                    },
                                                });
                                            } else {
                                                handleChangeIncentive(option.value, feed);
                                            }
                                        }
                                    }}
                                />
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
                                <TextWithEllipsis>
                                    {feed.pollCount}/per {feed.period}
                                </TextWithEllipsis>
                            </Td>
                            <Td>
                                <FlexboxGrid justify="end" style={{ width: '100%' }}>
                                    <ButtonWithContextMenu menuStyle={{ minWidth: 148 }}>
                                        {(ref) => {
                                            triggerRef.current = ref.current;
                                            return <Options 
                                                onClose={() => {
                                                    ref.current?.close();
                                                }} 
                                                feed={feed} />;
                                        }}
                                    </ButtonWithContextMenu>
                                </FlexboxGrid>
                            </Td>
                        </Tr>
                    );
                })}
            />
        </div>
    );
})`
    ${styles}
`;
