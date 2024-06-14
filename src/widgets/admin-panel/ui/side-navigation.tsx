import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import Link from 'next/link';
import classNames from 'classnames';
import { FlexboxGrid } from 'rsuite';
import { useStore } from 'effector-react';
import type { PropsWithClassName } from '@/shared/utility-types';
import { Route } from '@/shared/constants';
import { useCustomRouter } from '@/shared/hooks';
import * as icons from './icons';
import { AdminModal } from '@/entities/admin-panel/model/types';
import { adminPanelModel } from '@/entities/admin-panel';
import {
    BriefcaseIcon,
    FeedsIcon,
    HowToManageIcon,
    HrefIcon,
    PreferencesIcon,
    SequencesIcon,
    ToolsIcon,
    NftCollectionIcon,
    NftWidgetIcon,
} from '@/shared/ui/icons';
import { userModel } from '@/entities/user';

type SideNavigationLink = {
    Icon: () => JSX.Element;
    key: string;
    href: string;
    hasCreationButton?: boolean;
    withWhichEntityModalOpens?: AdminModal['entity'];
};

const links: SideNavigationLink[] = [
    {
        Icon: icons.PagesIcon,
        key: 'pages',
        href: Route.admin.widgets,
        withWhichEntityModalOpens: 'loyalty page',
    },
    {
        Icon: icons.StatisticIcon,
        key: 'statistic',
        href: Route.admin.statistic(),
        hasCreationButton: false,
    },
    {
        Icon: icons.IncentivesIcon,
        key: 'incentives',
        href: Route.admin.events,
        withWhichEntityModalOpens: 'incentive',
    },
    {
        Icon: icons.CustomRewardsIcon,
        key: 'rewards',
        href: Route.admin.rewards,
        withWhichEntityModalOpens: 'rewards',
    },
    {
        Icon: FeedsIcon,
        key: 'feeds',
        href: Route.admin.feed,
        withWhichEntityModalOpens: 'feed',
    },
    {
        Icon: SequencesIcon,
        key: 'sequences',
        href: Route.admin.sequences,
        hasCreationButton: false,
    },
    {
        Icon: icons.CatalogsIcon,
        key: 'catalogs',
        href: Route.admin.catalogs,
        withWhichEntityModalOpens: 'catalog',
    },
    {
        Icon: icons.BasketIcon,
        key: 'products',
        href: Route.admin.products,
        withWhichEntityModalOpens: 'product',
    },
    {
        Icon: PreferencesIcon,
        key: 'preferences',
        href: Route.admin.preferences(),
        hasCreationButton: false,
    },
    {
        Icon: ToolsIcon,
        key: 'tools',
        href: Route.admin.tools(),
        hasCreationButton: false,
    },
    {
        Icon: icons.CollectionsIcon,
        key: 'collections',
        href: Route.admin.collections,
        withWhichEntityModalOpens: 'collection',
    },
];

export const openCreationModal = (entity?: AdminModal['entity']) => {
    if (entity) {
        adminPanelModel.events.adminModalToggled({
            isOpen: true,
            entity,
            mode: 'create',
        });
    }
};

