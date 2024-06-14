import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { FlexboxGrid } from 'rsuite';
import { useCollectionCreationForm } from '../hooks/useCollectionCreationForm';
import { Loader } from '@/shared/ui';
import { PropsWithClassName } from '@/shared/utility-types';
import { Button, ErrorMessage, Input, Select } from '@/shared/rsuite/admin-panel';
import { adminPanelModel } from '@/entities/admin-panel';

export const CollectionCreationForm = styled(({ className }: PropsWithClassName) => {
    const { form: f, localeOptions, collectionTypeOptions } = useCollectionCreationForm();

    const collectionTranslation = useTranslation('features.collection', { keyPrefix: 'creation-form' });

    const modalTranslation = useTranslation('common', { keyPrefix: 'modals' });

    return (
        <form onSubmit={f.handleSubmit} className={className}>
            <div className="field field--name">
                <label>
                    <span>{collectionTranslation.t('collection-name-field-label')}</span>

                    <Input
                        hasError={Boolean(f.touched.name && f.errors.name)}
                        size="lg"
                        {...f.getFieldProps('name')}
                        onChange={(newValue: string) => f.setFieldValue('name', newValue)}
                    />
                </label>

                {f.touched.name && f.errors.name && <ErrorMessage>{f.errors.name}</ErrorMessage>}
            </div>

            <div className="field">
                <label>
                    <span>{collectionTranslation.t('collection-type-field-label')}</span>

                    <Select
                        options={collectionTypeOptions}
                        onChange={(option) => {
                            if (option) f.setFieldValue('type', option);
                        }}
                        value={f.values.type}
                    />
                </label>
            </div>

            <div className="field">
                <label>
                    <span>{collectionTranslation.t('collection-locale-field-label')}</span>

                    <Select
                        options={localeOptions}
                        onChange={(option) => {
                            if (option) f.setFieldValue('locale', option);
                        }}
                        value={f.values.locale}
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
                    {modalTranslation.t('cancel')}
                </Button>

                <Button size="sm" appearance="primary" type="submit">
                    {f.isSubmitting ? (
                        <Loader width={16} />
                    ) : (
                        collectionTranslation.t('button-create-collection-label')
                    )}
                </Button>
            </FlexboxGrid>
        </form>
    );
})`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 12px;

    .field--name,
    .buttons {
        grid-column: 1 / 3;
    }

    .field,
    .field label {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .field label span {
        font-weight: 600;
        color: var(--text-dark-color);
    }

    .buttons {
        gap: 8px;
    }
`;
