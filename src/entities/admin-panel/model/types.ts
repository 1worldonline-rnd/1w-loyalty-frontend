import type { Event } from '@/shared/api/event/types';
import type { Feed } from '@/shared/api/feed/types';
import type { Nft, NftCollection } from '@/shared/api/nft-collections/types';
import type { Catalog, Product } from '@/shared/api/redemption/types';
import type { WidgetConfig } from '@/shared/api/widget-config/types';
import type { Collection } from '@/shared/api/collection/types';

export type AdminModal = {
    isOpen: boolean;
    entity?:
        | 'feed'
        | 'incentive'
        | 'loyalty page'
        | 'catalog'
        | 'product'
        | 'widget-sequence'
        | 'sequence-item'
        | 'rewards'
        | 'nft-collection'
        | 'nft'
        | 'nft-widget'
        | 'collection'
        | 'topic-in-collection';
    mode?: 'create' | 'update' | 'delete' | 'change-status';
    entityIdToBeManage?: string;
    onFeedSuccess?: (payload: Feed) => void;
    onIncentiveSuccess?: (payload: Event) => void;
    onWidgetConfigSuccess?: (payload: WidgetConfig) => void;
    onCatalogSuccess?: (payload: Catalog) => void;
    onProductSuccess?: (payload: Product) => void;
    onNftCollectionSuccess?: (payload: NftCollection) => void;
    onNftSuccess?: (payload: Nft) => void;
    onCollectionSuccess?: (payload: Collection) => void;
    onTopicInCollectionSuccess?: (payload: any) => void;
};
