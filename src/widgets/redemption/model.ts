import { redemptionModel } from '@/entities/redemption';
import { sample } from 'effector';

sample({
    clock: redemptionModel.effects.getPurchasedProductsByWidgetIdFx.doneData,
    filter: ({ data }) => Boolean(data.length),
    fn: ({ data }) => data[0],
    target: redemptionModel.events.setSelectedProduct,
});

sample({
    clock: redemptionModel.events.toggleProductDetailsModal,
    filter: Boolean,
    fn: () => window.parent.postMessage(JSON.stringify({ message: 'modal-open' }), '*'),
});
