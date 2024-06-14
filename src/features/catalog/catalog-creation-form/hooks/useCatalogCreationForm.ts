import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { useStore } from 'effector-react';
import { userModel } from '@/entities/user';
import { redemptionModel } from '@/entities/redemption';
import type { PayloadToCreateCatalog } from '@/shared/api/redemption';
import { showMessage } from '@/shared/lib/messages';
import { adminPanelModel } from '@/entities/admin-panel';
import { Product } from '@/shared/api/redemption/types';

export type CatalogCreationFormValues = Pick<PayloadToCreateCatalog, 'name'> & {
    productsIds: Product['id'][];
};

export const useCatalogCreationForm = () => {
    const { validationMessages } = useLocalizedYupValidations();

    const partnerId = useStore(userModel.stores.$partnerId);
    const allProducts = useStore(redemptionModel.stores.$productsOfPartner);

    const validationSchema = Yup.object({
        name: Yup.string().trim().required(validationMessages.required),
    });

    const form = useFormik<CatalogCreationFormValues>({
        initialValues: {
            name: '',
            productsIds: [],
        },
        onSubmit: async ({ name, productsIds }) => {
            if (partnerId) {
                const { status, data } = await redemptionModel.effects.createCatalogFx({
                    partnerExternalId: partnerId,
                    name,
                    redemptionItems: [],
                });

                if (status === 201 && data.id) {
                    showMessage('Catalog successfully created');

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
