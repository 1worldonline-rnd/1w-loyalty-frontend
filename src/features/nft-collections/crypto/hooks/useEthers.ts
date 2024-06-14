import { showMessage } from '@/shared/lib/messages';
import { Nullable } from '@/shared/utility-types';
import { ethers } from 'ethers';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

export function useEthers() {
    const { ethereum } = window;

    const [account, setAccount] = useState<Nullable<string>>(null);
    const [chainId, setChainId] = useState<Nullable<number>>(null);
    const [provider, setProvider] = useState<Nullable<ethers.providers.Web3Provider>>(
        ethereum ? new ethers.providers.Web3Provider(ethereum) : null
    );

    useEffect(() => {
        if (ethereum && chainId) {
            setProvider(new ethers.providers.Web3Provider(ethereum));
        }
    }, [ethereum, chainId]);

    const { t } = useTranslation('common', { keyPrefix: 'nft' });

    const fetchAccountAndChainId = async () => {
        try {
            if (typeof ethereum !== 'undefined' && provider) {
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);

                const network = await provider.getNetwork();
                setChainId(network.chainId);

                const handleAccountsChanged = (accounts: string[]) => {
                    setAccount(accounts[0] || null);
                };

                const handleChainChanged = (newChainId: string) => {
                    setChainId(parseInt(newChainId, 16));
                };

                ethereum.on('accountsChanged', handleAccountsChanged);
                ethereum.on('chainChanged', handleChainChanged);

                return () => {
                    ethereum.off('accountsChanged', handleAccountsChanged);
                    ethereum.off('chainChanged', handleChainChanged);
                };
            } else {
                showMessage(t('install-wallet'));
            }
        } catch (_) {
            console.warn(t('wallet-not-connected'));
        }
    };

    useEffect(() => {
        if (ethereum && !provider) {
            setProvider(new ethers.providers.Web3Provider(ethereum));
        } else if (!ethereum) {
            setProvider(null);
        }
    }, [ethereum]);

    useEffect(() => {
        fetchAccountAndChainId();
    }, []);

    const switchNetwork = async (networkId: number) => {
        if (typeof ethereum !== 'undefined') {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [
                    {
                        chainId: `0x${networkId.toString(16)}`,
                    },
                ],
            });
        } else {
            showMessage(t('install-wallet'));
        }
    };

    const switchNetworkByChainName = async (chainName: string) => {
        switch (chainName) {
            case 'POLYGON':
                switchNetwork(Number(process.env.NEXT_PUBLIC_POLYGON_ID));
                break;
            case 'CAMINO':
                switchNetwork(Number(process.env.NEXT_PUBLIC_CAMINO_ID));
                break;
        }
    };

    const activateBrowserWallet = async () => {
        if (typeof ethereum !== 'undefined') {
            await ethereum.request({ method: 'eth_requestAccounts' });
            fetchAccountAndChainId();
        } else {
            showMessage(t('install-wallet'));
        }
    };

    return {
        account,
        chainId,
        provider,
        ethereum,
        switchNetwork,
        switchNetworkByChainName,
        activateBrowserWallet,
    };
}
