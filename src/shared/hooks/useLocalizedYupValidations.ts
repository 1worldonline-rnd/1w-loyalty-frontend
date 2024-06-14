import * as Yup from 'yup';
import { useTranslation } from 'next-i18next';
import { isAddress } from '../lib/wallet';

export const useLocalizedYupValidations = () => {
    const { t } = useTranslation('common', { keyPrefix: 'validationMessages' });

    const messageIfRequired = t('required');

    return {
        validationMessages: {
            required: messageIfRequired,
            incorrectEmail: t('incorrect-email'),
            onlyDigits: t('only-digits'),
            onlyIntegers: t('only-integers'),
            ifMonthlyBiggerDaily: t('if-monthly-bigger-daily'),
            incorrectUrl: t('incorrect-url'),
            maxCharacters: (amount: number) => {
                return t('field-max-length').replace('/{?}/', String(amount));
            },
            maxNumber: (number: number) => {
                return t('max-number').replace('/{?}/', String(number));
            },
            minNumber: (number: number) => {
                return t('min-number').replace('/{?}/', String(number));
            },
            maxOffset: (number: number) => {
                return t('max-offset').replace('/{?}/', String(number));
            },
            positive: t('positive'),
        },
        validationSchemes: {
            passwordWithRegExp: Yup.string()
                .required(messageIfRequired)
                .min(6, t('password-min-length'))
                .matches(/[0-9a-zA-Z@#$%=!\-+^*.()?<>_:;/|]+/, t('password-general-requirements'))
                .matches(/[A-Za-z]+/, t('password-must-contain-letter'))
                .matches(/(?=.*[@#$%=!\-+^*.()?<>_:;/|])/g, t('password-must-contain-non-letter-character')),
            repeatPassword: (field: string) => {
                return Yup.string()
                    .required(messageIfRequired)
                    .oneOf([Yup.ref(field), null], t('password-mismatch'));
            },
            walletRegExp: Yup.string()
                .required(messageIfRequired)
                .min(40, t('crypto-wallet-min-length'))
                .test('is-valid', t('incorrect-crypto-wallet'), isAddress),
            hex: Yup.string()
                .required(messageIfRequired)
                .matches(/#([a-f0-9]{3}){1,2}\b/i, t('incorrect-hex')),
        },
    };
};
