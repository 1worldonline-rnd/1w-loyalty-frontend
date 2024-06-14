import { sample } from 'effector';
import { getNftCollectionsFx, getNftWidgetsFx, getNftsByCollectionIdFx } from './effects';
import { setActiveNftCollectionId } from './events';
import { $nftCollections, $nftsByCollectionId, $activeNftCollectionId, $nftWidgets } from './stores';
import { userModel } from '@/entities/user';
import { PartnerId } from '@/shared/api/partner/types';

$nftCollections.on(getNftCollectionsFx.doneData, (_, { data }) => {
    return data.content;
});

$nftWidgets.on(getNftWidgetsFx.doneData, (_, { data }) => {
    return data.content;
});

sample({
    clock: userModel.stores.$isAdminPanelAvailable,
    filter: userModel.stores.$isAdminPanelAvailable.map(Boolean),
    source: userModel.stores.$partnerId.map(String),
    target: getNftCollectionsFx.prepend((partnerId: PartnerId) => ({
        partnerId: partnerId,
        pageSize: 500,
        page: 1,
        sorts: { created: 'DESC' },
    })),
});

sample({
    clock: userModel.stores.$isAdminPanelAvailable,
    filter: userModel.stores.$isAdminPanelAvailable.map(Boolean),
    source: userModel.stores.$partnerId.map(String),
    target: getNftWidgetsFx.prepend((partnerId: PartnerId) => ({
        partnerId: partnerId,
        pageSize: 500,
        page: 1,
        sorts: { created: 'DESC' },
    })),
});

$nftsByCollectionId.on(getNftsByCollectionIdFx.doneData, (_, { data }) => {
    return data.content;
});

$activeNftCollectionId.on(setActiveNftCollectionId, (_, id) => id);
