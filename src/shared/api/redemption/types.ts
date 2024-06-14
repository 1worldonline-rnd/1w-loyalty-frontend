import type { Nullable } from '@/shared/utility-types';
import type { Partner, PartnerId } from '../partner/types';
import type { WidgetConfig } from '../widget-config/types';

export type Catalog = {
    id: string;
    name: string;
    partnerExternalId: Partner['externalId'];
    redemptionItems?: Product[];
    createdAt: string;
    updatedAt: string;
    widgetCodeId?: Nullable<WidgetConfig['guid']>;
    itemCount?: number;
    // active?: boolean;
};

export type ProductPosition = {
    redemptionItemId: string;
    position: number;
}

export type Product = {
    id: string;
    company: string;
    order: number;
    availableCount: number;
    initialCount: number;
    isPurchased: boolean;
    description: string;
    image: string;
    link: string;
    priceGlobal: number;
    priceLocal: number;
    purchaseDescription: string;
    shortDescription: string;
    title: string;
    type: 'Physical' | 'Voucher' | 'Ticket';
    lockerType: 'EMPTY' | 'SEQUENCE_FEED';
    lockerId: string;
    limitPerUser: number;
    firstItemAction: 'DEFAULT' | 'FREE';
    expirationDate: string;
    snapshotDate: string;
    updatedAt: string;
    createdAt: string;
    active: boolean;
    partnerExternalId: PartnerId;
    isLocked: boolean;
    purchasedCount?: number;
    catalogs?: Nullable<CatalogMeta[]>;
    position?: number;
};

export type CatalogMeta = {
    id: string;
    name: string
};

export type ProductRedeemed = {
    loyaltyWidgetId: string;
    price: number;
    id?: string;
    purchaserId: number;
    purchasedAt?: string;
    redemptionVoucher?: {
        voucherCode: string;
    };
    redemptionCatalogId: string;
    redemptionItem: Product;
    tickets?: Array<{
        data: string;
        id: string;
        purchasedAt: string;
    }>;
    purchasedCount: number;
};

export type RedemptionPagination = {
    pageable: {
        pageNumber: number;
        pageSize: number;
    };
    totalPages: number;
};
