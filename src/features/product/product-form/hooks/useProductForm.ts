import {CatalogMeta} from './../../../../shared/api/redemption/types';
import { adminPanelModel } from '@/entities/admin-panel';
import { redemptionModel } from '@/entities/redemption';
import { userModel } from '@/entities/user';
import { Product } from '@/shared/api/redemption/types';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { useStore } from 'effector-react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { $catalogOptions, $sequenceFeedOptions, $editedProduct, $activeCatalogId } from '../model';
import { getSequencesFx } from '@/entities/feed/model/effects';
import type { ProductValues } from '../types';
import { Nullable } from '@/shared/utility-types';

const productTypeOptions: { value: Product['type']; label: string }[] = [
    { value: 'Voucher', label: 'Voucher' },
    { value: 'Physical', label: 'Physical' },
    { value: 'Ticket', label: 'Ticket' },
];

const lockerTypeOptions: { value: Product['lockerType']; label: string }[] = [
    { value: 'EMPTY', label: 'Without locker' },
    { value: 'SEQUENCE_FEED', label: 'Sequence feed' },
];

const firstItemActionOptions: { value: Product['firstItemAction']; label: string }[] = [
    { value: 'DEFAULT', label: 'Default' },
    { value: 'FREE', label: 'Free' },
];

const productTypeOptionsByType = productTypeOptions.reduce<
    Partial<Record<Product['type'], (typeof productTypeOptions)[0]>>
>((acc, curr) => {
    acc[curr.value] = curr;
    return acc;
}, {});

const lockerTypeOptionsByType = lockerTypeOptions.reduce<
    Partial<Record<Product['lockerType'], (typeof lockerTypeOptions)[0]>>
>((acc, curr) => {
    acc[curr.value] = curr;
    return acc;
}, {});

const firstItemActionOptionsByType = firstItemActionOptions.reduce<
    Partial<Record<Product['firstItemAction'], (typeof firstItemActionOptions)[0]>>
>((acc, curr) => {
    acc[curr.value] = curr;
    return acc;
}, {});

