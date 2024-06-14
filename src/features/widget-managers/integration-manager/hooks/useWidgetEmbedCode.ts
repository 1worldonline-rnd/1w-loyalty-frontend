/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { widgetConfigModel } from '@/entities/widget-config';

const loyaltyUrl = process.env.NEXT_PUBLIC_LOYALTY_PLATFORM_URL;
const portalUrl = process.env.NEXT_PUBLIC_PORTAL_URL;

const storageManagerEmbedCode = `
<meta name="1WO_UserDataStorageSolution" content="1">
<script src="${new URL('user-data-storage-solution-manager.js', portalUrl)}"></script>
<script>
    // if user is not apply
    OWOStorageSolutionManager.disable();
    // if user apply
    OWOStorageSolutionManager.allow();
</script>
`.trim();

export const useWidgetEmbedCode = () => {
    const activeWidgetConfig = useStore(widgetConfigModel.stores.$activeWidgetConfig);

    const [loyaltyWidgetEmbedCode, setLoyaltyWidgetEmbedCode] = useState('');
    const [trackerWidgetEmbedCode, setTrackerWidgetEmbedCode] = useState('');

    useEffect(() => {
        if (!activeWidgetConfig) {
            return;
        }
        const { guid } = activeWidgetConfig;

        setLoyaltyWidgetEmbedCode(
            `<div id="1WOLPWID" data-loyalty-widget-id="${guid}"></div>\n`
            + `<script defer src="${loyaltyUrl}/widget-constructor.js"></script>`
        );

        setTrackerWidgetEmbedCode(
            `<meta name="1WOLPWID-WIDGET-GUUD" content="${guid}">\n`
            + `<script defer src="${loyaltyUrl}/points-balance-widget.js"></script>`
        );
    }, [activeWidgetConfig]);

    return {
        trackerWidgetEmbedCode,
        loyaltyWidgetEmbedCode,
        storageManagerEmbedCode,
    };
};
