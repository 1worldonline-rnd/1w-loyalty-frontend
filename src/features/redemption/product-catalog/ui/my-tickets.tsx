import { ProductRedeemed } from '@/shared/api/redemption/types';
import { WithDotsBetweenElements } from '@/shared/ui';
import { PropsWithClassName } from '@/shared/utility-types';
import { useState } from 'react';
import styled from 'styled-components';
import { formatDate } from '../lib';
import { useStore } from 'effector-react';
import { widgetConfigModel } from '@/entities/widget-config';
import { appModel } from '@/entities/app';
import { useTranslation } from 'next-i18next';

/**
 * @description the function takes a number and returns a rounded value with a letter indicating the digit capacity of the number.
 * Example: 1000 -> 1k
 */
export const formatNumber = (num: number, digits: number) => {
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup
        .slice()
        .reverse()
        .find((item) => num >= item.value);
    return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
};

export type MyTicketsProps = PropsWithClassName<{
    soldTickets: number;
    tickets: ProductRedeemed['tickets'];
    isRedeemedProduct?: boolean;
}>;

export const MyTickets = styled(({ className, tickets, soldTickets, isRedeemedProduct }: MyTicketsProps) => {
    const [isTicketsShown, setIsTicketsShown] = useState(false);

    const widget = useStore(widgetConfigModel.stores.$globalWidgetConfig);

    const { t } = useTranslation('common', { keyPrefix: 'ticket-product' });

    const calcChance = () => {
        let winPercentage = 0;

        if (isRedeemedProduct && soldTickets && tickets) {
            winPercentage = (tickets.length / soldTickets) * 100;
        } else if (!isRedeemedProduct && soldTickets) {
            winPercentage = (1 / soldTickets) * 100;
        }

        return winPercentage.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
    };

    return (
        <div className={className}>
            <ul className="stats">
                <li>
                    <span className="stats__value">{formatNumber(soldTickets, 1)}</span>
                    <span className="stats__title">{t('sold-tickets')}</span>
                </li>

                {tickets && (
                    <li>
                        <span className="stats__value">{formatNumber(tickets.length, 1)}</span>
                        <button className="stats__title" onClick={() => setIsTicketsShown(!isTicketsShown)}>
                            {t('my-tickets')}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                style={{ transform: `rotate(${isTicketsShown ? 180 : 0}deg)` }}
                            >
                                <path
                                    d="M7.1309 10.6837L3.90212 7.45488C3.50887 7.06163 3.42112 6.61167 3.63885 6.105C3.85659 5.59833 4.24446 5.34458 4.80246 5.34375H11.1979C11.7568 5.34375 12.145 5.5975 12.3628 6.105C12.5805 6.6125 12.4923 7.06245 12.0983 7.45488L8.86948 10.6837C8.74529 10.8078 8.61076 10.901 8.46588 10.9631C8.321 11.0252 8.16577 11.0562 8.00019 11.0562C7.83461 11.0562 7.67938 11.0252 7.5345 10.9631C7.38962 10.901 7.25509 10.8078 7.1309 10.6837Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </li>
                )}

                <li>
                    <span className="stats__value">{calcChance()}%</span>
                    <span className="stats__title">{t('win-chance')} {!tickets && `(${t('per-ticket')})`}</span>
                </li>
            </ul>

            {isTicketsShown && tickets && (
                <ul className="tickets">
                    {tickets?.map((ticket, index) => (
                        <WithDotsBetweenElements
                            key={ticket.id}
                            left={`${index + 1}. ${ticket.data}`}
                            right={formatDate(ticket.purchasedAt, widget?.locale)}
                            backgroundColor={
                                widget?.settings?.theme === 'dark'
                                    ? 'var(--grey-4-color)'
                                    : 'var(--grey-7-color)'
                            }
                            classNameOfLeft="ticket-data"
                            classNameOfRight="ticket-purchased-at"
                            dotColor="var(--text-disabled-color)"
                        />
                    ))}
                </ul>
            )}
        </div>
    );
})`
    background-color: ${({ theme: { mode } }) =>
        mode === 'dark' ? 'var(--grey-4-color)' : 'var(--grey-7-color)'};
    padding: 14px;
    border-radius: 10px;
    gap: 14px;
    margin-block-end: 14px;

    .stats {
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 20px;

        @media (max-width: 768px) {
            flex-wrap: wrap;
        }

        li {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            flex-basis: calc((100% - 40px) / 3);
            text-align: center;
        }

        &__value {
            color: var(--text-default-color);
            font-size: 22px;
            font-weight: 700;
        }

        &__title {
            color: var(--text-light-color);
            background-color: transparent;
            border: 0;
            padding: 0;
            display: flex;
            align-items: center;
            gap: 2px;
            white-space: nowrap;
        }
    }

    .tickets {
        margin-block-start: 14px;

        .ticket-data {
            font-size: 14px;
            color: var(--text-default-color);
        }

        .ticket-purchased-at {
            color: var(--text-disabled-color);
        }
    }
`;
