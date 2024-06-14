import { collectionModel } from '@/entities/collection';
import { userModel } from '@/entities/user';
import { Route } from '@/shared/constants';
import { useCustomRouter } from '@/shared/hooks';
import { Button } from '@/shared/rsuite/admin-panel';
import { PropsWithClassName } from '@/shared/utility-types';
import { useStore } from 'effector-react';
import styled from 'styled-components';

export const CollectionSettings = styled((props: PropsWithClassName) => {
    const { className } = props;

    const { push } = useCustomRouter();

    const isDeleting = useStore(collectionModel.effects.deleteCollectionFx.pending);
    const activeCollectionId = useStore(collectionModel.stores.$activeCollectionId);
    const partnerId = useStore(userModel.stores.$partnerId);

    return (
        <div className={className}>
            <Button
                color="red"
                loading={isDeleting}
                onClick={() => {
                    if (
                        confirm('Are you want to delete this collection?') &&
                        activeCollectionId &&
                        partnerId
                    ) {
                        collectionModel.effects
                            .deleteCollectionFx({
                                collectionId: activeCollectionId,
                                partnerId,
                            })
                            .then(() => {
                                push({
                                    pathname: Route.admin.collections,
                                });
                            });
                    }
                }}
            >
                Delete
            </Button>
        </div>
    );
})`
    padding-block-start: 14px;
`;
