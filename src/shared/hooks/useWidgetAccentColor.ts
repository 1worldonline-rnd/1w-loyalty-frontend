import { widgetConfigModel } from '@/entities/widget-config';
import { useStore } from 'effector-react';

export const useWidgetAccentColor = () => {
    const widgetConfig = useStore(widgetConfigModel.stores.$globalWidgetConfig);
    const accentColor = widgetConfig?.settings.widgetColor || '#AAAAAA';

    return accentColor;
};
