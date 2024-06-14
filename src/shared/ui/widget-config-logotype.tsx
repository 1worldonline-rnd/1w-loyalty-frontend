/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { widgetConfigModel } from '@/entities/widget-config';
import { PropsWithClassName } from '@/shared/utility-types';

/**
 * @description the partner can set his own logo in the widget settings
 * @type {WidgetConfig.settings.imageLogo} will be displayed in his widget
 */
export const WidgetConfigLogotype = styled(({ className }: PropsWithClassName) => {
    const globalWidgetConfig = useStore(widgetConfigModel.stores.$globalWidgetConfig);

    if (globalWidgetConfig?.settings.imageLogo || globalWidgetConfig?.settings.logoPointSrc) {
        return (
            <div className={className}>
                <img
                    src={
                        globalWidgetConfig.settings.imageLogo
                            ? globalWidgetConfig.settings.imageLogo
                            : globalWidgetConfig.settings.logoPointSrc
                    }
                    height="68"
                    width="68"
                    alt="Logotype"
                />
            </div>
        );
    }
    return null;
})`
    width: 68px;
    height: 68px;
    box-shadow: 1px 2px 20px -10px rgba(0, 0, 0, 0.22), 1px 2px 58px -20px rgba(0, 0, 0, 0.28);
    border-radius: 50%;
    margin-inline: auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 80%;
        height: 80%;
    }
`;
