import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { Breadcrumb } from 'rsuite';
import { useStore } from 'effector-react';
import { usePageTitle } from '@/processes/layout/usePageTitle';
import { useProtectedRoute } from '@/processes/auth/useProtectedRoute';
import { AdminPanel, EntityListWithPushButton } from '@/widgets/admin-panel';
import {
    EarnManager,
    SpendManager,
    WidgetSettingsManager,
    IntegrationManager,
    SettingsManager,
} from '@/features/widget-managers';
import { widgetConfigModel } from '@/entities/widget-config';
import { eventsModel } from '@/entities/events';
import { userModel } from '@/entities/user';
import { Route } from '@/shared/constants';
import { useCustomRouter } from '@/shared/hooks';
import type { PropsWithClassName } from '@/shared/utility-types';
import { Tabs } from '@/shared/ui';
import { ArrowIcon } from '@/shared/ui/icons';
import { getRegularDateString } from '@/shared/lib/date';

// type InfoBoxProps = {
//     tab: string;
//     showInfo: boolean;
//     setShowInfo: (showInfo: boolean) => void;
// };

// const InfoBox = styled(({ className, tab, showInfo, setShowInfo }: PropsWithClassName<InfoBoxProps>) => {
//     const { t } = useTranslation('common', { keyPrefix: 'widget-managers-tabs' });
//     return (
//         <div className={className}>
//             <div className={classNames('info', { 'info--active': showInfo })}>
//                 <button onClick={() => setShowInfo(!showInfo)}>
//                     <InfoIcon />
//                 </button>
//                 {showInfo && (
//                     <>
//                         <div className="info-text">
//                             <h4>{t(`${tab}-info-title`)}</h4>
//                             {/* NO CONTENT TEXT */}
//                             {/* <p>{t(`${tab}-info-text`)}</p> */}
//                         </div>
//                         <button className="info-btn-close" onClick={() => setShowInfo(!showInfo)}>
//                             {t('hide')}
//                         </button>
//                         <span>{t('info-icon-caption')}</span>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// })`
//     .info {
//         position: relative;
//         height: min-content;
//         width: 50px;
//         display: flex;
//         flex-direction: column;
//         align-items: flex-end;
//         border-radius: 7px;
//         padding: 15px;
//         background-color: var(--grey-9-color);
//         color: var(--grey-1-color);

//         &--active {
//             width: 100%;
//             & button {
//                 margin-block-end: 16px;
//             }
//         }

//         &-btn-close {
//             position: absolute;
//             top: 16px;
//             left: 16px;
//         }

//         p {
//             margin: 0;
//             color: var(--grey-1-color);
//         }

//         span {
//             position: absolute;
//             top: 18px;
//             right: 42px;
//         }

//         h4 {
//             font-weight: 600;
//             font-size: 16px;
//             line-height: 19px;
//             margin-block-end: 5px;
//         }

//         button {
//             background-color: transparent;
//             padding: 0;
//         }

//         svg {
//             vertical-align: middle;
//             color: var(--grey-1-color);
//         }
//     }
// `;

enum Tab {
    earn = 'earn',
    integration = 'integration',
    widget = 'widget',
    spend = 'spend',
    settings = 'settings',
}

const useWidgetManagerTabs = () => {
    const components = {
        [Tab.spend]: SpendManager,
        [Tab.earn]: EarnManager,
        [Tab.widget]: WidgetSettingsManager,
        [Tab.integration]: IntegrationManager,
        [Tab.settings]: SettingsManager,
    };

    const [activeTab, setActiveTab] = useState<Tab>(Tab.earn);

    const { t } = useTranslation('common', { keyPrefix: 'widget-managers-tabs' });

    const tabs = [
        {
            label: t('spend'),
            key: Tab.spend,
        },
        {
            label: t('earn'),
            key: Tab.earn,
        },
        {
            label: t('widget'),
            key: Tab.widget,
        },
        {
            label: t('integration'),
            key: Tab.integration,
        },
        {
            label: t('settings'),
            key: Tab.settings,
        },
    ];

    return { setActiveTab, ActiveComponent: components[activeTab], tabs, activeTab };
};

