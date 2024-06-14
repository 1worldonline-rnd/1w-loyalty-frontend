import { PropsWithClassName } from '@/shared/utility-types';
import styled from 'styled-components';
import { useNftCreationForm } from '../hooks/useNftCreationForm';
import { Button, ErrorMessage, Input, Toggle } from '@/shared/rsuite/admin-panel';
import { FlexboxGrid } from 'rsuite';
import { styles } from './styles';
import { adminPanelModel } from '@/entities/admin-panel';
import { Loader } from '@/shared/ui';
import { useTranslation } from 'next-i18next';

export const NftCreationForm = styled((props: PropsWithClassName) => {
    const { className } = props;
    const { form: f } = useNftCreationForm();

    const { t } = useTranslation('common', { keyPrefix: 'nft' });

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
                    <span>{t('metadata-url')}</span>
                    <Input
                        {...f.getFieldProps('metadataUrl')}
                        size="lg"
                        hasError={Boolean(f.touched.metadataUrl && f.errors.metadataUrl)}
                        onChange={(newValue: string) => f.setFieldValue('metadataUrl', newValue)}
                    />
                </label>
                {f.touched.metadataUrl && f.errors.metadataUrl && (
                    <ErrorMessage>{f.errors.metadataUrl}</ErrorMessage>
                )}
            </div>
            <div className="field field--required">
                <label>
                    <span>{t('image-url')}</span>
                    <Input
                        {...f.getFieldProps('imageUrl')}
                        size="lg"
                        hasError={Boolean(f.touched.imageUrl && f.errors.imageUrl)}
                        onChange={(newValue: string) => f.setFieldValue('imageUrl', newValue)}
                    />
                </label>
                {f.touched.imageUrl && f.errors.imageUrl && <ErrorMessage>{f.errors.imageUrl}</ErrorMessage>}
            </div>
            <div className="field__toggle">
                <Toggle
                    size="sm"
                    checked={Boolean(f.getFieldProps('isPreMinted').value)}
                    onChange={(newValue) => {
                        f.setFieldValue('isPreMinted', newValue);
                    }}
                />
                <span className="field__toggle-text">{t('pre-minted')}</span>
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
                    {f.isSubmitting ? <Loader width={16} /> : t('create')}
                </Button>
            </FlexboxGrid>
        </form>
    );
})`
    ${styles}
`;
