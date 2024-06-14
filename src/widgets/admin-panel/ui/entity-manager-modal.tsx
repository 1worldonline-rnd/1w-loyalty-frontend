import { useStore } from 'effector-react';
import { useTranslation } from 'next-i18next';
import { adminPanelModel } from '@/entities/admin-panel';
import { WidgetConfigCreationForm } from '@/features/widget';
import { IncentiveForm } from '@/features/incentive';
import { FeedManageForm, FeedDeleteModal, FeedChangeStatusModal } from '@/features/feed';
import { Modal } from '@/shared/rsuite/admin-panel';
import { feedModel } from '@/entities/feed';
import { eventsModel } from '@/entities/events';
import type { Truthy } from '@/shared/utility-types';
import { combine } from 'effector';
import { CatalogCreationForm } from '@/features/catalog';
import { ProductForm } from '@/features/product';
import { CustomRewardCreationForm } from '@/features/custom-rewards';
import { SequenceCreationForm } from '@/features/sequences';
import { SequenceItemForm } from '@/features/sequences/sequence-item-form';
import { NftCollectionCreationForm, NftCreationForm } from '@/features/nft-collections';
import { NftWidgetForm } from '@/features/nft-widgets';
import { CollectionCreationForm, TopicManageForm } from '@/features/collection';

const $manageableEntityName = combine(
    feedModel.stores.$feeds,
    eventsModel.stores.$events,
    adminPanelModel.stores.$adminModal,
    (feeds, events, { entityIdToBeManage, mode }) => {
        if (mode === 'update' || mode === 'delete') {
            return [...feeds, ...events].find(({ id }) => id === entityIdToBeManage)?.name;
        }
        return null;
    }
);

export const EntityManagerModal = () => {
    const { entity, isOpen, mode } = useStore(adminPanelModel.stores.$adminModal);
    const { t } = useTranslation('common', { keyPrefix: 'modals' });
    const manageableEntityName = useStore($manageableEntityName);

    if (!mode || !entity) {
        return null;
    }

    const headerActionTitles: Record<Truthy<typeof mode>, string> = {
        create: t('create-new'),
        update: t('edit'),
        delete: t('delete'),
        'change-status': t('edit'),
    };

    return (
        <Modal open={isOpen} onClose={() => adminPanelModel.events.closeModal()} backdrop="static">
            <Modal.Header>
                <h3 style={{ fontSize: 18, color: 'var(--text-dark-color)' }}>
                    {headerActionTitles[mode]} {t(entity)}
                    {manageableEntityName && `: ${manageableEntityName}`}
                </h3>
            </Modal.Header>
            <Modal.Body>
                {/* incentive, feed, product or reward can be created or edited */}
                {['create', 'update'].includes(mode) && (
                    <>
                        {entity === 'incentive' && <IncentiveForm />}
                        {entity === 'feed' && <FeedManageForm />}
                        {entity === 'product' && <ProductForm />}
                        {entity === 'rewards' && <CustomRewardCreationForm />}
                    </>
                )}
                {/* loyalty widget can be created */}
                {entity === 'loyalty page' && mode === 'create' && <WidgetConfigCreationForm />}
                {/* if feed delete modal is open with a list of linked widgets */}
                {entity === 'feed' && mode === 'delete' && <FeedDeleteModal />}
                {/* catalog can be created */}
                {entity === 'catalog' && mode === 'create' && <CatalogCreationForm />}
                {entity === 'widget-sequence' && mode === 'create' && <SequenceCreationForm />}
                {entity === 'sequence-item' && mode === 'create' && <SequenceItemForm />}
                {entity === 'sequence-item' && mode === 'update' && <SequenceItemForm />}
                {entity === 'feed' && mode === 'change-status' && <FeedChangeStatusModal />}
                {entity === 'nft-collection' && mode === 'create' && <NftCollectionCreationForm />}
                {entity === 'nft' && mode === 'create' && <NftCreationForm />}
                {entity === 'nft-widget' && mode === 'create' && <NftWidgetForm />}
                {entity === 'nft-widget' && mode === 'update' && <NftWidgetForm />}
                {entity === 'collection' && mode === 'create' && <CollectionCreationForm />}
                {entity === 'topic-in-collection' && mode === 'create' && <TopicManageForm />}
                {entity === 'topic-in-collection' && mode === 'update' && <TopicManageForm />}
            </Modal.Body>
        </Modal>
    );
};
