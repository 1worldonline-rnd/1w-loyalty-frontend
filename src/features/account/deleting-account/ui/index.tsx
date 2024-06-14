import axios from 'axios';
import { useState } from 'react';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import type { PropsWithClassName } from '@/shared/utility-types';
import { useTranslation } from 'next-i18next';
import { styles } from './styles';
import { Button } from '@/shared/rsuite/loyalty-platform';
import { ApprovingPassword } from '@/shared/ui/approving-password';
import { userModel } from '@/entities/user';
import { showMessage } from '@/shared/lib/messages';

export const DeletingAccount = styled((props: PropsWithClassName) => {
    const { className } = props;
    const [isRequestedDeleting, setIsRequestedDeleting] = useState(false);
    const account = useStore(userModel.stores.$account);
    const isDeleting = useStore(userModel.effects.deleteAccountFx.pending);

    const { t } = useTranslation('common', {
        keyPrefix: 'account-settings-page.delete-account',
    });

    return (
        <section className={className}>
            <h2 className="account-page__section-title">{t('delete-account')}</h2>

            <div className="account-page__section-content">
                {isRequestedDeleting ? (
                    <ApprovingPassword
                        isLoading={isDeleting}
                        label={t('enter-password')}
                        onCancel={() => setIsRequestedDeleting(false)}
                        onApply={(currentPassword) => {
                            if (account?.accountId) {
                                userModel.effects
                                    .deleteAccountFx({
                                        currentPassword,
                                        accountId: account.accountId,
                                    })
                                    .catch((error) => {
                                        if (axios.isAxiosError(error) && error.response?.status === 403) {
                                            showMessage('Incorrect password', 'error');
                                        }
                                    });
                            }
                        }}
                    />
                ) : (
                    <Button
                        size="md"
                        className="btn-delete-account"
                        onClick={() => {
                            setIsRequestedDeleting(true);
                        }}
                    >
                        {t('delete-account')}
                    </Button>
                )}

                <p className="attention">
                    {t('after-deleting')}
                </p>
            </div>
        </section>
    );
})`
    ${styles}
`;
