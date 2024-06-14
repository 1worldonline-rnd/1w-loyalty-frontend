import { axios } from '@/shared/lib/axios';
import type { Nullable, PartialBy } from '@/shared/utility-types';
import type { PartnerId } from '../partner/types';
import { WidgetConfig } from '../widget-config/types';
import type { Catalog, Product, ProductPosition, ProductRedeemed, RedemptionPagination } from './types';

export type PayloadToCreateCatalog = Pick<Catalog, 'name' | 'partnerExternalId' | 'redemptionItems'>;

export const fetchCreateCatalog = (payload: PayloadToCreateCatalog) => {
    return axios.post<Catalog>('/redemptions', payload);
};

export type PayloadToUpdateCatalog = {
    catalog: Omit<Catalog, 'createdAt' | 'updatedAt' | 'redemptionItems'> & {
        redemptionItems: PartialBy<Product, 'id' | 'order'>[];
    };
    partnerId: PartnerId;
};

export const fetchUpdateCatalog = ({ catalog, partnerId }: PayloadToUpdateCatalog) => {
    return axios.put<Omit<Catalog, 'redemptionItems'> & { redemptionItems: Product[] }>(
        '/redemptions',
        catalog,
        { params: { partnerId } }
    );
};

export type PayloadToUpdateItemPositions = {
    catalogId: Catalog['id'];
    partnerId: PartnerId;
    positions: ProductPosition[];
};

export const fetchUpdateItemPositions = ({
    catalogId,
    partnerId,
    positions,
}: PayloadToUpdateItemPositions) => {
    axios.patch('/redemptions/items/positions', positions, {
        params: {
            partnerId,
            catalogId,
        },
    });
};

export const fetchCatalogsByPartnerId = (partnerId: PartnerId) => {
    return axios.get<{ content: Catalog[] }>(`/redemptions/all/catalogs/partners/${partnerId}`, {
        params: {
            page: 0,
            size: 100,
        },
    });
};

export const fetchCatalogsWithNoEmptyProductListByPartnerId = (partnerId: PartnerId) => {
    return axios.get<{ content: Catalog[] }>(`/redemptions/catalogs/partners/${partnerId}`, {
        params: {
            page: 0,
            size: 100,
        },
    });
};

export const fetchCatalogById = ({
    catalogId,
    partnerId,
}: {
    catalogId: Catalog['id'];
    partnerId: PartnerId;
}) => {
    return axios.get<Catalog>(`/redemptions/catalogs/${catalogId}`, { params: { partnerId } });
};

export const fetchProductsByCatalogId = (payload: {
    catalogId: Catalog['id'];
    page?: number;
    size?: number;
    partnerId: PartnerId;
    isPurchased?: boolean;
}) => {
    const { catalogId, page = 0, size = 18, partnerId, isPurchased = false } = payload;

    return axios.get<{ content: Product[] } & RedemptionPagination>(
        `/redemptions/catalogs/${catalogId}/items`,
        {
            params: {
                page,
                size,
                partnerId,
                order: 'ASC',
                isPurchased,
            },
        }
    );
};

export type PayloadToCreateOrUpdateProduct = {
    partnerId: PartnerId;
} & Pick<
    Product,
    | 'company'
    | 'initialCount'
    | 'availableCount'
    | 'description'
    | 'image'
    | 'link'
    | 'priceGlobal'
    | 'priceLocal'
    | 'title'
    | 'type'
    | 'lockerId'
    | 'lockerType'
    | 'firstItemAction'
    | 'snapshotDate'
    | 'expirationDate'
    | 'limitPerUser'
    | 'purchaseDescription'
    | 'shortDescription'
    | 'partnerExternalId'
    | 'catalogs'
>;

export const fetchCreateProducts = ({ partnerId, ...payload }: PayloadToCreateOrUpdateProduct) => {
    return axios.post('/redemptions/items', payload, { params: { partnerId } });
};

export const fetchUpdateProduct = ({ partnerId, ...payload }: PayloadToCreateOrUpdateProduct) => {
    return axios.put('/redemptions/items', payload, { params: { partnerId } });
};

export const fetchProductsByPartnerId = (partnerId: PartnerId) => {
    return axios.get<{ content: Product[] } & RedemptionPagination>(
        `/redemptions/partners/${partnerId}/items`,
        {
            params: {
                page: 0,
                size: 500,
            },
        }
    );
};

export const fetchProductById = (payload: { productId: string; partnerId: PartnerId }) => {
    return axios.get<Product>(`/redemptions/partners/${payload.partnerId}/items/${payload.productId}`);
};

export const fetchCatalogsListByWidgetId = ({ widgetId }: { widgetId: WidgetConfig['guid'] }) => {
    return axios.get<{ content: Catalog[] } & RedemptionPagination>(
        `/redemptions/catalogs/widgets/${widgetId}`,
        {
            params: {
                page: 0,
                size: 100,
            },
        }
    );
};

export const fetchPurchasedProductsByWidgetId = ({ widgetId }: { widgetId: string }) => {
    return axios.post<ProductRedeemed[]>(`/redemptions/purchases/criteria`, {
        loyaltyWidgetIds: [widgetId],
    });
};

export const fetchSendProductPurchase = ({
    widgetId,
    productId,
    catalogId,
}: {
    widgetId: string;
    productId: string;
    catalogId: string;
}) => {
    return axios.post<{ id: ProductRedeemed['id'] }[]>(`/redemptions/purchases`, {
        widgetId,
        redemptionItem: {
            id: productId,
        },
        redemptionCatalogId: catalogId,
    });
};

export const fetchUploadFileWithVouchersToProduct = ({
    partnerGuid,
    productId,
    formData,
}: {
    partnerGuid: PartnerId;
    productId: Product['id'];
    formData: FormData;
}) => {
    return axios.post(`/redemptions/vouchers/partners/${partnerGuid}/items/${productId}`, formData);
};

export const fetchAttachWidgetToCatalog = ({
    widgetId,
    catalogId,
    partnerId,
}: {
    widgetId: Nullable<WidgetConfig['guid']>;
    catalogId: Catalog['id'];
    partnerId: PartnerId;
}) => {
    return axios.patch(`/redemptions/catalogs/${catalogId}/widgets/${widgetId}`, null, {
        params: { partnerId },
    });
};

export const fetchDetachWidgetFromCatalog = ({
    catalogId,
    partnerId,
}: {
    catalogId: Catalog['id'];
    partnerId: PartnerId;
}) => {
    return axios.patch(`/redemptions/catalogs/${catalogId}/widgets`, null, { params: { partnerId } });
};

export const fetchDeleteProductFx = ({
    productId,
    partnerId,
}: {
    productId: Product['id'];
    partnerId: PartnerId;
}) => {
    return axios.delete(`/redemptions/items/${productId}`, {
        params: {
            partnerId,
        },
    });
};

export const fetchExportParticipants = ({
    productId,
    partnerId,
}: {
    productId: Product['id'];
    partnerId: PartnerId;
}) => {
    return axios.get(`/redemptions/participants/exports`, {
        params: {
            partnerId,
            itemId: productId,
        },
    });
};
