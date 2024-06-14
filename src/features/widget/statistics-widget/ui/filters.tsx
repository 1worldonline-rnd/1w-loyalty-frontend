import { Button, InputGroup } from 'rsuite';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { PropsWithClassName } from '@/shared/utility-types';
import { DatePicker } from '@/shared/ui';
import { useStatisticsFilterForm } from '../hooks/useStatisticsFilterForm';
import { Select } from '@/shared/rsuite/admin-panel';

export const StatisticsWidgetFilters = styled(({ className }: PropsWithClassName) => {
    const { form: f, widgetConfigsOptions } = useStatisticsFilterForm();

    const { t } = useTranslation('common', { keyPrefix: 'loyalty-widgets.statistic' });

    return (
        <form onSubmit={f.handleSubmit} className={className}>
            <Select
                options={widgetConfigsOptions}
                onChange={(option) => {
                    if (option) {
                        f.setFieldValue('widgetConfig', option);
                    }
                }}
                value={f.values.widgetConfig}
            />

            <InputGroup style={f.errors.endDate ? { borderColor: 'rgb(var(--error-color))' } : {}}>
                <DatePicker
                    selected={f.values.startDate ? new Date(f.values.startDate) : undefined}
                    onChange={(date: Date) => {
                        f.setFieldValue('startDate', date.toISOString());
                    }}
                />
                <InputGroup.Addon>&#448;</InputGroup.Addon>
                <DatePicker
                    selected={f.values.endDate ? new Date(f.values.endDate) : undefined}
                    onChange={(date: Date) => {
                        f.setFieldValue('endDate', date.toISOString());
                    }}
                />
            </InputGroup>

            <Button type="submit" appearance="primary">
                {t('apply-filters-button')}
            </Button>
        </form>
    );
})`
    display: grid;
    grid-template-columns: 1fr 1fr min-content;
    gap: 20px;
`;
