import { axios } from '@/shared/lib/axios';
import {
    Nft,
    NftCollection,
    NftCollectionCriteriaPayload,
    NftCollectionUpdateAccessPayload,
    NftCreationPayload,
} from './types';

export const fetchNftCollections = (payload: NftCollectionCriteriaPayload) => {
    return axios.post<{ content: NftCollection[] }>('/nft/collections/criteria', payload);
};

export const fetchNftByCollectionId = (collectionId: NftCollection['id']) => {
    return axios.get<{ content: Nft[] }>('/nft', {
        params: {
            collectionId,
            pageSize: 500,
            page: 1,
            sort: 'created',
            direction: 'desc',
        },
    });
};

export const fetchCreateNftCollection = (payload: NftCollection) => {
    return axios.post<NftCollection>('/nft/collections', payload);
};

export const fetchCreateNft = (payload: NftCreationPayload) => {
    return axios.post<Nft>('/nft', payload.nft, {
        params: {
            partnerId: payload.partnerId,
        },
    });
};

export const fetchUpdateNftCollectionAccess = (payload: NftCollectionUpdateAccessPayload) => {
    return axios.patch(
        `/nft/collections/${payload.collectionId}/partners/${payload.partnerId}/access`,
        null,
        {
            params: {
                isAccessGranted: payload.isAccessGranted,
            },
        }
    );
};
