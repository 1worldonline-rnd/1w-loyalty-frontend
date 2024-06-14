import { createEvent, createStore } from 'effector';
import type { AdminModal } from './types';

const $adminModal = createStore<AdminModal>({
    isOpen: false,
});

const adminModalToggled = createEvent<Partial<AdminModal>>();

const closeModal = createEvent();

$adminModal
    .on(adminModalToggled, (a, b) => ({
        ...a,
        ...b,
    }))
    .reset(closeModal);

export const adminPanelModel = {
    stores: { $adminModal },
    events: { adminModalToggled, closeModal },
};
