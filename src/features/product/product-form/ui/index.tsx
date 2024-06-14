import { adminPanelModel } from '@/entities/admin-panel';
import { Button, ErrorMessage, Input, Select, Toggle } from '@/shared/rsuite/admin-panel';
import { DatePicker, Loader, WysiwygEditor } from '@/shared/ui';
import type { PropsWithClassName } from '@/shared/utility-types';
import classNames from 'classnames';
import { FlexboxGrid } from 'rsuite';
import styled from 'styled-components';
import { useProductForm } from '../hooks/useProductForm';
import { styles } from './styles';
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import { $activeCatalogId, setActiveCatalogId } from '../model';

export const ProductForm = styled((props: PropsWithClassName) => {
    const { className } = props;

    const {
        form: f,
        productTypeOptions,
        catalogOptions,
        sequenceFeedOptions,
        firstItemActionOptions,
        lockerTypeOptions,
        isEditing,
        setImmutableOptions,
    } = useProductForm();

    const activeCatalogId = useStore($activeCatalogId);

    const parseDate = (dateString: string) => {
        const date = new Date(dateString);
        if (date.getMinutes() === 59) {
            date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        }

        return date;
    };

    const isToggleChecked = (field: string) => {
        return f.getFieldProps(field).value !== '0' || !f.getFieldProps(field).value;
    };

    const isInputDisabled = (field: string) => {
        return f.getFieldProps(field).value && f.getFieldProps(field).value === '0';
    };

    const getCatalogOptions = () => {
        if (activeCatalogId && !isEditing) {
            const option = catalogOptions.find(({ value }) => activeCatalogId === value);
            return option ? [option] : f.values.catalogs;
        }
        return f.values.catalogs;
    };

    useEffect(() => {
        setImmutableOptions(getCatalogOptions());
    }, [f.values.catalogs]);

    return (
        <form onSubmit={f.handleSubmit} className={className}>
            <div className={classNames('field field--required', { 'field--full-row': !isEditing })}>
                <label>
                    <span>Title</span>

                    <Input
                        {...f.getFieldProps('title')}
                        size="lg"
                        hasError={Boolean(f.touched.title && f.errors.title)}
                        onChange={(newValue: string) => f.setFieldValue('title', newValue)}
                    />
                </label>

                {f.touched.title && f.errors.title && <ErrorMessage>{f.errors.title}</ErrorMessage>}
            </div>
            <div className="field">
                <label>
                    <span>Type</span>

                    <Select
                        options={productTypeOptions}
                        onChange={(option) => {
                            if (option) {
                                f.setFieldValue('type', option);
                            }
                        }}
                        value={f.values.type}
                        size="md"
                    />
                </label>
            </div>
            <div className="field">
                <label>
                    <span>Catalogs</span>

                    <Select
                        options={catalogOptions}
                        isMulti={true}
                        onChange={(option) => {
                            if (option) {
                                f.setFieldValue('catalogs', option);
                            }
                        }}
                        value={getCatalogOptions()}
                        size="md"
                        isDisabled={!!activeCatalogId}
                    />
                </label>

                {f.touched.catalogs && f.errors.catalogs && <ErrorMessage>{f.errors.catalogs}</ErrorMessage>}
            </div>
            <div className="field field--required">
                <label>
                    <span>Company</span>

                    <Input
                        {...f.getFieldProps('company')}
                        size="lg"
                        hasError={Boolean(f.touched.company && f.errors.company)}
                        onChange={(newValue: string) => f.setFieldValue('company', newValue)}
                    />
                </label>

                {f.touched.company && f.errors.company && <ErrorMessage>{f.errors.company}</ErrorMessage>}
            </div>
            {!isEditing && (
                <div className="field field--required">
                    <label>
                        <span>Image link</span>

                        <Input
                            {...f.getFieldProps('image')}
                            size="lg"
                            hasError={Boolean(f.touched.image && f.errors.image)}
                            onChange={(newValue: string) => f.setFieldValue('image', newValue)}
                        />
                    </label>

                    {f.touched.image && f.errors.image && <ErrorMessage>{f.errors.image}</ErrorMessage>}
                </div>
            )}
            {f.getFieldProps('type').value.value === 'Ticket' ? (
                <div className="field">
                    <label>
                        <span>Count</span>

                        {!isEditing ? (
                            <>
                                <div className="field__toggle">
                                    <Toggle
                                        size="sm"
                                        checked={isToggleChecked('initialCount')}
                                        onChange={(newValue) => {
                                            f.setFieldValue('initialCount', newValue ? '1' : '0');
                                        }}
                                    />
                                    <span className="field__toggle-text">Limited</span>
                                </div>

                                {isInputDisabled('initialCount') ? (
                                    <Input
                                        value="Unlimited"
                                        size="lg"
                                        hasError={Boolean(f.touched.initialCount && f.errors.initialCount)}
                                        onChange={(newValue: string) =>
                                            f.setFieldValue('initialCount', newValue)
                                        }
                                        disabled
                                    />
                                ) : (
                                    <Input
                                        {...f.getFieldProps('initialCount')}
                                        size="lg"
                                        hasError={Boolean(f.touched.initialCount && f.errors.initialCount)}
                                        onChange={(newValue: string) =>
                                            f.setFieldValue('initialCount', newValue)
                                        }
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                <div className="field__toggle">
                                    <Toggle
                                        size="sm"
                                        checked={isToggleChecked('initialCount')}
                                        onChange={(newValue) => {
                                            f.setFieldValue('initialCount', newValue ? '1' : '0');
                                        }}
                                        disabled
                                    />
                                    <span className="field__toggle-text">Limited</span>
                                </div>
                                <Input
                                    value={
                                        f.getFieldProps('initialCount').value === '0'
                                            ? 'Unlimited'
                                            : f.getFieldProps('initialCount').value
                                    }
                                    size="lg"
                                    hasError={Boolean(f.touched.initialCount && f.errors.initialCount)}
                                    onChange={(newValue: string) => f.setFieldValue('initialCount', newValue)}
                                    disabled
                                />
                            </>
                        )}
                    </label>

                    {f.touched.initialCount && f.errors.initialCount && (
                        <ErrorMessage>{f.errors.initialCount}</ErrorMessage>
                    )}
                </div>
            ) : (
                <div className="field">
                    <label>
                        <span>Count</span>
                        <Input size="lg" value={f.values.initialCount} disabled />
                    </label>
                </div>
            )}
            {f.getFieldProps('type').value.value === 'Ticket' && (
                <div className="field">
                    <label>
                        <span>Limits per user</span>

                        <div className="field__toggle">
                            <Toggle
                                size="sm"
                                checked={isToggleChecked('limitPerUser')}
                                onChange={(newValue) => {
                                    f.setFieldValue('limitPerUser', newValue ? '1' : '0');
                                }}
                            />
                            <span className="field__toggle-text">Limited</span>
                        </div>
                        {isInputDisabled('limitPerUser') ? (
                            <Input
                                value="Unlimited"
                                size="lg"
                                hasError={Boolean(f.touched.limitPerUser && f.errors.limitPerUser)}
                                onChange={(newValue: string) => f.setFieldValue('limitPerUser', newValue)}
                                disabled
                            />
                        ) : (
                            <Input
                                {...f.getFieldProps('limitPerUser')}
                                size="lg"
                                hasError={Boolean(f.touched.limitPerUser && f.errors.limitPerUser)}
                                onChange={(newValue: string) => f.setFieldValue('limitPerUser', newValue)}
                            />
                        )}
                    </label>

                    {f.touched.limitPerUser && f.errors.limitPerUser && (
                        <ErrorMessage>{f.errors.limitPerUser}</ErrorMessage>
                    )}
                </div>
            )}
            {isEditing && (
                <div className="field field--required">
                    <label>
                        <span>Image link</span>

                        <Input
                            {...f.getFieldProps('image')}
                            size="lg"
                            hasError={Boolean(f.touched.image && f.errors.image)}
                            onChange={(newValue: string) => f.setFieldValue('image', newValue)}
                        />
                    </label>

                    {f.touched.image && f.errors.image && <ErrorMessage>{f.errors.image}</ErrorMessage>}
                </div>
            )}
            <div className="field field--required">
                <label>
                    <span>Price global</span>

                    <Input
                        {...f.getFieldProps('priceGlobal')}
                        size="lg"
                        hasError={Boolean(f.touched.priceGlobal && f.errors.priceGlobal)}
                        onChange={(newValue: string) => f.setFieldValue('priceGlobal', newValue)}
                    />
                </label>

                {f.touched.priceGlobal && f.errors.priceGlobal && (
                    <ErrorMessage>{f.errors.priceGlobal}</ErrorMessage>
                )}
            </div>
            <div className="field field--required">
                <label>
                    <span>Price local</span>

                    <Input
                        {...f.getFieldProps('priceLocal')}
                        size="lg"
                        hasError={Boolean(f.touched.priceLocal && f.errors.priceLocal)}
                        onChange={(newValue: string) => f.setFieldValue('priceLocal', newValue)}
                    />
                </label>

                {f.touched.priceLocal && f.errors.priceLocal && (
                    <ErrorMessage>{f.errors.priceLocal}</ErrorMessage>
                )}
            </div>

            <div className="field">
                <label>
                    <span>Snapshot date</span>

                    <DatePicker
                        selected={f.values.snapshotDate ? parseDate(f.values.snapshotDate) : undefined}
                        onChange={(date: Date) => {
                            f.setFieldValue('snapshotDate', date?.toISOString());
                        }}
                    />
                </label>

                {f.touched.snapshotDate && f.errors.snapshotDate && (
                    <ErrorMessage>{f.errors.snapshotDate}</ErrorMessage>
                )}
            </div>

            {f.getFieldProps('type').value.value === 'Ticket' && (
                <div className="field">
                    <label>
                        <span>Giveaway date</span>
                        <DatePicker
                            selected={
                                f.values.expirationDate ? parseDate(f.values.expirationDate) : undefined
                            }
                            onChange={(date: Date) => {
                                f.setFieldValue('expirationDate', date?.toISOString());
                            }}
                        />
                    </label>

                    {f.touched.expirationDate && f.errors.expirationDate && (
                        <ErrorMessage>{f.errors.expirationDate}</ErrorMessage>
                    )}
                </div>
            )}
            <div
                className={
                    f.getFieldProps('type').value.value === 'Ticket'
                        ? 'field field--required field--full-row'
                        : 'field field--required'
                }
            >
                <label>
                    <span>Redemption link</span>

                    <Input
                        {...f.getFieldProps('link')}
                        size="lg"
                        hasError={Boolean(f.touched.link && f.errors.link)}
                        onChange={(newValue: string) => f.setFieldValue('link', newValue)}
                    />
                </label>

                {f.touched.link && f.errors.link && <ErrorMessage>{f.errors.link}</ErrorMessage>}
            </div>

            <div className="field">
                <label>
                    <span>First item action</span>

                    <Select
                        options={firstItemActionOptions}
                        onChange={(option) => {
                            if (option) {
                                f.setFieldValue('firstItemAction', option);
                            }
                        }}
                        value={f.values.firstItemAction}
                        size="md"
                    />
                </label>

                {f.touched.firstItemAction && f.errors.firstItemAction && (
                    <ErrorMessage>{f.errors.firstItemAction}</ErrorMessage>
                )}
            </div>

            <div className="field">
                <label>
                    <span>Mandatory action to unlock</span>

                    <Select
                        options={lockerTypeOptions}
                        onChange={(option) => {
                            if (option) {
                                f.setFieldValue('lockerType', option);
                            }
                        }}
                        value={f.values.lockerType}
                        size="md"
                    />
                </label>

                {f.touched.lockerType && f.errors.lockerType && (
                    <ErrorMessage>{f.errors.lockerType}</ErrorMessage>
                )}
            </div>

            {f.values.lockerType.value !== 'EMPTY' && (
                <div className="field field--full-row">
                    <label>
                        <span>Select action item to unlock</span>

                        <Select
                            options={sequenceFeedOptions}
                            onChange={(option) => {
                                if (option) {
                                    f.setFieldValue('lockerId', option);
                                }
                            }}
                            value={f.values.lockerId}
                            size="md"
                        />
                    </label>

                    {f.touched.lockerId && f.errors.lockerId && (
                        <ErrorMessage>{f.errors.lockerId}</ErrorMessage>
                    )}
                </div>
            )}

            <div className="field field--full-row field--required" key={f.values.title + '1'}>
                <label>
                    <span>Description</span>
                </label>

                <WysiwygEditor
                    value={f.values.description}
                    onUpdate={({ editor }) => {
                        f.setFieldValue('description', editor.getHTML());
                    }}
                    onBlur={() => f.setFieldTouched('description')}
                />

                {f.touched.description && f.errors.description && (
                    <ErrorMessage>{f.errors.description}</ErrorMessage>
                )}
            </div>
            <div className="field field--full-row field--required" key={f.values.title + '2'}>
                <label>
                    <span>Purchase description</span>
                </label>

                <WysiwygEditor
                    value={f.values.purchaseDescription}
                    onUpdate={({ editor }) => {
                        f.setFieldValue('purchaseDescription', editor.getHTML());
                    }}
                    onBlur={() => f.setFieldTouched('purchaseDescription')}
                />

                {f.touched.purchaseDescription && f.errors.purchaseDescription && (
                    <ErrorMessage>{f.errors.purchaseDescription}</ErrorMessage>
                )}
            </div>
            <div className="field field--full-row field--required" key={f.values.title + '3'}>
                <label>
                    <span>Short description</span>
                </label>

                <WysiwygEditor
                    value={f.values.shortDescription}
                    onUpdate={({ editor }) => {
                        f.setFieldValue('shortDescription', editor.getHTML());
                    }}
                    onBlur={() => f.setFieldTouched('shortDescription')}
                />

                {f.touched.shortDescription && f.errors.shortDescription && (
                    <ErrorMessage>{f.errors.shortDescription}</ErrorMessage>
                )}
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
                        setImmutableOptions(null);
                        setActiveCatalogId(null);
                    }}
                >
                    Cancel
                </Button>

                <Button size="sm" appearance="primary" type="submit">
                    {f.isSubmitting ? <Loader width={16} /> : isEditing ? 'Update' : 'Create'}
                </Button>
            </FlexboxGrid>
        </form>
    );
})`
    ${styles}
`;
