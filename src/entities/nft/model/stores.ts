import { adminPanelModel } from '@/entities/admin-panel';
import { Nft, NftCollection } from '@/shared/api/nft-collections/types';
import { NftWidgetQuery } from '@/shared/api/nft-widgets/types';
import { Nullable } from '@/shared/utility-types';
import { combine, createStore } from 'effector';

export const $nftCollections = createStore<NftCollection[]>([]);

export const $nftWidgets = createStore<NftWidgetQuery[]>([]);

export const $nftsByCollectionId = createStore<Nft[]>([]);

export const $activeNftCollectionId = createStore<Nullable<NftCollection['id']>>(null);

export const $editedNftWidget = combine(
    $nftWidgets,
    adminPanelModel.stores.$adminModal,
    (nftWidgets, { entityIdToBeManage, entity, mode }) => {
        if (nftWidgets.length && entityIdToBeManage && entity === 'nft-widget' && mode === 'update') {
            return nftWidgets.find(({ id }) => id === entityIdToBeManage);
        }
        return null;
    }
);

export const $activeNftCollection = combine(
    $nftCollections,
    $activeNftCollectionId,
    (nftCollections, activeNftCollectionId) => {
        return nftCollections.find(({ id }) => id === activeNftCollectionId) || null;
    }
);

export const $nftCollectionOptions = $nftCollections.map((collections) => {
    return collections.map((collection) => ({
        label: collection.name,
        value: collection.id,
    }));
});

export const nftSmartContractAbi = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'initialOwner',
                type: 'address',
            },
            {
                internalType: 'string',
                name: 'name',
                type: 'string',
            },
            {
                internalType: 'string',
                name: 'symbol',
                type: 'string',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [],
        name: 'ERC721EnumerableForbiddenBatchMint',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'ERC721IncorrectOwner',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'ERC721InsufficientApproval',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'approver',
                type: 'address',
            },
        ],
        name: 'ERC721InvalidApprover',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
        ],
        name: 'ERC721InvalidOperator',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'ERC721InvalidOwner',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'receiver',
                type: 'address',
            },
        ],
        name: 'ERC721InvalidReceiver',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'sender',
                type: 'address',
            },
        ],
        name: 'ERC721InvalidSender',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'ERC721NonexistentToken',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'index',
                type: 'uint256',
            },
        ],
        name: 'ERC721OutOfBoundsIndex',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'OwnableInvalidOwner',
        type: 'error',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'OwnableUnauthorizedAccount',
        type: 'error',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'approved',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'Approval',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'bool',
                name: 'approved',
                type: 'bool',
            },
        ],
        name: 'ApprovalForAll',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: '_fromTokenId',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: '_toTokenId',
                type: 'uint256',
            },
        ],
        name: 'BatchMetadataUpdate',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint256',
                name: '_tokenId',
                type: 'uint256',
            },
        ],
        name: 'MetadataUpdate',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'Transfer',
        type: 'event',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'getApproved',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
        ],
        name: 'isApprovedForAll',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        name: 'minters',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'name',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'ownerOf',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'string',
                name: 'uri',
                type: 'string',
            },
        ],
        name: 'safeMint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
            {
                internalType: 'bytes',
                name: 'data',
                type: 'bytes',
            },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: 'approved',
                type: 'bool',
            },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes4',
                name: 'interfaceId',
                type: 'bytes4',
            },
        ],
        name: 'supportsInterface',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'symbol',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'index',
                type: 'uint256',
            },
        ],
        name: 'tokenByIndex',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'index',
                type: 'uint256',
            },
        ],
        name: 'tokenOfOwnerByIndex',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'tokenURI',
        outputs: [
            {
                internalType: 'string',
                name: '',
                type: 'string',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'from',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'to',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'tokenId',
                type: 'uint256',
            },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];

