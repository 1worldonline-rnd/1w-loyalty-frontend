import { widgetConfigModel } from '@/entities/widget-config';
import { PropsWithClassName } from '@/shared/utility-types';
import { useStore } from 'effector-react';
import styled, { css } from 'styled-components';
import { formatDate } from '../lib';
import { useTranslation } from 'next-i18next';

export type GiveawayDatesProps = PropsWithClassName<{
    salesEndDate: string;
    giveawayDate: string;
}>;

export const GiveawayDates = styled((props: GiveawayDatesProps) => {
    const { className, giveawayDate, salesEndDate } = props;

    const widget = useStore(widgetConfigModel.stores.$globalWidgetConfig);
    const { t } = useTranslation('common', { keyPrefix: 'ticket-product' });

    return (
        <div className={className}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                    d="M8.5 8.5C8.5 8.77614 8.27614 9 8 9C7.72386 9 7.5 8.77614 7.5 8.5C7.5 8.22386 7.72386 8 8 8C8.27614 8 8.5 8.22386 8.5 8.5Z"
                    fill="currentColor"
                />
                <path
                    d="M5 10.5C5.27614 10.5 5.5 10.2761 5.5 10C5.5 9.72386 5.27614 9.5 5 9.5C4.72386 9.5 4.5 9.72386 4.5 10C4.5 10.2761 4.72386 10.5 5 10.5Z"
                    fill="currentColor"
                />
                <path
                    d="M5.5 11.5C5.5 11.7761 5.27614 12 5 12C4.72386 12 4.5 11.7761 4.5 11.5C4.5 11.2239 4.72386 11 5 11C5.27614 11 5.5 11.2239 5.5 11.5Z"
                    fill="currentColor"
                />
                <path
                    d="M6.5 10.5C6.77614 10.5 7 10.2761 7 10C7 9.72386 6.77614 9.5 6.5 9.5C6.22386 9.5 6 9.72386 6 10C6 10.2761 6.22386 10.5 6.5 10.5Z"
                    fill="currentColor"
                />
                <path
                    d="M7 11.5C7 11.7761 6.77614 12 6.5 12C6.22386 12 6 11.7761 6 11.5C6 11.2239 6.22386 11 6.5 11C6.77614 11 7 11.2239 7 11.5Z"
                    fill="currentColor"
                />
                <path
                    d="M8 10.5C8.27614 10.5 8.5 10.2761 8.5 10C8.5 9.72386 8.27614 9.5 8 9.5C7.72386 9.5 7.5 9.72386 7.5 10C7.5 10.2761 7.72386 10.5 8 10.5Z"
                    fill="currentColor"
                />
                <path
                    d="M8.5 11.5C8.5 11.7761 8.27614 12 8 12C7.72386 12 7.5 11.7761 7.5 11.5C7.5 11.2239 7.72386 11 8 11C8.27614 11 8.5 11.2239 8.5 11.5Z"
                    fill="currentColor"
                />
                <path
                    d="M9.5 10.5C9.77614 10.5 10 10.2761 10 10C10 9.72386 9.77614 9.5 9.5 9.5C9.22386 9.5 9 9.72386 9 10C9 10.2761 9.22386 10.5 9.5 10.5Z"
                    fill="currentColor"
                />
                <path
                    d="M10 11.5C10 11.7761 9.77614 12 9.5 12C9.22386 12 9 11.7761 9 11.5C9 11.2239 9.22386 11 9.5 11C9.77614 11 10 11.2239 10 11.5Z"
                    fill="currentColor"
                />
                <path
                    d="M11 10.5C11.2761 10.5 11.5 10.2761 11.5 10C11.5 9.72386 11.2761 9.5 11 9.5C10.7239 9.5 10.5 9.72386 10.5 10C10.5 10.2761 10.7239 10.5 11 10.5Z"
                    fill="currentColor"
                />
                <path
                    d="M10 8.5C10 8.77614 9.77614 9 9.5 9C9.22386 9 9 8.77614 9 8.5C9 8.22386 9.22386 8 9.5 8C9.77614 8 10 8.22386 10 8.5Z"
                    fill="currentColor"
                />
                <path
                    d="M11 9C11.2761 9 11.5 8.77614 11.5 8.5C11.5 8.22386 11.2761 8 11 8C10.7239 8 10.5 8.22386 10.5 8.5C10.5 8.77614 10.7239 9 11 9Z"
                    fill="currentColor"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.5 1.5C4.77614 1.5 5 1.72386 5 2V3H11V2C11 1.72386 11.2239 1.5 11.5 1.5C11.7761 1.5 12 1.72386 12 2V3H12.5C13.6046 3 14.5 3.89543 14.5 5V12.5C14.5 13.6046 13.6046 14.5 12.5 14.5H3.5C2.39543 14.5 1.5 13.6046 1.5 12.5V5C1.5 3.89543 2.39543 3 3.5 3H4V2C4 1.72386 4.22386 1.5 4.5 1.5ZM13.5 7.5C13.5 6.94772 13.0523 6.5 12.5 6.5H3.5C2.94772 6.5 2.5 6.94772 2.5 7.5V12.5C2.5 13.0523 2.94772 13.5 3.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V7.5Z"
                    fill="currentColor"
                />
            </svg>

            {giveawayDate ? (
                <span>
                    {t('sales-end')}: {formatDate(salesEndDate, widget?.locale)}. {t('giveaway')}:{' '}
                    {formatDate(giveawayDate, widget?.locale)}
                </span>
            ) : (
                <span>
                    {t('sales-end')}: {formatDate(salesEndDate, widget?.locale)}
                </span>
            )}
        </div>
    );
})`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-block-end: 14px;
    font-size: 12px;
    font-weight: 500;

    ${({ theme: { mode } }) => css`
        color: ${mode === 'dark' ? 'var(--text-light-color)' : 'var(--text-default-color)'};
    `}
`;
