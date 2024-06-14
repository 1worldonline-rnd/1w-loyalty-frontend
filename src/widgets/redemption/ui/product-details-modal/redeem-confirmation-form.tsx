import { Checkbox } from '@/shared/rsuite/loyalty-platform';
import { PropsWithClassName } from '@/shared/utility-types';
import { useTranslation } from 'next-i18next';

type RedeemConfirmationFormProps = PropsWithClassName & {
    setIsAcceptedConditions: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAcceptedTerms: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RedeemConfirmationForm = ({
    setIsAcceptedConditions,
    setIsAcceptedTerms,
    className,
}: RedeemConfirmationFormProps) => {
    const { t } = useTranslation('common', { keyPrefix: 'redemption' });

    return (
        <form className={className}>
            <h3>{t('accept-terms')}:</h3>
            <label>
                <Checkbox onChange={() => setIsAcceptedConditions((prev) => !prev)} />
                {t('terms-checkbox')}
            </label>
            <label>
                <Checkbox onChange={() => setIsAcceptedTerms((prev) => !prev)} />
                {t('privacy-checkbox')}
            </label>
        </form>
    );
};
