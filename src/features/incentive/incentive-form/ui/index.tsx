import styled from 'styled-components';
import { useStore } from 'effector-react';
import { FlexboxGrid } from 'rsuite';
import { useTranslation } from 'next-i18next';
import { ErrorMessage, Loader } from '@/shared/ui';
import type { PropsWithClassName } from '@/shared/utility-types';
import { styles } from './styles';
import { Button, Input, Select } from '@/shared/rsuite/admin-panel';
import { adminPanelModel } from '@/entities/admin-panel';
import { useIncentiveForm, IncentiveFields, IncentiveActionType } from '../hooks/useIncentiveForm';

export const IncentiveForm = styled(({ className }: PropsWithClassName) => {
    const adminModal = useStore(adminPanelModel.stores.$adminModal);

    const { form: f } = useIncentiveForm();

    const { t } = useTranslation('common', { keyPrefix: 'events' });
    const { t: translateModals } = useTranslation('common', { keyPrefix: 'modals' });
    const { t: menuButtons } = useTranslation('common', {
        keyPrefix: 'modals',
    });

    return (
        <form className={className} onSubmit={f.handleSubmit}>
            <div className="field field--incentive-name">
                <label>
                    <span>{t(IncentiveFields.name)}</span>

                    <Input
                        {...f.getFieldProps(IncentiveFields.name)}
                        size="lg"
                        hasError={Boolean(f.touched[IncentiveFields.name] && f.errors[IncentiveFields.name])}
                        onChange={(newValue: string) => f.setFieldValue(IncentiveFields.name, newValue)}
                    />
                </label>

                {f.touched[IncentiveFields.name] && f.errors[IncentiveFields.name] && (
                    <ErrorMessage>{f.errors[IncentiveFields.name]}</ErrorMessage>
                )}
            </div>

            <div className="field">
                <label>
                    <span>{t(IncentiveFields.actionType)}</span>

                    <Select
                        options={[
                            {
                                label: String(t(IncentiveActionType.click)),
                                value: '32',
                            },
                        ]}
                        onChange={(option) => {
                            if (option) f.setFieldValue(IncentiveFields.actionType, option);
                        }}
                        value={{
                            label: t(IncentiveActionType.click),
                            value: '32',
                        }}
                        size="md"
                    />
                </label>

                {f.touched[IncentiveFields.actionType] && f.errors[IncentiveFields.actionType] && (
                    <ErrorMessage>{f.errors[IncentiveFields.actionType]}</ErrorMessage>
                )}
            </div>

            <div className="field">
                <label>
                    <span>{t(IncentiveFields.rewardAmount)}</span>

                    <Input
                        {...f.getFieldProps(IncentiveFields.rewardAmount)}
                        size="lg"
                        hasError={Boolean(
                            f.touched[IncentiveFields.rewardAmount] && f.errors[IncentiveFields.rewardAmount]
                        )}
                        onChange={(newValue: string) => {
                            f.setFieldValue(IncentiveFields.rewardAmount, newValue);
                        }}
                        placeholder={translateModals('value-in-points')}
                    />
                </label>

                {f.touched[IncentiveFields.rewardAmount] && f.errors[IncentiveFields.rewardAmount] && (
                    <ErrorMessage>{f.errors[IncentiveFields.rewardAmount]}</ErrorMessage>
                )}
            </div>

            <div className="field">
                <label>
                    <span>{t(IncentiveFields.limitsDaily)}</span>

                    <Input
                        {...f.getFieldProps(IncentiveFields.limitsDaily)}
                        size="lg"
                        hasError={Boolean(
                            f.touched[IncentiveFields.limitsDaily] && f.errors[IncentiveFields.limitsDaily]
                        )}
                        onChange={(newValue: string) => {
                            f.setFieldValue(IncentiveFields.limitsDaily, newValue);
                        }}
                        placeholder={translateModals('limit-value')}
                    />
                </label>

                {f.touched[IncentiveFields.limitsDaily] && f.errors[IncentiveFields.limitsDaily] && (
                    <ErrorMessage>{f.errors[IncentiveFields.limitsDaily]}</ErrorMessage>
                )}
            </div>

            <div className="field">
                <label>
                    <span>{t(IncentiveFields.limitsMonthly)}</span>

                    <Input
                        {...f.getFieldProps(IncentiveFields.limitsMonthly)}
                        size="lg"
                        hasError={Boolean(
                            f.touched[IncentiveFields.limitsMonthly] &&
                                f.errors[IncentiveFields.limitsMonthly]
                        )}
                        onChange={(newValue: string) => {
                            f.setFieldValue(IncentiveFields.limitsMonthly, newValue);
                        }}
                        placeholder={translateModals('limit-value')}
                    />
                </label>

                {f.touched[IncentiveFields.limitsMonthly] && f.errors[IncentiveFields.limitsMonthly] && (
                    <ErrorMessage>{f.errors[IncentiveFields.limitsMonthly]}</ErrorMessage>
                )}
            </div>

            <FlexboxGrid className="buttons" align="middle" justify="end">
                <Button
                    size="sm"
                    appearance="subtle"
                    type="button"
                    onClick={() => {
                        adminPanelModel.events.adminModalToggled({
                            isOpen: false,
                        });
                    }}
                >
                    {menuButtons('cancel')}
                </Button>

                <Button size="sm" appearance="primary" type="submit">
                    {f.isSubmitting ? (
                        <Loader width={16} />
                    ) : (
                        `${
                            adminModal.mode === 'create'
                                ? menuButtons('create-incentive')
                                : menuButtons('apply')
                        }`
                    )}
                </Button>
            </FlexboxGrid>
        </form>
    );
})`
    ${styles}
`;
