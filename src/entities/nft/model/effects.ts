import { nftCollectionsApi, nftWidgetApi } from '@/shared/api';
import { createEffect } from 'effector';

export const getNftCollectionsFx = createEffect(nftCollectionsApi.fetchNftCollections);

export const getNftWidgetsFx = createEffect(nftWidgetApi.fetchNftWidgets);

export const getNftsByCollectionIdFx = createEffect(nftCollectionsApi.fetchNftByCollectionId);

export const createNftCollectionFx = createEffect(nftCollectionsApi.fetchCreateNftCollection);

export const createNftFx = createEffect(nftCollectionsApi.fetchCreateNft);

export const createNftWidgetFx = createEffect(nftWidgetApi.fetchCreateNftWidget);

export const updateNftWidgetFx = createEffect(nftWidgetApi.fetchUpdateNftWidget);

export const updatedNftCollectionAccessFx = createEffect(nftCollectionsApi.fetchUpdateNftCollectionAccess);
