import { redemptionModel } from '@/entities/redemption';
import { userModel } from '@/entities/user';
import { sample } from 'effector';

sample({
    clock: redemptionModel.effects.createCatalogFx.done,
    source: userModel.stores.$partnerId,
    filter: Boolean,
    target: redemptionModel.effects.getCatalogsByPartnerIdFx,
});
