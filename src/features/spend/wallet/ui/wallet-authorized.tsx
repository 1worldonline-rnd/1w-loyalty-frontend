import { useStore } from 'effector-react';
import { useState, useEffect } from 'react';
import { FlexboxGrid } from 'rsuite';
import { useTranslation } from 'next-i18next';
import { useWalletForm } from '../hooks/useWalletForm';
import { ErrorMessage, Loader } from '@/shared/ui';
import { userModel } from '@/entities/user';
import {
    PointIcon,
    WalletIcon,
    TokenIcon,
    SwapIcon,
    WalletAcceptIcon,
    WalletPencilIcon,
} from '@/shared/ui/icons';
import { widgetConfigModel } from '@/entities/widget-config';
import { Button, Input } from '@/shared/rsuite/loyalty-platform';
import { numberFormatter } from '@/shared/lib/numberFormatter';
// TODO: refactor the component

export const WalletAuthorized = () => {
    const account = useStore(userModel.stores.$account);
    const globalWidgetConfig = useStore(widgetConfigModel.stores.$globalWidgetConfig);
    const { walletTransferRestrictions, possibleTokens = 0 } = account || {};
    const { max: tokensMaxCount = 0, min: tokensMinCount = 0 } = walletTransferRestrictions || {};

    const {
        form: f,
        isWalletEditMode,
        isShowWallet,
        setWalletEditMode,
        validateFormManually,
        handleFocus,
        onCancel,
        setIsShowWallet,
    } = useWalletForm();

    const isPendingCryptoTransfer = useStore(userModel.effects.cryptoTransferFx.pending);
    const isPendingBalanceConversion = useStore(userModel.effects.getBalanceConversionFx.pending);
    const [transactionPointCount, setTransactionPointCount] = useState(account?.balanceTokens);

    const tokens = Math.floor(possibleTokens);

    const { t } = useTranslation('common', {
        keyPrefix: 'account-settings-page.wallet',
    });

    useEffect(() => {
        if (account?.balanceTokens) {
            setTransactionPointCount(Math.floor(account?.balanceTokens));
        }
    }, [account?.balanceTokens]);

    useEffect(() => {
        if (account?.wallet === '') {
            setWalletEditMode(true);
        }
    }, [account, setWalletEditMode]);

    const changePoints = (val: number) => {
        if (account?.balanceTokens && val <= account?.balanceTokens) {
            setTransactionPointCount(val);
        }
        if (val <= 1) {
            setTransactionPointCount(1);
        }
    };

    const sendToWallet = async () => {
        try {
            const res = await userModel.effects.cryptoTransferFx(Number(transactionPointCount));
            if (res.status === 200) {
                setIsShowWallet(!isShowWallet);
                setWalletEditMode(false);
            }
            // eslint-disable-next-line no-empty
        } catch (error) {}
    };

    return (
        <div className="wallet-container">
            <h2>{t('wallet')}</h2>
            <div className="wallet-authorized">
                <div className="points-container">
                    <h3>
                        <span>{globalWidgetConfig?.tracker.pointsName}</span> <span>{t('points')}</span>
                    </h3>

                    <FlexboxGrid align="middle" justify="space-between">
                        <FlexboxGrid align="middle" className="points">
                            <div className="point-icon">
                                <PointIcon />
                            </div>
                            <div className="convertible-points">
                                <strong>
                                    {account?.convertiblePoints
                                        ? numberFormatter(account?.convertiblePoints, 2)
                                        : 0}
                                </strong>
                                <div className="possible-tokens">
                                    <span className="possible-tokens-number">
                                        ≈{numberFormatter(tokens, 2)}{' '}
                                    </span>
                                    <span className="tokens-name">
                                        <span>{globalWidgetConfig?.tracker.pointsName}</span> <span>{t('tokens')}</span>
                                    </span>
                                </div>
                            </div>
                        </FlexboxGrid>
                    </FlexboxGrid>
                </div>
                <div className="points-container points-container-desktop">
                    <FlexboxGrid align="middle" justify="space-around">
                        <FlexboxGrid align="middle" className="points">
                            <h3>
                                {globalWidgetConfig?.tracker.pointsName} {t('points')}
                            </h3>
                            <div className="point-icon">
                                <PointIcon />
                            </div>
                            <div className="convertible-points">
                                <strong>
                                    {account?.convertiblePoints
                                        ? numberFormatter(account?.convertiblePoints, 2)
                                        : 0}
                                </strong>
                                <div className="possible-tokens">
                                    <span className="possible-tokens-number">
                                        ≈{numberFormatter(tokens, 2)}{' '}
                                    </span>
                                    <span className="tokens-name">
                                        <span>{globalWidgetConfig?.tracker.pointsName}</span> <span>{t('tokens')}</span>
                                    </span>
                                </div>
                            </div>
                        </FlexboxGrid>
                    </FlexboxGrid>
                </div>

                <FlexboxGrid align="middle" justify="space-between">
                    <span className="divider"></span>

                    {tokens ? (
                        <div
                            className="swap-button"
                            onClick={() => {
                                userModel.effects.getBalanceConversionFx().then(() => {
                                    if (globalWidgetConfig) {
                                        userModel.effects.getConvertibleBalanceFx(globalWidgetConfig.guid);
                                    }
                                });
                            }}
                        >
                            {isPendingBalanceConversion ? (
                                <Loader />
                            ) : (
                                <FlexboxGrid align="middle">
                                    <div className="swap-button-icon">
                                        <SwapIcon />
                                    </div>
                                    <span>{t('swap')}</span>
                                </FlexboxGrid>
                            )}
                        </div>
                    ) : (
                        <div className="swap-button_disabled">
                            <FlexboxGrid align="middle">
                                <div className="swap-button-icon">
                                    <SwapIcon />
                                </div>
                                <span>{t('swap')}</span>
                            </FlexboxGrid>
                        </div>
                    )}
                    <span className="divider divider-desktop"></span>
                </FlexboxGrid>

                <div className="tokens-container">
                    <h3>
                        <span>{globalWidgetConfig?.tracker.pointsName}</span> <span>{t('tokens')}</span>
                    </h3>

                    <FlexboxGrid align="middle" className="tokens-holder">
                        <div className="token-icon">
                            <TokenIcon />
                        </div>
                        {isShowWallet ? (
                            <FlexboxGrid align="middle" justify="space-between" className="token-description">
                                <div className="withdraw-configs">
                                    <div className="min-config">
                                        <span className="min-config-text">{t('min')}: </span>
                                        <strong>{tokensMinCount}</strong>{' '}
                                    </div>
                                    <div className="max-config">{`${t('max')} (${tokensMaxCount})`}</div>
                                </div>
                                <p>{t('how-much')}</p>
                                <Input
                                    size="sm"
                                    {...f.getFieldProps('tokensNumber')}
                                    onFocus={handleFocus}
                                    onChange={(newValue: string) => {
                                        f.setFieldValue('tokensNumber', newValue, true);

                                        changePoints(Number(newValue));
                                    }}
                                />
                            </FlexboxGrid>
                        ) : (
                            <FlexboxGrid align="middle" justify="space-between" className="token-description">
                                <strong className="tokens">
                                    {' '}
                                    {account?.balanceTokens ? account?.balanceTokens.toFixed(1) : 0}
                                </strong>
                            </FlexboxGrid>
                        )}
                    </FlexboxGrid>
                    {f.errors.tokensNumber && isShowWallet && (
                        <ErrorMessage>{f.errors.tokensNumber}</ErrorMessage>
                    )}

                    {isShowWallet && (
                        <FlexboxGrid align="middle">
                            <div className="wallet-editor">
                                <FlexboxGrid
                                    align="middle"
                                    justify="space-between"
                                    className="form-container"
                                >
                                    {account?.wallet === '' || isWalletEditMode ? (
                                        <form onSubmit={f.handleSubmit} className="form">
                                            <div className="wallet-icon">
                                                <WalletIcon />
                                            </div>
                                            <Input
                                                className="wallet-input"
                                                size="sm"
                                                placeholder="Add wallet address"
                                                {...f.getFieldProps('wallet')}
                                                onChange={(newValue: string) => {
                                                    f.setFieldValue('wallet', newValue);
                                                }}
                                            />

                                            {!account?.wallet || isWalletEditMode ? (
                                                <button
                                                    disabled={f.isSubmitting}
                                                    className="form-submit"
                                                    type="submit"
                                                >
                                                    {f.isSubmitting ? <Loader /> : <WalletAcceptIcon />}
                                                </button>
                                            ) : (
                                                <div className="pencilIcon-container">
                                                    <WalletPencilIcon />
                                                </div>
                                            )}
                                        </form>
                                    ) : (
                                        <div className="wallet-show-mode">
                                            <div className="wallet-icon">
                                                <WalletIcon />
                                            </div>

                                            <div className="wallet-address-container">
                                                {account?.wallet === '' ? (
                                                    <p>{t('add-wallet-address')}</p>
                                                ) : (
                                                    <p>
                                                        <span
                                                            style={{
                                                                display: 'inherit',
                                                                width: '80px',
                                                            }}
                                                        >
                                                            {account?.wallet}
                                                        </span>
                                                        <span className="address">
                                                            ...
                                                            {account?.wallet
                                                                ? account?.wallet.substr(-4)
                                                                : ''}
                                                        </span>
                                                    </p>
                                                )}
                                            </div>

                                            <div
                                                className="pencil-icon"
                                                onClick={() => {
                                                    setWalletEditMode(!isWalletEditMode);
                                                }}
                                            >
                                                <WalletPencilIcon />
                                            </div>
                                        </div>
                                    )}

                                    {f.touched.wallet && f.errors.wallet && (
                                        <ErrorMessage>{f.errors.wallet}</ErrorMessage>
                                    )}
                                </FlexboxGrid>
                                <div className="transaction-fee-container">
                                    <p>{t('free-transaction-fee')}</p>
                                </div>
                            </div>

                            <div className="buttons-container">
                                <Button
                                    onClick={() => {
                                        validateFormManually().then((isValid) => {
                                            if (isValid) {
                                                sendToWallet();
                                            }
                                        });
                                    }}
                                    size="lg"
                                    disabled={account?.isEmailConfirmed === false || account?.wallet === ''}
                                    className="send-to-wallet rs-btn-violet"
                                >
                                    {t('send-to-wallet')}
                                </Button>
                                <Button
                                    onClick={onCancel}
                                    size="lg"
                                    appearance="subtle"
                                    // disabled={Number(account?.balanceTokens) < 1}
                                    className="cancel-btn rs-btn"
                                >
                                    {isPendingCryptoTransfer ? <Loader /> : t('cancel')}
                                </Button>
                            </div>
                        </FlexboxGrid>
                    )}
                </div>

                <div className="tokens-container tokens-container-desktop">
                    <FlexboxGrid align="middle" className="tokens-holder" justify="space-around">
                        <div className="points">
                            <h3>
                                <span>{globalWidgetConfig?.tracker.pointsName}</span> <span>{t('tokens')}</span>
                            </h3>
                            <div className="token-icon">
                                <TokenIcon />
                            </div>
                            {isShowWallet ? (
                                <FlexboxGrid
                                    align="middle"
                                    justify="space-between"
                                    className="token-description"
                                >
                                    <div className="withdraw-configs">
                                        <div className="min-config">
                                            <span className="min-config-text">{t('min')}: </span>
                                            <strong>{tokensMinCount}</strong>{' '}
                                        </div>
                                        <div className="max-config">{`${t('max')} (${tokensMaxCount})`}</div>
                                    </div>
                                    <p>{t('how-much')}</p>
                                    <Input
                                        size="sm"
                                        {...f.getFieldProps('tokensNumber')}
                                        onFocus={handleFocus}
                                        onChange={(newValue: string) => {
                                            f.setFieldValue('tokensNumber', newValue, true);

                                            changePoints(Number(newValue));
                                        }}
                                    />
                                </FlexboxGrid>
                            ) : (
                                <FlexboxGrid
                                    align="middle"
                                    justify="space-between"
                                    className="token-description"
                                >
                                    <strong className="tokens">
                                        {' '}
                                        {account?.balanceTokens ? account?.balanceTokens.toFixed(1) : 0}
                                    </strong>
                                </FlexboxGrid>
                            )}
                        </div>
                    </FlexboxGrid>
                    {f.errors.tokensNumber && isShowWallet && (
                        <ErrorMessage>{f.errors.tokensNumber}</ErrorMessage>
                    )}

                    {isShowWallet && (
                        <FlexboxGrid align="middle">
                            <div className="wallet-editor">
                                <FlexboxGrid
                                    align="middle"
                                    justify="space-between"
                                    className="form-container"
                                >
                                    {account?.wallet === '' || isWalletEditMode ? (
                                        <form onSubmit={f.handleSubmit} className="form">
                                            <div className="wallet-icon">
                                                <WalletIcon />
                                            </div>
                                            <Input
                                                className="wallet-input"
                                                size="sm"
                                                placeholder="Add wallet address"
                                                {...f.getFieldProps('wallet')}
                                                onChange={(newValue: string) => {
                                                    f.setFieldValue('wallet', newValue);
                                                }}
                                            />

                                            {!account?.wallet || isWalletEditMode ? (
                                                <button
                                                    disabled={f.isSubmitting}
                                                    className="form-submit"
                                                    type="submit"
                                                >
                                                    {f.isSubmitting ? <Loader /> : <WalletAcceptIcon />}
                                                </button>
                                            ) : (
                                                <div className="pencilIcon-container">
                                                    <WalletPencilIcon />
                                                </div>
                                            )}
                                        </form>
                                    ) : (
                                        <div className="wallet-show-mode">
                                            <div className="wallet-icon">
                                                <WalletIcon />
                                            </div>

                                            <div className="wallet-address-container">
                                                {account?.wallet === '' ? (
                                                    <p>{t('add-wallet-address')}</p>
                                                ) : (
                                                    <p>
                                                        <span
                                                            style={{
                                                                display: 'inherit',
                                                                width: '80px',
                                                            }}
                                                        >
                                                            {account?.wallet}
                                                        </span>
                                                        <span className="address">
                                                            ...
                                                            {account?.wallet
                                                                ? account?.wallet.substr(-4)
                                                                : ''}
                                                        </span>
                                                    </p>
                                                )}
                                            </div>

                                            <div
                                                className="pencil-icon"
                                                onClick={() => {
                                                    setWalletEditMode(!isWalletEditMode);
                                                }}
                                            >
                                                <WalletPencilIcon />
                                            </div>
                                        </div>
                                    )}

                                    {f.touched.wallet && f.errors.wallet && (
                                        <ErrorMessage>{f.errors.wallet}</ErrorMessage>
                                    )}
                                </FlexboxGrid>
                                <div className="transaction-fee-container">
                                    <p>{t('free-transaction-fee')}</p>
                                </div>
                            </div>

                            <div className="buttons-container">
                                <Button
                                    onClick={() => {
                                        validateFormManually().then((isValid) => {
                                            if (isValid) {
                                                sendToWallet();
                                            }
                                        });
                                    }}
                                    size="lg"
                                    disabled={account?.isEmailConfirmed === false || account?.wallet === ''}
                                    className="send-to-wallet rs-btn-violet"
                                >
                                    {t('send-to-wallet')}
                                </Button>
                                <Button
                                    onClick={onCancel}
                                    size="lg"
                                    appearance="subtle"
                                    // disabled={Number(account?.balanceTokens) < 1}
                                    className="cancel-btn rs-btn"
                                >
                                    {isPendingCryptoTransfer ? <Loader /> : t('cancel')}
                                </Button>
                            </div>
                        </FlexboxGrid>
                    )}
                </div>

                {!isShowWallet && (
                    <Button
                        onClick={() => {
                            setIsShowWallet(!isShowWallet);
                            f.setErrors({});
                        }}
                        size="lg"
                        disabled={Number(account?.balanceTokens) < 1}
                        className="withdraw-btn"
                    >
                        {isPendingCryptoTransfer ? <Loader /> : t('withdraw-tokens')}
                    </Button>
                )}
            </div>
        </div>
    );
};
