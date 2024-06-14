import { userModel } from '@/entities/user';
import { sample } from 'effector';
import * as effects from './effects';
import * as stores from './stores';
import * as events from './events';

/*
1. when store $isAdminPanelAvailable was changing
2. check $isAdminPanelAvailable true
3. take the value of userModel.stores.$partnerId
4. call request to get catalogs and products
*/
sample({
    clock: [userModel.stores.$isAdminPanelAvailable], // 1
    filter: userModel.stores.$isAdminPanelAvailable.map(Boolean), // 2
    source: userModel.stores.$partnerId.map(String), // 3
    target: [effects.getCatalogsByPartnerIdFx, effects.getProductsByPartnerIdFx], // 4
});

stores.$catalogsOfPartner
    .on(effects.getCatalogsByPartnerIdFx.doneData, (_, catalogs) => {
        return catalogs.sort((a, b) => {
            return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
        });
    })
    .on(effects.getCatalogByIdFx.doneData, (catalogs, { data: newCatalog }) => {
        // if response data has 'id' so request is success
        if (newCatalog.id) {
            // if the widget is in the list we need to update
            if (catalogs.find(({ id }) => id === newCatalog.id)) {
                return catalogs.map((catalog) => {
                    if (catalog.id === newCatalog.id) {
                        return newCatalog;
                    }
                    return catalog;
                });
            }
            // or add in the list
            return catalogs.concat([newCatalog]);
        }
        return catalogs;
    })
    .on(effects.getProductsByCatalogIdFx.done, (catalogs, { params: { catalogId }, result }) => {
        return catalogs.map((catalog) => {
            if (catalog.id === catalogId) {
                return {
                    ...catalog,
                    redemptionItems: result.data.content,
                };
            }
            return catalog;
        });
    })
    .on(effects.updateCatalogFx.doneData, (catalogs, { data: updatedCatalog }) => {
        return catalogs.map((catalog) => {
            if (catalog.id === updatedCatalog.id) {
                return {
                    ...updatedCatalog,
                    redemptionItems: updatedCatalog.redemptionItems.sort((a, b) => {
                        return a.order - b.order;
                    }),
                };
            }
            return catalog;
        });
    })
    .on(effects.updateProductFx.doneData, (catalogs, { data: updatedProduct }) => {
        return catalogs.map((catalog) => {
            return {
                ...catalog,
                redemptionItems: (catalog.redemptionItems || []).map((product) => {
                    if (product.id === updatedProduct.id) {
                        return updatedProduct;
                    }
                    return product;
                }),
            };
        });
    });

stores.$productsOfPartner.on(
    effects.getProductsByPartnerIdFx.doneData,
    (_, { data: { content } }) => content
);
// .on(effects.updateProductFx.doneData, (products, { data: updatedProduct }) => {
//     return products;
// });

stores.$availableProducts.on(effects.getProductsByCatalogIdFx.doneData, (_, { data }) => {
    return data.content.filter((product) => product.active);
});

stores.$redeemedProducts.on(effects.getPurchasedProductsByWidgetIdFx.doneData, (_, { data }) => {
    return data;
});

// TODO: rename store because it is not clear where active in the admin panel or where
stores.$activeCatalogId.on(effects.getCatalogsByWidgetIdFx.doneData, (activeCatalogId, { data }) => {
    if (data.content.length) {
        return data.content[0].id;
    }
    return activeCatalogId;
});

stores.$availableProductsPagination.on(effects.getProductsByCatalogIdFx.doneData, (_pagination, { data }) => {
    const { content: _, ...pagination } = data;

    return pagination;
});

stores.$showProductDetailsModal.on(events.toggleProductDetailsModal, (_, payload) => payload);

stores.$selectedProduct.on(events.setSelectedProduct, (_, payload) => payload);
