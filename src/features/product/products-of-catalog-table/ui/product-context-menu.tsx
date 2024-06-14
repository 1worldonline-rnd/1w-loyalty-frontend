import { adminPanelModel } from '@/entities/admin-panel';
import type { Catalog, Product } from '@/shared/api/redemption/types';
import { Button } from '@/shared/rsuite/admin-panel';
import { PropsWithClassName } from '@/shared/utility-types';
import { FlexboxGrid } from 'rsuite';
import styled from 'styled-components';
import { setActiveCatalogId } from '../../product-form/model';

type ProductContextMenuProps = PropsWithClassName<{
    catalogId: Catalog['id'];
    productId: Product['id'];
    onClose: () => void;
    onRemove: () => void;
}>;

export const ProductContextMenu = styled((props: ProductContextMenuProps) => {
    const { catalogId, productId, className, onClose, onRemove } = props;

    return (
        <FlexboxGrid className={className} as="nav" align="bottom">
            <Button
                appearance="transparent"
                onClick={() => {
                    adminPanelModel.events.adminModalToggled({
                        isOpen: true,
                        entity: 'product',
                        mode: 'update',
                        entityIdToBeManage: productId,
                    });
                    
                    setActiveCatalogId(catalogId);

                    onClose();
                }}
            >
                Edit
            </Button>
            <Button appearance="transparent" className="delete-button" onClick={onRemove}>
                Remove from catalog
            </Button>
        </FlexboxGrid>
    );
})`
    flex-direction: column;

    button {
        background-color: transparent;
        padding: 6px;
        font-weight: 600;
        font-size: 18px;
        color: var(--text-default-color);
    }

    .delete-button {
        color: rgb(var(--error-color));
    }
`;
