import styled from 'styled-components';
import { PropsWithClassName } from '@/shared/utility-types';
import { styles } from './styles';
import { useNftCollectionCreationForm } from '../hooks/useNftCollectionCreationForm';
import { Button, ErrorMessage, Input, Select } from '@/shared/rsuite/admin-panel';
import { FlexboxGrid } from 'rsuite';
import { adminPanelModel } from '@/entities/admin-panel';
import { Loader } from '@/shared/ui';
import { useEthers } from '../../crypto/hooks/useEthers';
import { useTranslation } from 'next-i18next';

export const NftCollectionCreationForm = styled((props: PropsWithClassName) => {
    const { className } = props;
    const { form: f, blockchainOptions } = useNftCollectionCreationForm();
    const { account, chainId, ethereum, switchNetworkByChainName, activateBrowserWallet } = useEthers();

    const { t } = useTranslation('common', { keyPrefix: 'nft' });

    const isWrongNetwork = () => {
        if (f.values.blockchain.value === 'POLYGON') {
            return chainId !== Number(process.env.NEXT_PUBLIC_POLYGON_ID);
        } else if (f.values.blockchain.value === 'CAMINO') {
            return chainId !== Number(process.env.NEXT_PUBLIC_CAMINO_ID);
        }
    };

    return (
        <form onSubmit={f.handleSubmit} className={className}>
            <div className="field field--full">
                {account ? (
                    <p className="crypto-info">
                        {t('wallet')}: {account}
                    </p>
                ) : (
                    <p className="crypto-info">{t('wallet-not-connected')}</p>
                )}
            </div>
            <div className="field field--required">
                <label>
                    <span>{t('name')}</span>
                    <Input
                        {...f.getFieldProps('name')}
                        size="lg"
                        hasError={Boolean(f.touched.name && f.errors.name)}
                        onChange={(newValue: string) => f.setFieldValue('name', newValue)}
                    />
                </label>
                {f.touched.name && f.errors.name && <ErrorMessage>{f.errors.name}</ErrorMessage>}
            </div>
            <div className="field">
                <label>
                    <span>{t('blockchain')}</span>
                    <Select
                        size="md"
                        options={blockchainOptions}
                        onChange={(option) => {
                            if (option) f.setFieldValue('blockchain', option);
                        }}
                        value={f.values.blockchain ? f.values.blockchain : blockchainOptions[0]}
                    ></Select>
                </label>
                {f.touched.blockchain && f.errors.blockchain && (
                    <ErrorMessage>{f.errors.blockchain}</ErrorMessage>
                )}
            </div>
            <div className="field field--required">
                <label>
                    <span>{t('description')}</span>
                    <Input
                        {...f.getFieldProps('description')}
                        size="lg"
                        hasError={Boolean(f.touched.description && f.errors.description)}
                        onChange={(newValue: string) => f.setFieldValue('description', newValue)}
                    />
                </label>
                {f.touched.description && f.errors.description && (
                    <ErrorMessage>{f.errors.description}</ErrorMessage>
                )}
            </div>
            <div className="field field--required">
                <label>
                    <span>{t('symbol')}</span>
                    <Input
                        {...f.getFieldProps('symbol')}
                        size="lg"
                        hasError={Boolean(f.touched.symbol && f.errors.symbol)}
                        onChange={(newValue: string) => f.setFieldValue('symbol', newValue)}
                    />
                </label>
                {f.touched.symbol && f.errors.symbol && <ErrorMessage>{f.errors.symbol}</ErrorMessage>}
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
                    {t('cancel')}
                </Button>

                {ethereum ? (
                    account ? (
                        isWrongNetwork() ? (
                            <Button
                                size="sm"
                                appearance="primary"
                                type="button"
                                onClick={() => {
                                    switchNetworkByChainName(f.values.blockchain.value);
                                }}
                            >
                                {t('switch-network')}
                            </Button>
                        ) : (
                            <Button size="sm" appearance="primary" type="submit">
                                {f.isSubmitting ? <Loader width={16} /> : t('create')}
                            </Button>
                        )
                    ) : (
                        <Button size="sm" appearance="primary" type="button" onClick={activateBrowserWallet}>
                            {t('connect-wallet')}
                        </Button>
                    )
                ) : (
                    <p>{t('install-wallet')}</p>
                )}
            </FlexboxGrid>
        </form>
    );
})`
    ${styles}
`;
