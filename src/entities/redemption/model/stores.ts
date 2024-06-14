import { combine, createStore } from 'effector';
import type { Catalog, RedemptionPagination, Product, ProductRedeemed } from '@/shared/api/redemption/types';
import { Nullable } from '@/shared/utility-types';

// admin part

export const $catalogsOfPartner = createStore<Catalog[]>([]);

export const $productsOfPartner = createStore<Product[]>([]);

// loyalty platform part

export const $redeemedProducts = createStore<ProductRedeemed[]>([]);

export const $availableProducts = createStore<Product[]>([]);

export const $availableProductsPagination = createStore<RedemptionPagination>({
    pageable: {
        pageNumber: 0,
        pageSize: 18,
    },
    totalPages: 0,
});

export const $activeCatalogId = createStore<string>('');

export const $showProductDetailsModal = createStore(false);

export const $selectedProduct = createStore<Nullable<Product | ProductRedeemed>>(null);
