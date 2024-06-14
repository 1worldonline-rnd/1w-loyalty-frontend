import { feedModel } from '@/entities/feed';
import { showMessage } from '@/shared/lib/messages';
import { useStore } from 'effector-react';
import { useTranslation } from 'next-i18next';
import { FeedDeleteFromWidgets } from '../feed-delete-from-widgets';

export const FeedDeleteModal = () => {
    const { t } = useTranslation('common', { keyPrefix: 'modals' });
    const isLoading = useStore(feedModel.effects.deleteFeedFx.pending);

    return (
        <FeedDeleteFromWidgets
            isLoading={isLoading}
            texts={{
                description: t('before-delete-feed'),
                submitButton: t('finally-delete-feed'),
            }}
            onFeedDeleteFromAllWidgets={async (feedId, { closeModal }) => {
                const { status } = await feedModel.effects.deleteFeedFx(feedId);

                if (status === 200) {
                    showMessage(t('feed-deleted'));
                    closeModal();
                }
            }}
        />
    );
};
