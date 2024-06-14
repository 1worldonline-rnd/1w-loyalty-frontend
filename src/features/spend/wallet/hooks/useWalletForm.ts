import { setNestedObjectValues, useFormik } from 'formik';
import * as Yup from 'yup';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { userModel } from '@/entities/user';
import { showMessage } from '@/shared/lib/messages';
import { useLocalizedYupValidations } from '@/shared/hooks';
import { WalletInitialValues } from '../types';

export const useWalletForm = () => {
    const account = useStore(userModel.stores.$account);
    const isPendingWalletAccount = useStore(userModel.effects.setWalletAccountFx.pending);

    const { walletTransferRestrictions } = account || {};
    const { max: maxTokensNumber = 0, min: minTokensNumber = 0 } = walletTransferRestrictions || {};

    const [isWalletEditMode, setWalletEditMode] = useState(false);
    const [shouldCleanField, setShouldCleanField] = useState(true);
    const [isShowWallet, setIsShowWallet] = useState(false);

    const { validationSchemes, validationMessages } = useLocalizedYupValidations();
    const { maxNumber, minNumber, onlyDigits, required } = validationMessages;

    const validationSchema = Yup.object({
        wallet: validationSchemes.walletRegExp,
        tokensNumber: Yup.number()
            .typeError(onlyDigits)
            .required(required)
            .max(maxTokensNumber + 1, maxNumber(maxTokensNumber))
            .min(minTokensNumber - 1, minNumber(minTokensNumber)),
    });

    const form = useFormik<WalletInitialValues>({
        initialValues: {
            wallet: '',
            tokensNumber: 0,
        },
        onSubmit: async ({ wallet }, { resetForm }) => {
            const { status } = await userModel.effects.setWalletAccountFx(wallet);

            if (status === 200) {
                showMessage('Wallet successfully Changed');
                resetForm();
            }
            setWalletEditMode(false);
        },
        validationSchema,
    });

    const validateFormManually = async () => {
        const errors = await form.validateForm();

        if (Object.keys(errors).length !== 0) {
            form.setTouched(setNestedObjectValues(errors, true));
            setShouldCleanField(true);
        }

        return Object.keys(errors).length === 0;
    };

    const { setErrors, setFieldValue, setTouched, setValues } = form;

    const handleFocus = () => {
        if (shouldCleanField) {
            setFieldValue('tokensNumber', '', false);
            setShouldCleanField(false);
        }
    };

    const onCancel = () => {
        setIsShowWallet(!isShowWallet);
        setWalletEditMode(false);
        setErrors({});
        setTouched({});
        setFieldValue('tokensNumber', Math.floor(account?.balanceTokens || 0));

        setShouldCleanField(true);
    };

    useEffect(() => {
        if (account) {
            setValues({
                tokensNumber: Math.floor(account.balanceTokens || 0),
                wallet: account.wallet || '',
            });
        }
    }, [account, setValues]);

    return {
        form,
        setWalletEditMode,
        validateFormManually,
        handleFocus,
        setIsShowWallet,
        onCancel,
        isShowWallet,
        isWalletEditMode,
        isPendingWalletAccount,
        shouldCleanField,
    };
};
