import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useStore } from 'effector-react';
import { FlexboxGrid } from 'rsuite';
import { ErrorMessage, Loader } from '@/shared/ui';
import { useFeedForm } from '../hooks/useFeedForm';
import { styles } from './styles';
import { PropsWithClassName } from '@/shared/utility-types';
import { FeedFields } from '../types';
import { Button, Input, Select } from '@/shared/rsuite/admin-panel';
import { eventsModel } from '@/entities/events';
import { FeedPeriod } from '@/shared/api/feed/types';
import { adminPanelModel } from '@/entities/admin-panel';
import { BaseOption } from '@/shared/rsuite/admin-panel/select';
import { setCacheFeedFormValues } from '../model';

export const FeedManageForm = styled(({ className }: PropsWithClassName) => {
    const { form: f, localeOptions } = useFeedForm();

    const unattachedEvents = useStore(eventsModel.stores.$unattachedEvents);
    const eventNamesById = useStore(eventsModel.stores.$eventNamesById);
    const adminModal = useStore(adminPanelModel.stores.$adminModal);

    const { t, i18n } = useTranslation('common', { keyPrefix: 'feed' });
    const { t: translateModals } = useTranslation('common', { keyPrefix: 'modals' });
    const createNew = translateModals('create-new');

    const getIncentiveSelectValue = () => {
        const incentive = f.values[FeedFields.incentive];

        if (incentive) {
            const eventId = incentive.id;
            return {
                label: eventNamesById[eventId],
                value: eventId,
            };
        }
        return undefined;
    };

    return (
        <form onSubmit={f.handleSubmit} className={className}>
            <div className="field">
                <label>
                    <span>{t(FeedFields.name)}</span>

                    <Input
                        {...f.getFieldProps(FeedFields.name)}
                        size="lg"
                        hasError={Boolean(f.touched[FeedFields.name] && f.errors[FeedFields.name])}
                        onChange={(newValue: string) => {
                            f.setFieldValue(FeedFields.name, newValue);

                            setCacheFeedFormValues({
                                [FeedFields.name]: newValue,
                            });
                        }}
                    />
                </label>

                {f.touched[FeedFields.name] && f.errors[FeedFields.name] && (
                    <ErrorMessage>{f.errors[FeedFields.name]}</ErrorMessage>
                )}
            </div>

            <div className="field">
                <label>
                    <span>{t(FeedFields.locale)}</span>

                    <Select
                        onChange={(option) => {
                            if (option) {
                                f.setFieldValue(FeedFields.locale, option);

                                setCacheFeedFormValues({
                                    [FeedFields.locale]: option,
                                });
                            }
                        }}
                        options={localeOptions}
                        value={f.values[FeedFields.locale]}
                        size="md"
                    />
                </label>
            </div>

            <div className="field field--fill-width">
                <label className="feed-field__label">
                    <span>{t(FeedFields.incentive)}</span>

                    <Select<BaseOption>
                        options={[
                            {
                                label: createNew,
                                value: 'create-new',
                                color: 'var(--main-color)',
                                icon: (
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path
                                            d="M5 0.916992V9.08366"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M0.916016 5H9.08268"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                ),
                            },
                            ...unattachedEvents,
                        ]}
                        value={getIncentiveSelectValue()}
                        onChange={(option) => {
                            if (option) {
                                if (option.value === 'create-new') {
                                    adminPanelModel.events.adminModalToggled({
                                        entity: 'incentive',
                                        mode: 'create',
                                        onIncentiveSuccess: (incentive) => {
                                            setCacheFeedFormValues({
                                                [FeedFields.incentive]: { id: incentive.id },
                                            });

                                            adminPanelModel.events.adminModalToggled({
                                                entity: 'feed',
                                                mode: adminModal.mode,
                                                entityIdToBeManage: adminModal.entityIdToBeManage,
                                                onIncentiveSuccess: undefined,
                                            });
                                        },
                                    });
                                } else {
                                    f.setFieldValue(FeedFields.incentive, { id: option.value });
                                }
                            }
                        }}
                        onBlur={() => f.setFieldTouched(FeedFields.incentive)}
                        size="md"
                    />
                </label>

                {f.touched[FeedFields.incentive] && f.errors[FeedFields.incentive] && (
                    <ErrorMessage>{f.errors[FeedFields.incentive]}</ErrorMessage>
                )}
            </div>

            <div className="field field--fill-width">
                <label>
                    <span>RSS link</span>

                    <Input
                        {...f.getFieldProps(FeedFields.url)}
                        size="lg"
                        hasError={Boolean(f.touched[FeedFields.url] && f.errors[FeedFields.url])}
                        onChange={(newValue: string) => {
                            f.setFieldValue(FeedFields.url, newValue);
                            setCacheFeedFormValues({
                                [FeedFields.url]: newValue,
                            });
                        }}
                        placeholder="URL"
                    />
                </label>

                {f.touched[FeedFields.url] && f.errors[FeedFields.url] && (
                    <ErrorMessage>{f.errors[FeedFields.url]}</ErrorMessage>
                )}
            </div>

            <div className="field">
                <label>
                    <span>{t(FeedFields.pollCount)}</span>

                    <Input
                        {...f.getFieldProps(FeedFields.pollCount)}
                        size="lg"
                        hasError={Boolean(f.touched[FeedFields.pollCount] && f.errors[FeedFields.pollCount])}
                        onChange={(newValue: string) => {
                            f.setFieldValue(FeedFields.pollCount, newValue);
                            setCacheFeedFormValues({
                                [FeedFields.pollCount]: newValue,
                            });
                        
                        }}
                    />
                </label>

                {f.touched[FeedFields.pollCount] && f.errors[FeedFields.pollCount] && (
                    <ErrorMessage>{f.errors[FeedFields.pollCount]}</ErrorMessage>
                )}
            </div>

            <div className="field">
                <label className="feed-field__label">
                    <span>{t(FeedFields.period)}</span>

                    <Select
                        options={[
                            {
                                label: String(i18n.t(FeedPeriod.week)),
                                value: FeedPeriod.week,
                            },
                            {
                                label: String(i18n.t(FeedPeriod.day)),
                                value: FeedPeriod.day,
                            },
                        ]}
                        value={f.values.period}
                        onChange={(option) => {
                            if (option) {
                                f.setFieldValue(FeedFields.period, option);

                                setCacheFeedFormValues({
                                    [FeedFields.period]: option,
                                });
                            }
                        }}
                        onBlur={() => f.setFieldTouched(FeedFields.period)}
                        size="md"
                    />
                </label>

                {f.touched[FeedFields.period] && f.errors[FeedFields.period] && (
                    <ErrorMessage>{f.errors[FeedFields.period]}</ErrorMessage>
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
                    }}
                >
                    {translateModals('cancel')}
                </Button>

                <Button size="sm" appearance="primary" type="submit">
                    {f.isSubmitting ? (
                        <Loader width={16} />
                    ) : (
                        `${adminModal.mode === 'create'
                            ? translateModals('create-feed')
                            : translateModals('apply')
                        }`
                    )}
                </Button>
            </FlexboxGrid>
        </form>
    );
})`
    ${styles}
`;
