import styled from 'styled-components';
import { FlexboxGrid } from 'rsuite';
import { FormikErrors, FormikTouched } from 'formik';
import { useTranslation } from 'next-i18next';
import { styles } from './styles';
import { PropsWithClassName, Nullable } from '@/shared/utility-types';
import {
    YouTubeIcon,
    TwitterIcon,
    FacebookIcon,
    InstagramIcon,
    TelegramIcon,
    TikTokIcon,
    DiscordIcon,
    FlipboardIcon,
    CMCIcon,
    LinkedInIcon,
} from '@/shared/ui/icons';
import { useEarnManagerForm } from '../hooks/useEarnManagerForm';
import { WidgetConfigSocialKey } from '@/shared/api/widget-config/types';
import { ErrorMessage, Loader } from '@/shared/ui';
import { EventOption } from '@/entities/events/model/types';
import { eventsModel } from '@/entities/events';
import { Event } from '@/shared/api/event/types';
import { EarnSocialValue } from '../types';
import { Select, Toggle, Button, Input } from '@/shared/rsuite/admin-panel';
import type { BaseOption } from '@/shared/rsuite/admin-panel/select';
import { adminPanelModel } from '@/entities/admin-panel';
import { FeedListCreation } from './feed-list-creation';
import { useEffect, useState } from 'react';
import { getWidgetFeedRelationsFx } from '@/entities/feed/model/effects';
import { widgetConfigModel } from '@/entities/widget-config';
import { useStore } from 'effector-react';
import { userModel } from '@/entities/user';
import { getCollectionRelationsFx } from '@/entities/collection/model/effects';
import { collectionModel } from '@/entities/collection';

const icons: Record<string, () => JSX.Element> = {
    instagram: InstagramIcon,
    twitter: TwitterIcon,
    facebook: FacebookIcon,
    telegram: TelegramIcon,
    youtube: YouTubeIcon,
    tikTok: TikTokIcon,
    discord: DiscordIcon,
    flipBoard: FlipboardIcon,
    cmc: CMCIcon,
    linkedIn: LinkedInIcon,
};

const getSelectedValue = (event?: Event): Nullable<EventOption> => {
    if (event) {
        return {
            label: event.name,
            value: event.id,
        };
    }
    return null;
};

