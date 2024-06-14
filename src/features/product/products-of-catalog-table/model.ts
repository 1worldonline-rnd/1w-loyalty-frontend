import { redemptionModel } from '@/entities/redemption';
import { sample } from 'effector';

sample({
    source: redemptionModel.effects.getCatalogByIdFx.done,
    fn: ({ params: { catalogId, partnerId } }) => ({ catalogId, partnerId, size: 1000, isPurchased: false }),
    target: redemptionModel.effects.getProductsByCatalogIdFx,
});
