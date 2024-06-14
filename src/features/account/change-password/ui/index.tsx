import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useChangePasswordForm } from '../hooks/useChangePasswordForm';
import { ErrorMessage, PasswordStrengthMeter, Loader } from '@/shared/ui';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import { Button, PasswordInput } from '@/shared/rsuite/loyalty-platform';

export const ChangePassword = styled(({ className }: PropsWithClassName) => {
    const { form: f } = useChangePasswordForm();

    const { t } = useTranslation('common', { keyPrefix: 'account-settings-page.change-password' });

    return (
        <section className={className}>
            <h2 className="account-page__section-title">{t('title')}</h2>

            <form className="account-page__section-content" onSubmit={f.handleSubmit}>
                <div className="input-wrapper">
                    <label>
                        <span>{t('old-password-input-label')}</span>

                        <PasswordInput
                            hasError={Boolean(f.touched.currentPassword && f.errors.currentPassword)}
                            className="input"
                            size="lg"
                            autoComplete="on"
                            {...f.getFieldProps('currentPassword')}
                            onChange={(newValue) => f.setFieldValue('currentPassword', newValue)}
                        />
                    </label>

                    {f.touched.currentPassword && f.errors.currentPassword && (
                        <ErrorMessage>{f.errors.currentPassword}</ErrorMessage>
                    )}
                </div>

                <div className="input-wrapper">
                    <label>
                        <span>{t('new-password-input-label')}</span>

                        <PasswordInput
                            hasError={Boolean(f.touched.newPassword && f.errors.newPassword)}
                            className="input"
                            size="lg"
                            autoComplete="on"
                            {...f.getFieldProps('newPassword')}
                            onChange={(newValue) => f.setFieldValue('newPassword', newValue)}
                        />
                    </label>

                    {f.touched.newPassword && f.errors.newPassword && (
                        <ErrorMessage>{f.errors.newPassword}</ErrorMessage>
                    )}
                </div>

                <PasswordStrengthMeter password={f.values.newPassword} />

                <Button size="lg" appearance="primary" type="submit" disabled={f.isSubmitting || !f.isValid}>
                    {f.isSubmitting ? <Loader /> : t('save-password-submit-button')}
                </Button>
            </form>
        </section>
    );
})`
    ${styles}
`;
