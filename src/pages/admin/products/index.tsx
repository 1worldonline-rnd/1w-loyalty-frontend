import type { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AdminPanel, CreationButton } from '@/widgets/admin-panel';
import styled from 'styled-components';
import type { Nullable, PropsWithClassName } from '@/shared/utility-types';
import { FlexboxGrid, Loader } from 'rsuite';
import { Button, Modal } from '@/shared/rsuite/admin-panel';
import { useStore } from 'effector-react';
import { redemptionModel } from '@/entities/redemption';
import { ButtonWithContextMenu, Table, TextWithEllipsis } from '@/shared/ui';
import { adminPanelModel } from '@/entities/admin-panel';
import { Product } from '@/shared/api/redemption/types';
import { useRef, useState } from 'react';
import { redemptionApi } from '@/shared/api';
import { userModel } from '@/entities/user';
import { showMessage } from '@/shared/lib/messages';
import { setActiveCatalogId } from '@/features/product/product-form/model';

const { Td, Th, Tr } = Table;

export const ProductImage = styled.img`
    height: 51px;
    min-width: 114px;
    width: 114px;
    background-color: #fff;
    border-radius: 4px;
    object-fit: contain;
`;

type ProductContextMenuProps = PropsWithClassName<{
    productId: Product['id'];
    productType: Product['type'];
    onClose: () => void;
    onUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onExportParticipants: () => void;
    setDeletingProductId: () => void;
    setIsOpenDeleteModal: () => void;
}>;

