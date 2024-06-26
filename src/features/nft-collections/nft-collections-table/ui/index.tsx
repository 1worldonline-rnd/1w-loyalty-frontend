import { nftModel } from '@/entities/nft';
import { Button } from '@/shared/rsuite/admin-panel';
import { Table, TextWithEllipsis } from '@/shared/ui';
import { PropsWithClassName } from '@/shared/utility-types';
import { useGate, useStore } from 'effector-react';
import { FlexboxGrid } from 'rsuite';
import styled from 'styled-components';
import { styles } from './styles';
import { nftCollectionTableMounted } from '../model';
import { Route } from '@/shared/constants';
import { useCustomRouter } from '@/shared/hooks';
import { useTranslation } from 'next-i18next';
import { NftCollection } from '@/shared/api/nft-collections/types';

const { Td, Th, Tr } = Table;

const PolygonIcon = () => {
    return (
        <svg width="30" height="30" viewBox="0 0 507.91 446.91">
            <path
                fill="#8247e5"
                d="M384.58 136.59c-9.28-5.3-21.22-5.3-31.83 0l-74.26 43.77-50.39 27.84-72.94 43.8c-9.28 5.3-21.22 5.3-31.83 0l-57-34.48a32.33 32.33 0 0 1-15.92-27.85v-66.34c0-10.61 5.31-21.22 15.92-27.85l57-33.15c9.28-5.31 21.22-5.31 31.83 0l57 34.48a32.31 32.31 0 0 1 15.92 27.85v43.76l50.39-29.18V94.16c0-10.61-5.3-21.22-15.91-27.85L156.48 4c-9.28-5.31-21.21-5.31-31.82 0L15.91 67.63C5.3 72.94 0 83.55 0 94.16v124.65c0 10.61 5.3 21.19 15.91 27.85L123.33 309c9.28 5.31 21.22 5.31 31.83 0l72.94-42.44 50.39-29.17 72.94-42.44c9.28-5.3 21.22-5.3 31.83 0l57 33.16A32.32 32.32 0 0 1 456.19 256v66.3c0 10.61-5.3 21.22-15.91 27.85l-55.7 33.16c-9.28 5.3-21.22 5.3-31.83 0l-57-33.16a32.32 32.32 0 0 1-15.91-27.85v-42.48L229.42 309v43.76c0 10.61 5.31 21.22 15.92 27.85l107.41 62.33c9.29 5.31 21.22 5.31 31.83 0L492 380.6a32.32 32.32 0 0 0 15.91-27.85v-126c0-10.61-5.3-21.22-15.91-27.85Z"
            />
        </svg>
    );
};

const CaminoIcon = () => {
    return <img src={'/loyalty/images/crypto/camino-icon.png'}></img>;
};

