import { useStore } from 'effector-react';
import { nftModel } from '@/entities/nft';
import { userModel } from '@/entities/user';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showMessage } from '@/shared/lib/messages';
import { adminPanelModel } from '@/entities/admin-panel';

export type NftCreationFormValues = {
    name: string;
    description: string;
    metadataUrl: string;
    imageUrl: string;
    isPreMinted: boolean;
};

export const useNftCreationForm = () => {
    const { validationMessages } = useLocalizedYupValidations();
    const partnerId = useStore(userModel.stores.$partnerId);
    const activeCollectionId = useStore(nftModel.stores.$activeNftCollectionId);

    const validationSchema = Yup.object({
        name: Yup.string()
            .trim()
            .required(validationMessages.required)
            .max(256, validationMessages.maxCharacters(256)),
        description: Yup.string()
            .trim()
            .required(validationMessages.required)
            .max(256, validationMessages.maxCharacters(256)),
        metadataUrl: Yup.string()
            .trim()
            .required(validationMessages.required)
            .max(256, validationMessages.maxCharacters(256)),
        imageUrl: Yup.string()
            .trim()
            .required(validationMessages.required)
            .max(256, validationMessages.maxCharacters(256)),
        isPreMinted: Yup.bool().required(validationMessages.required),
    });

    const form = useFormik<NftCreationFormValues>({
        initialValues: {
            name: '',
            description: '',
            metadataUrl: '',
            imageUrl: '',
            isPreMinted: false,
        },
        onSubmit: async ({ name, description, metadataUrl, imageUrl, isPreMinted }) => {
            if (partnerId && activeCollectionId) {
                const { status, data } = await nftModel.effects.createNftFx({
                    nft: {
                        id: '',
                        name,
                        description,
                        metadataUrl,
                        imageUrl,
                        isPreMinted,
                        collectionId: activeCollectionId,
                    },
                    partnerId,
                });

                if (status === 200 && data.id) {
                    showMessage('NFT will be created soon. Please wait');
                    adminPanelModel.events.adminModalToggled({
                        isOpen: false,
                        entityIdToBeManage: undefined,
                    });
                }
            }
        },
        validationSchema,
    });

    return { form };
};
