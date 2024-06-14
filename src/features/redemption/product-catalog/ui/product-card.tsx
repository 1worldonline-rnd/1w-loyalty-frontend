import { CoinsCount } from '@/shared/ui';
import { PropsWithClassName } from '@/shared/utility-types';
import styled from 'styled-components';
import { Button } from '@/shared/rsuite/loyalty-platform';
import { SquareArrowIcon } from '@/shared/ui/icons';
import { toRGBA } from '@/shared/lib/toRGBA';
import { Product, ProductRedeemed } from '@/shared/api/redemption/types';
import { useHandleRedeemedProduct } from '@/shared/hooks';
import { applicationTourStepTargetClassNames } from '@/shared/constants/application-tour';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { GiveawayEndDate } from './giveaway-end-date';
import { MessageCompleteSequence } from './message-complete-sequence';
import { GiveawayDates } from './giveaway-dates';

type ProductCardProps = PropsWithClassName & {
    size: 'sm' | 'md';
    product: Product | ProductRedeemed;
    accentColor: string;
} & React.HTMLAttributes<HTMLDivElement>;

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayMonth = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
    }).format(date);
    const year = new Intl.DateTimeFormat('en-GB', { year: 'numeric', timeZone: 'UTC' }).format(date);
    return `${dayMonth}, ${year}`;
};

export const ProductCard = (props: ProductCardProps) => {
    const { product, size, accentColor, ...rest } = props;
    const { t } = useTranslation('common', { keyPrefix: 'redemption' });

    const {
        product: transformedProduct,
        redeemedProductData,
        isRedeemedProduct,
        pointName,
    } = useHandleRedeemedProduct(product);

    if (!transformedProduct) {
        return null;
    }

    const {
        availableCount,
        initialCount,
        expirationDate,
        lockerType,
        isLocked = false,
        lockerId,
        snapshotDate,
        type,
    } = transformedProduct;

    const isTicket = transformedProduct.type === 'Ticket';

    const isComingSoon = !isTicket && availableCount === 0 && initialCount === 0;

    const getPriceSupplyLabel = () => {
        if (isTicket) {
            return `${t('supply')}:<br/> <strong>${t('unlimited')}</strong>`;
        }
        return isComingSoon
            ? t('coming-soon')
            : `${t('supply')}: <strong>${availableCount}/${initialCount}</strong>`;
    };

    const isSequenceCompleted = isRedeemedProduct ? true : isLocked === false;

    const getCoinsColor = () => {
        if (!isSequenceCompleted) {
            return '#777A8C';
        }
        return accentColor;
    };

    return (
        <ProductCardStyled
            size={size}
            accentColor={accentColor}
            titleLength={transformedProduct.title.length}
            {...rest}
        >
            {(expirationDate ?? snapshotDate) && (
                <GiveawayEndDate
                    className="giveaway-end-date"
                    snapshotDate={snapshotDate}
                    expirationDate={expirationDate}
                    type={type}
                />
            )}

            <div className="product-image">
                <img src={transformedProduct.image} alt={transformedProduct.title} />
            </div>
            <div className="info">
                <p className="product-name">{transformedProduct.title}</p>
                {!isRedeemedProduct && (
                    <div className="price">
                        {!isComingSoon && (
                            <CoinsCount
                                className={classNames(
                                    'price-coins',
                                    { 'is-disabled': !isSequenceCompleted },
                                    applicationTourStepTargetClassNames.REDEMPTION_PRICE
                                )}
                                coinsCount={transformedProduct.priceLocal}
                                size="sm"
                                accentColor={getCoinsColor()}
                                isFinished={!isSequenceCompleted}
                                withTicket={isTicket}
                            />
                        )}
                        <span
                            className={classNames(
                                'price-supply',
                                applicationTourStepTargetClassNames.REDEMPTION_SUPPLY
                            )}
                            dangerouslySetInnerHTML={{ __html: getPriceSupplyLabel() }}
                        />
                    </div>
                )}

                {lockerType === 'SEQUENCE_FEED' && (
                    <MessageCompleteSequence sequenceId={lockerId} isCompleted={isSequenceCompleted} />
                )}

                {snapshotDate && <GiveawayDates giveawayDate={expirationDate} salesEndDate={snapshotDate} />}

                <div
                    className="product-description"
                    dangerouslySetInnerHTML={{ __html: transformedProduct.shortDescription }}
                />

                {isRedeemedProduct && redeemedProductData && (
                    <div className="redeemed-info">
                        {redeemedProductData.purchasedAt && (
                            <span>
                                {t('redemption-redeemed-tab')}: {formatDate(redeemedProductData.purchasedAt)}.
                            </span>
                        )}
                        {size === 'sm' && <br />} {redeemedProductData.price} {pointName || 'CT'}{' '}
                        {t('points')}
                        <Button as="a" appearance="subtle">
                            {t('details')} <SquareArrowIcon />
                        </Button>
                    </div>
                )}
            </div>
        </ProductCardStyled>
    );
};

