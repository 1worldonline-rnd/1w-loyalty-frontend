import { useCallback } from 'react';
import { redemptionModel } from '@/entities/redemption';
import { useStore } from 'effector-react';
import { widgetConfigModel } from '@/entities/widget-config';

export const useLoadMoreProducts = (isAvailableSection: boolean, widgetId: string | null) => {
    const availableProductsPagination = useStore(redemptionModel.stores.$availableProductsPagination);
    const activeCatalogId = useStore(redemptionModel.stores.$activeCatalogId);
    const globalWidgetConfig = useStore(widgetConfigModel.stores.$globalWidgetConfig);

    const canLoadMoreAvailable =
        availableProductsPagination.pageable.pageNumber + 1 < availableProductsPagination.totalPages;

    const canLoadMore = isAvailableSection ? canLoadMoreAvailable : false;

    const loadMoreProducts = useCallback(() => {
        if (!activeCatalogId) return;

        if (isAvailableSection && globalWidgetConfig?.partner) {
            redemptionModel.effects.getProductsByCatalogIdFx({
                catalogId: activeCatalogId,
                size:
                    availableProductsPagination.pageable.pageSize +
                    availableProductsPagination.pageable.pageSize,
                partnerId: globalWidgetConfig?.partner.guid,
            });
        } else {
            redemptionModel.effects.getPurchasedProductsByWidgetIdFx({
                widgetId: widgetId as string,
            });
        }
    }, [isAvailableSection, activeCatalogId, availableProductsPagination, widgetId]);

    return { canLoadMore, loadMoreProducts };
};
