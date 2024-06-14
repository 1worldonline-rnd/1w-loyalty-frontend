import {
    CoinIcon,
} from '@/shared/ui/icons';
import { WidgetConfig } from '../api/widget-config/types';
import styled from 'styled-components';

export const whichCoinShow = (isScored: boolean, widgetConfig: WidgetConfig) => {
    const accentColor = widgetConfig?.settings.widgetColor || '#AAAAAA';
    let icon;

    if (widgetConfig?.settings?.imageLogo) {

        if (widgetConfig?.settings?.theme === 'dark') {
            icon = <img
                style={{
                    filter: isScored ? 'grayscale(100%) brightness(100%) contrast(200%) invert(100%)' : ''
                }}
                src={widgetConfig.settings.imageLogo}
                alt="coin" />
        } else {
            icon = <img
                style={{
                    filter: isScored ? 'grayscale(100%) brightness(100%) contrast(200%)' : ''
                }}
                src={widgetConfig.settings.imageLogo}
                alt="coin" />
        }

    } else if (!widgetConfig?.settings?.imageLogo && widgetConfig?.settings?.logoPointSrc) {

        if (!isScored) {
            icon = <img src={widgetConfig.settings.logoPointSrc} alt="coin" />
        } else {
            if (widgetConfig?.settings?.theme === 'dark') {
                icon = <img src={widgetConfig.settings.logoPointSrcDark} alt="coin" />
            } else {
                icon = <img src={widgetConfig.settings.logoPointSrcLight} alt="coin" />
            }
        }

    } else {
        icon = <IconStyled color={!isScored ? accentColor : ''} >
            <CoinIcon />
        </IconStyled>
    }

    return icon;
}

const IconStyled = styled.div`
    svg{
        color: ${({ color }) => ` ${color} !important`};
    }
`;