export const nftSmartContractBytecode =
    '608060405234801561001057600080fd5b5060405161372c38038061372c833981810160405281019061003291906103d2565b8282828160009081610044919061067e565b508060019081610054919061067e565b505050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036100c95760006040517f1e4fbdf70000000000000000000000000000000000000000000000000000000081526004016100c0919061075f565b60405180910390fd5b6100d88161013960201b60201c565b506001600d60008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050505061077a565b6000600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600b60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061023e82610213565b9050919050565b61024e81610233565b811461025957600080fd5b50565b60008151905061026b81610245565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6102c48261027b565b810181811067ffffffffffffffff821117156102e3576102e261028c565b5b80604052505050565b60006102f66101ff565b905061030282826102bb565b919050565b600067ffffffffffffffff8211156103225761032161028c565b5b61032b8261027b565b9050602081019050919050565b60005b8381101561035657808201518184015260208101905061033b565b60008484015250505050565b600061037561037084610307565b6102ec565b90508281526020810184848401111561039157610390610276565b5b61039c848285610338565b509392505050565b600082601f8301126103b9576103b8610271565b5b81516103c9848260208601610362565b91505092915050565b6000806000606084860312156103eb576103ea610209565b5b60006103f98682870161025c565b935050602084015167ffffffffffffffff81111561041a5761041961020e565b5b610426868287016103a4565b925050604084015167ffffffffffffffff8111156104475761044661020e565b5b610453868287016103a4565b9150509250925092565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806104af57607f821691505b6020821081036104c2576104c1610468565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261052a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826104ed565b61053486836104ed565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600061057b6105766105718461054c565b610556565b61054c565b9050919050565b6000819050919050565b61059583610560565b6105a96105a182610582565b8484546104fa565b825550505050565b600090565b6105be6105b1565b6105c981848461058c565b505050565b5b818110156105ed576105e26000826105b6565b6001810190506105cf565b5050565b601f82111561063257610603816104c8565b61060c846104dd565b8101602085101561061b578190505b61062f610627856104dd565b8301826105ce565b50505b505050565b600082821c905092915050565b600061065560001984600802610637565b1980831691505092915050565b600061066e8383610644565b9150826002028217905092915050565b6106878261045d565b67ffffffffffffffff8111156106a05761069f61028c565b5b6106aa8254610497565b6106b58282856105f1565b600060209050601f8311600181146106e857600084156106d6578287015190505b6106e08582610662565b865550610748565b601f1984166106f6866104c8565b60005b8281101561071e578489015182556001820191506020850194506020810190506106f9565b8683101561073b5784890151610737601f891682610644565b8355505b6001600288020188555050505b505050505050565b61075981610233565b82525050565b60006020820190506107746000830184610750565b92915050565b612fa3806107896000396000f3fe608060405234801561001057600080fd5b50600436106101375760003560e01c806370a08231116100b8578063b88d4fde1161007c578063b88d4fde1461034e578063c87b56dd1461036a578063d204c45e1461039a578063e985e9c5146103b6578063f2fde38b146103e6578063f46eccc41461040257610137565b806370a08231146102bc578063715018a6146102ec5780638da5cb5b146102f657806395d89b4114610314578063a22cb4651461033257610137565b806323b872dd116100ff57806323b872dd146101f45780632f745c591461021057806342842e0e146102405780634f6ccce71461025c5780636352211e1461028c57610137565b806301ffc9a71461013c57806306fdde031461016c578063081812fc1461018a578063095ea7b3146101ba57806318160ddd146101d6575b600080fd5b610156600480360381019061015191906122fd565b610432565b6040516101639190612345565b60405180910390f35b610174610444565b60405161018191906123f0565b60405180910390f35b6101a4600480360381019061019f9190612448565b6104d6565b6040516101b191906124b6565b60405180910390f35b6101d460048036038101906101cf91906124fd565b6104f2565b005b6101de610508565b6040516101eb919061254c565b60405180910390f35b61020e60048036038101906102099190612567565b610515565b005b61022a600480360381019061022591906124fd565b610617565b604051610237919061254c565b60405180910390f35b61025a60048036038101906102559190612567565b6106c0565b005b61027660048036038101906102719190612448565b6106e0565b604051610283919061254c565b60405180910390f35b6102a660048036038101906102a19190612448565b610756565b6040516102b391906124b6565b60405180910390f35b6102d660048036038101906102d191906125ba565b610768565b6040516102e3919061254c565b60405180910390f35b6102f4610822565b005b6102fe610836565b60405161030b91906124b6565b60405180910390f35b61031c610860565b60405161032991906123f0565b60405180910390f35b61034c60048036038101906103479190612613565b6108f2565b005b61036860048036038101906103639190612788565b6109bc565b005b610384600480360381019061037f9190612448565b6109d9565b60405161039191906123f0565b60405180910390f35b6103b460048036038101906103af91906128ac565b6109eb565b005b6103d060048036038101906103cb9190612908565b610aab565b6040516103dd9190612345565b60405180910390f35b61040060048036038101906103fb91906125ba565b610b3f565b005b61041c600480360381019061041791906125ba565b610bc5565b6040516104299190612345565b60405180910390f35b600061043d82610be5565b9050919050565b60606000805461045390612977565b80601f016020809104026020016040519081016040528092919081815260200182805461047f90612977565b80156104cc5780601f106104a1576101008083540402835291602001916104cc565b820191906000526020600020905b8154815290600101906020018083116104af57829003601f168201915b5050505050905090565b60006104e182610c46565b506104eb82610cce565b9050919050565b61050482826104ff610d0b565b610d13565b5050565b6000600880549050905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036105875760006040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040161057e91906124b6565b60405180910390fd5b600061059b8383610596610d0b565b610d25565b90508373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610611578382826040517f64283d7b000000000000000000000000000000000000000000000000000000008152600401610608939291906129a8565b60405180910390fd5b50505050565b600061062283610768565b82106106675782826040517fa57d13dc00000000000000000000000000000000000000000000000000000000815260040161065e9291906129df565b60405180910390fd5b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002054905092915050565b6106db838383604051806020016040528060008152506109bc565b505050565b60006106ea610508565b8210610730576000826040517fa57d13dc0000000000000000000000000000000000000000000000000000000081526004016107279291906129df565b60405180910390fd5b6008828154811061074457610743612a08565b5b90600052602060002001549050919050565b600061076182610c46565b9050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036107db5760006040517f89c62b640000000000000000000000000000000000000000000000000000000081526004016107d291906124b6565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b61082a610d3b565b6108346000610dc2565b565b6000600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60606001805461086f90612977565b80601f016020809104026020016040519081016040528092919081815260200182805461089b90612977565b80156108e85780601f106108bd576101008083540402835291602001916108e8565b820191906000526020600020905b8154815290600101906020018083116108cb57829003601f168201915b5050505050905090565b6108fc8282610e88565b801561095f576001600d60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506109b8565b6000600d60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5050565b6109c7848484610515565b6109d384848484610e9e565b50505050565b60606109e482611055565b9050919050565b600d60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16610a77576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a6e90612a83565b60405180910390fd5b6000600c6000815480929190610a8c90612ad2565b919050559050610a9c8382611168565b610aa68183611186565b505050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610b47610d3b565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610bb95760006040517f1e4fbdf7000000000000000000000000000000000000000000000000000000008152600401610bb091906124b6565b60405180910390fd5b610bc281610dc2565b50565b600d6020528060005260406000206000915054906101000a900460ff1681565b6000634906490660e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480610c3f5750610c3e826111e2565b5b9050919050565b600080610c528361125c565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610cc557826040517f7e273289000000000000000000000000000000000000000000000000000000008152600401610cbc919061254c565b60405180910390fd5b80915050919050565b60006004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600033905090565b610d208383836001611299565b505050565b6000610d3284848461145e565b90509392505050565b610d43610d0b565b73ffffffffffffffffffffffffffffffffffffffff16610d61610836565b73ffffffffffffffffffffffffffffffffffffffff1614610dc057610d84610d0b565b6040517f118cdaa7000000000000000000000000000000000000000000000000000000008152600401610db791906124b6565b60405180910390fd5b565b6000600b60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600b60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b610e9a610e93610d0b565b838361157b565b5050565b60008373ffffffffffffffffffffffffffffffffffffffff163b111561104f578273ffffffffffffffffffffffffffffffffffffffff1663150b7a02610ee2610d0b565b8685856040518563ffffffff1660e01b8152600401610f049493929190612b6f565b6020604051808303816000875af1925050508015610f4057506040513d601f19601f82011682018060405250810190610f3d9190612bd0565b60015b610fc4573d8060008114610f70576040519150601f19603f3d011682016040523d82523d6000602084013e610f75565b606091505b506000815103610fbc57836040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401610fb391906124b6565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161461104d57836040517f64a0ae9200000000000000000000000000000000000000000000000000000000815260040161104491906124b6565b60405180910390fd5b505b50505050565b606061106082610c46565b506000600a6000848152602001908152602001600020805461108190612977565b80601f01602080910402602001604051908101604052809291908181526020018280546110ad90612977565b80156110fa5780601f106110cf576101008083540402835291602001916110fa565b820191906000526020600020905b8154815290600101906020018083116110dd57829003601f168201915b50505050509050600061110b6116ea565b90506000815103611120578192505050611163565b60008251111561115557808260405160200161113d929190612c39565b60405160208183030381529060405292505050611163565b61115e84611701565b925050505b919050565b61118282826040518060200160405280600081525061176a565b5050565b80600a600084815260200190815260200160002090816111a69190612e09565b507ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce7826040516111d6919061254c565b60405180910390a15050565b60007f780e9d63000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19161480611255575061125482611786565b5b9050919050565b60006002600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b80806112d25750600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614155b156114065760006112e284610c46565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561134d57508273ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b8015611360575061135e8184610aab565b155b156113a257826040517fa9fbf51f00000000000000000000000000000000000000000000000000000000815260040161139991906124b6565b60405180910390fd5b811561140457838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b836004600085815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050565b60008061146c858585611868565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036114b0576114ab84611a82565b6114ef565b8473ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16146114ee576114ed8185611acb565b5b5b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16036115315761152c84611c2c565b611570565b8473ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461156f5761156e8585611cfd565b5b5b809150509392505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036115ec57816040517f5b08ba180000000000000000000000000000000000000000000000000000000081526004016115e391906124b6565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516116dd9190612345565b60405180910390a3505050565b606060405180602001604052806000815250905090565b606061170c82610c46565b5060006117176116ea565b905060008151116117375760405180602001604052806000815250611762565b8061174184611d88565b604051602001611752929190612c39565b6040516020818303038152906040525b915050919050565b6117748383611e56565b6117816000848484610e9e565b505050565b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061185157507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80611861575061186082611f4f565b5b9050919050565b6000806118748461125c565b9050600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146118b6576118b5818486611fb9565b5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611947576118f8600085600080611299565b6001600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16146119ca576001600360008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b846002600086815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550838573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4809150509392505050565b6008805490506009600083815260200190815260200160002081905550600881908060018154018082558091505060019003906000526020600020016000909190919091505550565b6000611ad683610768565b9050600060076000848152602001908152602001600020549050818114611bbb576000600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002054905080600660008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600084815260200190815260200160002081905550816007600083815260200190815260200160002081905550505b6007600084815260200190815260200160002060009055600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008381526020019081526020016000206000905550505050565b60006001600880549050611c409190612edb565b9050600060096000848152602001908152602001600020549050600060088381548110611c7057611c6f612a08565b5b906000526020600020015490508060088381548110611c9257611c91612a08565b5b906000526020600020018190555081600960008381526020019081526020016000208190555060096000858152602001908152602001600020600090556008805480611ce157611ce0612f0f565b5b6001900381819060005260206000200160009055905550505050565b60006001611d0a84610768565b611d149190612edb565b905081600660008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002081905550806007600084815260200190815260200160002081905550505050565b606060006001611d978461207d565b01905060008167ffffffffffffffff811115611db657611db561265d565b5b6040519080825280601f01601f191660200182016040528015611de85781602001600182028036833780820191505090505b509050600082602001820190505b600115611e4b578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a8581611e3f57611e3e612f3e565b5b04945060008503611df6575b819350505050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603611ec85760006040517f64a0ae92000000000000000000000000000000000000000000000000000000008152600401611ebf91906124b6565b60405180910390fd5b6000611ed683836000610d25565b9050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614611f4a5760006040517f73c6ac6e000000000000000000000000000000000000000000000000000000008152600401611f4191906124b6565b60405180910390fd5b505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b611fc48383836121d0565b61207857600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff160361203957806040517f7e273289000000000000000000000000000000000000000000000000000000008152600401612030919061254c565b60405180910390fd5b81816040517f177e802f00000000000000000000000000000000000000000000000000000000815260040161206f9291906129df565b60405180910390fd5b505050565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083106120db577a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083816120d1576120d0612f3e565b5b0492506040810190505b6d04ee2d6d415b85acef81000000008310612118576d04ee2d6d415b85acef8100000000838161210e5761210d612f3e565b5b0492506020810190505b662386f26fc10000831061214757662386f26fc10000838161213d5761213c612f3e565b5b0492506010810190505b6305f5e1008310612170576305f5e100838161216657612165612f3e565b5b0492506008810190505b612710831061219557612710838161218b5761218a612f3e565b5b0492506004810190505b606483106121b857606483816121ae576121ad612f3e565b5b0492506002810190505b600a83106121c7576001810190505b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415801561228857508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16148061224957506122488484610aab565b5b8061228757508273ffffffffffffffffffffffffffffffffffffffff1661226f83610cce565b73ffffffffffffffffffffffffffffffffffffffff16145b5b90509392505050565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6122da816122a5565b81146122e557600080fd5b50565b6000813590506122f7816122d1565b92915050565b6000602082840312156123135761231261229b565b5b6000612321848285016122e8565b91505092915050565b60008115159050919050565b61233f8161232a565b82525050565b600060208201905061235a6000830184612336565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561239a57808201518184015260208101905061237f565b60008484015250505050565b6000601f19601f8301169050919050565b60006123c282612360565b6123cc818561236b565b93506123dc81856020860161237c565b6123e5816123a6565b840191505092915050565b6000602082019050818103600083015261240a81846123b7565b905092915050565b6000819050919050565b61242581612412565b811461243057600080fd5b50565b6000813590506124428161241c565b92915050565b60006020828403121561245e5761245d61229b565b5b600061246c84828501612433565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006124a082612475565b9050919050565b6124b081612495565b82525050565b60006020820190506124cb60008301846124a7565b92915050565b6124da81612495565b81146124e557600080fd5b50565b6000813590506124f7816124d1565b92915050565b600080604083850312156125145761251361229b565b5b6000612522858286016124e8565b925050602061253385828601612433565b9150509250929050565b61254681612412565b82525050565b6000602082019050612561600083018461253d565b92915050565b6000806000606084860312156125805761257f61229b565b5b600061258e868287016124e8565b935050602061259f868287016124e8565b92505060406125b086828701612433565b9150509250925092565b6000602082840312156125d0576125cf61229b565b5b60006125de848285016124e8565b91505092915050565b6125f08161232a565b81146125fb57600080fd5b50565b60008135905061260d816125e7565b92915050565b6000806040838503121561262a5761262961229b565b5b6000612638858286016124e8565b9250506020612649858286016125fe565b9150509250929050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b612695826123a6565b810181811067ffffffffffffffff821117156126b4576126b361265d565b5b80604052505050565b60006126c7612291565b90506126d3828261268c565b919050565b600067ffffffffffffffff8211156126f3576126f261265d565b5b6126fc826123a6565b9050602081019050919050565b82818337600083830152505050565b600061272b612726846126d8565b6126bd565b90508281526020810184848401111561274757612746612658565b5b612752848285612709565b509392505050565b600082601f83011261276f5761276e612653565b5b813561277f848260208601612718565b91505092915050565b600080600080608085870312156127a2576127a161229b565b5b60006127b0878288016124e8565b94505060206127c1878288016124e8565b93505060406127d287828801612433565b925050606085013567ffffffffffffffff8111156127f3576127f26122a0565b5b6127ff8782880161275a565b91505092959194509250565b600067ffffffffffffffff8211156128265761282561265d565b5b61282f826123a6565b9050602081019050919050565b600061284f61284a8461280b565b6126bd565b90508281526020810184848401111561286b5761286a612658565b5b612876848285612709565b509392505050565b600082601f83011261289357612892612653565b5b81356128a384826020860161283c565b91505092915050565b600080604083850312156128c3576128c261229b565b5b60006128d1858286016124e8565b925050602083013567ffffffffffffffff8111156128f2576128f16122a0565b5b6128fe8582860161287e565b9150509250929050565b6000806040838503121561291f5761291e61229b565b5b600061292d858286016124e8565b925050602061293e858286016124e8565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061298f57607f821691505b6020821081036129a2576129a1612948565b5b50919050565b60006060820190506129bd60008301866124a7565b6129ca602083018561253d565b6129d760408301846124a7565b949350505050565b60006040820190506129f460008301856124a7565b612a01602083018461253d565b9392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f43616c6c6572206973206e6f742061206d696e74657200000000000000000000600082015250565b6000612a6d60168361236b565b9150612a7882612a37565b602082019050919050565b60006020820190508181036000830152612a9c81612a60565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000612add82612412565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612b0f57612b0e612aa3565b5b600182019050919050565b600081519050919050565b600082825260208201905092915050565b6000612b4182612b1a565b612b4b8185612b25565b9350612b5b81856020860161237c565b612b64816123a6565b840191505092915050565b6000608082019050612b8460008301876124a7565b612b9160208301866124a7565b612b9e604083018561253d565b8181036060830152612bb08184612b36565b905095945050505050565b600081519050612bca816122d1565b92915050565b600060208284031215612be657612be561229b565b5b6000612bf484828501612bbb565b91505092915050565b600081905092915050565b6000612c1382612360565b612c1d8185612bfd565b9350612c2d81856020860161237c565b80840191505092915050565b6000612c458285612c08565b9150612c518284612c08565b91508190509392505050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302612cbf7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82612c82565b612cc98683612c82565b95508019841693508086168417925050509392505050565b6000819050919050565b6000612d06612d01612cfc84612412565b612ce1565b612412565b9050919050565b6000819050919050565b612d2083612ceb565b612d34612d2c82612d0d565b848454612c8f565b825550505050565b600090565b612d49612d3c565b612d54818484612d17565b505050565b5b81811015612d7857612d6d600082612d41565b600181019050612d5a565b5050565b601f821115612dbd57612d8e81612c5d565b612d9784612c72565b81016020851015612da6578190505b612dba612db285612c72565b830182612d59565b50505b505050565b600082821c905092915050565b6000612de060001984600802612dc2565b1980831691505092915050565b6000612df98383612dcf565b9150826002028217905092915050565b612e1282612360565b67ffffffffffffffff811115612e2b57612e2a61265d565b5b612e358254612977565b612e40828285612d7c565b600060209050601f831160018114612e735760008415612e61578287015190505b612e6b8582612ded565b865550612ed3565b601f198416612e8186612c5d565b60005b82811015612ea957848901518255600182019150602085019450602081019050612e84565b86831015612ec65784890151612ec2601f891682612dcf565b8355505b6001600288020188555050505b505050505050565b6000612ee682612412565b9150612ef183612412565b9250828203905081811115612f0957612f08612aa3565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fdfea26469706673582212203a5d7eb333cfd3b652cc8d27ba7f5b638cb16a897610d16aaf2495081566b36964736f6c63430008190033';
