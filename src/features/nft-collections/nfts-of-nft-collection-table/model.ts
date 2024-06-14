import { nftModel } from '@/entities/nft';
import { NftCollection } from '@/shared/api/nft-collections/types';
import { sample } from 'effector';

sample({
    clock: [nftModel.stores.$activeNftCollectionId, nftModel.effects.createNftFx.doneData],
    source: nftModel.stores.$activeNftCollectionId,
    filter: Boolean,
    target: nftModel.effects.getNftsByCollectionIdFx,
});
