import { Product } from '@/shared/api/redemption/types';
import { PropsWithClassName } from '@/shared/utility-types';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

const getDaysUntilDate = (utcIsoDate: string) => {
    // convert the string to a date
    const targetDate = new Date(utcIsoDate);
    // get the current date in UTC format
    const currentDate = new Date();
    // calculate the difference in milliseconds between the current date and the target date
    const differenceMs = targetDate.getTime() - currentDate.getTime();
    // convert milliseconds to days and return
    const days = Math.floor(differenceMs / (1000 * 60 * 60 * 24));

    return days < 0 ? 0 : days;
};

export type GiveawayEndDateProps = PropsWithClassName<
    Pick<Product, 'expirationDate' | 'snapshotDate' | 'type'>
>;

/**
 * @description The component displays how many days are left until sales close
 * and then displays how many days until the giveaway winners are selected
 */
export const GiveawayEndDate = styled(
    ({ expirationDate, snapshotDate, type, className }: GiveawayEndDateProps) => {
        const { t } = useTranslation('common', { keyPrefix: 'ticket-product' });

        const LabelContent = () => {
            const currentTime = new Date().getTime();

            if (expirationDate && expirationDate.slice(0, 10) === new Date().toISOString().slice(0, 10)) {
                return (
                    <>
                        {t('giveaway')} <div className="circle" /> {getDaysUntilDate(expirationDate)}d
                    </>
                );
            } else if (snapshotDate && new Date(snapshotDate).getTime() > currentTime) {
                return (
                    <>
                        {t('sales-end')} <div className="circle" /> {getDaysUntilDate(snapshotDate)}d
                    </>
                );
            } else if (
                expirationDate &&
                expirationDate.slice(0, 10) === new Date().toISOString().slice(0, 10)
            ) {
                return (
                    <>
                        {t('giveaway')} <div className="circle" /> {t('selecting-winners')}
                    </>
                );
            } else if (expirationDate && new Date(expirationDate).getTime() > currentTime) {
                return (
                    <>
                        {t('giveaway')} <div className="circle" /> {getDaysUntilDate(expirationDate)}d
                    </>
                );
            } else {
                return type === 'Ticket' ? (
                    <>
                        {t('giveaway')} <div className="circle" /> {t('finished')}
                    </>
                ) : (
                    <>
                        {t('sales-end')} <div className="circle" /> {t('finished')}
                    </>
                );
            }
        };

        return (
            <div className={className}>
                <LabelContent />
            </div>
        );
    }
)`
    display: flex;
    align-items: center;
    background-color: rgb(var(--accent-primary-color));
    padding: 7px 16px;
    gap: 6px;
    border-radius: 100px;
    color: #fff;
    font-weight: 700;

    .circle {
        width: 4px;
        height: 4px;
        background-color: currentColor;
        border-radius: 50%;
    }
`;
