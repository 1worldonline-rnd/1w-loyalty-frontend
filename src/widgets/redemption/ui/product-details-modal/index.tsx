import React from 'react';
import { useStore } from 'effector-react';
import { Modal } from 'rsuite';
import { redemptionModel } from '@/entities/redemption';
import { ProductDetails } from '@/features/redemption/product-catalog/ui/product-details';
import styled from 'styled-components';
import { PropsWithClassName } from '@/shared/utility-types';
import { ModalFooter } from './modal-footer';
import { useRouter } from 'next/router';
import { Route } from '@/shared/constants';

export const ProductDetailsModal = styled(({ className }: PropsWithClassName) => {
    // Get the current state of the modal from the effector store
    const showModal = useStore(redemptionModel.stores.$showProductDetailsModal);
    const router = useRouter();

    const selectedProduct = useStore(redemptionModel.stores.$selectedProduct);

    const hideModal = () => {
        // Hide the modal by sending an event to the effector store
        redemptionModel.events.toggleProductDetailsModal(false);
        const { productId, ...data } = router.query;
        router.replace(
            {
                pathname: Route.redemption,
                query: { ...data },
            },
            undefined,
            { shallow: true }
        );
    };

    if (!selectedProduct) {
        return null;
    }

    return (
        <Modal open={showModal} onClose={() => hideModal()} className={className}>
            <Modal.Body>
                <ProductDetails
                    product={selectedProduct}
                    showSupply={true}
                    showPrice={false}
                    className="product-details"
                />
                <ModalFooter product={selectedProduct} />
                <button className="close-button" onClick={() => hideModal()}>
                    <img src="/loyalty/images/close-icon-dark.svg" alt="close" />
                </button>
            </Modal.Body>
        </Modal>
    );
})<{ accentColor?: string }>`
    .rs-modal-content {
        padding: 0;
        overflow: hidden;
        border-radius: 7px;
        height: 653px;
        /* width: 539px; */
        margin: auto;
    }

    .rs-modal-body {
        margin: 0;
        padding: 0;
        height: 100% !important;
        max-height: 100% !important;
        position: relative;
    }

    .product-details {
        &:hover {
            transform: unset;
            border-color: transparent;
        }
    }

    .close-button {
        position: absolute;
        top: 14px;
        right: 14px;
        z-index: 1;
        background: transparent;
        border: none;
        padding: 0;
        margin: 0;
        cursor: pointer;

        img {
            height: 32px;
            width: 32px;
        }
    }

    .product-image {
        position: relative;
        background-color: ${({ theme }) => (theme.mode === 'dark' ? 'var(--grey-4-color)' : '#F7F7F8')};

        &::after {
            content: '';
            display: block;
            z-index: 1;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 70%;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, transparent);
        }
    }

    .info {
        padding-block-end: 75px !important;
    }

    @media screen and (max-width: 768px) {
        .rs-modal-content {
            width: 100%;
            min-width: 343px;
        }
    }

    @media screen and (max-width: 480px) {
        .rs-modal-content {
            min-width: 100%;
        }
    }
`;
