import { adminPanelModel } from '@/entities/admin-panel';
import { nftModel } from '@/entities/nft';
import { nftSmartContractAbi, nftSmartContractBytecode } from '@/entities/nft/model/stores';
import { userModel } from '@/entities/user';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { showMessage } from '@/shared/lib/messages';
import { useStore } from 'effector-react';
import { ethers } from 'ethers';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEthers } from '../../crypto/hooks/useEthers';
import { NftCollection } from '@/shared/api/nft-collections/types';

type Options = Array<{
    label: string;
    value: string;
}>;

export type NftCollectionCreationFormValues = {
    name: string;
    description: string;
    symbol: string;
    blockchain: { label: string; value: NftCollection['blockchain'] };
};

export const getMainWalletAddress = (blockchain: NftCollection['blockchain']) => {
    if (blockchain === 'POLYGON') return process.env.NEXT_PUBLIC_POLYGON_CRYPTO_SYSTEM_WALLET;
    if (blockchain === 'CAMINO') return process.env.NEXT_PUBLIC_CAMINO_CRYPTO_SYSTEM_WALLET;
};

export const useNftCollectionCreationForm = () => {
    const { validationMessages } = useLocalizedYupValidations();
    const partnerId = useStore(userModel.stores.$partnerId);
    const { account, switchNetworkByChainName, provider: web3Provider, ethereum, chainId } = useEthers();

    const polygonOption = { label: 'Polygon', value: 'POLYGON' };
    const caminoOption = { label: 'Camino', value: 'CAMINO' };

    const blockchainOptions: Options = [polygonOption, caminoOption];

    const validationSchema = Yup.object({
        name: Yup.string()
            .trim()
            .required(validationMessages.required)
            .max(128, validationMessages.maxCharacters(128)),
        description: Yup.string()
            .trim()
            .required(validationMessages.required)
            .max(256, validationMessages.maxCharacters(256)),
        symbol: Yup.string()
            .trim()
            .required(validationMessages.required)
            .max(10, validationMessages.maxCharacters(10)),
    });

    const form = useFormik<NftCollectionCreationFormValues>({
        initialValues: {
            name: '',
            description: '',
            symbol: '',
            blockchain: { label: 'Polygon', value: 'POLYGON' },
        },
        onSubmit: async ({ name, description, symbol, blockchain }) => {
            if (ethereum && account && web3Provider) {
                switchNetworkByChainName(blockchain.value);
                const signer = web3Provider.getSigner(account);
                const factory = new ethers.ContractFactory(
                    nftSmartContractAbi,
                    nftSmartContractBytecode,
                    signer
                );

                const contract = await factory.deploy(account, name, symbol);
                await contract.deployed();

                const mainWalletAddress = getMainWalletAddress(blockchain.value);
                const tx = await contract.setApprovalForAll(mainWalletAddress, true);
                await tx.wait();

                const receipt = await web3Provider.getTransactionReceipt(tx.hash);

                if (partnerId && account) {
                    const { status, data } = await nftModel.effects.createNftCollectionFx({
                        id: '',
                        name,
                        status: 'ACTIVE',
                        description,
                        symbol,
                        partnerId,
                        smartContractAddress: contract.address,
                        ownerWalletAddress: account,
                        isAccessGranted: receipt.status === 1,
                        blockchain: blockchain.value,
                    });

                    if (status === 200 && data.id) {
                        showMessage('NFT collection successfully created');

                        if (receipt.status === 1 && data.id) {
                            const { status: updateAccessStatus } =
                                await nftModel.effects.updatedNftCollectionAccessFx({
                                    collectionId: data.id,
                                    partnerId,
                                    isAccessGranted: true,
                                });

                            if (updateAccessStatus === 200) {
                                showMessage('Access to NFT collection successfully granted');
                            }
                        }

                        adminPanelModel.events.adminModalToggled({
                            isOpen: false,
                            entityIdToBeManage: undefined,
                        });
                    }
                }
            }
        },
        validationSchema,
    });

    return { form, blockchainOptions };
};
