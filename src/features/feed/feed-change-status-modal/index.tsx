import { feedModel } from '@/entities/feed';
import { useStore } from 'effector-react';
import { useTranslation } from 'next-i18next';
import { FeedDeleteFromWidgets } from '../feed-delete-from-widgets';

export const FeedChangeStatusModal = () => {
    const { t } = useTranslation('common', { keyPrefix: 'modals' });
    const isLoading = useStore(feedModel.effects.changeSequenceStatusFx.pending);

    return (
        <FeedDeleteFromWidgets
            isLoading={isLoading}
            texts={{
                description: t('before-change-feed-status'),
                submitButton: t('apply'),
            }}
            onFeedDeleteFromAllWidgets={async (feedId, { closeModal }) => {
                const { status } = await feedModel.effects.changeSequenceStatusFx({
                    feedId,
                    status: 'DRAFT',
                });

                if (status >= 200 && status < 300) {
                    closeModal();
                }
            }}
        />
    );
};
