import { sample } from 'effector';
import { createGate } from 'effector-react';
import { redemptionModel } from '@/entities/redemption';
import { userModel } from '@/entities/user';

export const catalogTableMounted = createGate();

sample({
    clock: catalogTableMounted.open,
    source: userModel.stores.$partnerId,
    filter: Boolean,
    target: redemptionModel.effects.getCatalogsByPartnerIdFx,
});
