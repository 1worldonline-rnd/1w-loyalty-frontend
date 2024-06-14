import type { Catalog } from '@/shared/api/redemption/types';
import { Button } from '@/shared/rsuite/admin-panel';
import type { PropsWithClassName } from '@/shared/utility-types';
import { useState } from 'react';
import styled from 'styled-components';
import { ConfirmDeleteCatalogModal } from './confirm-delete-catalog-modal';
import { styles } from './styles';

export const CatalogTabSettings = styled((props: PropsWithClassName<{ catalog: Catalog | undefined }>) => {
    const { className, catalog } = props;

    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

    const deleteCatalog = () => {};

    if (!catalog) {
        return null;
    }
    return (
        <>
            <ConfirmDeleteCatalogModal
                open={isConfirmDeleteModalOpen}
                onClose={() => setIsConfirmDeleteModalOpen(false)}
                onConfirm={deleteCatalog}
                catalogName={catalog.name}
            />

            <div className={className}>
                <section className="section section--delete-catalog">
                    <p>Delete catalog</p>

                    <Button size="md" color="red" onClick={() => setIsConfirmDeleteModalOpen(true)}>
                        Delete catalog
                    </Button>
                </section>
            </div>
        </>
    );
})`
    ${styles}
`;
