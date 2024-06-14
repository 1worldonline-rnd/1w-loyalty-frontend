import { collectionModel } from '@/entities/collection';
import { userModel } from '@/entities/user';
import { sample } from 'effector';

sample({
    clock: collectionModel.effects.createCollectionFx.done,
    source: userModel.stores.$partnerId,
    filter: Boolean,
    target: collectionModel.effects.getCollectionsFx,
});
