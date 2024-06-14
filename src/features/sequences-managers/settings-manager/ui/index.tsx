import styled from 'styled-components';
import { FlexboxGrid } from 'rsuite';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useStore } from 'effector-react';
import { useRouter } from 'next/router';
import { PropsWithClassName } from '@/shared/utility-types';
import { useSettingsManagerForm } from '../hooks/useSettingsManagerForm';
import { Button, Select, ErrorMessage, Modal, Input } from '@/shared/rsuite/admin-panel';
import { Loader } from '@/shared/ui';
import { styles } from './styles';
import { WidgetConfig } from '@/shared/api/widget-config/types';
import { showMessage } from '@/shared/lib/messages';
import { Route } from '@/shared/constants';
import { $activeSequence, $activeSequenceId } from '@/entities/feed/model/stores';
import { fetchDeleteSequence } from '@/shared/api/feed';

export const SettingsManager = styled(({ className }: PropsWithClassName) => {
    const { form: f, localeOptions, areValuesChanged } = useSettingsManagerForm();

    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const activeSequenceConfig = useStore($activeSequence);

    const { t } = useTranslation('common', { keyPrefix: 'sequences' });
    const { t: translateModals } = useTranslation('common', { keyPrefix: 'modals' });

    const widgetId = useStore($activeSequenceId);

    const router = useRouter();

    const handleDeleteWidget = async (id: WidgetConfig['guid']) => {
        const { status } = await fetchDeleteSequence(id);

        if (status === 200) {
            showMessage(t('message-if-widget-successfully-deleted'));
            router.push(Route.admin.sequences);
        }
    };

    return (
        <form onSubmit={f.handleSubmit} className={className}>
            <fieldset className="fieldset">
                <div className="split-fields">
                    <label className="field">
                        <span className="field__label">{t('name')}</span>

                        <Input
                            disabled={activeSequenceConfig?.status === 'ACTIVE'}
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
                        <span className="field__label">{t('language')}</span>

                        <Select
                            isDisabled={activeSequenceConfig?.status === 'ACTIVE'}
                            size="md"
                            options={localeOptions}
                            onChange={(option) => {
                                if (option) f.setFieldValue('locale', option);
                            }}
                            value={f.values.locale}
                        />
                    </label>
                </div>

                <Button
                    appearance="primary"
                    size="md"
                    type="submit"
                    disabled={!f.isValid || !areValuesChanged || activeSequenceConfig?.status === 'ACTIVE'}
                >
                    {f.isSubmitting ? <Loader /> : t('save-settings')}
                </Button>
            </fieldset>
            <section className="fieldset">
                <h3 className="fieldset__title">{t('delete-sequence')}</h3>
                <Button
                    color="red"
                    size="md"
                    disabled={activeSequenceConfig?.status === 'ACTIVE'}
                    onClick={() => {
                        setIsShowDeleteModal(!isShowDeleteModal);
                    }}
                >
                    {t('delete-sequence')}
                </Button>
            </section>

            <Modal open={isShowDeleteModal} onClose={() => setIsShowDeleteModal(!isShowDeleteModal)}>
                <Modal.Header>
                    <h3 style={{ fontSize: 18, color: 'var(--text-dark-color)' }}>{t('delete-sequence')}?</h3>
                </Modal.Header>

                <Modal.Body>
                    <p style={{ fontSize: 16, color: 'var(--text-default-color)' }}>
                        {t('delete-sequence')} <b>{f.values.pageName}</b>?
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
                            onClick={() => {
                                widgetId && handleDeleteWidget(widgetId);
                            }}
                        >
                            {t('delete-sequence')}
                        </Button>
                    </FlexboxGrid>
                </Modal.Body>
            </Modal>
        </form>
    );
})`
    ${styles}
`;
