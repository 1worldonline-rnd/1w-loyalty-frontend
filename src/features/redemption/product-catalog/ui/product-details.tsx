import { Product, ProductRedeemed } from '@/shared/api/redemption/types';
import { useWidgetAccentColor } from '@/shared/hooks';
import { PropsWithClassName } from '@/shared/utility-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useHandleRedeemedProduct } from '@/shared/hooks';
import { Button } from '@/shared/rsuite/admin-panel';
import { Animation } from 'rsuite';
import { ArrowDropdownIcon } from '@/shared/ui/icons';
import { CoinsCount } from '@/shared/ui';
import { toRGBA } from '@/shared/lib/toRGBA';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { applicationTourStepTargetClassNames } from '@/shared/constants/application-tour';
import { GiveawayEndDate } from './giveaway-end-date';
import { MessageCompleteSequence } from './message-complete-sequence';
import { GiveawayDates } from './giveaway-dates';
import { MyTickets } from './my-tickets';

type ProductDetailsProps = PropsWithClassName & {
    product: Product | ProductRedeemed;
    showSupply?: boolean;
    showPrice?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const ProductDetails = ({
    className,
    product,
    showSupply = true,
    showPrice = true,
    ...rest
}: ProductDetailsProps) => {
    const { t } = useTranslation('common', { keyPrefix: 'redemption' });

    const accentColor = useWidgetAccentColor();
    const {
        product: transformedProduct,
        isRedeemedProduct,
        redeemedProductData,
    } = useHandleRedeemedProduct(product);
    const [showDescription, setShowDescription] = useState(false);

    if (!transformedProduct) {
        return null;
    }
    const {
        expirationDate,
        isLocked,
        lockerId,
        lockerType,
        snapshotDate,
        availableCount,
        initialCount,
        type,
    } = transformedProduct;

    const isTicket = transformedProduct.type === 'Ticket';

    const isComingSoon = !isTicket && availableCount === 0 && initialCount === 0;

    const toggleDescription = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setShowDescription(!showDescription);
    };

    const getPriceSupplyLabel = () => {
        if (isTicket) {
            return `${t('supply')}: ${t('unlimited')}`;
        }
        return isComingSoon ? t('coming-soon') : `${t('supply')}: ${availableCount}/${initialCount}`;
    };

    return (
        <ProductDetailsStyled className={className} accentColor={accentColor} {...rest}>
            {isTicket && expirationDate && (
                <GiveawayEndDate
                    className="giveaway-end-date"
                    snapshotDate={snapshotDate}
                    expirationDate={expirationDate}
                    type={type}
                />
            )}
            <div className="product-image">
                <img src={transformedProduct.image} alt={transformedProduct.title} />
                {isRedeemedProduct && <span className="redeemed-label">{t('redemption-redeemed-tab')}</span>}
            </div>
            <div className="info">
                <h2 className="product-name">{transformedProduct.title}</h2>

                {(showSupply || showPrice) && (
                    <div className="price">
                        {showPrice && !isComingSoon && (
                            <CoinsCount
                                className={classNames(
                                    'price-coins',
                                    applicationTourStepTargetClassNames.REDEMPTION_PRICE
                                )}
                                coinsCount={transformedProduct.priceLocal}
                                size="sm"
                                accentColor={accentColor}
                                isFinished={false}
                            />
                        )}
                        {showSupply && !isRedeemedProduct && (
                            <span
                                className={classNames(
                                    'price-supply',
                                    applicationTourStepTargetClassNames.REDEMPTION_SUPPLY
                                )}
                            >
                                {getPriceSupplyLabel()}
                            </span>
                        )}
                    </div>
                )}

                {redeemedProductData?.redemptionVoucher && (
                    <ol className="redeemed-data">
                        <li>
                            <p>{t('your-voucher-code')}</p>{' '}
                            <span>{redeemedProductData.redemptionVoucher.voucherCode}</span>
                        </li>
                        <li>
                            <p>{t('go-to-redemption-page')}</p>{' '}
                            <a href={transformedProduct.link} target="_blank">
                                {transformedProduct.link}
                            </a>
                        </li>
                    </ol>
                )}

                {isTicket && (
                    <MyTickets
                        soldTickets={
                            (isRedeemedProduct
                                ? redeemedProductData?.purchasedCount
                                : transformedProduct.purchasedCount) || 0
                        }
                        tickets={redeemedProductData?.tickets}
                        isRedeemedProduct={isRedeemedProduct}
                    />
                )}

                {lockerType === 'SEQUENCE_FEED' && (
                    <MessageCompleteSequence
                        sequenceId={lockerId}
                        isCompleted={isRedeemedProduct ? true : isLocked === false}
                    />
                )}

                {snapshotDate && <GiveawayDates giveawayDate={expirationDate} salesEndDate={snapshotDate} />}

                <div
                    className="description"
                    dangerouslySetInnerHTML={{
                        __html: isRedeemedProduct
                            ? transformedProduct.purchaseDescription
                            : transformedProduct.description,
                    }}
                />

                {isRedeemedProduct && (
                    <>
                        <Button
                            onClick={toggleDescription}
                            block={true}
                            size="sm"
                            className="redeemed-details-btn"
                        >
                            {t('show-product-details')}
                            <ArrowDropdownIcon
                                style={{
                                    transform: `rotate(${showDescription ? 180 : 0}deg)`,
                                }}
                            />
                        </Button>
                        <Animation.Collapse in={showDescription}>
                            <div>
                                <div
                                    className="description-dropdown"
                                    dangerouslySetInnerHTML={{
                                        __html: transformedProduct.description,
                                    }}
                                />
                            </div>
                        </Animation.Collapse>
                    </>
                )}
            </div>
        </ProductDetailsStyled>
    );
};

