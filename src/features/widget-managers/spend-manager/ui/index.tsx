import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { Button, Select, Toggle } from '@/shared/rsuite/admin-panel';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import { ErrorMessage, Loader } from '@/shared/ui';
import { useSpendManagerForm } from '../hooks/useSpendManagerForm';
import { FlexboxGrid } from 'rsuite';
import { BaseOption } from '@/shared/rsuite/admin-panel/select';
import { LinkIcon } from '@/shared/ui/icons';
import { useCustomRouter } from '@/shared/hooks';
import { Route } from '@/shared/constants';

export const SpendManager = styled(({ className }: PropsWithClassName) => {
    const { form: f, areValuesChanged, catalogOptions } = useSpendManagerForm();

    const { t } = useTranslation('common', { keyPrefix: 'loyalty-widgets.editing' });

    const { push } = useCustomRouter();

    return (
        <div className={className}>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    f.handleSubmit();
                }}
            >
                <section>
                    <header>
                        <label className="field">
                            <div className="description">
                                <h3 className="field__label">{t('spend-manager-wallet')}</h3>
                                {/* NO CONTENT TEXT */}
                                {/* <p>Tool description</p> */}
                            </div>

                            <Toggle
                                checked={!f.values.hideWallet}
                                onChange={(newValue) => {
                                    f.setFieldValue('hideWallet', !newValue);
                                }}
                            />
                        </label>
                    </header>
                    {/* NOT IMPLEMENTED YET */}
                    {/* {!f.values.hideWallet && (
                        <div className="subfields">
                            <fieldset>
                                <label className="field" >
                                    <div className="description">
                                        {t('spend-manager-wallet')} REPLACE LABEL TEXT BELOW?
                                        <label className="field__label field__label--md">
                                        Point exchange
                                        </label>
                                        <p>Allow users to exchange points</p>
                                    </div>
                                    <Toggle
                                        className="toggle"
                                        checked={!f.values.allowPointExchange}
                                        onChange={(newValue) => {
                                            f.setFieldValue('allowPointExchange', !newValue);
                                        }}
                                    ></Toggle>
                                </label>
                                <label className="field">
                                    <div className="description">
                                        {t('spend-manager-wallet')} REPLACE LABEL TEXT BELOW?
                                        <label className="field__label field__label--md">
                                            Tokens withdrawal
                                        </label>
                                        <p>Allow users to withdraw tokens</p>
                                    </div>
                                    <Toggle
                                        className="toggle"
                                        checked={!f.values.allowTokenWithdraw}
                                        onChange={(newValue) => {
                                            f.setFieldValue('allowTokenWithdraw', !newValue);
                                        }}
                                    ></Toggle>
                                </label>
                            </fieldset>
                        </div>
                    )} */}
                </section>

                <section>
                    <header>
                        <label className="field">
                            <div>
                                <h3 className="field__label">Catalog</h3>
                                <p className="field__description">
                                    Tool description perspiciatis unde omnis iste natus
                                </p>
                            </div>

                            <Toggle
                                checked={f.values.catalogChecked}
                                onChange={(newValue) => {
                                    f.setFieldValue('catalogChecked', newValue);
                                }}
                            />
                        </label>
                    </header>

                    {f.values.catalogChecked && (
                        <div className="subfields">
                            <div className="catalog-select">
                                <label className="catalog-select__label">
                                    Select catalog to show in loyalty
                                </label>

                                <FlexboxGrid className="catalog-select__inner">
                                    <Select<BaseOption>
                                        className="catalog-select__select"
                                        placeholder={t('select')}
                                        size="md"
                                        options={catalogOptions}
                                        value={
                                            catalogOptions.find(
                                                ({ value }) => value === f.values.catalogId
                                            ) || null
                                        }
                                        onChange={(option) => {
                                            if (option) {
                                                f.setFieldValue('catalogId', option.value);
                                            }
                                        }}
                                        onBlur={() => {
                                            f.setFieldTouched('catalogId');
                                        }}
                                    />

                                    <Button
                                        className="button-manage-catalog"
                                        size="md"
                                        disabled={!f.values.catalogId}
                                        onClick={() => {
                                            push({
                                                pathname: Route.admin.catalogManager(
                                                    String(f.values.catalogId)
                                                ),
                                            });
                                        }}
                                    >
                                        <LinkIcon />
                                        Manage this catalog
                                    </Button>
                                </FlexboxGrid>

                                {f.touched.catalogId && f.errors.catalogId && (
                                    <ErrorMessage>{f.errors.catalogId}</ErrorMessage>
                                )}
                            </div>
                        </div>
                    )}
                </section>

                <Button
                    className="submit-button"
                    appearance="primary"
                    size="md"
                    type="submit"
                    disabled={!areValuesChanged}
                >
                    {f.isSubmitting ? <Loader /> : t('save-spend-button-submit')}
                </Button>
            </form>
        </div>
    );
})`
    ${styles}
`;
