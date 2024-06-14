import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AdminPanel, EntityListWithPushButton } from '@/widgets/admin-panel';
import styled from 'styled-components';
import { PropsWithClassName } from '@/shared/utility-types';
import { useProtectedRoute } from '@/processes/auth/useProtectedRoute';
import { useStore } from 'effector-react';
import { collectionModel } from '@/entities/collection';
import { useCustomRouter } from '@/shared/hooks';
import { Route } from '@/shared/constants';
import { useEffect, useState } from 'react';
import { Tabs } from '@/shared/ui';
import { userModel } from '@/entities/user';
import { CollectionTopics, CollectionSettings } from '@/features/collection';

enum CollectionPageTab {
    topics = 'topics',
    settings = 'settings',
}

const collectionTabContent = {
    [CollectionPageTab.topics]: CollectionTopics,
    [CollectionPageTab.settings]: CollectionSettings,
};

const CollectionPage = styled(({ className }: PropsWithClassName) => {
    useProtectedRoute({
        byAdminRights: true,
    });

    const { push, query } = useCustomRouter();

    const collections = useStore(collectionModel.stores.$collections);
    const currentCollection = useStore(collectionModel.stores.$activeCollection);
    const partnerId = useStore(userModel.stores.$partnerId);

    const [activeTab, setActiveTab] = useState<CollectionPageTab>(CollectionPageTab.topics);
    const [areCollectionsLoaded, setAreCollectionsLoaded] = useState(false);

    const tabs = [
        {
            label: 'Topics',
            key: CollectionPageTab.topics,
        },
        {
            label: 'Settings',
            key: CollectionPageTab.settings,
        },
    ];

    useEffect(() => {
        if (query.collectionId) {
            collectionModel.events.setActiveCollectionId(String(query.collectionId));
        }
    }, [query]);

    useEffect(() => {
        if (partnerId && areCollectionsLoaded === false) {
            collectionModel.effects.getCollectionsFx(partnerId).then(() => {
                setAreCollectionsLoaded(true);
            });
        }
    }, [partnerId, areCollectionsLoaded]);

    const TabContent = collectionTabContent[activeTab];

    return (
        <AdminPanel>
            <div className={className}>
                <div className="aside">
                    <h2 className="aside__title">Collections</h2>

                    <EntityListWithPushButton
                        entityList={collections}
                        onPush={(id) => {
                            push({
                                pathname: Route.admin.collectionManager(String(id)),
                            });
                        }}
                    />
                </div>
                <div className="main">
                    <h1 className="main__title">{currentCollection?.name}</h1>

                    <Tabs
                        activeTab={activeTab}
                        data={tabs}
                        onClickTab={(key) => setActiveTab(key as CollectionPageTab)}
                    />

                    {TabContent && <TabContent />}
                </div>
            </div>
        </AdminPanel>
    );
})`
    display: grid;
    grid-template-columns: max(400px, 20%) 1fr;
    height: 100%;

    .aside {
        padding: 24px 0 24px 26px;
        border-inline-end: 1px solid var(--grey-5-color);

        &__title {
            font-size: 20px;
            color: var(--text-dark-color);
            margin-block-end: 18px;
        }
    }

    .main {
        padding: 24px 0 24px 36px;

        &__title {
            font-size: 22px;
            margin-block-end: 17px;
            color: var(--text-dark-color);
        }
    }
`;

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'features.collection'])),
    },
});

export default CollectionPage;
