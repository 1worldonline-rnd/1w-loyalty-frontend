import type { Catalog, Product, ProductPosition } from '@/shared/api/redemption/types';
import { ButtonWithContextMenu, Loader, Table, TextWithEllipsis } from '@/shared/ui';
import type { PropsWithClassName } from '@/shared/utility-types';
import { FlexboxGrid } from 'rsuite';
import styled from 'styled-components';
import { ProductContextMenu } from './product-context-menu';
import { styles } from './styles';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useState } from 'react';
import { redemptionModel } from '@/entities/redemption';
import { useStore } from 'effector-react';
import { userModel } from '@/entities/user';

const DragAndDropIcon = () => (
    <svg width="16" height="16" fill="none">
        <g clipPath="url(#a)">
            <path
                fill="#B7B9BF"
                fillRule="evenodd"
                d="M10.667 1.334a1.333 1.333 0 1 1 0 2.667 1.333 1.333 0 0 1 0-2.667Zm0 5.333a1.333 1.333 0 1 1 0 2.667 1.333 1.333 0 0 1 0-2.667Zm-5.334 5.334a1.333 1.333 0 1 1 0 2.666 1.333 1.333 0 0 1 0-2.666Zm5.334 0a1.333 1.333 0 1 1 0 2.666 1.333 1.333 0 0 1 0-2.666ZM5.333 1.334a1.333 1.333 0 1 1 0 2.667 1.333 1.333 0 0 1 0-2.667Zm0 5.333a1.333 1.333 0 1 1 0 2.667 1.333 1.333 0 0 1 0-2.667Z"
                clipRule="evenodd"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h16v16H0z" />
            </clipPath>
        </defs>
    </svg>
);

export const ProductImage = styled.img`
    height: 51px;
    min-width: 114px;
    width: 114px;
    background-color: #fff;
    border-radius: 4px;
    object-fit: cover;
`;

export type ProductTableProps = PropsWithClassName<{
    products: Product[];
    isLoading: boolean;
    catalogId: Catalog['id'];
    onChangeOrder: (positions: ProductPosition[]) => void;
}>;

const { Td, Th, Tr } = Table;

export const ProductsOfCatalogTable = styled((props: ProductTableProps) => {
    const { products, isLoading, className, onChangeOrder, catalogId } = props;

    const sortedProducts = products.sort((firstProduct, secondProduct) => {
        if (firstProduct.position !== undefined && secondProduct.position !== undefined) {
            return firstProduct.position - secondProduct.position;
        }
        return 1;
    });

    const [draggableProducts, setDraggableProducts] = useState(sortedProducts);
    const catalogsOfPartner = useStore(redemptionModel.stores.$catalogsOfPartner);
    const partnerId = useStore(userModel.stores.$partnerId);

    const updatePositions = (products: Product[]) => {
        return products.map((item, index) => {
            item.position = index;

            return item;
        });
    };

    // function to update list on drop
    const handleDrop = (droppedItem: DropResult) => {
        // ignore drop outside droppable container
        if (!droppedItem.destination) return;
        const updatedList = [...products];
        // remove dragged item
        const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
        // add dropped item
        updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

        // update state
        setDraggableProducts(updatePositions(updatedList));

        onChangeOrder(
            updatedList.map((product, index) => {
                return {
                    redemptionItemId: product.id,
                    position: index,
                };
            })
        );
    };

    const removeProductFromCatalog = (productId: Product['id']) => {
        const catalog = catalogsOfPartner.find(({ id }) => id === catalogId);

        if (catalog && partnerId) {
            redemptionModel.effects.updateCatalogFx({
                catalog: {
                    ...catalog,
                    redemptionItems: (catalog.redemptionItems || []).filter(({ id }) => id !== productId),
                },
                partnerId,
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

    return (
        <div className={className}>
            <Table
                isLoading={isLoading}
                noDataComponent="Products list is empty"
                templateColumns={[7, 3, 3, 1]}
                head={
                    <Tr>
                        <Th>Product</Th>
                        <Th>Price</Th>
                        <Th style={{ justifyContent: 'end' }}>Supply</Th>
                        <Th />
                    </Tr>
                }
                body={
                    Boolean(draggableProducts.length) && (
                        <DragDropContext onDragEnd={handleDrop}>
                            <Droppable droppableId="products-container">
                                {(provided) => (
                                    <div
                                        className="products-container"
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {draggableProducts.map((product, index) => {
                                            return (
                                                <Draggable
                                                    key={product.id}
                                                    draggableId={product.id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <Tr
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                        >
                                                            <Td>
                                                                <FlexboxGrid
                                                                    className="drag-icon"
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <DragAndDropIcon />
                                                                </FlexboxGrid>
                                                                <ProductImage
                                                                    src={product.image}
                                                                    alt={product.title}
                                                                />
                                                                <TextWithEllipsis>
                                                                    {product.title}
                                                                </TextWithEllipsis>
                                                            </Td>
                                                            <Td>{product.priceLocal}</Td>
                                                            <Td
                                                                style={{
                                                                    justifyContent: 'end',
                                                                    fontSize:
                                                                        getProductCountLabelSettings(product)
                                                                            .fontSize,
                                                                }}
                                                            >
                                                                {getProductCountLabelSettings(product).label}
                                                            </Td>
                                                            <Td>
                                                                <ButtonWithContextMenu
                                                                    menuStyle={{ minWidth: 148 }}
                                                                >
                                                                    {(ref) => (
                                                                        <ProductContextMenu
                                                                            productId={product.id}
                                                                            catalogId={catalogId}
                                                                            onClose={() => {
                                                                                ref.current?.close();
                                                                            }}
                                                                            onRemove={() => {
                                                                                removeProductFromCatalog(
                                                                                    product.id
                                                                                );
                                                                            }}
                                                                        />
                                                                    )}
                                                                </ButtonWithContextMenu>
                                                            </Td>
                                                        </Tr>
                                                    )}
                                                </Draggable>
                                            );
                                        })}

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    )
                }
            />
        </div>
    );
})`
    ${styles}
`;