export const ProductContextMenu = styled((props: ProductContextMenuProps) => {
    const {
        productId,
        productType,
        className,
        onClose,
        onUploadFile,
        onExportParticipants,
        setDeletingProductId,
        setIsOpenDeleteModal,
    } = props;

    const fileInputRef = useRef<HTMLInputElement>(null);

    const onDeleteProduct = () => {
        setDeletingProductId();
        setIsOpenDeleteModal();
        onClose();
    };

    return (
        <div>
            <FlexboxGrid className={className} as="nav" align="bottom">
                <Button
                    appearance="link"
                    onClick={() => {
                        adminPanelModel.events.adminModalToggled({
                            isOpen: true,
                            entity: 'product',
                            mode: 'update',
                            entityIdToBeManage: productId,
                        });

                        onClose();
                        setActiveCatalogId(null);
                    }}
                >
                    Edit
                </Button>

                {productType !== 'Ticket' && (
                    <Button appearance="link" onClick={() => fileInputRef.current?.click()}>
                        Upload vouchers
                    </Button>
                )}
                {productType === 'Ticket' && (
                    <Button appearance="link" onClick={onExportParticipants}>
                        Export participants
                    </Button>
                )}
                <Button className="delete-button" appearance="link" onClick={onDeleteProduct}>
                    Delete
                </Button>

                <input type="file" accept="text/plain" hidden ref={fileInputRef} onChange={onUploadFile} />
            </FlexboxGrid>
        </div>
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

const Products = styled(({ className }: PropsWithClassName) => {
    const products = useStore(redemptionModel.stores.$productsOfPartner);
    const isLoading = useStore(redemptionModel.effects.getProductsByPartnerIdFx.pending);
    const isProductDeletingLoading = useStore(redemptionModel.effects.deleteProduct.pending);
    const partnerId = useStore(userModel.stores.$partnerId);
    const [updatedProductId, setUpdatedProductId] = useState<Nullable<Product['id']>>(null);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [deletingProductId, setDeletingProductId] = useState<Nullable<Product['id']>>(null);

    const onCloseDeleteModal = () => {
        setIsOpenDeleteModal(false);
    };

    const onProductDeleteFromModal = () => {
        if (deletingProductId) {
            deleteProduct(deletingProductId);
            setIsOpenDeleteModal(false);
            showMessage('Product successfully deleted!');
        }
    };

    const deleteProduct = (productId: Product['id']) => {
        if (partnerId) {
            redemptionModel.effects.deleteProduct({ productId, partnerId }).then((res) => {
                if (res.status === 204) {
                    redemptionModel.effects.getProductsByPartnerIdFx(partnerId);
                }
            });
        }
    };

    const getProductCountLabelSettings = ({ initialCount, availableCount }: Product) => {
        const labelSettings = {
            fontSize: 18,
            label: `${availableCount}/${initialCount}`,
        };

        if (initialCount === 0) {
            labelSettings.fontSize = 25;
            labelSettings.label = '\u221e';
        }

        return labelSettings;
    };

    const uploadFileWithVouchersToProduct = (fileTxt: File, productId: Product['id']) => {
        if (partnerId) {
            setUpdatedProductId(productId);

            const formData = new FormData();

            formData.append('vouchers', fileTxt);

            redemptionApi
                .fetchUploadFileWithVouchersToProduct({
                    productId,
                    formData,
                    partnerGuid: partnerId,
                })
                .then(() => {
                    redemptionModel.effects.getProductsByPartnerIdFx(partnerId);
                    showMessage('Vouchers uploaded successfully');
                })
                .finally(() => {
                    setUpdatedProductId(null);
                });
        }
    };

    const exportParticipants = async (productId: Product['id']) => {
        if (partnerId) {
            redemptionApi
                .fetchExportParticipants({ productId, partnerId })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');

                    link.href = url;

                    link.setAttribute('download', `participants.csv`);

                    document.body.appendChild(link);

                    link.click();

                    link.parentNode?.removeChild(link);
                })
                .catch(() => {
                    showMessage('An error occurred while downloading the file', 'error');
                });
        }
    };

    return (
        <AdminPanel>
            <div className={className}>
                <Modal open={isOpenDeleteModal} onClose={onCloseDeleteModal}>
                    <Modal.Header>
                        <h3 style={{ fontSize: 18, color: 'var(--text-dark-color)' }}>Delete product</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <p style={{ fontSize: 18 }}>Do you really want to delete product ?</p>
                        <FlexboxGrid justify="end" style={{ marginBlockStart: 20, gap: 8 }}>
                            <Button size="sm" appearance="subtle" onClick={onCloseDeleteModal}>
                                Cancel
                            </Button>
                            <Button size="sm" color="red" onClick={onProductDeleteFromModal}>
                                {isProductDeletingLoading ? <Loader /> : 'Delete'}
                            </Button>
                        </FlexboxGrid>
                    </Modal.Body>
                </Modal>

                <FlexboxGrid className="header" align="middle" justify="space-between" as="header">
                    <h2 className="title">Products</h2>

                    <CreationButton entity="product" />
                </FlexboxGrid>

                <Table
                    isLoading={isLoading}
                    noDataComponent="Products list is empty"
                    templateColumns={[12, 5, 5, 1]}
                    head={
                        <Tr>
                            <Th>Product</Th>
                            <Th>Type</Th>
                            <Th>Supply</Th>
                            <Th />
                        </Tr>
                    }
                    body={products.map((product) => (
                        <Tr key={product.id} isLoading={product.id === updatedProductId}>
                            <Td style={{ display: 'flex', gap: 14 }}>
                                <ProductImage src={product.image} alt={product.title} />
                                <TextWithEllipsis>{product.title}</TextWithEllipsis>
                            </Td>
                            <Td>
                                <TextWithEllipsis>{product.type}</TextWithEllipsis>
                            </Td>
                            <Td
                                style={{
                                    fontSize: getProductCountLabelSettings(product).fontSize,
                                }}
                            >
                                {getProductCountLabelSettings(product).label}
                            </Td>
                            <Td>
                                <FlexboxGrid justify="end" style={{ width: '100%' }}>
                                    <ButtonWithContextMenu menuStyle={{ minWidth: 148 }}>
                                        {(ref) => (
                                            <ProductContextMenu
                                                productId={product.id}
                                                productType={product.type}
                                                onClose={() => {
                                                    ref.current?.close();
                                                }}
                                                onUploadFile={(e) => {
                                                    if (e.target.files?.[0]) {
                                                        ref.current?.close();
                                                        uploadFileWithVouchersToProduct(
                                                            e.target.files[0],
                                                            product.id
                                                        );
                                                    }
                                                }}
                                                onExportParticipants={() => {
                                                    exportParticipants(product.id);
                                                }}
                                                setDeletingProductId={() => {
                                                    setDeletingProductId(product.id);
                                                }}
                                                setIsOpenDeleteModal={() => {
                                                    setIsOpenDeleteModal(true);
                                                }}
                                            />
                                        )}
                                    </ButtonWithContextMenu>
                                </FlexboxGrid>
                            </Td>
                        </Tr>
                    ))}
                />
            </div>
        </AdminPanel>
    );
})`
    .header {
        margin-block-end: 22px;
    }

    .title {
        font-size: 24px;
        color: var(--text-dark-color);
    }
`;

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'features.collection'])),
    },
});

export default Products;
