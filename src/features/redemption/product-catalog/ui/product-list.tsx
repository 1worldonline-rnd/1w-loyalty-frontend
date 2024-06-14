import { PropsWithClassName } from '@/shared/utility-types';
import classNames from 'classnames';
import styled from 'styled-components';
import { ProductCard } from './product-card';
import { Product, ProductRedeemed } from '@/shared/api/redemption/types';
import { redemptionModel } from '@/entities/redemption';
import { useWidgetAccentColor } from '@/shared/hooks';
import { applicationTourStepTargetClassNames } from '@/shared/constants/application-tour';
import { useRouter } from 'next/router';
import { Route } from '@/shared/constants';
import { useEffect } from 'react';
import { $selectedProduct } from '@/entities/redemption/model/stores';
import { useStore } from 'effector-react';
import { getProductByIdFx } from '@/entities/redemption/model/effects';
import { widgetConfigModel } from '@/entities/widget-config';
import { showMessage } from '@/shared/lib/messages';

type ProductListProps = PropsWithClassName & {
    products: Product[] | ProductRedeemed[];
};

export const ProductList = ({ className, products }: ProductListProps) => {
    const accentColor = useWidgetAccentColor();
    const router = useRouter();
    const selectedProduct = useStore($selectedProduct);
    const partnerId = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.partner.guid;

    let itemsSize: 'md' | 'lg' | 'sm' = 'md';
    if (products.length === 1) {
        itemsSize = 'lg';
    } else if (products.length >= 3) {
        itemsSize = 'sm';
    }

    const handleProductClick = (e: React.MouseEvent, product: Product | ProductRedeemed) => {
        if (e.target instanceof HTMLAnchorElement || e.target instanceof HTMLButtonElement) {
            return;
        }
        redemptionModel.events.setSelectedProduct(product);
        redemptionModel.events.toggleProductDetailsModal(true);

        router.replace(
            {
                pathname: Route.redemption,
                query: { ...router.query, productId: product.id },
            },
            undefined,
            { shallow: true }
        );
    };

    const processProduct = (productId: string) => {
        if (partnerId) {
            getProductByIdFx({ productId, partnerId })
                .then((response) => {
                    if (response.status === 200) {
                        redemptionModel.events.setSelectedProduct(response.data);
                        redemptionModel.events.toggleProductDetailsModal(true);
                    }
                })
                .catch((_) => {
                    showMessage('Product not found.');
                });
        }
    };

    useEffect(() => {
        const productId = router.query.productId as string;
        if (productId && selectedProduct && selectedProduct.id !== productId && partnerId) {
            const product = (products as (Product | ProductRedeemed)[]).find(
                (product) => product.id === productId
            );

            if (product) {
                redemptionModel.events.setSelectedProduct(product);
                redemptionModel.events.toggleProductDetailsModal(true);
            } else {
                processProduct(productId);
            }
        } else if (productId && partnerId && !selectedProduct) {
            processProduct(productId);
        } else if (productId && partnerId && selectedProduct && selectedProduct.id === productId) {
            redemptionModel.events.toggleProductDetailsModal(true);
        }
    }, [router.query, selectedProduct]);

    return (
        <ProductListStyled className={classNames(className, itemsSize)}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    size={itemsSize as 'sm' | 'md'}
                    product={product}
                    accentColor={accentColor}
                    className={classNames('product', applicationTourStepTargetClassNames.REDEMPTION_CARD)}
                    onClick={(e) => {
                        handleProductClick(e, product);
                    }}
                />
            ))}
        </ProductListStyled>
    );
};

const ProductListStyled = styled.div`
    width: 100%;
    display: grid;
    justify-content: center;
    align-items: stretch;
    gap: 12px;

    .product {
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
        max-width: 424px;

        &:hover {
            transform: scale(1.01);
        }
    }

    &.lg {
        grid-template-columns: 424px;
    }

    &.md {
        grid-template-columns: repeat(2, 424px);
    }

    &.sm {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 1200px) {
        &.sm,
        &.md {
            grid-template-columns: repeat(2, minmax(343px, 1fr));
        }
    }

    @media (max-width: 755px) {
        &.sm,
        &.md,
        &.lg {
            grid-template-columns: repeat(auto-fit, minmax(343px, 424px));
        }
    }

    @media (max-width: 480px) {
        &.sm,
        &.md,
        &.lg {
            grid-template-columns: repeat(auto-fit, 100%);
        }
    }
`;
