import { adminPanelModel } from '@/entities/admin-panel';
import { redemptionModel, SelectedProductsList } from '@/entities/redemption';
import { userModel } from '@/entities/user';
import { Catalog, Product } from '@/shared/api/redemption/types';
import { Button, Modal } from '@/shared/rsuite/admin-panel';
import { Loader } from '@/shared/ui';
import { PropsWithClassName } from '@/shared/utility-types';
import { useStore } from 'effector-react';
import { useState } from 'react';
import { FlexboxGrid } from 'rsuite';
import styled from 'styled-components';
import { styles } from './styles';

export type SelectingProductsToCatalogProps = PropsWithClassName<{
    open: boolean;
    selectedProductsIds: Product['id'][];
    catalog: Catalog;
    onClose: () => void;
}>;

export const SelectingProductsToCatalog = styled((props: SelectingProductsToCatalogProps) => {
    const { className, open, selectedProductsIds, catalog, onClose } = props;

    const [localSelectedProductsIds, setLocalSelectedProductsIds] = useState(selectedProductsIds);

    const allProducts = useStore(redemptionModel.stores.$productsOfPartner);
    const isUpdatingCatalog = useStore(redemptionModel.effects.updateCatalogFx.pending);
    const partnerId = useStore(userModel.stores.$partnerId);

    const handleSave = async () => {
        if (partnerId) {
            const { status } = await redemptionModel.effects.updateCatalogFx({
                catalog: {
                    ...catalog,
                    redemptionItems: allProducts.filter((product) =>
                        localSelectedProductsIds.includes(product.id)
                    ),
                },
                partnerId,
            });

            if (status === 201) {
                onClose();
            }
        }
    };

    return (
        <Modal open={open} className={className} onClose={onClose}>
            <Modal.Header>
                <h3 style={{ fontSize: 18, color: 'var(--text-dark-color)' }}>
                    Select products to add to the catalog
                </h3>
            </Modal.Header>

            <Modal.Body>
                <SelectedProductsList
                    onToggle={setLocalSelectedProductsIds}
                    value={localSelectedProductsIds}
                />

                <FlexboxGrid className="buttons" align="middle" justify="end">
                    <Button
                        size="sm"
                        appearance="subtle"
                        type="button"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        Cancel
                    </Button>

                    <Button size="sm" appearance="primary" onClick={handleSave}>
                        {isUpdatingCatalog ? <Loader width={16} /> : 'Save'}
                    </Button>
                </FlexboxGrid>
            </Modal.Body>
        </Modal>
    );
})`
    ${styles}
`;
