import styled from 'styled-components';
import type { Product } from '@/shared/api/redemption/types';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';
import { styles } from './styles';
import { useStore } from 'effector-react';
import { redemptionModel } from '@/entities/redemption';
import { FlexboxGrid } from 'rsuite';
import { Checkbox, Input } from '@/shared/rsuite/admin-panel';
import type { ValueType } from 'rsuite/esm/Checkbox';
import { useTranslation } from 'next-i18next';

type SelectedProductsListProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    value: Product['id'][];
    onToggle: (ids: Product['id'][]) => void;
};

export const SelectedProductsList = styled((props: SelectedProductsListProps) => {
    const { value, onToggle, ...otherProps } = props;
    const { t } = useTranslation('common', { keyPrefix: 'redemption' });

    const allProducts = useStore(redemptionModel.stores.$productsOfPartner);

    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    const [searchedValue, setSearchedValue] = useState('');

    const handleChange = (id: ValueType | undefined, checked: boolean) => {
        if (id) {
            if (checked) {
                onToggle([...value, String(id)]);
            } else {
                onToggle(value.filter((productId) => productId !== id));
            }
        }
    };

    useEffect(() => {
        if (searchedValue) {
            setFilteredProducts(
                allProducts.filter((product) =>
                    product.title.toLowerCase().includes(searchedValue.toLowerCase())
                )
            );
        } else {
            setFilteredProducts(allProducts);
        }
    }, [searchedValue]);

    return (
        <div {...otherProps}>
            <label className="search-input">
                <span>{t('select-products')}</span>

                <Input
                    value={searchedValue}
                    onChange={setSearchedValue}
                    placeholder="Search by products..."
                />
            </label>

            {Boolean(filteredProducts.length) ? (
                filteredProducts.map((product) => {
                    const isComingSoon = product.availableCount === 0 && product.initialCount === 0;

                    return (
                        <FlexboxGrid key={product.id} className="product-row">
                            <Checkbox
                                size="S"
                                checked={value.includes(product.id)}
                                onChange={handleChange}
                                value={product.id}
                                className="product-row__checkbox"
                            />
                            <FlexboxGrid className="product-row__body">
                                <img className="product-row__image" src={product.image} alt={product.title} />

                                <div>
                                    <h3 className="product-row__title">{product.title}</h3>

                                    <FlexboxGrid justify="space-between">
                                        {!isComingSoon && (
                                            <p className="product-row__price">{product.priceGlobal}</p>
                                        )}

                                        <p className="product-row__supply">
                                            {isComingSoon
                                                ? t('coming-soon')
                                                : `${t('supply')}: ${product.availableCount}/${
                                                      product.initialCount
                                                  }`}
                                        </p>
                                    </FlexboxGrid>
                                </div>
                            </FlexboxGrid>
                        </FlexboxGrid>
                    );
                })
            ) : (
                <p>No products</p>
            )}
        </div>
    );
})`
    ${styles}
`;
