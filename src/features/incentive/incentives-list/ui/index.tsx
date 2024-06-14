import { useRef, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useStore } from 'effector-react';
import { FlexboxGrid } from 'rsuite';
import type { WhisperInstance } from 'rsuite/esm/Whisper';
import { styles } from './styles';
import { Nullable, PropsWithClassName } from '@/shared/utility-types';
import { eventsModel } from '@/entities/events';
import { ButtonWithContextMenu, SortingDirection, Table, TextWithEllipsis } from '@/shared/ui';
import { useInfiniteScrollingEntities, useSortable } from '@/shared/hooks';
import { Event } from '@/shared/api/event/types';
import { EventActionType } from '../../types';
import { Button, Modal } from '@/shared/rsuite/admin-panel';
import { FeedsIcon } from '@/shared/ui/icons';
import { adminPanelModel } from '@/entities/admin-panel';
import { showMessage } from '@/shared/lib/messages';

const $flatIncentives = eventsModel.stores.$events.map((incentives) => {
    return incentives.map((incentive) => ({
        ...incentive,
        ...incentive.userLimits,
    }));
});

const { Td, Th, Tr } = Table;

type ContextMenuProps = PropsWithClassName<{
    onClose: () => void;
    incentive: Event;
}>;

export const IncentivesList = styled(({ className }: PropsWithClassName) => {
    const flatIncentives = useStore($flatIncentives);

    const isDeleting = useStore(eventsModel.effects.deleteEventFx.pending);

    const { t: translateEvents } = useTranslation('common', { keyPrefix: 'events' });
    const { t: translateIncentive } = useTranslation('common', { keyPrefix: 'incentives' });
    const { t: translateModals } = useTranslation('common', { keyPrefix: 'modals' });

    const { sortedData, handleSorting, sortField, sortOrder } =
        useSortable<(typeof flatIncentives)[0]>(flatIncentives);

    const { entities: incentives, onLastEntityRefChange } = useInfiniteScrollingEntities({
        entities: sortedData,
    });

    const [incentiveToDeleteId, setIncentiveToDeleteId] = useState<Nullable<Event['id']>>(null);

    const triggerRef = useRef<WhisperInstance>();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleOpenDeleteModal = async (incentive: Event) => {
        setIsDeleteModalOpen(true);
        setIncentiveToDeleteId(incentive.id);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setIncentiveToDeleteId(null);
    };

    const handleDelete = async () => {
        if (incentiveToDeleteId) {
            setIsDeleteModalOpen(false);

            const { status } = await eventsModel.effects.deleteEventFx(incentiveToDeleteId);

            if (status === 200) {
                showMessage(translateEvents('message-if-event-successfully-deleted'));
                setIncentiveToDeleteId(null);
            }
        }
    };

    // TODO: move to separate file
    const Options = styled((props: ContextMenuProps) => {
        const { incentive, className, onClose } = props;

        return (
            <FlexboxGrid className={props.className} as="nav" align="bottom">
                <Button
                    appearance="link"
                    onClick={() => {
                        adminPanelModel.events.adminModalToggled({
                            isOpen: true,
                            entity: 'incentive',
                            mode: 'update',
                            entityIdToBeManage: props.incentive.id,
                        });
                        onClose();
                    }}
                >
                    {translateModals('edit')}
                </Button>
                <Button
                    disabled={Boolean(props.incentive.entities?.length)}
                    onClick={() => {
                        handleOpenDeleteModal(props.incentive);
                        onClose();
                    }}
                    appearance="link"
                    className="delete-button"
                >
                    {translateModals('delete')}
                </Button>

                {props.incentive.entities?.map(({ entityType, entityId }) => {
                    if (entityType === 'feed') {
                        return (
                            <div key={entityId}>
                                <Button
                                    className="link-to-related-feed"
                                    appearance="link"
                                    onClick={() => {
                                        adminPanelModel.events.adminModalToggled({
                                            isOpen: true,
                                            entity: 'feed',
                                            mode: 'update',
                                            entityIdToBeManage: props.incentive.entities?.[0].entityId,
                                        });
                                        triggerRef?.current?.close();
                                    }}
                                >
                                    {translateModals('feed')}
                                    <FeedsIcon />
                                </Button>
                            </div>
                        );
                    }
                    return null;
                })}
            </FlexboxGrid>
        )
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
                        {translateModals('delete-incentive')}
                    </h3>
                </Modal.Header>

                <Modal.Body>
                    <p style={{ fontSize: 18 }}>{translateModals('by-delete-incentive')}</p>

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
                noDataComponent={translateEvents('message-if-events-not-exist')}
                templateColumns={[3, 2, 2, 2, 2, 1]}
                head={
                    <Tr>
                        <Th>
                            <button onClick={() => handleSorting('name')}>
                                {translateIncentive('name')}
                                {sortField === 'name' && <SortingDirection order={sortOrder} />}
                            </button>
                        </Th>
                        <Th>{translateIncentive('actionType')} </Th>
                        <Th>
                            <button onClick={() => handleSorting('points', { numeric: true })}>
                                {translateIncentive('reward')}
                                {sortField === 'points' && <SortingDirection order={sortOrder} />}
                            </button>
                        </Th>
                        <Th>
                            <button onClick={() => handleSorting('daily', { numeric: true })}>
                                {translateIncentive('daily-limit')}
                                {sortField === 'daily' && <SortingDirection order={sortOrder} />}
                            </button>
                        </Th>
                        <Th>
                            <button onClick={() => handleSorting('monthly', { numeric: true })}>
                                {translateIncentive('monthly-limit')}
                                {sortField === 'monthly' && <SortingDirection order={sortOrder} />}
                            </button>
                        </Th>
                        <Th />
                    </Tr>
                }
                body={incentives.map((incentive, index, { length }) => {
                    const props: Parameters<typeof Tr>[0] = {};

                    if (index === length - 1) {
                        props.ref = onLastEntityRefChange;
                    }
                    return (
                        <Tr
                            key={incentive.id}
                            {...props}
                            isLoading={Boolean(isDeleting && incentiveToDeleteId === incentive.id)}
                        >
                            <Td>
                                <TextWithEllipsis>{incentive.name}</TextWithEllipsis>
                            </Td>
                            <Td>
                                <TextWithEllipsis>{translateEvents(EventActionType.click)}</TextWithEllipsis>
                            </Td>
                            <Td>
                                <TextWithEllipsis>{incentive.points}</TextWithEllipsis>
                            </Td>
                            <Td>
                                <TextWithEllipsis>{incentive.userLimits.daily}</TextWithEllipsis>
                            </Td>
                            <Td>
                                <TextWithEllipsis>{incentive.userLimits.monthly}</TextWithEllipsis>
                            </Td>
                            <Td>
                                <FlexboxGrid style={{ width: '100%' }} justify="end">
                                    <ButtonWithContextMenu menuStyle={{ minWidth: 148 }}>
                                        {(ref) => {
                                            triggerRef.current = ref.current;
                                            return <Options
                                                onClose={() => {
                                                    ref.current?.close();
                                                }}
                                                incentive={incentive} />;
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
