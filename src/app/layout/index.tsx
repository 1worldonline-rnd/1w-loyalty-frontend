import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useStore } from 'effector-react';
import { LoyaltyPlatformHeader } from '@/widgets/loyalty-platform-header';
import { Container } from '@/shared/ui';
import { userModel } from '@/entities/user';
import { appModel } from '@/entities/app';
// import { PageLoader } from './page-loader';
import { AppLoader } from './app-loader';
import { FontFamily } from './font-family';

type LayoutProps = PropsWithChildren<{ className?: string }>;

export const Layout = styled(({ children, className }: LayoutProps) => {
    const { pathname } = useRouter();
    const isAdminPage = pathname.includes('admin');

    const isAuthorized = useStore(userModel.stores.$isAuthorized);
    const isAppEmbedded = useStore(appModel.stores.$parentPageUrl);

    if (pathname === '/') {
        return <>{children}</>;
    }
    return (
        <>
            {!isAdminPage && <FontFamily />}
            {/*
                if app embedded, then application in iframe
                so that the elements do not go beyond the iframe
                to the site where the application is integrated
                we set `overflow: hidden` for `body`
            */}
            {isAppEmbedded && (
                <style global jsx>{`
                    body {
                        overflow: hidden;
                    }

                    ::-webkit-scrollbar {
                        width: ${!isAdminPage ? '0 !important' : '15px'};
                        min-width: ${!isAdminPage ? '0 !important' : '15px'};
                        max-width: ${!isAdminPage ? '0 !important' : '15px'};
                        min-height: ${!isAdminPage ? '0 !important' : '15px'};
                        max-height: ${!isAdminPage ? '0 !important' : '15px'};
                    }
                `}</style>
            )}
            <div
                className={classNames(className, {
                    'window-height': !isAppEmbedded,
                    'loyalty-platform-page': isAuthorized && !isAdminPage,
                })}
                id="layout"
            >
                <AppLoader show={isAuthorized === null} />

                {isAuthorized && !isAdminPage && <LoyaltyPlatformHeader />}

                <Container
                    htmlElement="main"
                    enablePadding={isAdminPage}
                    maxWidth={isAdminPage ? '100%' : undefined}
                    enabledOverflow={pathname === '/earning-history' ? true : false}
                >
                    {children}
                </Container>
            </div>
        </>
    );
})`
    display: grid;
    grid-template-rows: 1fr;
    // grid-template-rows: 4px 1fr;

    &.loyalty-platform-page {
        grid-template-rows: auto 1fr;
        // grid-template-rows: 4px auto 1fr;

        main {
            padding-block-end: 40px;
        }
    }

    &.window-height {
        min-height: 100vh;
    }

    main,
    main > * {
        height: 100%;
    }
`;
