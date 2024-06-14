import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { DefaultTheme, ServerStyleSheet } from 'styled-components';
import type { WidgetConfig } from '@/shared/api/widget-config/types';
import { API_URL } from '@/shared/constants';

class MyDocument extends Document<{ styleTags: React.ReactElement[]; theme: string; isAdmin?: boolean }> {
    static async getInitialProps(ctx: DocumentContext) {
        const { loyaltyWidgetId } = ctx.query;
        const isAdmin = ctx.req?.url?.includes('admin');

        let theme: DefaultTheme['mode'] = 'light';

        if (typeof loyaltyWidgetId === 'string' && loyaltyWidgetId) {
            const res = await fetch(`${API_URL}loyalty/widget/${loyaltyWidgetId}`);
            const widget = (await res.json()) as WidgetConfig;

            if (widget?.settings?.theme) {
                theme = widget.settings.theme;
            }
        }

        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () => {
                return originalRenderPage({
                    enhanceApp: (App) => (props) => {
                        return sheet.collectStyles(<App data-theme={theme} {...props} />);
                    },
                });
            };

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                theme,
                isAdmin,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        const { locale = 'en', theme, isAdmin } = this.props;

        return (
            <Html lang={locale}>
                <Head>
                    <link rel="shortcut icon" type="image/png" href="/loyalty/favicon.png" />
                    {this.props.styleTags}
                    {process.env.NEXT_PUBLIC_MICROSOFT_CLARITY && (
                        <script
                            type="text/javascript"
                            dangerouslySetInnerHTML={{
                                __html: `
                                    (function(c,l,a,r,i,t,y){
                                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                                    })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_MICROSOFT_CLARITY}");
                            `,
                            }}
                        />
                    )}
                </Head>
                <body data-theme={theme} data-admin-panel={Boolean(isAdmin)}>
                    <Main />
                    <NextScript />
                    <div id="draggable" />
                    <div id="joyride" />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
