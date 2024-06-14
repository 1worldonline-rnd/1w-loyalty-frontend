import { Product, ProductRedeemed } from '@/shared/api/redemption/types';
import { useHandleRedeemedProduct, useWidgetAccentColor } from '@/shared/hooks';
import { toRGBA } from '@/shared/lib/toRGBA';
import { PropsWithClassName } from '@/shared/utility-types';
import { useState } from 'react';
import { Animation } from 'rsuite';
import styled from 'styled-components';
import { ModalFooterButton } from './modal-footer-button';
import { RedeemConfirmationForm } from './redeem-confirmation-form';
import { useStore } from 'effector-react';
import { userModel } from '@/entities/user';
import { combine } from 'effector';
import { redemptionModel } from '@/entities/redemption';
import { useTranslation } from 'next-i18next';

type ModalFooterProps = PropsWithClassName & {
    product: Product | ProductRedeemed;
};

const $isPurchasing = combine([redemptionModel.effects.sendProductPurchaseFx.pending], (flags) =>
    flags.some(Boolean)
);

export const ModalFooter = ({ className, product }: ModalFooterProps) => {
    const accentColor = useWidgetAccentColor();

    const [isRedeeming, setIsRedeeming] = useState(false);
    const [isAcceptedConditions, setIsAcceptedConditions] = useState(false);
    const [isAcceptedTerms, setIsAcceptedTerms] = useState(false);

    const { t } = useTranslation('common', { keyPrefix: 'redemption' });
    const { t: translateSalesEnd } = useTranslation('common', { keyPrefix: 'ticket-product' });

    const { convertiblePoints = 0 } = useStore(userModel.stores.$account) || {};
    const isPurchasing = useStore($isPurchasing);

    const { product: transformedProduct, isRedeemedProduct } = useHandleRedeemedProduct(product);

    if (!transformedProduct) {
        return null;
    }

    const userHasEnoughPoints = convertiblePoints >= transformedProduct.priceLocal;

    const { type, isLocked, lockerType } = transformedProduct;

    const isTicket = type === 'Ticket';
    const showMessageCompleteSequence = lockerType === 'SEQUENCE_FEED' && isLocked;

    const isSalesEnd = () => {
        const snapshotDate = transformedProduct.snapshotDate;
        const currentTime = new Date().getTime();

        return snapshotDate ? new Date(snapshotDate).getTime() < currentTime : false;
    };

    const showMessageSalesEnd = isSalesEnd();

    const getModalFooterButtonIsDisabled = () => {
        const isDefaultDisabled =
            (isRedeeming && (!isAcceptedConditions || !isAcceptedTerms)) || !userHasEnoughPoints;

        if (isTicket) {
            return isDefaultDisabled || isSalesEnd();
        }

        return isDefaultDisabled || transformedProduct.availableCount < 1 || isSalesEnd();
    };

    const getModalFooterMessage = () => {
        if (showMessageCompleteSequence) {
            return isTicket ? (
                <p className="message-complete-sequence">{t('complete-locker-ticket')}</p>
            ) : (
                <p className="message-complete-sequence">{t('complete-locker-product')}</p>
            );
        } else if (showMessageSalesEnd) {
            return <p className="message-complete-sequence">{translateSalesEnd('sales-end')}</p>;
        }
    };

    return (
        <StyledFooter className={className} accentColor={accentColor}>
            <Animation.Collapse in={isRedeeming}>
                <div>
                    <RedeemConfirmationForm
                        setIsAcceptedConditions={setIsAcceptedConditions}
                        setIsAcceptedTerms={setIsAcceptedTerms}
                        className="confirmation"
                    />
                </div>
            </Animation.Collapse>
            <div className="button-wrapper">
                {showMessageCompleteSequence || showMessageSalesEnd ? (
                    getModalFooterMessage()
                ) : (
                    <ModalFooterButton
                        isRedeeming={isRedeeming}
                        setIsRedeeming={setIsRedeeming}
                        isDisabled={getModalFooterButtonIsDisabled()}
                        isLoading={isPurchasing}
                        product={transformedProduct}
                        accentColor={accentColor}
                        isRedeemedProduct={isRedeemedProduct}
                    />
                )}
            </div>
        </StyledFooter>
    );
};

const StyledFooter = styled.footer<{ accentColor?: string }>`
    background-color: ${({ theme }) =>
        theme.mode === 'dark' ? 'var(--grey-1-color)' : 'var(--grey-8-color)'};
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-shadow: 0px -7px 16px #ffffff, 0px 0px 26px #ffffff;
    box-shadow: ${({ theme }) => theme.mode === 'dark' && '0px 0px 26px var(--grey-1-color)'};
    z-index: 2;
    border-end-start-radius: 7px;

    @media screen and (max-width: 768px) {
        left: 10px;
        right: 10px;
        width: calc(100% - 20px);
    }

    .button-wrapper,
    .confirmation {
        padding: 16px 18px;
        border-top: 1px solid
            ${({ theme }) => (theme.mode === 'dark' ? 'var(--grey-4-color)' : 'var(--grey-6-color)')};
    }

    .button-wrapper {
        button {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 29px;
            background-color: ${({ accentColor }) => accentColor};
            color: #fff;
            font-weight: 700;
            font-size: 17px;
            line-height: 23px;

            &:hover,
            &:focus {
                background-color: ${({ accentColor }) => toRGBA(accentColor!, 0.9)};
                color: #fff;
            }
        }

        .redeem-price {
            color: #fff;
            position: relative;
            &:before {
                content: '';
                position: absolute;
                top: 50%;
                left: -15px;
                transform: translateY(-50%);
                border-radius: 50%;
                width: 5px;
                height: 5px;
                background: rgba(255, 255, 255, 0.55);
            }
        }

        .footer-close-button {
            &,
            &:hover,
            &:focus {
                background-color: ${({ theme }) =>
                    theme.mode === 'dark' ? 'var(--grey-4-color)' : 'var(--grey-6-color)'};
                color: var(--text-dark-color);
            }
        }

        .message-complete-sequence {
            text-align: center;
            color: var(--text-dark-color);
        }
    }

    .confirmation {
        display: flex;
        flex-direction: column;
        gap: 14px;

        h3 {
            font-weight: 600;
            font-size: 14px;
            line-height: 19px;
            color: var(--text-dark-color);
        }

        label {
            display: flex;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: var(--text-default-color);

            &:hover {
                .rs-checkbox-inner::before {
                    border-color: ${({ accentColor }) => accentColor};
                }
            }
        }

        .rs-checkbox {
            &-checker {
                padding-top: 0;
                padding-bottom: 0;
                padding-left: 24px;
                min-height: 18px;
            }
            &-wrapper {
                left: 0;
                top: 0;
            }
            &-inner::before {
                width: 18px;
                height: 18px;
                border-radius: 5px;
            }

            &-checked {
                .rs-checkbox-inner::before {
                    background-color: ${({ accentColor }) => accentColor};
                    border-color: ${({ accentColor }) => accentColor};
                }
                .rs-checkbox-inner::after {
                    width: 9px;
                    height: 7px;
                    margin: 6px 0 0 4px;
                    background-size: 9px 7px;
                }
            }
        }
    }
`;
