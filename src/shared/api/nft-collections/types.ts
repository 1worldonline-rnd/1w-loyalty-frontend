import { PartnerId } from '@/shared/api/partner/types';

export type NftCollection = {
    id: string;
    status: 'ACTIVE' | 'FAILED';
    name: string;
    description: string;
    symbol: string;
    smartContractAddress: string;
    ownerWalletAddress: string;
    partnerId: PartnerId;
    isAccessGranted: boolean;
    blockchain: 'POLYGON' | 'CASPER' | 'CAMINO';
    created?: string;
};

export type Nft = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    metadataUrl: string;
    tokenId?: number;
    collectionId: string;
    isPreMinted: boolean;
    status?: 'NON_MINTED' | 'MINTED' | 'RESERVED' | 'LOCKED' | 'TAKEN';
    created?: string;
};

export type NftCreationPayload = {
    nft: Nft;
    partnerId: PartnerId;
};

export type NftCollectionCriteriaPayload = {
    partnerId: PartnerId;
    pageSize: number;
    page: number;
    sorts?: { [key: string]: string };
};

export type NftCollectionUpdateAccessPayload = {
    isAccessGranted: boolean;
    partnerId: PartnerId;
    collectionId: string;
};
