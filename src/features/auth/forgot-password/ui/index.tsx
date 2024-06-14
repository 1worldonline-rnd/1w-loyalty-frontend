import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useForgotPasswordForm } from '../hooks/useForgotPasswordForm';
import { styles } from './styles';
import { ErrorMessage, Loader } from '@/shared/ui';
import { PropsWithClassName } from '@/shared/utility-types';
import { Button, Input } from '@/shared/rsuite/loyalty-platform';

export const ForgotPasswordForm = styled(({ className }: PropsWithClassName) => {
    const { form: f } = useForgotPasswordForm();

    const { t } = useTranslation('common', { keyPrefix: 'forgot-password-page' });

    return (
        <form className={className} onSubmit={f.handleSubmit}>
            <Input
                hasError={Boolean(f.touched.email && f.errors.email)}
                size="lg"
                type="email"
                placeholder={t('email-input-placeholder')}
                autoComplete="on"
                {...f.getFieldProps('email')}
                onChange={(newValue: string) => f.setFieldValue('email', newValue)}
            />

            {f.touched.email && f.errors.email && <ErrorMessage>{f.errors.email}</ErrorMessage>}

            <Button className="submit" size="lg" appearance="primary" type="submit" disabled={f.isSubmitting}>
                {f.isSubmitting ? <Loader /> : t('forgot-password-submit-button')}
            </Button>
        </form>
    );
})`
    ${styles}
`;
