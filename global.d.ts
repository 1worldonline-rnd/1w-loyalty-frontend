declare global {
    interface Window {
        ethereum?: {
            isMetaMask?: boolean;
            isStatus?: boolean;
            selectedAddress?: string;
            chainId?: string | number;
            host?: string;
            path?: string;
            sendAsync?: (
                request: { method: string; params?: Array<any> },
                callback: (error: any, response: any) => void
            ) => void;
            send?: (
                request: { method: string; params?: Array<any> },
                callback: (error: any, response: any) => void
            ) => void;
            request: (request: { method: string; params?: Array<any> }) => Promise<any>;
            on: (eventName: string, listener: (...args: any[]) => void) => void;
            off: (eventName: string, listener: (...args: any[]) => void) => void;
        };
    }
    namespace NodeJS {
        interface ProcessEnv {
            ENV: 'locale' | 'qa' | 'stage' | 'prod';
            NEXT_PUBLIC_API_URL: string;
            NEXT_PUBLIC_AUTH_BY_SOCIAL_REDIRECT_URL: string;
            NEXT_PUBLIC_LOYALTY_PLATFORM_URL: string;
            NEXT_PUBLIC_ETHERSCAN_IO_URL: string;
            NEXT_PUBLIC_PORTAL_URL: string;
            NEXT_PUBLIC_WELCOME_PAGE_URL: string;
            NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
            NEXT_PUBLIC_AMPLITUDE_API_KEY_LOYALTY_MEMBER: string;
            NEXT_PUBLIC_MICROSOFT_CLARITY: string;
            NEXT_PUBLIC_POLYGON_ID: number;
            NEXT_PUBLIC_CAMINO_ID: number;
            NEXT_PUBLIC_POLYGON_CRYPTO_SYSTEM_WALLET: string;
            NEXT_PUBLIC_CAMINO_CRYPTO_SYSTEM_WALLET: string;
            NEXT_PUBLIC_NFT_WIDGET_URL: string;
        }
    }

    namespace google.fonts {
        export interface WebfontFamily {
            category?: string;
            kind: string;
            family: string;
            subsets: string[];
            variants: string[];
            version: string;
            lastModified: string;
            files: Record<string, string>;
        }
        export interface WebfontList {
            kind: string;
            items: WebfontFamily[];
        }
    }
}

declare module 'styled-components' {
    export interface DefaultTheme {
        mode: 'light' | 'dark';
    }
}

export {};
