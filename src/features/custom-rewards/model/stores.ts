import { adminPanelModel } from '@/entities/admin-panel';
import type { IMU } from '@/shared/api/custom-rewards/types';
import { combine, createStore } from 'effector';

export const $customRewardedIMUs = createStore<IMU[]>([]);

export const $IMUs = createStore<IMU[]>([]);

export const $editedImu = combine(
    $customRewardedIMUs,
    adminPanelModel.stores.$adminModal,
    (imus, { entityIdToBeManage, entity, mode }) => {
        if (imus.length && entityIdToBeManage && entity === 'rewards' && mode === 'update') {
            return imus.find(({ id }) => id === entityIdToBeManage);
        }
        return null;
    }
);
