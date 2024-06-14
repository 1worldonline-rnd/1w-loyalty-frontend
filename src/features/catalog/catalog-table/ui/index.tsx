import { redemptionModel } from '@/entities/redemption';
import { Route } from '@/shared/constants';
import { useCustomRouter } from '@/shared/hooks';
import { Button } from '@/shared/rsuite/admin-panel';
import { Table, TextWithEllipsis } from '@/shared/ui';
import { PropsWithClassName } from '@/shared/utility-types';
import { useGate, useStore } from 'effector-react';
import { FlexboxGrid } from 'rsuite';
import styled from 'styled-components';
import { catalogTableMounted } from '../model';
import { styles } from './styles';

const { Td, Th, Tr } = Table;

const { format: formatDate } = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
});

export const CatalogTable = styled((props: PropsWithClassName) => {
    const { className } = props;

    useGate(catalogTableMounted);

    const catalogs = useStore(redemptionModel.stores.$catalogsOfPartner);

    const isFetchingCatalogs = useStore(redemptionModel.effects.getCatalogsByPartnerIdFx.pending);

    const { push } = useCustomRouter();

    return (
        <div className={className}>
            <Table
                isLoading={isFetchingCatalogs}
                noDataComponent="Catalogs list is empty"
                templateColumns={[3, 2, 2, 2]}
                head={
                    <Tr>
                        <Th>Name</Th>
                        <Th>Products</Th>
                        <Th>Updated</Th>
                        <Th />
                    </Tr>
                }
                body={catalogs.map((catalog) => {
                    return (
                        <Tr key={catalog.id}>
                            <Td>
                                <TextWithEllipsis>{catalog.name}</TextWithEllipsis>
                            </Td>
                            <Td>{catalog.itemCount || 0}</Td>
                            <Td>{formatDate(new Date(catalog.updatedAt))}</Td>
                            <Td>
                                <FlexboxGrid justify="end" style={{ width: '100%' }}>
                                    <Button
                                        size="md"
                                        onClick={() => {
                                            push({
                                                pathname: Route.admin.catalogManager(String(catalog.id)),
                                            });
                                        }}
                                    >
                                        Manage
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
