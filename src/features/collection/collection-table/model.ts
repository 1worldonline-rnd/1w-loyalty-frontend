import { collectionModel } from '@/entities/collection';
import { userModel } from '@/entities/user';
import { sample } from 'effector';
import { createGate } from 'effector-react';

export const collectionTableGate = createGate();

sample({
    clock: collectionTableGate.open,
    source: userModel.stores.$partnerId,
    filter: Boolean,
    target: collectionModel.effects.getCollectionsFx,
});