const WidgetManagerPage: NextPage<PropsWithClassName> = ({ className }) => {
    const { query } = useRouter();

    const { ActiveComponent, setActiveTab, tabs, activeTab } = useWidgetManagerTabs();
    const { push, urlSearchParams, asPath } = useCustomRouter();
    const partnerId = useStore(userModel.stores.$partnerId);
    const widgetConfigs = useStore(widgetConfigModel.stores.$widgetConfigs);
    const router = useRouter();
    const currentWidget = widgetConfigs.find((widget) => widget.guid === router.query.widgetId);
    const currentTab = tabs.find((tab) => tab.key === activeTab);
    const { t, i18n } = useTranslation('common', { keyPrefix: 'widget-managers-tabs' });
    // const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        return () => {
            if (partnerId) {
                eventsModel.effects.getEventsFx(partnerId);
            }
        };
    }, [partnerId]);

    usePageTitle({ title: i18n.t('loyalty-widgets:loyalty-program-template-page-title') });

    useProtectedRoute({
        byAdminRights: true,
    });

    useEffect(() => {
        if (query.widgetId) {
            widgetConfigModel.events.setActiveWidgetConfigId(String(query.widgetId));
        }
    }, [query]);

    return (
        <AdminPanel>
            <div className={className}>
                <div className="side">
                    <h2 className="title">{t('link-to-loyalty-widgets')}</h2>

                    <EntityListWithPushButton
                        entityList={widgetConfigs.map((widget) => ({
                            id: widget.guid,
                            name: widget.name,
                        }))}
                        onPush={(id) => {
                            push({
                                pathname: Route.admin.widgetManager(String(id)),
                            });
                        }}
                    />
                </div>
                <div className="main">
                    <header className="header">
                        <div>
                            <h2>{currentWidget?.name}</h2>
                            {currentTab && currentWidget && (
                                <Breadcrumb
                                    separator={ArrowIcon({ isRotate: false })}
                                    className="breadcrumbs"
                                >
                                    <Breadcrumb.Item
                                        href={`${Route.admin.widgets}?partnerId=${urlSearchParams.partnerId}`}
                                        as={Link}
                                    >
                                        {t('loyalty-widgets')}
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item as="span">{currentWidget.name}</Breadcrumb.Item>
                                    <Breadcrumb.Item as="span">{currentTab.label}</Breadcrumb.Item>
                                </Breadcrumb>
                            )}
                        </div>
                        <div className="meta-info">
                            {currentWidget && (
                                <>
                                    {t('created')} {getRegularDateString(new Date(currentWidget.created))}
                                </>
                            )}
                        </div>
                    </header>

                    <Tabs activeTab={activeTab} data={tabs} onClickTab={(key) => setActiveTab(key as Tab)} />

                    <div className="settings-panel-wrapper">
                        {ActiveComponent && <ActiveComponent />}
                        {/* <aside> */}
                            {/* NO TEXT CONTENT */}
                            {/* <InfoBox tab={activeTab} showInfo={showInfo} setShowInfo={setShowInfo} /> */}
                        {/* </aside> */}
                    </div>
                </div>
            </div>
        </AdminPanel>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'features.collection'])),
    },
});

export default styled(WidgetManagerPage)`
    .rs-dropdown > ul.rs-dropdown-menu {
        height: auto;
        position: absolute;
        background: var(--rs-sidenav-default-bg);
        width: 100%;
        top: 100%;
        z-index: 1;
    }

    .rs-dropdown ul.rs-dropdown-menu li {
        margin: 0;
    }

    .nav-tabs {
        display: none;
    }

    display: grid;
    grid-template-columns: 20% 80%;
    height: 100%;

    aside {
        display: flex;
        justify-content: flex-end;
        width: 266px;
        padding: 18px 0;
    }

    .settings-panel-wrapper {
        display: grid;
        grid-template-columns: 7fr 2fr;
    }

    .header {
        display: flex;
        justify-content: space-between;
        margin-block-end: 28px;
        h2 {
            font-size: 22px;
            margin-block-end: 6px;
            color: var(--text-dark-color);
        }

        .breadcrumbs {
            margin: 0;
            display: flex;
            align-items: center;
            & svg {
                transform: rotate(270deg);
                vertical-align: middle;
            }

            & > * {
                font-size: 16px;
                line-height: 20px;
            }

            & > *:last-child {
                font-weight: 400;
            }
        }

        .meta-info {
            line-height: 17px;
            text-align: right;
        }

        .meta-info,
        .breadcrumbs > * {
            color: var(--grey-9-color);
        }
    }

    .side {
        padding: 24px 0 24px 26px;
        border-inline-end: 1px solid var(--grey-5-color);
    }

    .main {
        padding: 24px 0 24px 36px;
    }

    .title {
        font-size: 20px;
        color: var(--text-dark-color);
        margin-block-end: 18px;
    }
`;
