import { redemptionModel } from '@/entities/redemption';

export const $catalogOptions = redemptionModel.stores.$catalogsOfPartner.map((catalogs) => {
    return catalogs.map((catalog) => ({
        label: catalog.name,
        value: catalog.id,
    }));
});

redemptionModel.stores.$catalogsOfPartner
    .on(
        redemptionModel.effects.attachWidgetToCatalogFx.done,
        (catalogs, { params: { catalogId, widgetId } }) => {
            return catalogs.map((catalog) => {
                if (catalog.id === catalogId) {
                    return {
                        ...catalog,
                        widgetCodeId: widgetId,
                    };
                }
                return catalog;
            });
        }
    )
    .on(redemptionModel.effects.detachWidgetFromCatalogFx.done, (catalogs, { params: { catalogId } }) => {
        return catalogs.map((catalog) => {
            if (catalog.id === catalogId) {
                return {
                    ...catalog,
                    widgetCodeId: null,
                };
            }
            return catalog;
        });
    });
