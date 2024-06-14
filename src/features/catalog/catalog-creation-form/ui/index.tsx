import { adminPanelModel } from '@/entities/admin-panel';
// import { SelectedProductsList } from '@/entities/redemption';
import { Button, ErrorMessage, Input } from '@/shared/rsuite/admin-panel';
import { Loader } from '@/shared/ui';
import type { PropsWithClassName } from '@/shared/utility-types';
import { FlexboxGrid } from 'rsuite';
import styled from 'styled-components';
import { useCatalogCreationForm } from '../hooks/useCatalogCreationForm';
import { styles } from './styles';

export const CatalogCreationForm = styled((props: PropsWithClassName) => {
    const { className } = props;
    const { form: f } = useCatalogCreationForm();

    return (
        <form onSubmit={f.handleSubmit} className={className}>
            <div className="field field--required field--name">
                <label>
                    <span>Catalog name</span>

                    <Input
                        {...f.getFieldProps('name')}
                        size="lg"
                        hasError={Boolean(f.touched.name && f.errors.name)}
                        onChange={(newValue: string) => f.setFieldValue('name', newValue)}
                    />
                </label>

                {f.touched.name && f.errors.name && <ErrorMessage>{f.errors.name}</ErrorMessage>}
            </div>

            {/* <SelectedProductsList
                className="selected-products-list"
                style={{
                    borderBlock: '1px solid var(--grey-5-color)',
                }}
                onToggle={(newValue) => f.setFieldValue('productsIds', newValue)}
                value={f.values.productsIds}
            /> */}

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
                    Cancel
                </Button>

                <Button size="sm" appearance="primary" type="submit">
                    {f.isSubmitting ? <Loader width={16} /> : 'Create'}
                </Button>
            </FlexboxGrid>
        </form>
    );
})`
    ${styles}
`;
