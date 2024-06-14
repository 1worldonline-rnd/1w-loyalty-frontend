import { widgetConfigModel } from '@/entities/widget-config';
import { Product, ProductRedeemed } from '@/shared/api/redemption/types';
import { Nullable } from '@/shared/utility-types';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';

export const useHandleRedeemedProduct = (catalogProduct: Product | ProductRedeemed) => {
    const [product, setProduct] = useState<Product>();
    const [redeemedProductData, setRedeemedProductData] = useState<Nullable<ProductRedeemed>>(null);

    const pointName = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.tracker.pointsName;

    const isRedeemedProduct = 'purchaserId' in catalogProduct;

    useEffect(() => {
        if (isRedeemedProduct) {
            setRedeemedProductData(catalogProduct);
            setProduct(catalogProduct.redemptionItem);
        } else {
            setProduct(catalogProduct);
        }
    }, [catalogProduct, isRedeemedProduct]);

    return {
        product,
        redeemedProductData,
        isRedeemedProduct,
        pointName,
    };
};
