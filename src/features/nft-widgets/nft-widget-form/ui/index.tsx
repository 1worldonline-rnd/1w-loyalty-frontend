import { PropsWithClassName } from '@/shared/utility-types';
import styled from 'styled-components';
import { useNftWidgetForm } from '../hooks/useNftWidgetForm';
import { Button, ErrorMessage, Input, Select } from '@/shared/rsuite/admin-panel';
import { FlexboxGrid } from 'rsuite';
import { adminPanelModel } from '@/entities/admin-panel';
import { Loader } from '@/shared/ui';
import { styles } from './styles';
import { useStore } from 'effector-react';
import { nftModel } from '@/entities/nft';
import { useTranslation } from 'next-i18next';

export const NftWidgetForm = styled((props: PropsWithClassName) => {
    const { className } = props;
    const { form: f, nftCollectionOptions, localeOptions } = useNftWidgetForm();
    const nftCollections = useStore(nftModel.stores.$nftCollections);
    const { mode } = useStore(adminPanelModel.stores.$adminModal);

    const { t } = useTranslation('common', { keyPrefix: 'nft' });

    const getNftCollectionSelectValue = () => {
        const collectionId = f.values.collectionIds ? f.values.collectionIds[0] : null;
        const collection = nftCollections.find(({ id }) => collectionId === id);

        if (collection) {
            return {
                label: collection.name,
                value: collection.id,
            };
        }
        return undefined;
    };

    return (
        <form onSubmit={f.handleSubmit} className={className}>
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
                    <span>{t('language')}</span>

                    <Select
                        onChange={(option) => {
                            if (option) {
                                f.setFieldValue('locale', option);
                            }
                        }}
                        options={localeOptions}
                        value={f.values.locale}
                        size="md"
                    />
                </label>
            </div>

            <div className="field field--required">
                <label>
                    <span>{t('nft-collection')}</span>

                    <Select
                        options={nftCollectionOptions}
                        onChange={(option) => {
                            if (option) {
                                f.setFieldValue('collectionIds', [option.value]);
                            }
                        }}
                        value={getNftCollectionSelectValue()}
                        size="md"
                    />
                </label>
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

                <Button size="sm" appearance="primary" type="submit">
                    {f.isSubmitting ? <Loader width={16} /> : mode === 'update' ? t('update') : t('create')}
                </Button>
            </FlexboxGrid>
        </form>
    );
})`
    ${styles}
`;