const CasperIcon = () => {
    return (
        <svg width="30" height="30" viewBox="0 0 241 276.3">
            <path
                fill="#ff473e"
                d="M227.1 213.8c-6.6 0-12.2 4.6-13.6 11l-52.5-2.5c.2-1 .3-2 .3-3 0-1.8-.3-3.6-.8-5.4l19.1-11c4.7 5.8 13.2 7 19.3 2.6s7.7-12.8 3.6-19.1-12.4-8.3-18.9-4.6-9 11.9-5.6 18.6l-18.5 10.7c-4.4-9.3-15.3-13.5-24.8-9.6s-14.3 14.6-10.9 24.3l-34.4 8.3c-.2-4.7-2.2-9.1-5.5-12.5l6.2-8.6c7 2.4 14.7-1.1 17.5-8s-.3-14.8-7-17.9c-6.7-3.2-14.8-.5-18.3 6s-1.3 14.7 5 18.6l-5.7 7.9c-4-3-9.1-4.3-14.1-3.7l-5.9-33.7c7.4-1.6 13.1-7.4 14.7-14.7 1.6-7.4-1.2-15-7.2-19.5-6-4.6-14.1-5.2-20.7-1.7l-14.9-29.1c3.2-1.6 5.8-4.1 7.7-7.1l12.4 3.3c-.1.7-.2 1.3-.2 2 0 7.2 5.5 13.3 12.7 14s13.8-4.2 15.1-11.4-3-14.1-10-16c-7-2-14.3 1.7-16.9 8.5l-11.7-3.1c1.6-3.8 1.9-8 .9-12L78 79.5c6.4 8 18 9.7 26.4 3.7s10.6-17.5 5-26.1l22-21.5c2.7 1.7 5.8 2.8 8.9 3v9.5c-7.3.8-12.8 7.2-12.4 14.6s6.5 13.2 13.9 13.2 13.5-5.8 13.9-13.2-5-13.8-12.4-14.6v-9.5c2.8-.2 5.4-1 7.8-2.3l24.1 27.5c-5.6 7.4-5.2 17.7.9 24.6 6.2 6.9 16.4 8.5 24.4 3.7s11.4-14.5 8.3-23.2l7.5-4.2c4.8 5.6 13.1 6.6 19 2.1 5.9-4.4 7.3-12.7 3.2-18.8s-12.3-8-18.6-4.2-8.6 11.8-5.2 18.4l-7.1 4c-2.9-5.3-8.1-8.9-14-9.8-5.9-.9-12 1-16.3 5.2l-23.6-26.9c2.3-1.8 4.2-4.2 5.5-6.8l20.7 3.4c1.6 7.2 8.6 11.9 15.8 10.6 7.3-1.2 12.3-7.9 11.5-15.2s-7.2-12.8-14.5-12.4c-7.4.4-13.1 6.4-13.2 13.8l-19.2-3.2c2.7-9.2-1.7-19-10.4-23.1s-19-1.1-24.3 6.9-3.9 18.7 3.3 25.1l-21.4 20.9c-3.3-3.8-8-6.2-13-6.6V33.5c7.3-.8 12.8-7.2 12.4-14.6S100.5 5.8 93.1 5.8 79.6 11.6 79.2 19s5 13.8 12.4 14.6v14.5c-6.6.5-12.5 4.4-15.6 10.2-3.1 5.9-3 12.9.3 18.7L42.7 92.4c-1.2-2.9-3.1-5.4-5.5-7.4l13.1-23.6c1.2.3 2.3.5 3.5.5 7.1 0 13-5.3 13.9-12.3S64 36.1 57.2 34.4c-6.9-1.7-13.9 2-16.4 8.6s.4 14 6.6 17.3l-12.7 23C27 78.7 17.3 80 11 86.4c-6.2 6.4-7.3 16.1-2.6 23.7s13.9 11 22.4 8.3l15.1 29.5c-3.8 2.8-6.5 7-7.4 11.6l-11-3.2c.3-1.1.4-2.3.4-3.4 0-7.1-5.3-13-12.3-13.8S2.1 142.8.4 149.7s2.1 13.9 8.8 16.3c6.6 2.4 14-.5 17.2-6.8l11.7 3.4v.9c0 6.6 3.3 12.7 8.9 16.2l-7.5 9.8c-5.5-4.9-13.9-4.6-19.1.7s-5.4 13.6-.4 19.1 13.3 6.1 19.1 1.4 6.8-13 2.5-19l8.1-10.6c2.4 1.1 5.1 1.6 7.8 1.6.4 0 .8 0 1.2-.1l6 33.9c-8 2.4-13.6 9.7-13.9 18-.2 8.4 5 15.9 12.9 18.7 7.9 2.8 16.7.2 21.8-6.5l28 12.5c-.2 1-.4 2.1-.4 3.1 0 7.1 5.3 13.1 12.4 13.9 7.1.8 13.6-3.8 15.2-10.7 1.6-6.9-2.3-13.9-9-16.3-6.7-2.4-14.1.7-17.2 7.1l-27.3-12.2c1.2-2.2 2-4.6 2.2-7.1l35.6-8.7c2.7 5 7.5 8.5 13.1 9.7 5.6 1.1 11.4-.3 15.8-3.8l13.3 11.5c-3.1 6.8-.4 14.8 6.2 18.2 6.6 3.5 14.7 1.2 18.5-5.2 3.8-6.4 2-14.6-4.1-18.8-6.2-4.2-14.5-2.8-19 3.1l-12.7-10.9c1.9-2 3.3-4.5 4.2-7.1l52.9 2.6c.1 7.7 6.3 13.8 14 13.8s13.9-6.3 13.8-13.9c0-7.5-6.2-13.7-13.9-13.7z"
            />
        </svg>
    );
};

const getBlockchainIcon = (blockchain: NftCollection['blockchain']) => {
    if (blockchain === 'POLYGON') {
        return <PolygonIcon />;
    } else if (blockchain === 'CASPER') {
        return <CasperIcon />;
    } else if (blockchain === 'CAMINO') {
        return <CaminoIcon />;
    } else {
        return null;
    }
};

export const NftCollectionsTable = styled((props: PropsWithClassName) => {
    const { className } = props;
    const nftCollections = useStore(nftModel.stores.$nftCollections);
    const isFetchingNftCollections = useStore(nftModel.effects.getNftCollectionsFx.pending);
    const { push } = useCustomRouter();

    const { t } = useTranslation('common', { keyPrefix: 'nft' });

    useGate(nftCollectionTableMounted);

    return (
        <div className={className}>
            <Table
                isLoading={isFetchingNftCollections}
                noDataComponent={t('nft-collections-list-empty')}
                templateColumns={[3, 3, 4, 2]}
                head={
                    <Tr>
                        <Th>{t('name')}</Th>
                        <Th>{t('blockchain')}</Th>
                        <Th>{t('smart-contract-address')}</Th>
                        <Th />
                    </Tr>
                }
                body={nftCollections.map((collection, index) => {
                    return (
                        <Tr key={index}>
                            <Td>
                                <TextWithEllipsis>{collection.name}</TextWithEllipsis>
                            </Td>
                            <Td>{getBlockchainIcon(collection.blockchain)}</Td>
                            <Td>
                                <p className="smart-contract-address">{collection.smartContractAddress}</p>
                            </Td>
                            <Td>
                                <FlexboxGrid justify="end" style={{ width: '100%' }}>
                                    <Button
                                        size="md"
                                        onClick={() => {
                                            push({
                                                pathname: Route.admin.nftCollectionManager(
                                                    String(collection.id)
                                                ),
                                            });
                                        }}
                                    >
                                        {t('manage')}
                                    </Button>
                                </FlexboxGrid>
                            </Td>
                        </Tr>
                    );
                })}
            />
        </div>
    );
})`
    ${styles}
`;
