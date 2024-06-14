import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { FlexboxGrid } from 'rsuite';
import { useWidgetCreationForm } from '../hooks/useWidgetCreationForm';
import { Loader } from '@/shared/ui';
import { PropsWithClassName } from '@/shared/utility-types';
import { Button, ErrorMessage, Input, Select } from '@/shared/rsuite/admin-panel';
import { adminPanelModel } from '@/entities/admin-panel';

export const WidgetConfigCreationForm = styled(({ className }: PropsWithClassName) => {
    const { form: f, localeOptions } = useWidgetCreationForm();

    const { t } = useTranslation('common', { keyPrefix: 'loyalty-widgets' });
    const { t: translateModals } = useTranslation('common', { keyPrefix: 'modals' });

    return (
        <form onSubmit={f.handleSubmit} className={className}>
            <div className="field">
                <label>
                    <span>
                        {t('editing.page-name-field-label')}
                    </span>

                    <Input
                        hasError={Boolean(f.touched.widgetName && f.errors.widgetName)}
                        size="lg"
                        {...f.getFieldProps('widgetName')}
                        onChange={(newValue: string) => f.setFieldValue('widgetName', newValue)}
                    />
                </label>

                {f.touched.widgetName && f.errors.widgetName && (
                    <ErrorMessage>{f.errors.widgetName}</ErrorMessage>
                )}
            </div>

            <div className="field">
                <label>
                    <span>
                        {t('editing.point-name-field-label')}
                    </span>

                    <Input
                        hasError={Boolean(f.touched.pointName && f.errors.pointName)}
                        size="lg"
                        {...f.getFieldProps('pointName')}
                        onChange={(newValue: string) => f.setFieldValue('pointName', newValue)}
                    />
                </label>

                {f.touched.pointName && f.errors.pointName && (
                    <ErrorMessage>{f.errors.pointName}</ErrorMessage>
                )}
            </div>

            <div className="field field--select">
                <label>
                    <span>{t('field-locale-label')}</span>

                    <Select
                        options={localeOptions}
                        onChange={(option) => {
                            if (option) f.setFieldValue('locale', option);
                        }}
                        value={f.values.locale}
                    />
                </label>
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
                    {translateModals('cancel')}
                </Button>

                <Button size="sm" appearance="primary" type="submit">
                    {f.isSubmitting ? <Loader width={16} /> : t('editing.create-page')}
                </Button>
            </FlexboxGrid>
        </form>
    );
})`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 12px;

    .field--select,
    .buttons {
        grid-column: 1 / 3;
    }

    .field,
    .field label {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .field label span {
        font-weight: 600;
        color: var(--text-dark-color);
    }

    .buttons {
        gap: 8px;
    }
`;