export const SideNavigation = styled(({ className }: PropsWithClassName) => {
    const { urlSearchParams, pathname } = useCustomRouter();
    const loyaltyPartner = useStore(userModel.stores.$loyaltyPartner);

    const { t } = useTranslation('common', { keyPrefix: 'sideNavigation' });

    return (
        <aside className={className}>
            <div>
                <div>
                    <h1 className="title">
                        {t('loyalty-program')} <sup>Beta</sup>
                    </h1>
                    {loyaltyPartner?.name && (
                        <p className="user-info__partner-name">
                            <BriefcaseIcon /> <span>{loyaltyPartner?.name}</span>
                        </p>
                    )}
                </div>

                <nav>
                    <ul className="navigation">
                        {links.map((link, index) => {
                            const {
                                Icon,
                                href,
                                key,
                                hasCreationButton = true,
                                withWhichEntityModalOpens,
                            } = link;

                            return (
                                <li
                                    key={index}
                                    className="navigation__item"
                                    data-active={Boolean(pathname.includes(href))}
                                >
                                    <Link href={{ pathname: href, query: urlSearchParams }}>
                                        <a
                                            className={classNames('navigation__link', {
                                                'navigation__link--active': Boolean(pathname.includes(href)),
                                            })}
                                        >
                                            <div>
                                                <Icon />
                                            </div>
                                            {t(key)}
                                        </a>
                                    </Link>

                                    {hasCreationButton && withWhichEntityModalOpens && (
                                        <FlexboxGrid
                                            className="navigation__btn-create-entity"
                                            as="button"
                                            align="middle"
                                            justify="center"
                                            onClick={() => openCreationModal(withWhichEntityModalOpens)}
                                        >
                                            <icons.PlusIcon />
                                        </FlexboxGrid>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            <div className="position-fixed">
                <nav>
                    <ul className="bottom-navigation">
                        <li className="navigation__item">
                            <Link href="https://scribehow.com/page/Loyalty_Program_Admin_panel__twfwkjZLQl-1rM-IzVraJA">
                                <a
                                    target="_blank"
                                    className={classNames('navigation__link bottom_navigation__link', {})}
                                >
                                    <div className={'manage-icon'}>
                                        <HowToManageIcon />
                                    </div>
                                    <span>How to Manage Loyalty Program</span>
                                    <div>
                                        <HrefIcon />
                                    </div>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
})`
    padding: 24px 26px 24px 0;
    border-inline-end: 1px solid var(--grey-5-color);
    display: grid;
    align-content: space-between;

    .title {
        color: var(--text-dark-color);
        font-weight: 600;
        font-size: 20px;
        white-space: nowrap;
        margin-block-end: 12px;

        sup {
            background-color: var(--info-color);
            border-radius: 2px;
            color: #fff;
            text-transform: uppercase;
            font-weight: 700;
            font-size: 10px;
            padding: 1.5px 3px;
        }
    }

    .user-info__partner-name {
        color: var(--grey-1-color);
        display: flex;
        align-items: center;
        margin-block-end: 13px;

        svg {
            margin-inline-end: 2px;
        }
        span {
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
            color: var(--grey-9-color);
        }
    }

    .navigation {
        display: grid;
        gap: 8px;

        &__item {
            position: relative;

            &:hover {
                .navigation__link {
                    background-color: var(--grey-8-color);
                }

                .navigation__btn-create-entity {
                    opacity: 1;
                }
            }

            &[data-active='true'] .navigation__link {
                background-color: var(--grey-7-color);
                color: var(--text-dark-color);
            }
        }

        &__btn-create-entity {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            opacity: 0;
            border: 1px solid var(--grey-2-color);
            color: var(--grey-2-color);
            border-radius: 4px;
            padding: 5px;
            background-color: transparent;
            outline: none;
            margin-inline-start: 5px;

            &:focus,
            &:focus-visible {
                opacity: 1;
            }

            &:hover,
            &:focus,
            &:focus-visible {
                background-color: var(--main-color);
                border-color: var(--main-color);
                color: #fff;
            }
        }

        &__link {
            font-weight: 600;
            font-size: 18px;
            line-height: 20px;
            display: flex;
            align-items: center;
            color: var(--text-default-color);
            padding: 12px 20px 12px 16px;
            text-decoration: none;
            border-radius: 5px;
            outline: none;

            &--active {
                color: var(--text-dark-color);
            }

            div {
                width: 24px;
                height: 24px;
                display: grid;
                place-items: center;
                margin-inline-end: 16px;

                svg {
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }
    .position-fixed {
        position: fixed;
        bottom: 29px;
        left: 36px;
        width: 243px;
        .bottom-navigation {
            .navigation__link {
                display: flex;
                gap: 13px;
                padding: 12px;
                background-color: var(--grey-8-color);
                color: var(--text-light-color);
                font-size: 16px;
                transition: all 0.2s ease;
                &:hover {
                    color: var(--text-dark-color);
                    .div {
                        svg {
                            color: var(--text-dark-color);
                        }
                    }
                }
                div {
                    margin-inline-end: 0;
                }
            }
            .manage-icon {
                width: 38px;
                height: 38px;
                svg {
                    width: 38px;
                    height: 38px;
                }
            }
        }
    }
`;
