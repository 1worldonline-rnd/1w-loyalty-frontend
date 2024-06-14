import { NftCollection, NftCreationPayload } from '../nft-collections/types';
import { PartnerId } from '../partner/types';

export type NftWidgetCommand = {
    id?: string;
    name: string;
    description?: string;
    widgetCode?: string;
    locale: string;
    collectionIds: string[];
    partnerId: PartnerId;
    config?: NftWidgetConfig;
};

export type NftWidgetQuery = {
    id: string;
    name: string;
    description?: string;
    widgetCode: string;
    locale: string;
    collections: NftCollectionMeta[];
    partnerId: PartnerId;
    config: NftWidgetConfig;
}

export type NftCollectionMeta = {
    id: string;
    name: string;
};

export type NftWidgetConfig = {
    id: string;
    widgetId: string;
    itemsPerSlide?: number;
};

export type NftWidgetCriteria = {
    partnerId: PartnerId;
    pageSize: number;
    page: number;
    sorts: { [key: string]: string };
};
