import { CSSProperties } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import Link from 'next/link';
import { Transition, TransitionStatus } from 'react-transition-group';
import { useTranslation } from 'next-i18next';
import { styles } from './styles';
import { DotsIcon } from '@/shared/ui/icons';
import { Route } from '@/shared/constants';
import { appModel } from '@/entities/app';
import { userModel } from '@/entities/user';
import { ClickOutside } from '@/shared/ui';
import { useCustomRouter } from '@/shared/hooks';
import { widgetConfigModel } from '@/entities/widget-config';
import { IconButton } from '@/shared/rsuite/loyalty-platform';
import { PropsWithClassName } from '@/shared/utility-types';
import { amplitudeLogEvent } from '@/shared/lib/amplitudeProvider';
import { isAvailableLocalStorage } from '@/shared/lib/isAvailableLocalStorage';

type MenuLinks = Array<{ i18nKeyForLabel: string; href: string; redirectToTheWorld?: boolean }>;

const transitionStyles: { [key in TransitionStatus]?: CSSProperties } = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
};

const closeMenu = () => appModel.events.menuClosed();

const loyaltyFeaturesLinks: MenuLinks = [
    { i18nKeyForLabel: 'link-to-home', href: Route.earn },
    //     { i18nKeyForLabel: 'link-to-spend', href: Route.spend },
    { i18nKeyForLabel: 'link-to-activity-history', href: Route.earningHistory },
];

const adminLinks: MenuLinks = [
    { i18nKeyForLabel: 'link-to-admin-panel', href: Route.admin.widgets },
    // {
    //     i18nKeyForLabel: 'link-to-portal',
    //     href: process.env.NEXT_PUBLIC_PORTAL_URL,
    //     redirectToTheWorld: true,
    // },
];

export const Menu = styled(({ className }: PropsWithClassName) => {
    const { t } = useTranslation('common', { keyPrefix: 'burger-menu' });

    const { urlSearchParams, push, route } = useCustomRouter();
    const isMenuOpen = useStore(appModel.stores.$isMenuOpen);
    const isAdminPanelAvailable = useStore(userModel.stores.$isAdminPanelAvailable);
    const globalWidgetConfigId = useStore(widgetConfigModel.stores.$globalWidgetConfigId);
    const userMenuSettings = useStore(widgetConfigModel.stores.$userMenuSettings);
    const isAppEmbedded = useStore(appModel.stores.$parentPageUrl);
    const partnerExternalId = useStore(widgetConfigModel.stores.$globalWidgetConfig)?.partner.guid;

    const handleLogOut = () => {
        if (isAvailableLocalStorage()) {
            localStorage.removeItem('1w_device_identifier');
        }
        userModel.effects.logoutFx();
        closeMenu();
    };

    const showAdminLinks = isAdminPanelAvailable && !isAppEmbedded;
    const showLoyaltyFeaturesLinks = isAppEmbedded && globalWidgetConfigId;

    const startProductTour = () => {
        appModel.events.toggleOnboarding({ toggle: true, isInitial: false });

        if (Route.earn !== route && Route.redemption !== route) {
            push({ pathname: Route.earn });
        }

        sendStartTourEvent();
        closeMenu();
    };

    const sendStartTourEvent = () => {
        const eventData = {
            initial_tour: false,
            recall_page: window.location.href,
            partner_id: partnerExternalId,
        };

        amplitudeLogEvent('start_product_tour_click', eventData);
    };

    const isDisplayUserMenu = () => {
        return (
            userMenuSettings?.isShowHome ||
            userMenuSettings?.isShowActivityHistory ||
            userMenuSettings?.isShowAccountSettings ||
            userMenuSettings?.isShowProductTour ||
            userMenuSettings?.isShowLogout
        );
    };

    return isDisplayUserMenu() ? (
        <div className={className}>
            <ClickOutside onClickOutside={appModel.events.menuClosed}>
                <IconButton
                    className="open-menu-btn"
                    icon={<DotsIcon />}
                    circle
                    onClick={() => appModel.events.switchedIsMenuOpen()}
                    size="md"
                />

                <Transition
                    in={isMenuOpen}
                    timeout={{
                        appear: 0,
                        enter: 0,
                        exit: 200,
                    }}
                    unmountOnExit
                >
                    {(state) => (
                        <ul
                            className="menu"
                            style={{
                                ...transitionStyles[state],
                            }}
                        >
                            {showLoyaltyFeaturesLinks && (
                                <>
                                    {loyaltyFeaturesLinks.map(({ href, i18nKeyForLabel }) => {
                                        if (i18nKeyForLabel === 'link-to-home') {
                                            return userMenuSettings?.isShowHome ? (
                                                <li key={href} className="mapped-link">
                                                    <Link href={{ pathname: href, query: urlSearchParams }}>
                                                        <a onClick={closeMenu}>{t(i18nKeyForLabel)}</a>
                                                    </Link>
                                                </li>
                                            ) : (
                                                <></>
                                            );
                                        }
                                        if (i18nKeyForLabel === 'link-to-activity-history') {
                                            return userMenuSettings?.isShowActivityHistory ? (
                                                <li key={href} className="mapped-link">
                                                    <Link href={{ pathname: href, query: urlSearchParams }}>
                                                        <a onClick={closeMenu}>{t(i18nKeyForLabel)}</a>
                                                    </Link>
                                                </li>
                                            ) : (
                                                <></>
                                            );
                                        }
                                        return (
                                            <li key={href} className="mapped-link">
                                                <Link href={{ pathname: href, query: urlSearchParams }}>
                                                    <a onClick={closeMenu}>{t(i18nKeyForLabel)}</a>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </>
                            )}

                            {showAdminLinks &&
                                adminLinks.map(({ href, i18nKeyForLabel, redirectToTheWorld }) => (
                                    <li key={href}>
                                        <Link
                                            href={{
                                                pathname: href,
                                                query: redirectToTheWorld ? {} : urlSearchParams,
                                            }}
                                        >
                                            <a
                                                onClick={closeMenu}
                                                target={redirectToTheWorld ? '_blank' : undefined}
                                            >
                                                {t(i18nKeyForLabel)}
                                            </a>
                                        </Link>
                                    </li>
                                ))}

                            {userMenuSettings?.isShowAccountSettings && (
                                <li>
                                    <Link href={{ pathname: Route.account, query: urlSearchParams }}>
                                        <a onClick={closeMenu}>{t('link-to-account-settings')}</a>
                                    </Link>
                                </li>
                            )}

                            {userMenuSettings?.isShowProductTour && (
                                <li>
                                    <button onClick={startProductTour}>{t('link-to-product-tour')}</button>
                                </li>
                            )}
                            {/* <li>
                                <Link href={{ pathname: Route.faq, query: urlSearchParams }}>
                                    <a onClick={closeMenu}>FAQ</a>
                                </Link>
                            </li> */}
                            {userMenuSettings?.isShowLogout && (
                                <li>
                                    <button onClick={handleLogOut}>{t('log-out-button')}</button>
                                </li>
                            )}
                        </ul>
                    )}
                </Transition>
            </ClickOutside>
        </div>
    ) : (
        <></>
    );
})`
    ${styles}
`;
