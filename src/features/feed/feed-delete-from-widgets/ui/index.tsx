import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { Nullable, PropsWithClassName } from '@/shared/utility-types';
import { styles } from './styles';
import { Button } from '@/shared/rsuite/admin-panel';
import { TrashIcon } from '@/shared/ui/icons';
import { adminPanelModel } from '@/entities/admin-panel';
import { LinkedWidgetToFeed } from '@/shared/api/feed/types';
import { Loader } from '@/shared/ui';
import { model } from '../model';
import { feedApi } from '@/shared/api';

export type FeedDeleteFromWidgetsProps = PropsWithClassName<{
    isLoading: boolean;
    texts: {
        description: string;
        submitButton: string;
    };
    onFeedDeleteFromAllWidgets: (feedId: string, helpers: { closeModal: () => void }) => void;
}>;

export const FeedDeleteFromWidgets = styled((props: FeedDeleteFromWidgetsProps) => {
    const { className, isLoading, onFeedDeleteFromAllWidgets: handleSubmit, texts } = props;

    const { t } = useTranslation('common', { keyPrefix: 'modals' });
    const isLoadingLinkedWidgets = useStore(model.effects.getLinkedWidgetsToFeedFx.pending);
    const linkedWidgets = useStore(model.stores.$linkedWidgetsToFeed);
    const [widgetCodeFromWhichFeedIsRemoved, setWidgetCodeFromWhichFeedIsRemoved] =
        useState<Nullable<LinkedWidgetToFeed['widgetCode']>>(null);
    const { entityIdToBeManage: feedId } = useStore(adminPanelModel.stores.$adminModal);

    useEffect(() => {
        if (feedId) {
            model.effects.getLinkedWidgetsToFeedFx(feedId);
        }
        return () => {
            model.events.clearLinkedWidgetsToFeed();
        };
    }, [feedId]);

    const closeModal = () => {
        adminPanelModel.events.adminModalToggled({
            isOpen: false,
            entityIdToBeManage: undefined,
        });
    };

    const deleteFeedFromWidget = (widgetCode: string) => {
        setWidgetCodeFromWhichFeedIsRemoved(widgetCode);

        feedApi.fetchWidgetFeedRelations(widgetCode).then(({ data }) => {
            data.forEach((widgetFeedRelation) => {
                if (widgetFeedRelation.partnerFeed.id === feedId) {
                    feedApi.fetchDeleteWidgetFeedRelation(widgetFeedRelation.id).then(() => {
                        model.events.deleteLinkedWidget(widgetFeedRelation.widgetId);
                    });
                }
            });
        });
    };

    return (
        <div className={className}>
            <p>{texts.description}</p>

            <div className="content">
                {linkedWidgets.length ? (
                    <ul className="linked-widgets-list">
                        {linkedWidgets.map(({ widgetCode, name, locale }) => {
                            return (
                                <li className="linked-widget" key={widgetCode}>
                                    {widgetCodeFromWhichFeedIsRemoved === widgetCode ? (
                                        <Loader width={20} />
                                    ) : (
                                        <Button
                                            className="delete-button"
                                            onClick={() => deleteFeedFromWidget(widgetCode)}
                                            appearance="subtle"
                                        >
                                            <TrashIcon />
                                        </Button>
                                    )}

                                    <div className="linked-widget__info">
                                        <span className="linked-widget__name">{name}</span>
                                        <span className="linked-widget__locale">{locale}</span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p className="empty-linked-widgets">{t('feed-not-any-page')}</p>
                )}
            </div>

            <div className="buttons-container">
                <Button appearance="subtle" size="sm" onClick={closeModal}>
                    {t('cancel')}
                </Button>

                <Button
                    disabled={Boolean(linkedWidgets.length) || isLoadingLinkedWidgets}
                    appearance="primary"
                    size="sm"
                    color="red"
                    onClick={() => {
                        if (feedId) {
                            handleSubmit(feedId, { closeModal });
                        }
                    }}
                >
                    {isLoading ? <Loader width={16} /> : texts.submitButton}
                </Button>
            </div>
        </div>
    );
})`
    ${styles}
`;
