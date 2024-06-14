import { customRewardsApi } from '@/shared/api';
import { createEffect } from 'effector';

export const getPartnerImusByPartnerIdFx = createEffect(customRewardsApi.fetchPartnerImusByPartnerId);

export const getPartnerImusByTypeFx = createEffect(customRewardsApi.fetchPartnerImusByType);

export const createCustomRewardsByPartnerIdFx = createEffect(customRewardsApi.createCustomRewardsByPartnerId);

export const deleteCustomRewardsByPartnerIdFx = createEffect(customRewardsApi.deleteCustomRewardsByPartnerId);

export const updateCustomRewardsByPartnerIdFx = createEffect(customRewardsApi.updateCustomRewardsByPartnerId);
