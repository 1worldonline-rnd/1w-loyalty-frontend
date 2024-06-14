import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { useProtectedRoute } from '@/processes/auth/useProtectedRoute';
import { AdminPanel, icons, EntityListWithPushButton } from '@/widgets/admin-panel';
import { userModel } from '@/entities/user';
import { Route } from '@/shared/constants';
import { useCustomRouter } from '@/shared/hooks';
import type { PropsWithClassName } from '@/shared/utility-types';
import { Tabs } from '@/shared/ui';
import { nftModel } from '@/entities/nft';
import { setActiveNftCollectionId } from '@/entities/nft/model/events';
import { Button } from '@/shared/rsuite/admin-panel';
import { adminPanelModel } from '@/entities/admin-panel';
import { showMessage } from '@/shared/lib/messages';
import { ethers } from 'ethers';
import { nftSmartContractAbi } from '@/entities/nft/model/stores';
import { useEthers } from '@/features/nft-collections/crypto/hooks/useEthers';
import { getNftCollectionsFx } from '@/entities/nft/model/effects';
import { NftsOfNftCollectionTable } from '@/features/nft-collections';
import { getMainWalletAddress } from '@/features/nft-collections/nft-collection-creation-form/hooks/useNftCollectionCreationForm';

enum NftCollectionManagerTab {
    collection = 'collection',
}

const NftTab = () => {
    const activeNftCollection = useStore(nftModel.stores.$activeNftCollection);
    const partnerId = useStore(userModel.stores.$partnerId);
    const {
        activateBrowserWallet,
        switchNetworkByChainName,
        chainId,
        account,
        provider: web3Provider,
        ethereum,
    } = useEthers();
    const [isGrantAccessPending, setGrantAccessPending] = useState(false);

    const { t } = useTranslation('common', { keyPrefix: 'nft' });

    const isWrongNetwork = () => {
        if (activeNftCollection?.blockchain === 'POLYGON') {
            return chainId !== Number(process.env.NEXT_PUBLIC_POLYGON_ID);
        } else if (activeNftCollection?.blockchain === 'CAMINO') {
            return chainId !== Number(process.env.NEXT_PUBLIC_CAMINO_ID);
        } else {
            return true;
        }
    };

    const matchWallets = () => {
        if (account) {
            return (
                activeNftCollection?.ownerWalletAddress.toLocaleLowerCase() === account.toLocaleLowerCase()
            );
        }
        return false;
    };

    return (
        <>
            <div className="btn-container">
                <label className="btn-container__btn-create-nft">
                    <Button
                        disabled={
                            !ethereum ||
                            !account ||
                            isWrongNetwork() ||
                            !activeNftCollection?.isAccessGranted ||
                            !matchWallets()
                        }
                        appearance="primary"
                        onClick={() => {
                            adminPanelModel.events.adminModalToggled({
                                isOpen: true,
                                entity: 'nft',
                                mode: 'create',
                            });
                        }}
                    >
                        <icons.PlusIcon />
                    </Button>
                    {t('create-nft')}
                </label>
                {activeNftCollection?.isAccessGranted !== undefined &&
                activeNftCollection?.blockchain !== 'CASPER' ? (
                    ethereum ? (
                        account ? (
                            isWrongNetwork() ? (
                                <Button
                                    size="sm"
                                    appearance="primary"
                                    type="button"
                                    onClick={() => {
                                        switchNetworkByChainName(activeNftCollection.blockchain);
                                    }}
                                >
                                    {t('switch-network')}
                                </Button>
                            ) : matchWallets() ? (
                                <div className="btn-container__btn-grant-access-container">
                                    <p>
                                        {t('current-wallet-address')} {account}
                                    </p>
                                    <Button
                                        loading={isGrantAccessPending}
                                        size="sm"
                                        appearance="primary"
                                        onClick={async () => {
                                            setGrantAccessPending(true);
                                            const newAccessState = !activeNftCollection?.isAccessGranted;

                                            if (activeNftCollection?.id && partnerId && web3Provider) {
                                                try {
                                                    const signer = web3Provider.getSigner(account);
                                                    const contract = new ethers.Contract(
                                                        activeNftCollection.smartContractAddress,
                                                        nftSmartContractAbi,
                                                        signer
                                                    );

                                                    const mainWalletAddress = getMainWalletAddress(
                                                        activeNftCollection.blockchain
                                                    );
                                                    const tx = await contract.setApprovalForAll(
                                                        mainWalletAddress,
                                                        true
                                                    );
                                                    await tx.wait();

                                                    const receipt = await web3Provider.getTransactionReceipt(
                                                        tx.hash
                                                    );

                                                    if (receipt.status === 1) {
                                                        const { status } =
                                                            await nftModel.effects.updatedNftCollectionAccessFx(
                                                                {
                                                                    collectionId: activeNftCollection?.id,
                                                                    partnerId,
                                                                    isAccessGranted: newAccessState,
                                                                }
                                                            );

                                                        if (status === 200 && newAccessState) {
                                                            showMessage(t('access-granted'));
                                                        } else {
                                                            showMessage(t('access-removed'));
                                                        }
                                                    } else {
                                                        showMessage(t('access-not-changed'));
                                                    }
                                                    getNftCollectionsFx({
                                                        partnerId: partnerId,
                                                        pageSize: 500,
                                                        page: 1,
                                                        sorts: { created: 'DESC' },
                                                    });
                                                } catch (_) {
                                                    setGrantAccessPending(false);
                                                    showMessage(t('access-not-changed'));
                                                }
                                            }
                                            setGrantAccessPending(false);
                                        }}
                                    >
                                        {!activeNftCollection?.isAccessGranted
                                            ? t('grant-access')
                                            : t('remove-access')}
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <p>
                                        {t('connect-owner-wallet-address')}{' '}
                                        {activeNftCollection?.ownerWalletAddress} <br />
                                        {t('current-wallet-address')} {account}
                                    </p>
                                </>
                            )
                        ) : (
                            <Button
                                size="sm"
                                appearance="primary"
                                type="button"
                                onClick={activateBrowserWallet}
                            >
                                {t('connect-wallet')}
                            </Button>
                        )
                    ) : (
                        <p>{t('install-wallet')}</p>
                    )
                ) : (
                    <></>
                )}
            </div>

            <NftsOfNftCollectionTable />
        </>
    );
};

