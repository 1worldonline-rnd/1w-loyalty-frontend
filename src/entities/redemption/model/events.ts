import { createEvent } from 'effector';
import { Nullable } from '@/shared/utility-types';
import { Product, ProductRedeemed } from '@/shared/api/redemption/types';

export const toggleProductDetailsModal = createEvent<boolean>();

export const setSelectedProduct = createEvent<Nullable<Product | ProductRedeemed>>();

export const redemptionCardRendered = createEvent<boolean>();
