import { nftModel } from '@/entities/nft';
import { Table, TextWithEllipsis } from '@/shared/ui';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import { useTranslation } from 'next-i18next';

const { Td, Th, Tr } = Table;

export const NftImage = styled.img`
    height: 200px;
    min-width: 100px;
    width: 114px;
    background-color: #fff;
    border-radius: 4px;
    object-fit: contain;
`;

export enum NftStatus {
    MINTED = 'Minted',
    NON_MINTED = 'Non minted',
    TAKEN = 'Taken',
    RESERVED = 'Reserved',
    LOCKED = 'Locked',
}

export const NftsOfNftCollectionTable = styled((props: PropsWithClassName) => {
    const { className } = props;
    const isNftsFetching = useStore(nftModel.effects.getNftsByCollectionIdFx.pending);
    const nfts = useStore(nftModel.stores.$nftsByCollectionId);

    const { t } = useTranslation('common', { keyPrefix: 'nft' });

    return (
        <Table
            className={className}
            isLoading={isNftsFetching}
            noDataComponent={t('nft-list-empty')}
            templateColumns={[5, 2, 1]}
            head={
                <Tr>
                    <Th>{t('name')}</Th>
                    <Th>{t('token-id')}</Th>
                    <Th>{t('status')}</Th>
                </Tr>
            }
            body={nfts.map((nft, index) => {
                return (
                    <Tr key={index}>
                        <Td>
                            <NftImage src={nft.imageUrl} alt={nft.name} className="nft-image" />
                            <TextWithEllipsis>{nft.name}</TextWithEllipsis>
                        </Td>
                        <Td>{typeof nft.tokenId === 'number' ? nft.tokenId : '—'}</Td>
                        <Td>{NftStatus[nft.status as keyof typeof NftStatus]}</Td>
                    </Tr>
                );
            })}
        />
    );
})`
    ${styles}
`;
