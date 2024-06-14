/* eslint-disable max-len */
import { memo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import type { ValueType } from 'rsuite/esm/Checkbox';
import { PropsWithClassName } from '@/shared/utility-types';
import { useSignUpForm } from '../hooks/useSignUpForm';
import { styles } from './styles';
import { ErrorMessage, Loader, PasswordStrengthMeter } from '@/shared/ui';
import { Route } from '@/shared/constants';
import { useCustomRouter, useSocialAuth } from '@/shared/hooks';
import { Button, Checkbox, Input, PasswordInput } from '@/shared/rsuite/loyalty-platform';

const PasswordStrengthMeterMemo = memo(PasswordStrengthMeter);

export const SignUpForm = styled(({ className }: PropsWithClassName) => {
    const { form: f, step, setStep, isSuccessfulRegistration } = useSignUpForm();
    const { loginWithGoogle, loginWithTwitter } = useSocialAuth();
    const { urlSearchParams } = useCustomRouter();

    const { t, i18n } = useTranslation('common', { keyPrefix: 'sign-up-page' });

    const PrivacyPolicyLink = () => (
        <Link
            href={{
                pathname: new URL(
                    '/terms/privacy-policy',
                    process.env.NEXT_PUBLIC_WELCOME_PAGE_URL
                ).toString(),
            }}
        >
            <a target="_blank" rel="noreferrer">
                {t('link-to-privacy-policy')}
            </a>
        </Link>
    );

    const TermsLink = () => (
        <Link
            href={{
                pathname: new URL('/terms', process.env.NEXT_PUBLIC_WELCOME_PAGE_URL).toString(),
            }}
        >
            <a target="_blank" rel="noreferrer">
                {t('link-to-terms')}
            </a>
        </Link>
    );

    const title = isSuccessfulRegistration
        ? t('title-after-successful-registration')
        : t('initial-title');

    const description = isSuccessfulRegistration
        ? t('description-after-successful-registration')
        : t('initial-description');

    return (
        <div className={className}>
            <div className="agreement">
                <h1 dangerouslySetInnerHTML={{ __html: title }} />
                <p dangerouslySetInnerHTML={{ __html: description }} />

                {isSuccessfulRegistration && (
                    <Link href={{ pathname: Route.signIn, query: urlSearchParams }}>
                        <a className="link-go-to-loyalty rs-btn rs-btn-primary rs-btn-lg">
                            {t('link-to-loyalty')}
                        </a>
                    </Link>
                )}

                {step === 'email' && !isSuccessfulRegistration && (
                    <Checkbox
                        checked={f.values.agree}
                        onChange={(_: ValueType | undefined, newValue: boolean) => f.setFieldValue('agree', newValue)}
                    >
                        {t('i-agree-with')} <PrivacyPolicyLink /> {i18n.t('&')} <TermsLink />
                    </Checkbox>
                )}
            </div>

            {!isSuccessfulRegistration && (
                <div className="forms" data-blur={!f.values.agree}>
                    {step === 'email' && (
                        <div className="form-email">
                            {/* TODO: remove 'social-buttons' to separete component */}
                            <div className="social-buttons">
                                <Button
                                    size="lg"
                                    onClick={() => {
                                        if (f.values.agree) loginWithGoogle();
                                    }}
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
                                    onClick={() => {
                                        if (f.values.agree) loginWithTwitter();
                                    }}
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

                            <form>
                                <Input
                                    hasError={Boolean(f.touched.email && f.errors.email)}
                                    className="input"
                                    size="lg"
                                    type="email"
                                    placeholder={t('email-input-placeholder')}
                                    {...f.getFieldProps('email')}
                                    onChange={(newValue: string) => {
                                        if (f.values.agree) {
                                            f.setFieldValue('email', newValue);
                                        }
                                    }}
                                />

                                {f.touched.email && f.errors.email && (
                                    <ErrorMessage>{f.errors.email}</ErrorMessage>
                                )}

                                <Button
                                    className="btn-registration"
                                    size="lg"
                                    appearance="primary"
                                    onClick={() => {
                                        f.setFieldTouched('email', true, true);
                                        if (f.values.agree && !f.errors.email) {
                                            setStep('passwords');
                                        }
                                    }}
                                >
                                    {t('registration-button-submit')}
                                </Button>
                            </form>
                        </div>
                    )}

                    {step === 'passwords' && (
                        <div className="form-passwords">
                            <form onSubmit={f.handleSubmit}>
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

                                <PasswordInput
                                    hasError={Boolean(
                                        f.touched.repeatPassword && f.errors.repeatPassword
                                    )}
                                    className="input"
                                    size="lg"
                                    type="password"
                                    placeholder={t('repeat-password-input-placeholder')}
                                    autoComplete="on"
                                    {...f.getFieldProps('repeatPassword')}
                                    onChange={(newValue) => {
                                        f.setFieldValue('repeatPassword', newValue);
                                    }}
                                />

                                {f.touched.repeatPassword && f.errors.repeatPassword && (
                                    <ErrorMessage>{f.errors.repeatPassword}</ErrorMessage>
                                )}

                                <PasswordStrengthMeterMemo password={f.values.password} />

                                <Button
                                    className="btn-finish-registration"
                                    size="lg"
                                    appearance="primary"
                                    type="submit"
                                    disabled={f.isSubmitting}
                                >
                                    {f.isSubmitting ? (
                                        <Loader />
                                    ) : (
                                        t('finish-registration-button-submit')
                                    )}
                                </Button>
                            </form>

                            <Button
                                className="btn-step-back"
                                appearance="link"
                                onClick={() => setStep('email')}
                            >
                                {t('step-back-button')}
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
})`
    ${styles}
`;