const ProductDetailsStyled = styled.div<{ accentColor?: string }>`
    min-height: 100%;
    width: 100%;
    position: relative;
    box-shadow: 0px 3px 23px -5px rgba(86, 99, 104, 0.19);

    background-color: ${({ theme }) => (theme.mode === 'dark' ? 'var(--grey-3-color)' : '#fff')};
    border-color: ${({ theme }) => (theme.mode === 'dark' ? 'var(--grey-3-color)' : '#fff')};
    transition: all 0.15s ease-in-out;
    border-width: 1px;
    border-style: solid;

    .giveaway-end-date {
        position: absolute;
        top: 18px;
        left: 18px;
    }

    &:hover {
        transform: scale(1.01);
        border-color: var(--grey-${({ theme }) => (theme.mode === 'dark' ? '4' : '6')}-color);
    }

    .product-image {
        position: relative;
        aspect-ratio: 2.5 / 1;
        background-color: ${({ theme }) => (theme.mode === 'dark' ? 'var(--grey-4-color)' : '#F7F7F8')};

        img {
            aspect-ratio: 2.5 / 1;
            width: 100%;
            object-fit: contain;
        }
    }

    .info {
        padding-inline: 32px;
        padding-block: 22px;
        height: calc(100% - var(--image-height));
        overflow-y: auto;
    }

    a {
        color: ${({ accentColor }) => accentColor};
        cursor: pointer;
        display: block;
        line-height: 22px;
        margin-block-end: 8px;
        text-decoration: underline;
    }

    .product-name {
        font-weight: 600;
        font-size: 20px;
        line-height: 27px;
        color: var(--text-dark-color);
        margin-block-end: 16px;
        text-align: left;
    }

    .price {
        margin-block-end: 10px;
        display: flex;
        align-items: center;
        gap: 12px;

        &-coins {
            padding: 6px 20px;
            border-radius: 4px;
            background-color: ${({ accentColor }) => toRGBA(accentColor!, 0.1)};
            font-weight: 700;
            font-size: 17px;
            line-height: 23px;
        }

        &-supply {
            font-weight: 600;
            line-height: 19px;
            color: var(--text-light-color);
        }
    }

    .description,
    .description-dropdown {
        color: var(--text-default-color);
        font-weight: 500;
        display: flex;
        flex-direction: column;
        gap: 8px;

        ul {
            list-style: unset;
        }

        ol {
            list-style: decimal;
        }

        * {
            line-height: 22px;
        }
    }

    .redeem-instruction {
        font-weight: 600;
        line-height: 19px;
        color: var(--text-default-color);
        margin-block-end: 8px;
    }

    .redeemed-data {
        color: var(--text-default-color);
        margin-block-start: 8px;
        list-style: decimal;
        margin-inline-start: 15px;
        display: flex;
        flex-direction: column;
        gap: 8px;

        span {
            font-weight: 700;
            line-height: 22px;
            display: inline-block;
            padding: 3px 10px;
            border-radius: 2px;
            background-color: ${({ theme }) =>
                theme.mode === 'dark' ? 'var(--grey-4-color)' : 'var(--grey-6-color)'};
        }
    }

    .redeemed-label {
        position: absolute;
        bottom: 22px;
        left: 32px;
        font-weight: 600;
        font-size: 17px;
        line-height: 28px;
        padding: 6px 18px;
        border-radius: 40px;
        color: var(--text-default-color);
        background-color: ${({ theme }) =>
            theme.mode === 'dark' ? 'rgba(32, 37, 44, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
    }

    .redeemed-details-btn {
        font-weight: 700;
        font-size: 14px;
        line-height: 19px;
        justify-content: center;
        gap: 4px;
        margin-block: 16px 14px;
        background-color: ${({ theme }) =>
            theme.mode === 'dark' ? 'var(--grey-4-color)' : 'var(--grey-7-color)'} !important;

        svg {
            color: ${({ theme }) =>
                theme.mode === 'dark' ? 'var(--text-dark-color)' : 'var(--grey-0-color)'};
        }
    }
`;
