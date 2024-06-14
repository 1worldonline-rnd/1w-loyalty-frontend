import { useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import { useStore } from 'effector-react';
import { useTranslation } from 'next-i18next';
import { isEqual, cloneDeep } from 'lodash';
import { PayloadToUpdateWidgetConfig, WidgetConfigSocialKey } from '@/shared/api/widget-config/types';
import { widgetConfigModel } from '@/entities/widget-config';
import { eventsModel } from '@/entities/events';
import { feedModel } from '@/entities/feed';
import { userModel } from '@/entities/user';
import { showMessage } from '@/shared/lib/messages';
import { useEarnManagerFormValidationSchema } from './useEarnManagerFormValidationSchema';
import { EarnSocialValues, EarnValues } from '../types';
import { earnFormSubmitted } from '@/entities/feed/model/events';

const initialSocials = Object.keys(WidgetConfigSocialKey).reduce<EarnSocialValues>((socials, socialName) => {
    socials[socialName as WidgetConfigSocialKey] = {
        checked: false,
        url: '',
    };
    return socials;
}, {});

const $feedOptions = feedModel.stores.$feeds.map((feeds) => {
    return feeds.map((feed) => ({
        label: feed.name,
        value: feed.id,
    }));
});

export const useEarnManagerForm = () => {
    const activeWidgetConfig = useStore(widgetConfigModel.stores.$activeWidgetConfig);
    const unattachedEvents = useStore(eventsModel.stores.$unattachedEvents);
    const events = useStore(eventsModel.stores.$events);
    const feeds = useStore(feedModel.stores.$feeds);
    const feedOptions = useStore($feedOptions);
    const partnerId = useStore(userModel.stores.$partnerId);

    const { t } = useTranslation('common', { keyPrefix: 'loyalty-widgets' });

    const { validationSchema } = useEarnManagerFormValidationSchema();

    const handleSubmit = async (values: EarnValues) => {
        if (activeWidgetConfig) {
            earnFormSubmitted();

            const payload: PayloadToUpdateWidgetConfig = {
                ...cloneDeep(activeWidgetConfig),
                socialMedia: {},
            };

            Object.entries(values.socials).forEach(([key, { checked, url, eventId }]) => {
                if (checked && eventId && url) {
                    payload.socialMedia[key as WidgetConfigSocialKey] = {
                        url,
                        incentive: {
                            id: eventId,
                        },
                    };
                } else {
                    payload.socialMedia[key as WidgetConfigSocialKey] = {};
                }
            });

            if (values.feed.checked && values.feed.feedId) {
                payload.partnerFeed = values.feed.feedId;
            } else {
                delete payload.partnerFeed;
            }

            const { status } = await widgetConfigModel.effects.updateWidgetConfigFx(payload);

            if (status === 200) {
                showMessage(t('message-if-widget-successfully-updated'));
            }
        }
    };

    const form = useFormik({
        initialValues: {
            socials: cloneDeep(initialSocials),
            feed: {
                checked: false,
            },
        },
        onSubmit: handleSubmit,
        validationSchema,
    });

    const { setValues, values, setTouched } = form;

    const areValuesChanged = useMemo(() => {
        if (activeWidgetConfig) {
            const { socialMedia, partnerFeed } = activeWidgetConfig;

            const currentSocials = Object.entries(socialMedia).reduce<EarnSocialValues>((socials, social) => {
                const [key, { incentive, url = '' }] = social;

                socials[key as WidgetConfigSocialKey] = {
                    checked: !!incentive && !!url,
                    url,
                    eventId: incentive.id,
                };

                return socials;
            }, {});

            const changeableSocials = Object.entries(values.socials).reduce<EarnSocialValues>(
                (socials, social) => {
                    const [key, { url, eventId, checked }] = social;

                    if (checked && eventId && url) {
                        socials[key as WidgetConfigSocialKey] = {
                            checked,
                            url,
                            eventId,
                        };
                    }

                    return socials;
                },
                {}
            );

            const areObjectsEqual = isEqual(currentSocials, changeableSocials);

            return (
                Boolean(partnerFeed) !== values.feed.checked ||
                partnerFeed !== values.feed.feedId ||
                !areObjectsEqual
            );
        }
        return false;
    }, [activeWidgetConfig, values]);

    useEffect(() => {
        if (!feeds && partnerId) {
            feedModel.effects.getFeedsFx(partnerId);
        }
    }, [feeds, partnerId]);

    useEffect(() => {
        if (activeWidgetConfig) {
            const values: EarnValues = {
                socials: cloneDeep(initialSocials),
                feed: {
                    checked: Boolean(activeWidgetConfig.partnerFeed),
                },
            };
            // set EarnValues['feed']
            if (activeWidgetConfig.partnerFeed) {
                values.feed.feedId = activeWidgetConfig.partnerFeed;
            }

            Object.entries(activeWidgetConfig.socialMedia).forEach(([key, { incentive, url = '' }]) => {
                if (incentive.id && url) {
                    values.socials[key as WidgetConfigSocialKey] = {
                        checked: !!incentive && !!url,
                        url,
                        eventId: incentive.id,
                    };
                }
            });

            setValues(values);
            setTouched({});
        }
    }, [activeWidgetConfig, setValues, setTouched]);

    useEffect(() => {
        return () => {
            if (partnerId) {
                eventsModel.effects.getEventsFx(partnerId);
            }
        };
    }, [partnerId]);

    const socials = Object.entries(form.values.socials);

    return { form, socials, unattachedEvents, events, areValuesChanged, feedOptions };
};