export const EarnManager = styled(({ className }: PropsWithClassName) => {
    const { form: f, socials, unattachedEvents, events, areValuesChanged } = useEarnManagerForm();

    const { t } = useTranslation('common', { keyPrefix: 'loyalty-widgets.editing' });
    const createNew = t('create-new');
    const [feedListIsChanged, setFeedListIsChanged] = useState(false);
    const activeWidgetConfig = useStore(widgetConfigModel.stores.$activeWidgetConfig);
    const partnerId = useStore(userModel.stores.$partnerId);

    const onIncentiveSelect = (
        oldValue: Nullable<EventOption>,
        newValue: EventOption,
        socialName: string
    ) => {
        eventsModel.events.attachEvent(newValue.value);

        if (oldValue) {
            eventsModel.events.unattachEvent(oldValue);
        }

        if (newValue) {
            f.setFieldValue(`socials.${socialName}.eventId`, newValue.value);
        }
    };

    useEffect(() => {
        if (activeWidgetConfig?.guid && partnerId) {
            getWidgetFeedRelationsFx(activeWidgetConfig?.guid);
            getCollectionRelationsFx({ partnerId, widgetId: activeWidgetConfig?.guid });
        }
    }, [activeWidgetConfig, partnerId]);

    const feedListChanged = (param: boolean) => {
        setFeedListIsChanged(param);
    };

    useEffect(() => {
        if (partnerId && activeWidgetConfig) {
            collectionModel.effects.getCollectionsFx(partnerId);
        }
    }, [partnerId, activeWidgetConfig]);

    return (
        <div className={className}>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    f.handleSubmit();
                }}
            >
                <FeedListCreation onChanged={feedListChanged} />

                <section className="section-social">
                    <header>
                        <p className="setting-label">{t('social-media-checkbox-label')}</p>
                    </header>

                    {socials.map(([socialName, social]) => {
                        const labelText =
                            socialName === 'cmc'
                                ? 'CoinMarketCap'
                                : socialName.split('')[0].toUpperCase() + socialName.slice(1);
                        const Icon = icons[socialName];
                        const error = f.errors.socials?.[
                            socialName as WidgetConfigSocialKey
                        ] as FormikErrors<EarnSocialValue>;

                        const touched = f.touched.socials?.[
                            socialName as WidgetConfigSocialKey
                        ] as FormikTouched<EarnSocialValue>;

                        const valueSelect = getSelectedValue(
                            events.find(({ id }) => {
                                return id === social.eventId;
                            })
                        );
                        return (
                            <div className="field--social" key={socialName}>
                                <div className="field--social_top">
                                    <div className="field--social-icon">
                                        <Icon />
                                    </div>
                                    <label className="field">
                                        <FlexboxGrid justify="space-between">
                                            <div className="field--social-description">
                                                <h5 className="field__label field__label--lg">{labelText}</h5>
                                            </div>
                                            <Toggle
                                                checked={social.checked}
                                                onChange={(newValue) => {
                                                    f.setFieldValue(
                                                        `socials.${socialName}.checked`,
                                                        newValue
                                                    );
                                                }}
                                            />
                                        </FlexboxGrid>
                                    </label>
                                </div>

                                {social.checked && (
                                    <div className="subfields">
                                        <fieldset>
                                            <div className="field">
                                                <span className="field__label">
                                                    {t('social-link-field-label')}
                                                </span>
                                                <Input
                                                    placeholder={t('link-for-social-field-placeholer')}
                                                    size="lg"
                                                    disabled={!social.checked}
                                                    {...f.getFieldProps(`socials.${socialName}.url`)}
                                                    onChange={(newValue) => {
                                                        f.setFieldValue(
                                                            `socials.${socialName}.url`,
                                                            newValue
                                                        );
                                                    }}
                                                />
                                                <div className="error-wrapper">
                                                    {touched?.url && error?.url && (
                                                        <ErrorMessage>{error.url}</ErrorMessage>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="field" style={{ minWidth: '145px' }}>
                                                <span className="field__label">
                                                    {t('social-incentive-field-label')}
                                                </span>
                                                <Select<BaseOption>
                                                    placeholder={t('event-select-field-placeholer')}
                                                    size="md"
                                                    options={[
                                                        {
                                                            label: createNew,
                                                            value: 'create-new',
                                                            color: 'var(--main-color)',
                                                            icon: (
                                                                <svg
                                                                    width="10"
                                                                    height="10"
                                                                    viewBox="0 0 10 10"
                                                                    fill="none"
                                                                >
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
                                                    isDisabled={!social.checked}
                                                    onChange={(option) => {
                                                        if (option) {
                                                            if (option.value === 'create-new') {
                                                                adminPanelModel.events.adminModalToggled({
                                                                    entity: 'incentive',
                                                                    mode: 'create',
                                                                    isOpen: true,
                                                                    onIncentiveSuccess: ({ id, name }) => {
                                                                        onIncentiveSelect(
                                                                            valueSelect,
                                                                            {
                                                                                label: name,
                                                                                value: id,
                                                                            },
                                                                            socialName
                                                                        );
                                                                        // eslint-disable-next-line max-len
                                                                        adminPanelModel.events.adminModalToggled(
                                                                            {
                                                                                isOpen: false,
                                                                                onIncentiveSuccess: undefined,
                                                                            }
                                                                        );
                                                                    },
                                                                });
                                                            } else {
                                                                onIncentiveSelect(
                                                                    valueSelect,
                                                                    option,
                                                                    socialName
                                                                );
                                                            }
                                                        }
                                                    }}
                                                    value={valueSelect}
                                                    onFocus={() => {
                                                        f.setFieldTouched(`socials.${socialName}.eventId`);
                                                    }}
                                                />
                                                <div className="error-wrapper">
                                                    {touched?.eventId && error?.eventId && (
                                                        <ErrorMessage>{error.eventId}</ErrorMessage>
                                                    )}
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </section>

                <br></br>

                <Button
                    appearance="primary"
                    size="md"
                    type="submit"
                    disabled={(!f.isValid || !areValuesChanged) && !feedListIsChanged}
                >
                    {f.isSubmitting ? <Loader /> : t('save-earn-button-submit')}
                </Button>
            </form>
        </div>
    );
})`
    ${styles}
`;
