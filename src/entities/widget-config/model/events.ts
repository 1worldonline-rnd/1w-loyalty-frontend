import { createEvent } from 'effector';
import { WidgetConfig, WidgetConfigSocialKey } from '@/shared/api/widget-config/types';

export const setActiveWidgetConfigId = createEvent<string>();

export const widgetConfigSocialWatched = createEvent<WidgetConfigSocialKey>();

export const setWidgetTheme = createEvent<WidgetConfig['settings']['theme']>();