export const useProductForm = () => {
    const { validationMessages } = useLocalizedYupValidations();

    const [immutableOptions, setImmutableOptions] =
        useState<Nullable<{ label: string; value: string }[]>>(null);

    const partnerId = useStore(userModel.stores.$partnerId);

    const editedProduct = useStore($editedProduct);
    const { mode } = useStore(adminPanelModel.stores.$adminModal);

    const activeCatalogId = useStore($activeCatalogId);

    const validationSchema = Yup.object({
        title: Yup.string()
            .required(validationMessages.required)
            .max(60, validationMessages.maxCharacters(60)),
        company: Yup.string()
            .required(validationMessages.required)
            .max(200, validationMessages.maxCharacters(200)),
        description: Yup.string().required(validationMessages.required).max(1000, 'Character limit exceeded'),
        purchaseDescription: Yup.string()
            .required(validationMessages.required)
            .max(1000, 'Character limit exceeded'),
        shortDescription: Yup.string()
            .required(validationMessages.required)
            .max(250, 'Character limit exceeded'),
        image: Yup.string().required(validationMessages.required).url(validationMessages.incorrectUrl),
        link: Yup.string().required(validationMessages.required).url(validationMessages.incorrectUrl),
        priceLocal: Yup.number()
            .positive(validationMessages.positive)
            .required(validationMessages.required)
            .typeError(validationMessages.onlyDigits),
        priceGlobal: Yup.number()
            .positive(validationMessages.positive)
            .required(validationMessages.required)
            .typeError(validationMessages.onlyDigits),
        limitPerUser: Yup.number()
            .min(0, validationMessages.positive)
            .typeError(validationMessages.onlyDigits),
        initialCount: Yup.number()
            .min(0, validationMessages.positive)
            .typeError(validationMessages.onlyDigits),
        count: Yup.number().positive(validationMessages.positive).typeError(validationMessages.onlyDigits),
    });

    const catalogOptions = useStore($catalogOptions);

    const sequenceFeedOptions = useStore($sequenceFeedOptions);

    useEffect(() => {
        if (partnerId) {
            getSequencesFx(partnerId);
        }
    }, [partnerId]);

    const modifyToOffsetDayEnd = (dateString: string) => {
        if (!dateString) {
            return '';
        }
        const date = new Date(dateString);

        if (date.getUTCHours() !== 23 && date.getUTCMinutes() !== 59 && date.getUTCSeconds() !== 59) {
            date.setUTCMinutes(date.getUTCMinutes() - date.getTimezoneOffset());
        }

        date.setUTCHours(23, 59, 59);

        return date.toISOString();
    };

    const convertToCatalogs = (catalogs: Nullable<{ label: string; value: string }[]>) => {
        if (immutableOptions) {
            return mapCatalogOptions(immutableOptions);
        }
        if (catalogs) {
            return mapCatalogOptions(catalogs);
        }
        return [];
    };

    const convertToCatalogOptions = (catalogs?: Nullable<CatalogMeta[]>) => {
        if (catalogs) {
            return catalogs.map((catalog) => ({
                value: catalog.id.toString(),
                label: catalog.name,
            }));
        }
        return [];
    };

    const mapCatalogOptions = (catalogOptions: { label: string; value: string }[]) => {
        return catalogOptions.map((catalog) => ({
            name: catalog.label,
            id: catalog.value,
        }));
    };

    const reloadProducts = () => {
        if (activeCatalogId && partnerId) {
            redemptionModel.effects.getProductsByCatalogIdFx({
                catalogId: activeCatalogId,
                partnerId,
                size: 1000,
                page: 0,
                isPurchased: false,
            });
        }
    }

    const form = useFormik<ProductValues>({
        initialValues: {
            company: '',
            initialCount: '0',
            description: '',
            image: '',
            link: '',
            priceGlobal: '',
            priceLocal: '',
            title: '',
            catalogs: [],
            type: productTypeOptions[0],
            lockerType: lockerTypeOptions[0],
            lockerId: null,
            limitPerUser: '0',
            firstItemAction: firstItemActionOptions[0],
            expirationDate: '',
            snapshotDate: '',
            purchaseDescription: '',
            shortDescription: '',
        },
        onSubmit: async (values) => {
            const { catalogs, ...product } = values;

            if (mode === 'create' && partnerId) {
                const { status } = await redemptionModel.effects.createProductsFx({
                    ...product,
                    type: product.type.value as Product['type'],
                    lockerType: product.lockerType?.value as Product['lockerType'],
                    lockerId:
                        product.lockerId?.value && product.lockerType.value !== 'EMPTY'
                            ? product.lockerId.value
                            : '',
                    firstItemAction: product.firstItemAction.value as Product['firstItemAction'],
                    priceGlobal: Number(product.priceGlobal),
                    priceLocal: Number(product.priceLocal),
                    snapshotDate: modifyToOffsetDayEnd(product.snapshotDate),
                    expirationDate: modifyToOffsetDayEnd(product.expirationDate),
                    initialCount: Number(product.initialCount),
                    availableCount: Number(product.initialCount),
                    limitPerUser: Number(product.limitPerUser),
                    partnerExternalId: partnerId,
                    catalogs: convertToCatalogs(catalogs),
                    partnerId,
                });

                if (status === 201) {
                    adminPanelModel.events.closeModal();
                    reloadProducts();
                }
            } else if (mode === 'update' && editedProduct && partnerId) {
                const { status } = await redemptionModel.effects.updateProductFx({
                    ...editedProduct,
                    ...product,
                    type: product.type.value as Product['type'],
                    lockerType: product.lockerType.value as Product['lockerType'],
                    lockerId:
                        product.lockerId?.value && product.lockerType.value !== 'EMPTY'
                            ? product.lockerId.value
                            : '',
                    firstItemAction: product.firstItemAction.value as Product['firstItemAction'],
                    priceGlobal: Number(product.priceGlobal),
                    priceLocal: Number(product.priceLocal),
                    snapshotDate: modifyToOffsetDayEnd(product.snapshotDate),
                    expirationDate: modifyToOffsetDayEnd(product.expirationDate),
                    initialCount: Number(product.initialCount),
                    availableCount: Number(product.initialCount),
                    limitPerUser: Number(product.limitPerUser),
                    partnerExternalId: partnerId,
                    catalogs: convertToCatalogs(catalogs),
                    partnerId
                });

                if (status === 201) {
                    adminPanelModel.events.closeModal();
                }
            }
        },
        validationSchema,
    });

    const receiveLockerId = () => {
        switch (editedProduct?.lockerType) {
            case 'EMPTY':
                return { label: '', value: '' };
            case 'SEQUENCE_FEED':
                return (
                    sequenceFeedOptions.find((feed) => feed.value === editedProduct?.lockerId) ?? {
                        label: '',
                        value: '',
                    }
                );
            default:
                return { label: '', value: '' };
        }
    };

    useEffect(() => {
        if (editedProduct && productTypeOptionsByType[editedProduct.type] && sequenceFeedOptions) {
            form.setValues({
                catalogs: convertToCatalogOptions(editedProduct.catalogs),
                company: editedProduct.company,
                initialCount: String(editedProduct.initialCount),
                image: editedProduct.image,
                link: editedProduct.link,
                priceGlobal: String(editedProduct.priceGlobal),
                priceLocal: String(editedProduct.priceLocal),
                title: editedProduct.title,
                type: productTypeOptionsByType[editedProduct.type]!,
                lockerType: lockerTypeOptionsByType[editedProduct.lockerType]!,
                lockerId: receiveLockerId(),
                limitPerUser: String(editedProduct.limitPerUser),
                firstItemAction: firstItemActionOptionsByType[editedProduct.firstItemAction]!,
                expirationDate: editedProduct.expirationDate,
                snapshotDate: editedProduct.snapshotDate,
                purchaseDescription: editedProduct.purchaseDescription,
                shortDescription: editedProduct.shortDescription,
                description: editedProduct.description,
            });
        }
    }, [editedProduct, productTypeOptionsByType, sequenceFeedOptions]);

    return {
        form,
        productTypeOptions,
        catalogOptions,
        sequenceFeedOptions,
        firstItemActionOptions,
        lockerTypeOptions,
        isEditing: mode === 'update',
        setImmutableOptions,
    };
};
