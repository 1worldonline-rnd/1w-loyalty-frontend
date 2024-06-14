import { nftModel } from '@/entities/nft';
import { userModel } from '@/entities/user';
import { PartnerId } from '@/shared/api/partner/types';
import { sample } from 'effector';

sample({
    clock: [nftModel.effects.createNftCollectionFx.done, nftModel.effects.updatedNftCollectionAccessFx.done],
    source: userModel.stores.$partnerId,
    filter: Boolean,
    target: nftModel.effects.getNftCollectionsFx.prepend((partnerId: PartnerId) => ({
        partnerId: partnerId,
        pageSize: 500,
        page: 1,
        sorts: { created: 'DESC' },
    })),
});
