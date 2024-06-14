/* eslint-disable max-len */
import styled from 'styled-components';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import type { ValueType } from 'rsuite/esm/Checkbox';
import type { PropsWithClassName } from '@/shared/utility-types';
import { useEmailForm } from '../hooks/useEmailForm';
import { styles } from './styles';
import { ErrorMessage, Loader } from '@/shared/ui';
import { Button, Input, Checkbox } from '@/shared/rsuite/loyalty-platform';

export const FastSignUp = styled(({ className }: PropsWithClassName) => {
    const { form: f } = useEmailForm();

    const { t, i18n } = useTranslation('common', { keyPrefix: 'sign-up-page.fast-registration' });

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
                {i18n.t('sign-up-page.link-to-privacy-policy')}
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
                {i18n.t('sign-up-page.link-to-terms')}
            </a>
        </Link>
    );

    return (
        <div className={className}>
            <h2>{t('title')}</h2>

            <p>{t('description')}</p>

            <form onSubmit={f.handleSubmit}>
                <Input
                    hasError={Boolean(f.touched.email && f.errors.email)}
                    className="input"
                    size="lg"
                    type="email"
                    placeholder={i18n.t('sign-up-page.email-input-placeholder')}
                    {...f.getFieldProps('email')}
                    onChange={(newValue: string) => f.setFieldValue('email', newValue)}
                />

                {f.touched.email && f.errors.email && <ErrorMessage>{f.errors.email}</ErrorMessage>}

                <Checkbox
                    hasError={Boolean(f.errors.agree)}
                    className="agree-checkbox"
                    checked={f.values.agree}
                    onChange={(_: ValueType | undefined, checked: boolean) => {
                        f.setFieldValue('agree', checked);
                    }}
                >
                    {i18n.t('sign-up-page.i-agree-with')} <PrivacyPolicyLink /> {i18n.t('&')} <TermsLink />
                </Checkbox>

                <Button className="submit" size="lg" appearance="primary" type="submit" disabled={f.isSubmitting}>
                    {f.isSubmitting ? <Loader /> : t('fast-registration-button-submit')}
                </Button>
            </form>
        </div>
    );
})`
    ${styles}
`;
