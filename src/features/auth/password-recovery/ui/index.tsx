import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { ErrorMessage, Loader, PasswordStrengthMeter } from '@/shared/ui';
import { usePasswordRecoveryForm } from '../hooks/usePasswordRecoveryForm';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import { Button, PasswordInput } from '@/shared/rsuite/loyalty-platform';

export const PasswordRecoveryForm = styled(({ className }: PropsWithClassName) => {
    const { form: f } = usePasswordRecoveryForm();

    const { t } = useTranslation('common', { keyPrefix: 'password-recovery-page' });

    return (
        <form className={className} onSubmit={f.handleSubmit}>
            <PasswordInput
                className="input"
                size="lg"
                type="password"
                placeholder={t('password-input-placeholder')}
                autoComplete="on"
                {...f.getFieldProps('password')}
                onChange={(newValue) => f.setFieldValue('password', newValue)}
                hasError={Boolean(f.touched.password && f.errors.password)}
            />

            {f.touched.password && f.errors.password && (
                <ErrorMessage>{f.errors.password}</ErrorMessage>
            )}

            <PasswordInput
                className="input"
                size="lg"
                type="password"
                placeholder={t('repeat-password-input-placeholder')}
                autoComplete="on"
                {...f.getFieldProps('repeatPassword')}
                onChange={(newValue) => f.setFieldValue('repeatPassword', newValue)}
                hasError={Boolean(f.touched.repeatPassword && f.errors.repeatPassword)}
            />

            {f.touched.repeatPassword && f.errors.repeatPassword && (
                <ErrorMessage>{f.errors.repeatPassword}</ErrorMessage>
            )}

            <PasswordStrengthMeter password={f.values.password} />

            <Button size="lg" appearance="primary" type="submit" disabled={f.isSubmitting}>
                {f.isSubmitting ? <Loader /> : t('password-recovery-button-submit')}
            </Button>
        </form>
    );
})`
    ${styles}
`;
