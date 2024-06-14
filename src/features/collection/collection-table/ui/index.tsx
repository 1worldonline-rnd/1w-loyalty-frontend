import styled from 'styled-components';
import { useGate, useStore } from 'effector-react';
import { Table, TextWithEllipsis } from '@/shared/ui';
import { useCustomRouter } from '@/shared/hooks';
import { styles } from './styles';
import { collectionModel } from '@/entities/collection';
import { collectionTableGate } from '../model';
import { useTranslation } from 'next-i18next';
import { Button } from '@/shared/rsuite/admin-panel';
import { Route } from '@/shared/constants';
import { FlexboxGrid } from 'rsuite';

const { Td, Th, Tr } = Table;

export const CollectionTable = styled(() => {
    useGate(collectionTableGate);

    const collections = useStore(collectionModel.stores.$collections);
    const isPendingCollections = useStore(collectionModel.effects.getCollectionsFx.pending);

    const { push } = useCustomRouter();

    const collectionTranslation = useTranslation('features.collection', { keyPrefix: 'collection-table' });

    return (
        <div>
            <Table
                isLoading={isPendingCollections}
                noDataComponent={collectionTranslation.t('no-collections-message')}
                templateColumns={[4, 1]}
                head={
                    <Tr>
                        <Th>{collectionTranslation.t('collection-name-th-label')}</Th>
                        <Th />
                    </Tr>
                }
                body={collections.map(({ id, name }) => {
                    return (
                        <Tr key={id}>
                            <Td>
                                <TextWithEllipsis>{name}</TextWithEllipsis>
                            </Td>

                            <Td>
                                <FlexboxGrid justify="end" style={{ width: '100%' }}>
                                    <Button
                                        size="md"
                                        onClick={() => {
                                            push({
                                                pathname: Route.admin.collectionManager(id),
                                            });
                                        }}
                                    >
                                        {collectionTranslation.t('button-to-collection-page-label')}
                                    </Button>
                                </FlexboxGrid>
                            </Td>
                        </Tr>
                    );
                })}
            />
        </div>
    );
})`
    ${styles}
`;