const ProductCardStyled = styled.div<
    Pick<ProductCardProps, 'size' | 'accentColor'> & { titleLength: number }
>`
    width: 100%;
    min-height: ${({ size }) => {
        switch (size) {
            case 'sm':
                return '322px';
            case 'md':
            default:
                return '361px';
        }
    }};
    position: relative;

    .giveaway-end-date {
        position: absolute;
        top: 18px;
        left: 18px;
    }

    border-radius: 7px;
    box-shadow: 0px 3px 23px -5px rgba(86, 99, 104, 0.19);
    background-color: ${({ theme }) => (theme.mode === 'dark' ? 'var(--grey-3-color)' : '#fff')};
    border-color: ${({ theme }) => (theme.mode === 'dark' ? 'var(--grey-3-color)' : '#fff')};
    border-width: 1px;
    border-style: solid;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all 0.15s ease-in-out;

    &:hover {
        transform: scale(1.01);
        border-color: var(--grey-${({ theme }) => (theme.mode === 'dark' ? '4' : '6')}-color);
    }

    .product-image {
        width: 100%;
        aspect-ratio: 16 / 7;
        background-color: ${({ theme }) => (theme.mode === 'dark' ? 'var(--grey-4-color)' : '#F7F7F8')};

        img {
            aspect-ratio: 16 / 7;
            object-fit: contain;
        }
    }

    .info {
        display: flex;
        flex-direction: column;
        padding: 14px 18px 16px;
        height: 100%;
        overflow: hidden;
    }

    .product-name {
        font-weight: 600;
        color: var(--text-dark-color);
        margin: 0;
        margin-block-end: 10px;
        font-size: 18px;
        line-height: 22px;
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: ${({ size }) => {
            switch (size) {
                case 'sm':
                    return '2';
                case 'md':
                default:
                    return '1';
            }
        }};
        -webkit-box-orient: vertical;
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

            &.is-disabled {
                background-color: var(--grey-6-color);
                background-color: ${({ theme }) =>
                    theme.mode === 'dark' ? '#777A8C1A' : 'var(--grey-6-color)'};
            }
        }

        &-supply {
            font-weight: 600;
            line-height: 19px;
            color: var(--text-light-color);
        }
    }

    .product-link {
        margin-block-end: 8px;
        text-decoration: underline;
        color: ${({ accentColor }) => accentColor};
    }

    .product-description {
        margin: 0;

        color: var(--text-light-color);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: ${({ size, titleLength }) => {
            switch (size) {
                case 'sm':
                    return titleLength > 29 ? '4' : '5';
                case 'md':
                default:
                    return '3';
            }
        }};
        -webkit-box-orient: vertical;

        ul,
        ol {
            padding-inline-start: 15px;
        }

        ul {
            list-style-type: disc;
        }

        ol {
            list-style-type: decimal;
        }

        * {
            ${({ size }) =>
                size === 'sm'
                    ? 'font-size: 12px; line-height: 18px;'
                    : 'font-size: 14px; line-height: 22px;'};
        }

        * + * {
            margin-block-start: 5px;
        }
    }

    .redeemed-info {
        ${({ size }) =>
            size === 'sm' ? 'font-size: 12px; line-height: 18px;' : 'font-size: 14px; line-height: 22px;'};
        color: var(--text-disabled-color);
        margin-block-start: auto;
        padding-block-start: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        a {
            display: flex;
            align-items: center;
            gap: 6px;
            font-weight: 600;
            color: var(--text-light-color);
            text-decoration: none;
            align-self: flex-end;
        }
    }

    @media (max-width: 1200px) {
        width: 100%;
        min-height: 400px;

        .info {
            padding: 14px 18px 16px;
        }

        .product-name {
            font-size: 20px;
            line-height: 22px;
            -webkit-line-clamp: 2;
        }

        .product-description {
            font-size: 14px;
            -webkit-line-clamp: 4;

            * {
                font-size: 14px;
                line-height: 22px;
            }
        }

        .redeemed-info {
            font-size: 14px;
            line-height: 22px;
        }
    }

    @media (max-width: 700px) {
        height: max-content;
    }
`;
