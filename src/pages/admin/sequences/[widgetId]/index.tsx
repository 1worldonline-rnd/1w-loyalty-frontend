import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { useProtectedRoute } from '@/processes/auth/useProtectedRoute';
import { AdminPanel, EntityListWithPushButton } from '@/widgets/admin-panel';
import { SettingsManager } from '@/features/sequences-managers';
import { SequenceItemManager } from '@/features/sequence/sequence-item-manager';
import { userModel } from '@/entities/user';
import { Route } from '@/shared/constants';
import { useCustomRouter } from '@/shared/hooks';
import type { Nullable, PropsWithClassName } from '@/shared/utility-types';
import { Tabs } from '@/shared/ui';
import { Select } from '@/shared/rsuite/admin-panel/select';
import type { BaseOption } from '@/shared/rsuite/admin-panel/select';
import classNames from 'classnames';
import { feedModel } from '@/entities/feed';
import { getSequenceItemsFx, getSequencesFx, changeSequenceStatusFx } from '@/entities/feed/model/effects';
import { setActiveSequenceId } from '@/entities/feed/model/events';
import { adminPanelModel } from '@/entities/admin-panel';

enum Tab {
    item = 'item',
    settings = 'settings',
}

const useSequenceManagerTabs = () => {
    const components = {
        [Tab.item]: SequenceItemManager,
        [Tab.settings]: SettingsManager,
    };

    const [activeTab, setActiveTab] = useState<Tab>(Tab.item);

    const { t } = useTranslation('common', { keyPrefix: 'sequences' });

    const tabs = [
        {
            label: t('items'),
            key: Tab.item,
        },
        {
            label: t('settings'),
            key: Tab.settings,
        },
    ];
    return { setActiveTab, ActiveComponent: components[activeTab], tabs, activeTab };
};

export enum SequenceStatus {
    active = 'ACTIVE',
    draft = 'DRAFT',
}

const sequenceStatusOptions = [
    {
        value: SequenceStatus.draft,
        label: 'Draft',
        color: '--grey-6-color',
        icon: (
            <svg width="3" height="20" viewBox="0 0 3 20" fill="none">
                <rect width="3" height="20" rx="1.5" fill="#F2F2F3" />
            </svg>
        ),
    },
    {
        value: SequenceStatus.active,
        label: 'Active',
        color: '--success-color',
        icon: (
            <svg width="3" height="20" viewBox="0 0 3 20" fill="none">
                <rect width="3" height="20" rx="1.5" fill="#12B56B" />
            </svg>
        ),
    },
];

const WidgetManagerPage: NextPage<PropsWithClassName> = ({ className }) => {
    const { query } = useRouter();

    const { ActiveComponent, setActiveTab, tabs, activeTab } = useSequenceManagerTabs();
    const { push } = useCustomRouter();
    const partnerId = useStore(userModel.stores.$partnerId);
    const sequences = useStore(feedModel.stores.$sequences);
    const activeSequence = useStore(feedModel.stores.$activeSequence);
    const { t } = useTranslation('common', { keyPrefix: 'sequences' });

    const [activeSequenceStatus, setActiveSequenceStatus] =
        useState<Nullable<(typeof sequenceStatusOptions)[0]>>(null);

    useProtectedRoute({
        byAdminRights: true,
    });

    useEffect(() => {
        if (partnerId) {
            getSequencesFx(partnerId);
        }
    }, [partnerId]);

    useEffect(() => {
        if (query.widgetId) {
            feedModel.events.setActiveSequenceId(String(query.widgetId));
        }
    }, [query]);

    useEffect(() => {
        if (activeSequence) {
            const option = sequenceStatusOptions.find((item) => item.value === activeSequence.status);

            if (option) setActiveSequenceStatus(option);
        }
    }, [activeSequence]);

    return (
        <AdminPanel>
            <div className={className}>
                <div className="side">
                    <h2 className="title">{t('sequences')}</h2>

                    <EntityListWithPushButton
                        entityList={sequences.map(({ id, name }) => ({
                            id,
                            name,
                        }))}
                        onPush={(id) => {
                            if (partnerId && id) {
                                setActiveSequenceId(String(id));
                                getSequenceItemsFx({
                                    partnerId,
                                    feedId: String(id),
                                });
                            }

                            push({
                                pathname: Route.admin.sequenceManager(String(id)),
                            });
                        }}
                    />
                </div>

                <div className="main">
                    <header className="header">
                        <div>
                            <h2>{activeSequence?.name}</h2>
                        </div>

                        {activeSequenceStatus && (
                            <Select<BaseOption>
                                className={classNames('select', {
                                    'select-active': activeSequenceStatus?.color === '--success-color',
                                    'select-draft': activeSequenceStatus?.color === '--grey-6-color',
                                })}
                                size="md"
                                options={[...sequenceStatusOptions]}
                                value={activeSequenceStatus}
                                onChange={(option) => {
                                    if (option?.value === SequenceStatus.draft && activeSequence) {
                                        adminPanelModel.events.adminModalToggled({
                                            entity: 'feed',
                                            isOpen: true,
                                            entityIdToBeManage: String(activeSequence.id),
                                            mode: 'change-status',
                                        });
                                    } else if (option && activeSequence) {
                                        changeSequenceStatusFx({
                                            feedId: String(activeSequence.id),
                                            status: String(option.value),
                                        });
                                    }
                                }}
                            />
                        )}
                    </header>

                    <Tabs activeTab={activeTab} data={tabs} onClickTab={(key) => setActiveTab(key as Tab)} />

                    <div className="settings-panel-wrapper">{ActiveComponent && <ActiveComponent />}</div>
                </div>
            </div>
        </AdminPanel>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default styled(WidgetManagerPage)`
    display: grid;
    grid-template-columns: 20% 80%;
    height: 100%;

    .rs-dropdown > ul.rs-dropdown-menu {
        height: auto;
        position: absolute;
        background: var(--rs-sidenav-default-bg);
        width: 100%;
        top: 100%;
        z-index: 1;
    }

    .select-active {
        /* cursor: not-allowed; */
        /* pointer-events: none; */

        & *[class*='-control'] {
            background-color: var(--success-color);
        }
    }
    .select-draft *[class*='-control'] {
        background-color: var(--grey-6-color);
    }

    .rs-dropdown ul.rs-dropdown-menu li {
        margin: 0;
    }

    .nav-tabs {
        display: none;
    }

    aside {
        display: flex;
        justify-content: flex-end;
        width: 266px;
        padding: 18px 0;
    }

    .header {
        display: flex;
        justify-content: space-between;
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
