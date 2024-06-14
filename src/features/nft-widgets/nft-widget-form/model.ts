import { nftModel } from '@/entities/nft';
import { getNftWidgetsFx } from '@/entities/nft/model/effects';
import { userModel } from '@/entities/user';
import { PartnerId } from '@/shared/api/partner/types';
import { sample } from 'effector';

sample({
    clock: [nftModel.effects.createNftWidgetFx.done, nftModel.effects.updateNftWidgetFx.done],
    source: userModel.stores.$partnerId,
    filter: Boolean,
    target: getNftWidgetsFx.prepend((partnerId: PartnerId) => ({
        partnerId: partnerId,
        pageSize: 500,
        page: 1,
        sorts: { created: 'DESC' },
    })),
});
