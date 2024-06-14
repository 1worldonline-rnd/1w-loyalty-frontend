import { adminPanelModel } from '@/entities/admin-panel';
import { redemptionModel } from '@/entities/redemption';
import { userModel } from '@/entities/user';
import { feedModel } from '@/entities/feed';
import { combine, createEvent, createStore, sample } from 'effector';
import { Nullable } from '@/shared/utility-types';

export const $catalogOptions = redemptionModel.stores.$catalogsOfPartner.map((catalogs) => {
    return catalogs.map((catalog) => ({
        label: catalog.name,
        value: catalog.id,
    }));
});

export const $sequenceFeedOptions = feedModel.stores.$sequences.map((feeds) => {
    return feeds.map((feed) => ({
        label: feed.name,
        value: feed.id,
    }));
});

export const $editedProduct = combine(
    redemptionModel.stores.$productsOfPartner,
    adminPanelModel.stores.$adminModal,
    (products, { entityIdToBeManage, entity, mode }) => {
        if (products.length && entityIdToBeManage && entity === 'product' && mode === 'update') {
            return products.find(({ id }) => id === entityIdToBeManage);
        }
        return null;
    }
);

export const $activeCatalogId = createStore<Nullable<string>>(null);

export const setActiveCatalogId = createEvent<Nullable<string>>();

$activeCatalogId.on(setActiveCatalogId, (_, activeCatalogId) => {
    return activeCatalogId;
});

sample({
    clock: [redemptionModel.effects.createProductsFx.done, redemptionModel.effects.updateProductFx.done],
    source: userModel.stores.$partnerId,
    filter: Boolean,
    target: redemptionModel.effects.getProductsByPartnerIdFx,
});
