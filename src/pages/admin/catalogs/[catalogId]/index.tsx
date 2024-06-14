import type { GetServerSideProps } from 'next';
// import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { usePageTitle } from '@/processes/layout/usePageTitle';
import { useProtectedRoute } from '@/processes/auth/useProtectedRoute';
import type { PropsWithClassName } from '@/shared/utility-types';
import { AdminPanel, icons, EntityListWithPushButton } from '@/widgets/admin-panel';
import { useEffect, useMemo, useState } from 'react';
import { FlexboxGrid } from 'rsuite';
import { useStore } from 'effector-react';
import { Route } from '@/shared/constants';
import { useCustomRouter } from '@/shared/hooks';
import { redemptionModel } from '@/entities/redemption';
import { Tabs } from '@/shared/ui';
import { ProductsOfCatalogTable } from '@/features/product';
import type { Catalog } from '@/shared/api/redemption/types';
import { CatalogTabSettings, SelectingProductsToCatalog } from '@/features/catalog';
import { Button } from '@/shared/rsuite/loyalty-platform';
import { adminPanelModel } from '@/entities/admin-panel';
import { userModel } from '@/entities/user';
import { setActiveCatalogId } from '@/features/product/product-form/model';

enum CatalogManagerTab {
    products = 'products',
    settings = 'settings',
}

const CatalogProductsTabs = ({ catalog }: { catalog: Catalog | undefined }) => {
    const isFetchingProducts = useStore(redemptionModel.effects.getProductsByCatalogIdFx.pending);
    const isUpdatingCatalog = useStore(redemptionModel.effects.updateCatalogFx.pending);
    const partnerId = useStore(userModel.stores.$partnerId);
    const [isOpenSelectingProducts, setIsOpenSelectingProducts] = useState(false);

    const products = catalog?.redemptionItems || [];

    const selectedProductsIds = useMemo(() => {
        return products.map((product) => product.id);
    }, [products]);

    return (
        <>
            <label className="btn-create-product">
                {/* <Button appearance="primary" onClick={() => setIsOpenSelectingProducts(true)}> */}
                <Button
                    appearance="primary"
                    onClick={() => {
                        adminPanelModel.events.adminModalToggled({
                            isOpen: true,
                            entity: 'product',
                            mode: 'create',
                        });
                        if (catalog?.id) {
                            setActiveCatalogId(catalog.id);
                        }
                    }}
                >
                    <icons.PlusIcon />
                </Button>
                Add product
            </label>

            {catalog && (
                <SelectingProductsToCatalog
                    catalog={catalog}
                    open={isOpenSelectingProducts}
                    onClose={() => {
                        setIsOpenSelectingProducts(false);
                    }}
                    selectedProductsIds={selectedProductsIds}
                />
            )}

            <ProductsOfCatalogTable
                isLoading={isFetchingProducts || isUpdatingCatalog}
                products={products}
                catalogId={String(catalog?.id)}
                onChangeOrder={(positions) => {
                    if (catalog && partnerId) {
                        redemptionModel.effects.updateItemPositionsFx({
                            catalogId: catalog.id,
                            partnerId,
                            positions,
                        });
                    }
                }}
            />
        </>
    );
};

const useCatalogManagerTabs = ({ catalog }: { catalog: Catalog | undefined }) => {
    const components: Record<CatalogManagerTab, () => JSX.Element> = {
        [CatalogManagerTab.products]: () => <CatalogProductsTabs catalog={catalog} />,
        [CatalogManagerTab.settings]: () => <CatalogTabSettings catalog={catalog} />,
    };

    const [activeTab, setActiveTab] = useState<CatalogManagerTab>(CatalogManagerTab.products);

    const tabs = [
        {
            label: 'Products',
            key: CatalogManagerTab.products,
        },
        // {
        //     label: 'Settings',
        //     key: CatalogManagerTab.settings,
        // },
    ];

    return { setActiveTab, ActiveComponent: components[activeTab], tabs, activeTab };
};

const CatalogManagerPage = styled(({ className }: PropsWithClassName) => {
    usePageTitle({ title: 'Catalog' });

    useProtectedRoute({
        byAdminRights: true,
    });

    const { push, query } = useCustomRouter();

    const catalogs = useStore(redemptionModel.stores.$catalogsOfPartner);
    const partnerId = useStore(userModel.stores.$partnerId);
    const isFetchingCatalogs = useStore(redemptionModel.effects.getCatalogsByPartnerIdFx.pending);

    const currentCatalog = catalogs.find((catalog) => String(catalog.id) === query.catalogId);

    const { ActiveComponent, setActiveTab, tabs, activeTab } = useCatalogManagerTabs({
        catalog: currentCatalog,
    });

    useEffect(() => {
        if (typeof query.catalogId === 'string' && isFetchingCatalogs === false && partnerId) {
            redemptionModel.effects.getCatalogByIdFx({
                catalogId: query.catalogId,
                partnerId,
            });
        }
    }, [query.catalogId, partnerId, isFetchingCatalogs]);

    if (!currentCatalog) {
        return null;
    }
    return (
        <AdminPanel>
            <div className={className}>
                <aside className="side">
                    <h2 className="title">Catalogs</h2>

                    <EntityListWithPushButton
                        entityList={catalogs}
                        onPush={(id) => {
                            push({
                                pathname: Route.admin.catalogManager(String(id)),
                            });
                        }}
                    />
                </aside>

                <div className="main">
                    <header className="header">
                        <FlexboxGrid justify="space-between" align="middle">
                            <h2>{currentCatalog.name}</h2>

                            <time className="created-date">
                                Created:{' '}
                                {new Intl.DateTimeFormat('uk', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                }).format(new Date(currentCatalog.createdAt))}
                            </time>
                        </FlexboxGrid>
                    </header>

                    <Tabs
                        activeTab={activeTab}
                        data={tabs}
                        onClickTab={(key) => setActiveTab(key as CatalogManagerTab)}
                    />

                    <div className="main__active-component">
                        <ActiveComponent />
                    </div>
                </div>
            </div>
        </AdminPanel>
    );
})`
    display: grid;
    grid-template-columns: 300px auto;

    .header {
        margin-block-end: 17px;

        h2 {
            font-size: 22px;
            color: var(--text-dark-color);
        }

        .created-date {
            line-height: 17px;
            text-align: right;
            color: var(--grey-9-color);
        }
    }

    .side {
        padding: 24px 0 24px 26px;
        border-inline-end: 1px solid var(--grey-5-color);
    }

    .main {
        padding: 24px 0 24px 36px;

        &__active-component {
            padding-block-start: 18px;
        }
    }

    .title {
        font-size: 20px;
        color: var(--text-dark-color);
        margin-block-end: 18px;
    }

    .btn-create-product {
        display: flex;
        font-weight: 600;
        font-size: 16px;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        margin-block-end: 14px;

        button {
            padding: 6px;
            display: flex;
            color: #fff;

            svg {
                width: 16px;
                height: 16px;
            }
        }
    }
`;

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default styled(CatalogManagerPage)``;
