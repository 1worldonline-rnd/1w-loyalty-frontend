import { Route } from '@/shared/constants';
import { useCustomRouter } from '@/shared/hooks';
import { ButtonsList } from '@/shared/ui';
import classNames from 'classnames';
import Link from 'next/dist/client/link';
import { useStore } from 'effector-react';
import { redemptionModel } from '@/entities/redemption';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { ProductSection } from './product-section';
import { useLoadMoreProducts } from '../hooks/useLoadMoreProducts';
import { $isAvailableProductsLoading, $isRedeemedProductsLoading } from '../model';
import { applicationTourStepTargetClassNames } from '@/shared/constants/application-tour';

export const ProductCatalogAuthorized = () => {
    const { t } = useTranslation('common', { keyPrefix: 'redemption' });

    const { urlSearchParams, asPath } = useCustomRouter();
    const isAvailableSection = asPath.includes('available');
    const isRedeemedSection = asPath.includes('redeemed');
    const widgetId = urlSearchParams.loyaltyWidgetId;

    const availableProducts = useStore(redemptionModel.stores.$availableProducts);
    const redeemedProducts = useStore(redemptionModel.stores.$redeemedProducts);
    const isAvailableProductsLoading = useStore($isAvailableProductsLoading);
    const isRedeemedProductsLoading = useStore($isRedeemedProductsLoading);
    
    const getSearchParamsWithoutProductId = () => {
        const { productId, ...data } = urlSearchParams;
        return data;
    };

    useEffect(() => {
        const getAvailableAndPurchasedProducts = async () => {
            if (widgetId) {
                redemptionModel.effects.getPurchasedProductsByWidgetIdFx({
                    widgetId: widgetId as string,
                });
                redemptionModel.effects.getCatalogsByWidgetIdFx({
                    widgetId: widgetId as string,
                });
            }
        };
        getAvailableAndPurchasedProducts();
    }, [isAvailableSection, widgetId]);

    const { canLoadMore, loadMoreProducts } = useLoadMoreProducts(
        !isRedeemedSection,
        widgetId as string | null
    );

    return (
        <>
            <h2>{t('redemption-title')}</h2>
            <ButtonsList className="redemption-nav">
                <li
                    className={classNames(
                        'link',
                        {
                            active: !isRedeemedSection,
                        },
                        applicationTourStepTargetClassNames.REDEMPTION_AVAILABLE
                    )}
                >
                    <Link
                        href={{
                            pathname: Route.redemption,
                            query: { ...getSearchParamsWithoutProductId(), section: 'available' },
                        }}
                    >
                        <a>{t('redemption-available-tab')}</a>
                    </Link>
                </li>
                <li
                    className={classNames(
                        'link',
                        {
                            active: isRedeemedSection,
                        },
                        applicationTourStepTargetClassNames.REDEMPTION_REDEEMED
                    )}
                >
                    <Link
                        href={{
                            pathname: Route.redemption,
                            query: { ...getSearchParamsWithoutProductId(), section: 'redeemed' },
                        }}
                    >
                        <a>{t('redemption-redeemed-tab')}</a>
                    </Link>
                </li>
            </ButtonsList>

            <div>
                {!isRedeemedSection && (
                    <ProductSection
                        products={availableProducts}
                        canLoadMore={canLoadMore}
                        loadMoreProducts={loadMoreProducts}
                        isLoading={isAvailableProductsLoading}
                    />
                )}
                {isRedeemedSection && (
                    <ProductSection
                        products={redeemedProducts}
                        canLoadMore={canLoadMore}
                        loadMoreProducts={loadMoreProducts}
                        isLoading={isRedeemedProductsLoading}
                    />
                )}
            </div>
        </>
    );
};
