// eslint-disable-next-line @next/next/no-document-import-in-page
import Head from 'next/head';
import { useStore } from 'effector-react';
import { widgetConfigModel } from '@/entities/widget-config';

export const FontFamily = () => {
    const globalWidgetConfig = useStore(widgetConfigModel.stores.$globalWidgetConfig);
    const fontFamily = globalWidgetConfig?.settings.fontFamily || 'Manrope';

    return (
        <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link
                // eslint-disable-next-line max-len
                href={`https://fonts.googleapis.com/css2?family=${fontFamily}:wght@300;400;500;600;700&display=swap`}
                rel="stylesheet"
            />
        </Head>
    );
};
