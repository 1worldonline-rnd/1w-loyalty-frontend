import styled from 'styled-components';
import { NoProducts } from './no-products';
import { ProductList } from './product-list';
import { useTranslation } from 'next-i18next';
import { Button } from '@/shared/rsuite/loyalty-platform';
import { Product, ProductRedeemed } from '@/shared/api/redemption/types';
import { Loader } from '@/shared/ui';

type ProductSectionProps = {
    products: Product[] | ProductRedeemed[];
    canLoadMore: boolean;
    loadMoreProducts: () => void;
    isLoading?: boolean;
};

const LoadMoreButton = styled(Button)`
    font-size: 17px;
    padding-inline: 30px;
`;

export const ProductSection = ({ products, canLoadMore, loadMoreProducts, isLoading }: ProductSectionProps) => {
    const { t } = useTranslation('common', { keyPrefix: 'redemption' });

    if (isLoading && products.length === 0) {
        return <Loader />;
    }

    return products.length === 0 ? (
        <NoProducts />
    ) : (
        <>
            <ProductList products={products} />
            {canLoadMore && (
                <div style={{
                    justifyContent: 'center',
                    display:'flex',
                    marginBlockStart: '20px'
                }}>
                    <LoadMoreButton size="lg" onClick={loadMoreProducts}>
                        {t('load-more-button')}
                    </LoadMoreButton>
                </div>
            )}
        </>
    );
};
