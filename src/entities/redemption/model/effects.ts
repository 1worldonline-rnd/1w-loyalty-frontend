import { createEffect } from 'effector';
import { redemptionApi } from '@/shared/api';

export const getCatalogsByPartnerIdFx = createEffect(
    async (payload: Parameters<typeof redemptionApi.fetchCatalogsByPartnerId>[0]) => {
        const [
            {
                data: { content: allCatalogs },
            },
            {
                data: { content: catalogsWithNoEmptyProductList },
            },
        ] = await Promise.all([
            redemptionApi.fetchCatalogsByPartnerId(payload),
            redemptionApi.fetchCatalogsWithNoEmptyProductListByPartnerId(payload),
        ]);

        return allCatalogs.map((catalog) => {
            const catalogWithNoEmptyProductList = catalogsWithNoEmptyProductList.find(
                ({ id }) => id === catalog.id
            );

            return {
                ...catalog,
                itemCount: catalogWithNoEmptyProductList?.itemCount || 0,
            };
        });
    }
);

export const createCatalogFx = createEffect(redemptionApi.fetchCreateCatalog);

export const updateCatalogFx = createEffect(redemptionApi.fetchUpdateCatalog);

export const updateItemPositionsFx = createEffect(redemptionApi.fetchUpdateItemPositions);

export const getCatalogByIdFx = createEffect(redemptionApi.fetchCatalogById);

export const getProductsByCatalogIdFx = createEffect(redemptionApi.fetchProductsByCatalogId);

export const getProductsByPartnerIdFx = createEffect(redemptionApi.fetchProductsByPartnerId);

export const getProductByIdFx = createEffect(redemptionApi.fetchProductById);

export const getCatalogsByWidgetIdFx = createEffect(redemptionApi.fetchCatalogsListByWidgetId);

export const createProductsFx = createEffect(redemptionApi.fetchCreateProducts);

export const updateProductFx = createEffect(redemptionApi.fetchUpdateProduct);

export const getPurchasedProductsByWidgetIdFx = createEffect(redemptionApi.fetchPurchasedProductsByWidgetId);

export const sendProductPurchaseFx = createEffect(redemptionApi.fetchSendProductPurchase);

export const attachWidgetToCatalogFx = createEffect(redemptionApi.fetchAttachWidgetToCatalog);

export const detachWidgetFromCatalogFx = createEffect(redemptionApi.fetchDetachWidgetFromCatalog);

export const deleteProduct = createEffect(redemptionApi.fetchDeleteProductFx);
