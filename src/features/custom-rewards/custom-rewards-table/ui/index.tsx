import { useTranslation } from 'next-i18next';
import { Button, Modal } from '@/shared/rsuite/admin-panel';
import { ButtonWithContextMenu, Loader, SortingDirection, Table, TextWithEllipsis } from '@/shared/ui';
import { Nullable, PropsWithClassName } from '@/shared/utility-types';
import { useStore } from 'effector-react';
import { FlexboxGrid } from 'rsuite';
import { customRewardsModel } from '../../model';
import { ImuTitle } from './imu-title';
import { useEffect, useRef, useState } from 'react';
import { userModel } from '@/entities/user';
import { ImuRewardsList } from './imu-rewards-list';
import { adminPanelModel } from '@/entities/admin-panel';
import styled from 'styled-components';
import { useSortable } from '@/shared/hooks';
import { WhisperInstance } from 'rsuite/esm/Whisper';
import { IMU } from '@/shared/api/custom-rewards/types';

const { Td, Th, Tr } = Table;

export const CustomRewardsTable = styled((props: PropsWithClassName) => {
    const { className } = props;
    const partnerId = useStore(userModel.stores.$partnerId);
    const { t: translateModals } = useTranslation('common', { keyPrefix: 'modals' });
    const [customRewardToDeleteId, setCusomRewardToDeleteId] = useState<Nullable<IMU>>(null);
    const triggerRef = useRef<WhisperInstance>();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        if (!partnerId) return;
        customRewardsModel.effects.getPartnerImusByPartnerIdFx({ partnerId });
    }, [partnerId]);

    const handleDeleteIMU = (imuId: string, widgetCode: string) => {
        if (!partnerId) return;
        customRewardsModel.effects.deleteCustomRewardsByPartnerIdFx({ partnerId, imuId, widgetCode });
    };

    const customRewardedIMUs = useStore(customRewardsModel.stores.$customRewardedIMUs);

    const { sortedData, handleSorting, sortField, sortOrder } =
        useSortable<(typeof customRewardedIMUs)[0]>(customRewardedIMUs);

    const isDeleting = useStore(customRewardsModel.effects.deleteCustomRewardsByPartnerIdFx.pending);
    const isFetchingRewards = useStore(customRewardsModel.effects.getPartnerImusByPartnerIdFx.pending);

 
    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setCusomRewardToDeleteId(null);
    };

    const handleDelete = async () => {
        if(customRewardToDeleteId){
            handleDeleteIMU(customRewardToDeleteId.id, customRewardToDeleteId.widgetCode)
            setCusomRewardToDeleteId(null);
            setIsDeleteModalOpen(false);
        }
    };

    const handleOpenDeleteModal = async (imu: IMU) => {
        setIsDeleteModalOpen(true);
        setCusomRewardToDeleteId(imu);
    };

    return (
        <div className={className}>
            <Modal open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
                <Modal.Header>
                    <h3 style={{ fontSize: 18, color: 'var(--text-dark-color)' }}>
                        {translateModals('delete-custom-reward')}
                    </h3>
                </Modal.Header>

                <Modal.Body>
                    <p style={{ fontSize: 18 }}>{translateModals('by-delete-item')}</p>

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
                isLoading={isFetchingRewards}
                noDataComponent="Custom rewards list is empty"
                templateColumns={[1, 3, 0.5, 0.2]}
                head={
                    <Tr>
                        <Th>
                            <button onClick={() => handleSorting('name')}>
                                Widget
                                {sortField === 'name' && <SortingDirection order={sortOrder} />}
                            </button>
                        </Th>
                        <Th>Rewards, Points</Th>
                        <Th>Language</Th>
                        <Th />
                    </Tr>
                }
                body={sortedData.map((imu) => {
                    if (!imu.id) return null;
                    
                    return (
                        <Tr key={imu.id}>
                            <Td>
                                <ImuTitle imu={imu} />
                            </Td>
                            <Td>
                                <ImuRewardsList imuIncentives={imu.incentives || []} />
                            </Td>
                            <Td>
                                {imu.language.slice(0, 1).toUpperCase() + imu.language.slice(1).toLowerCase()}
                            </Td>
                            <Td style={{ justifyContent: 'flex-end' }}>
                                <ButtonWithContextMenu
                                    children={(triggerRef) => (
                                        <>
                                            <Button
                                                style={{ justifyContent: 'flex-end' }}
                                                block
                                                appearance="transparent"
                                                size="md"
                                                onClick={() => {
                                                    adminPanelModel.events.adminModalToggled({
                                                        isOpen: true,
                                                        entity: 'rewards',
                                                        mode: 'update',
                                                        entityIdToBeManage: imu.id,
                                                    });
                                                    triggerRef?.current?.close();
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                style={{
                                                    color: 'rgb(var(--error-color))',
                                                    justifyContent: 'flex-end',
                                                }}
                                                block
                                                appearance="transparent"
                                                size="md"
                                                onClick={() => {
                                                    handleOpenDeleteModal(imu);
                                                    triggerRef?.current?.close();
                                                }}
                                            >
                                                {isDeleting ? <Loader width={16} /> : 'Delete'}
                                            </Button>
                                        </>
                                    )}
                                />
                            </Td>
                        </Tr>
                    );
                })}
            />
        </div>
    );
})``;
