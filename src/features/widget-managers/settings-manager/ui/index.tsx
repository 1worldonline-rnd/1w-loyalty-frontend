import styled from 'styled-components';
import { FlexboxGrid, Toggle } from 'rsuite';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { PropsWithClassName } from '@/shared/utility-types';
import { useSettingsManagerForm } from '../hooks/useSettingsManagerForm';
import { Button, Select, ErrorMessage, Modal, Input } from '@/shared/rsuite/admin-panel';
import { Loader } from '@/shared/ui';
import { styles } from './styles';
import { widgetConfigModel } from '@/entities/widget-config';
import { WidgetConfig } from '@/shared/api/widget-config/types';
import { showMessage } from '@/shared/lib/messages';
import { Route } from '@/shared/constants';

export const SettingsManager = styled(({ className }: PropsWithClassName) => {
    const { form: f, localeOptions, areValuesChanged } = useSettingsManagerForm();

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

    const { t } = useTranslation('common', { keyPrefix: 'loyalty-widgets' });
    const { t: translateModals } = useTranslation('common', { keyPrefix: 'modals' });

    const widgetId = useStore(widgetConfigModel.stores.$activeWidgetConfigId);

    const router = useRouter();

    const handleDeleteWidget = async (id: WidgetConfig['guid']) => {
        const { status } = await widgetConfigModel.effects.deleteWidgetConfigFx(id);

        if (status === 200) {
            showMessage(t('message-if-widget-successfully-deleted'));
            router.push(Route.admin.widgets);
        }
    };

    return (
        <form onSubmit={f.handleSubmit} className={className}>
            <fieldset className="fieldset">
                <div className="field-list">
                    <label className="field">
                        <span className="field__label">{t('editing.page-name-field-label')}</span>

                        <Input
                            size="lg"
                            data-error={Boolean(f.touched.pageName && f.errors.pageName)}
                            {...f.getFieldProps('pageName')}
                            onChange={(newValue) => {
                                f.setFieldValue('pageName', newValue);
                            }}
                        />

                        {f.touched.pageName && f.errors.pageName && (
                            <ErrorMessage>{f.errors.pageName}</ErrorMessage>
                        )}
                    </label>
                    <label className="field">
                        <span className="field__label">{t('editing.points-name-field-label')}</span>

                        <Input
                            size="lg"
                            data-error={Boolean(f.touched.pointsName && f.errors.pointsName)}
                            {...f.getFieldProps('pointsName')}
                            onChange={(newValue) => {
                                f.setFieldValue('pointsName', newValue);
                            }}
                        />

                        {f.touched.pointsName && f.errors.pointsName && (
                            <ErrorMessage>{f.errors.pointsName}</ErrorMessage>
                        )}
                    </label>
                    <label className="field">
                        <span className="field__label">{t('editing.locale-field-label')}</span>

                        <Select
                            size="md"
                            isDisabled={true}
                            options={localeOptions}
                            onChange={(option) => {
                                if (option) f.setFieldValue('locale', option);
                            }}
                            value={f.values.locale}
                        />
                    </label>
                    <label className="field">
                        <span className="field__label">{t('editing.referral-url-field-label')}</span>

                        <Input
                            size="lg"
                            data-error={Boolean(f.touched.referralUrl && f.errors.referralUrl)}
                            {...f.getFieldProps('referralUrl')}
                            onChange={(newValue) => {
                                f.setFieldValue('referralUrl', newValue);
                            }}
                        />

                        {f.touched.referralUrl && f.errors.referralUrl && (
                            <ErrorMessage>{f.errors.referralUrl}</ErrorMessage>
                        )}
                    </label>
                    <div className="user-menu-settings">
                        <h3 className="fieldset__title user-menu-settings__title">User menu settings</h3>
                        <label className="field">
                            <div className="user-menu-settings__field-container">
                                <Toggle
                                    checked={f.values.userMenuSettings.isShowHome}
                                    onChange={(newValue) => {
                                        f.setFieldValue('userMenuSettings.isShowHome', newValue);
                                    }}
                                />
                                <span className="field__label">
                                    {t('editing.user-menu-settings-is-show-home')}
                                </span>
                            </div>
                        </label>
                        <label className="field">
                            <div className="user-menu-settings__field-container">
                                <Toggle
                                    checked={f.values.userMenuSettings.isShowActivityHistory}
                                    onChange={(newValue) => {
                                        f.setFieldValue('userMenuSettings.isShowActivityHistory', newValue);
                                    }}
                                />
                                <span className="field__label">
                                    {t('editing.user-menu-settings-is-show-activity-history')}
                                </span>
                            </div>
                        </label>
                        <label className="field">
                            <div className="user-menu-settings__field-container">
                                <Toggle
                                    checked={f.values.userMenuSettings.isShowProductTour}
                                    onChange={(newValue) => {
                                        f.setFieldValue('userMenuSettings.isShowProductTour', newValue);
                                    }}
                                />
                                <span className="field__label">
                                    {t('editing.user-menu-settings-is-show-product-tour')}
                                </span>
                            </div>
                        </label>
                        <label className="field">
                            <div className="user-menu-settings__field-container toggle">
                                <Toggle
                                    className="toggle__main"
                                    checked={f.values.userMenuSettings.isShowAccountSettings}
                                    onChange={(newValue) => {
                                        f.setFieldValue('userMenuSettings.isShowAccountSettings', newValue);
                                    }}
                                />
                                <span className="field__label">
                                    {t('editing.user-menu-settings-is-show-account-settings')}
                                </span>
                            </div>
                        </label>
                        <label className="field">
                            <div className="user-menu-settings__field-container">
                                <Toggle
                                    checked={f.values.userMenuSettings.isShowLogout}
                                    onChange={(newValue) => {
                                        f.setFieldValue('userMenuSettings.isShowLogout', newValue);
                                    }}
                                />
                                <span className="field__label">
                                    {t('editing.user-menu-settings-is-show-logout')}
                                </span>
                            </div>
                        </label>
                    </div>
                </div>

                <Button
                    appearance="primary"
                    size="md"
                    type="submit"
                    disabled={!f.isValid || !areValuesChanged}
                >
                    {f.isSubmitting ? <Loader /> : t('editing.save-settings-button-submit')}
                </Button>
            </fieldset>

            <section className="fieldset">
                <h3 className="fieldset__title">{t('editing.delete-loyalty-page-title')}</h3>
                <Button color="red" size="md" onClick={() => setIsShowDeleteModal(!isShowDeleteModal)}>
                    {t('editing.delete-loyalty-page-button')}
                </Button>
            </section>

            <Modal open={isShowDeleteModal} onClose={() => setIsShowDeleteModal(!isShowDeleteModal)}>
                <Modal.Header>
                    <h3 style={{ fontSize: 18, color: 'var(--text-dark-color)' }}>
                        {t('editing.delete-loyalty-page-title')}
                    </h3>
                </Modal.Header>

                <Modal.Body>
                    <p style={{ fontSize: 16, color: 'var(--text-default-color)' }}>
                        {t('editing.delete-loyalty-page-warning')} <b>{f.values.pageName}</b>?
                    </p>

                    <FlexboxGrid justify="end" style={{ marginBlockStart: 20, gap: 8 }}>
                        <Button
                            size="sm"
                            appearance="subtle"
                            onClick={() => setIsShowDeleteModal(!isShowDeleteModal)}
                        >
                            {translateModals('cancel')}
                        </Button>

                        <Button
                            size="sm"
                            color="red"
                            onClick={() => widgetId && handleDeleteWidget(widgetId)}
                        >
                            {t('delete-widget-button')}
                        </Button>
                    </FlexboxGrid>
                </Modal.Body>
            </Modal>
        </form>
    );
})`
    ${styles}
`;