const useCollectionManagerTabs = () => {
    const components: Record<NftCollectionManagerTab, () => JSX.Element> = {
        [NftCollectionManagerTab.collection]: () => <NftTab />,
    };

    const [activeTab, setActiveTab] = useState<NftCollectionManagerTab>(NftCollectionManagerTab.collection);

    const tabs = [
        {
            label: 'NFT',
            key: NftCollectionManagerTab.collection,
        },
    ];

    return { setActiveTab, ActiveComponent: components[activeTab], tabs, activeTab };
};

const NftCollectionManagerPage: NextPage<PropsWithClassName> = ({ className }) => {
    const { query } = useRouter();
    const { push } = useCustomRouter();
    const partnerId = useStore(userModel.stores.$partnerId);
    const activeNftCollection = useStore(nftModel.stores.$activeNftCollection);
    const nftCollections = useStore(nftModel.stores.$nftCollections);
    const { ActiveComponent, setActiveTab, tabs, activeTab } = useCollectionManagerTabs();

    const { t } = useTranslation('common', { keyPrefix: 'nft' });

    useProtectedRoute({
        byAdminRights: true,
    });

    useEffect(() => {
        if (query.collectionId) {
            nftModel.events.setActiveNftCollectionId(String(query.collectionId));
        }
    }, [query]);

    return (
        <AdminPanel>
            <div className={className}>
                <div className="side">
                    <h2 className="title">{t('nft-collections')}</h2>
                    <EntityListWithPushButton
                        entityList={nftCollections.map(({ id, name }) => ({
                            id,
                            name,
                        }))}
                        onPush={(id) => {
                            if (partnerId && id) {
                                setActiveNftCollectionId(String(id));
                            }

                            push({
                                pathname: Route.admin.nftCollectionManager(String(id)),
                            });
                        }}
                    />
                </div>

                <div className="main">
                    <header className="header">
                        <div>
                            <h2>{activeNftCollection?.name}</h2>
                        </div>
                    </header>

                    <Tabs
                        className="tabs"
                        activeTab={activeTab}
                        data={tabs}
                        onClickTab={(key) => setActiveTab(key as NftCollectionManagerTab)}
                    />
                    <div className="settings-panel-wrapper">{ActiveComponent && <ActiveComponent />}</div>
                </div>
            </div>
        </AdminPanel>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default styled(NftCollectionManagerPage)`
    display: grid;
    grid-template-columns: 20% 80%;
    height: 100%;

    .header {
        display: flex;
        justify-content: space-between;

        h2 {
            font-size: 22px;
            margin-block-end: 6px;
            color: var(--text-dark-color);
        }
    }

    .side {
        padding: 24px 0 24px 26px;
        border-inline-end: 1px solid var(--grey-5-color);
    }

    .main {
        padding: 24px 0 24px 36px;
    }

    .title {
        font-size: 20px;
        color: var(--text-dark-color);
        margin-block-end: 18px;
    }

    .btn-container {
        display: flex;
        gap: 30px;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        &__btn-create-nft {
            display: flex;
            font-weight: 600;
            font-size: 16px;
            align-items: center;
            gap: 6px;
            cursor: pointer;

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

        &__btn-grant-access-container {
            display: flex;
            align-items: center;
            gap: 15px;
        }
    }

    .tabs {
        margin-bottom: 10px;
    }
`;
