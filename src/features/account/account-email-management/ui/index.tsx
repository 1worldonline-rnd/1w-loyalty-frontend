import { useStore } from 'effector-react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import { userModel } from '@/entities/user';
import { SuccessIcon, WarningIcon } from '@/shared/ui/icons';
import { useResendConfirmationEmail } from '../hooks';
import { Loader } from '@/shared/ui';
import { Button } from '@/shared/rsuite/loyalty-platform';

export const AccountEmailManagement = styled(({ className }: PropsWithClassName) => {
    const account = useStore(userModel.stores.$account);

    const { t } = useTranslation('common', { keyPrefix: 'account-settings-page.email-management' });

    const isEmailConfirmed = account?.isEmailConfirmed;

    const Icon = isEmailConfirmed ? SuccessIcon : WarningIcon;
    const title = isEmailConfirmed ? t('title-after-successful-email-confirm') : t('initial-title');
    const color = isEmailConfirmed ? 'success' : 'info';

    const { isLoading, resendConfirmationEmail, resentSuccessfully } = useResendConfirmationEmail(
        account?.username || ''
    );

    return (
        <section className={className}>
            <h2 className="account-page__section-title">{t('title')}</h2>

            <div className="account-page__section-content">
                <h3 className="email-label">{t('email-label')}</h3>

                <p className="email-address">{account?.email || t('message-if-email-address-not-filled')}</p>

                <div
                    className="email-status"
                    data-verified={!isEmailConfirmed}
                    style={{
                        backgroundColor: `rgba(var(--${color}-color), 0.06)`,
                        borderColor: `rgb(var(--${color}-color))`,
                    }}
                >
                    <Icon className="icon" />

                    <div>
                        <h3>{title}</h3>

                        {!isEmailConfirmed && !resentSuccessfully && <p>{t('description')}</p>}

                        {resentSuccessfully && <p>{t('message-if-resent-successfully')}</p>}

                        {!isEmailConfirmed && (
                            <Button
                                className="confirm-email-button"
                                size="md"
                                onClick={resendConfirmationEmail}
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader /> : t('confirm-email-submit-button')}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
})`
    ${styles}
`;
