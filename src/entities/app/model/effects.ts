import { createEffect } from 'effector';
import { axios } from '@/shared/lib/axios';
import { WidgetConfig } from '@/shared/api/widget-config/types';
import { getDeviceType } from '@/shared/lib/deviceType';

export const trackInitializationEventFx = createEffect(
    ({
        loyaltyWidgetId,
        windowParentUrl,
    }: {
        loyaltyWidgetId: WidgetConfig['guid'];
        windowParentUrl: string;
    }) => {
        return axios.post('/event/view/track', {
            entity: { id: loyaltyWidgetId, type: 'loyalty_widget' },
            location: windowParentUrl,
            deviceType: getDeviceType(),
        });
    }
);
