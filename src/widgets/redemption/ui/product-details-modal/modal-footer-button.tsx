import { redemptionModel } from '@/entities/redemption';
import { Product, ProductRedeemed } from '@/shared/api/redemption/types';
import { Button } from '@/shared/rsuite/loyalty-platform';
import { CoinsCount, Loader } from '@/shared/ui';
import { useStore } from 'effector-react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { amplitudeLogEvent } from '@/shared/lib/amplitudeProvider';
import { widgetConfigModel } from '@/entities/widget-config';
import { Route } from '@/shared/constants';

type ModalFooterButtonProps = {
    isRedeeming: boolean;
    setIsRedeeming: React.Dispatch<React.SetStateAction<boolean>>;
    isDisabled: boolean;
    isLoading?: boolean;
    product: Product;
    accentColor?: string;
    isRedeemedProduct: boolean;
};

export const ModalFooterButton = ({
    isRedeeming,
    setIsRedeeming,
    isDisabled,
    isLoading,
    product,
    accentColor,
    isRedeemedProduct,
}: ModalFooterButtonProps) => {
    const { t } = useTranslation('common', { keyPrefix: 'redemption' });
    const widgetId = useRouter().query.loyaltyWidgetId as string;
    const activeCatalogId = useStore(redemptionModel.stores.$activeCatalogId);
    const { t: translateModals } = useTranslation('common', { keyPrefix: 'modals' });
    const partnerExternalId = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.partner.guid;
    const router = useRouter();

    if (isRedeemedProduct) {
        return (
            <Button
                onClick={() => {
                    redemptionModel.events.toggleProductDetailsModal(false);
                }}
                block={true}
                className="footer-close-button"
            >
                {translateModals('close')}
            </Button>
        );
    }

    const isComingSoon = product.availableCount === 0 && product.initialCount === 0;

    return (
        <>
            <Button
                block={true}
                disabled={isDisabled}
                onClick={() => {
                    if (isRedeeming) {
                        setIsRedeeming(false);
                        redemptionModel.effects
                            .sendProductPurchaseFx({
                                productId: product.id,
                                widgetId,
                                catalogId: activeCatalogId,
                            })
                            .then(() => {
                                redemptionModel.events.toggleProductDetailsModal(false);
                            });
                        const { productId, ...data } = router.query;
                        router.replace(
                            {
                                pathname: Route.redemption,
                                query: { ...data },
                            },
                            undefined,
                            { shallow: true }
                        );
                        amplitudeLogEvent('press_button_redeem_click', {
                            product_id: product.id,
                            product_price_local: product.priceLocal,
                            product_price_global: product.priceGlobal,
                            supply: product.availableCount,
                            partner_id: partnerExternalId,
                        });
                    } else {
                        setIsRedeeming(true);
                    }
                }}
            >
                {isLoading ? (
                    <Loader />
                ) : !isRedeeming ? (
                    <>
                        {t('redeem-button')}{' '}
                        {!isComingSoon && (
                            <CoinsCount
                                className="redeem-price"
                                coinsCount={product.priceLocal}
                                accentColor={isDisabled ? accentColor : ''}
                                size="xs"
                                appearance="outlined"
                                isFinished={false}
                            />
                        )}
                    </>
                ) : (
                    <>{t('finish-redemption-button')}</>
                )}
            </Button>
        </>
    );
};
