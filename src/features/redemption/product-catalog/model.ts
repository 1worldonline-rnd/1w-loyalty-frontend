import { redemptionModel } from '@/entities/redemption';
import { userModel } from '@/entities/user';
import { widgetConfigModel } from '@/entities/widget-config';
import { combine, sample } from 'effector';

export const $isAvailableProductsLoading = combine(
    [
        redemptionModel.effects.getCatalogsByWidgetIdFx.pending,
        redemptionModel.effects.getProductsByCatalogIdFx.pending,
    ],
    (flags) => flags.some(Boolean)
);

export const $isRedeemedProductsLoading = combine(
    [redemptionModel.effects.getPurchasedProductsByWidgetIdFx.pending],
    (flags) => flags.some(Boolean)
);

sample({
    clock: redemptionModel.effects.sendProductPurchaseFx.doneData,
    source: {
        widgetId: widgetConfigModel.stores.$globalWidgetConfigId,
    },
    filter: ({ widgetId }, { data }) => Boolean(widgetId) && Boolean(data[0].id),
    fn: ({ widgetId }) => ({
        widgetId: widgetId as string,
    }),
    target: redemptionModel.effects.getPurchasedProductsByWidgetIdFx,
});

sample({
    clock: redemptionModel.effects.sendProductPurchaseFx.doneData,
    source: {
        widgetId: widgetConfigModel.stores.$globalWidgetConfigId,
    },
    filter: ({ widgetId }) => Boolean(widgetId),
    fn: ({ widgetId }) => widgetId as string,
    target: userModel.effects.getConvertibleBalanceFx,
});

sample({
    clock: redemptionModel.effects.sendProductPurchaseFx.doneData,
    source: {
        catalogId: redemptionModel.stores.$activeCatalogId,
        pagination: redemptionModel.stores.$availableProductsPagination,
        widget: widgetConfigModel.stores.$globalWidgetConfig,
    },
    filter: ({ catalogId, widget }) => Boolean(catalogId && widget?.partner),
    fn: ({ pagination: { pageable }, widget, catalogId }) => ({
        catalogId,
        page: pageable.pageNumber,
        size: pageable.pageSize,
        partnerId: String(widget?.partner.guid),
    }),
    target: redemptionModel.effects.getProductsByCatalogIdFx,
});

const $widgetPartnerId = widgetConfigModel.stores.$globalWidgetConfig.map((widget) => {
    return widget?.partner.guid;
});

sample({
    clock: [redemptionModel.stores.$activeCatalogId, $widgetPartnerId],
    source: {
        pagination: redemptionModel.stores.$availableProductsPagination,
        widgetPartnerId: $widgetPartnerId,
        activeCatalogId: redemptionModel.stores.$activeCatalogId,
    },
    filter: ({ widgetPartnerId, activeCatalogId }) => Boolean(activeCatalogId && widgetPartnerId),
    fn: ({ pagination: { pageable }, widgetPartnerId, activeCatalogId }) => ({
        catalogId: activeCatalogId,
        page: pageable.pageNumber,
        size: pageable.pageSize,
        partnerId: String(widgetPartnerId),
    }),
    target: redemptionModel.effects.getProductsByCatalogIdFx,
});
