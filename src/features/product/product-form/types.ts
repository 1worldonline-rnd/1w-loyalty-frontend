import type { Product } from '@/shared/api/redemption/types';
import type { Nullable } from '@/shared/utility-types';

export type ProductValues = Pick<
    Product,
    'company' | 'title' | 'description' | 'image' | 'link' | 'purchaseDescription' | 'shortDescription' |
    'expirationDate' | 'snapshotDate'
> & {
    type: { value: string; label: string };
    firstItemAction: { value: string; label: string };
    lockerType: { value: string; label: string };
    catalogs: Nullable<{ value: string; label: string }[]>;
    lockerId: Nullable<{ value: string; label: string }>;
    priceGlobal: string;
    priceLocal: string;
    initialCount: string;
    limitPerUser: string;
};
