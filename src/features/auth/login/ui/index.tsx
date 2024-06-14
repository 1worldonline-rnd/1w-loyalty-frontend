import styled from 'styled-components';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useLoginForm } from '../hooks/useLoginForm';
import { styles } from './styles';
import { ErrorMessage, Loader } from '@/shared/ui';
import { useSocialAuth } from '@/shared/hooks';
import { PropsWithClassName } from '@/shared/utility-types';
import { Button, Input, PasswordInput } from '@/shared/rsuite/loyalty-platform';

export const LoginForm = styled(({ className }: PropsWithClassName) => {
    const { form: f } = useLoginForm();

    const { loginWithGoogle, loginWithTwitter, isLoadingSocialLogin } = useSocialAuth();

    const { t, i18n } = useTranslation('common', { keyPrefix: 'login-form' });

    return (
        <form className={className} onSubmit={f.handleSubmit}>
            {/* TODO: remove 'social-buttons' to separete component */}
            <div className="social-buttons">
                <Button
                    size="lg"
                    onClick={loginWithGoogle}
                    appearance="ghost"
                    title={i18n.t('login-button-google-title')}
                >
                    <Image
                        src="/loyalty/images/google.svg"
                        width={20}
                        height={20}
                        alt={i18n.t('google-icon-alternative-text')}
                    />
                </Button>

                <Button
                    size="lg"
                    onClick={loginWithTwitter}
                    appearance="ghost"
                    title={i18n.t('login-button-twitter-title')}
                >
                    <Image
                        src="/loyalty/images/twitter.svg"
                        width={20}
                        height={15}
                        alt={i18n.t('twitter-icon-alternative-text')}
                    />
                </Button>
            </div>

            <div>
                <Input
                    hasError={Boolean(f.touched.email && f.errors.email)}
                    className="input"
                    size="lg"
                    type="email"
                    placeholder={t('email-input-placeholder')}
                    {...f.getFieldProps('email')}
                    onChange={(newValue: string) => f.setFieldValue('email', newValue)}
                />

                {f.touched.email && f.errors.email && <ErrorMessage>{f.errors.email}</ErrorMessage>}

                <PasswordInput
                    hasError={Boolean(f.touched.password && f.errors.password)}
                    className="input"
                    size="lg"
                    type="password"
                    placeholder={t('password-input-placeholder')}
                    autoComplete="on"
                    {...f.getFieldProps('password')}
                    onChange={(newValue) => f.setFieldValue('password', newValue)}
                />

                {f.touched.password && f.errors.password && (
                    <ErrorMessage>{f.errors.password}</ErrorMessage>
                )}
            </div>

            <Button
                size="lg"
                appearance="primary"
                type="submit"
                disabled={f.isSubmitting || isLoadingSocialLogin}
                className="submit"
            >
                {f.isSubmitting || isLoadingSocialLogin ? <Loader /> : t('login-submit-button')}
            </Button>
        </form>
    );
})`
    ${styles}
`;
