import { useStore } from 'effector-react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { userModel } from '@/entities/user';
import { Avatar, ErrorMessage, Loader } from '@/shared/ui';
import { PencilIcon } from '@/shared/ui/icons';
import { styles } from './styles';
import { useAccountInfoForm } from '../hooks/useAccountInfoForm';
import { PropsWithClassName } from '@/shared/utility-types';
import { Button, IconButton, Input } from '@/shared/rsuite/loyalty-platform';

export const ChangeAccountInfo = styled(({ className }: PropsWithClassName) => {
    const account = useStore(userModel.stores.$account);
    const accountAttachedToPartner = useStore(userModel.stores.$accountAttachedToPartner);

    const { form: f, isFormOpen, isFullnameChanged, setIsFormOpen } = useAccountInfoForm();

    const { t } = useTranslation('common', {
        keyPrefix: 'account-settings-page.change-account-info',
    });

    if (accountAttachedToPartner === 'DOES_NOT_EXIST') {
        return null;
    }
    return (
        <section className={className}>
            <Avatar thumbnailUrl={account?.thumbnailUrl} width={108} />

            {isFormOpen ? (
                <form onSubmit={f.handleSubmit}>
                    <Input
                        className="input"
                        size="lg"
                        placeholder={t('first-input-placeholder')}
                        autoComplete="on"
                        {...f.getFieldProps('first')}
                        hasError={Boolean(f.touched.first && f.errors.first)}
                        onChange={(newValue: string) => f.setFieldValue('first', newValue)}
                    />

                    {f.touched.first && f.errors.first && <ErrorMessage>{f.errors.first}</ErrorMessage>}

                    <Input
                        className="input"
                        size="lg"
                        placeholder={t('last-input-placeholder')}
                        autoComplete="on"
                        {...f.getFieldProps('last')}
                        hasError={Boolean(f.touched.last && f.errors.last)}
                        onChange={(newValue: string) => f.setFieldValue('last', newValue)}
                    />

                    {f.touched.last && f.errors.last && <ErrorMessage>{f.errors.last}</ErrorMessage>}

                    <Button
                        size="lg"
                        appearance="primary"
                        type="submit"
                        disabled={f.isSubmitting || !f.isValid || !isFullnameChanged}
                    >
                        {f.isSubmitting ? <Loader /> : t('submit-button')}
                    </Button>

                    <Button size="lg" appearance="subtle" type="button" onClick={() => setIsFormOpen(false)}>
                        {t('cancel-button')}
                    </Button>
                </form>
            ) : (
                <div className="fullname">
                    <p>
                        {[accountAttachedToPartner?.firstName, accountAttachedToPartner?.lastName].join(' ')}
                    </p>

                    <IconButton circle onClick={() => setIsFormOpen(true)} icon={<PencilIcon />} size="sm" />
                </div>
            )}
        </section>
    );
})`
    ${styles}
`;
