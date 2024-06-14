/* eslint-disable @typescript-eslint/no-var-requires */
const withLess = require('next-with-less');
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
module.exports = withLess({
    basePath: '/loyalty',
    assetPrefix: new URL('/loyalty', process.env.NEXT_PUBLIC_LOYALTY_PLATFORM_URL).toString(),
    lessLoaderOptions: {},
    reactStrictMode: true,
    poweredByHeader: false,
    i18n,
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
        };
        return config;
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                    {
                        key: 'X-1WO-Achieved',
                        value: new Date().toISOString(),
                    }
                ],
            }
        ];
    },
    async rewrites() {
        const LOYALTY_PLATFORM_URL = process.env.NEXT_PUBLIC_LOYALTY_PLATFORM_URL;
        const POINT_BALANCE_WIDGET_URL = process.env.NEXT_PUBLIC_POINT_BALANCE_WIDGET_URL;
    
        return [
            {
                source: '/widget-constructor.js',
                destination: new URL('/loyalty/widget-constructor.js', LOYALTY_PLATFORM_URL).toString(),
            },
            {
                source: '/oauth.html',
                destination: new URL('/loyalty/oauth.html', LOYALTY_PLATFORM_URL).toString(),
            },
            {
                source: '/points-balance-widget.js',
                destination: new URL('points-balance-widget.js', POINT_BALANCE_WIDGET_URL).toString(),
            },
            {
                source: '/',
                destination: new URL('/loyalty', LOYALTY_PLATFORM_URL).toString(),
            },
        ];
    },
});
