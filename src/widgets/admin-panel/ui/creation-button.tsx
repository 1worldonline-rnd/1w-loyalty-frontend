import styled from 'styled-components';
import { FlexboxGrid, Whisper } from 'rsuite';
import { useRef } from 'react';
import { useTranslation } from 'next-i18next';
import type { WhisperInstance } from 'rsuite/esm/Whisper';
import type { NoNullable, PropsWithClassName } from '@/shared/utility-types';
import { Button, Popover } from '@/shared/rsuite/admin-panel';
import { PlusIcon } from './icons';
import { adminPanelModel } from '@/entities/admin-panel';
import { AdminModal } from '@/entities/admin-panel/model/types';
import { DotsIcon } from '@/shared/ui/icons';
import { setActiveCatalogId } from '@/features/product/product-form/model';

type OptionsProps = PropsWithClassName<{
    openCreationModal: (entity: NoNullable<AdminModal['entity']>) => void;
}>;

const Options = styled(({ className, openCreationModal }: OptionsProps) => {
    const { t } = useTranslation('common', { keyPrefix: 'creationButton' });
    return (
        <FlexboxGrid className={className} as="nav">
            <button onClick={() => openCreationModal('loyalty page')}>{t('page')}</button>
            <button onClick={() => openCreationModal('incentive')}>{t('incentive')}</button>
            <button onClick={() => openCreationModal('feed')}>{t('feed')}</button>
            <button onClick={() => openCreationModal('catalog')}>Catalog</button>
            <button onClick={() => openCreationModal('rewards')}>Custom reward</button>
            <button onClick={() => openCreationModal('collection')}>Collection</button>
        </FlexboxGrid>
    );
})`
    flex-direction: column;
    gap: 10px;

    button {
        background-color: transparent;
        padding: 0;
        text-align: right;
        width: 100%;
        font-weight: 600;
        font-size: 18px;
        color: var(--text-default-color);
        line-height: 1;

        &:hover {
            text-decoration: underline;
        }
    }
`;

type CreationButtonProps = PropsWithClassName<{
    entity: NoNullable<AdminModal['entity']>;
}>;

export const CreationButton = styled(({ className, entity }: CreationButtonProps) => {
    const triggerRef = useRef<WhisperInstance>();
    const { t } = useTranslation('common', { keyPrefix: 'creationButton' });

    const openCreationModal = (entity: NoNullable<AdminModal['entity']>) => {
        adminPanelModel.events.adminModalToggled({
            isOpen: true,
            entity,
            mode: 'create',
        });
        if (entity === 'product') setActiveCatalogId(null);
        triggerRef?.current?.close();
    };

    return (
        <FlexboxGrid className={className}>
            <Button
                className="button-create-widget"
                appearance="primary"
                onClick={() => openCreationModal(entity)}
                size="md"
            >
                <PlusIcon />
                {t('create')}
            </Button>
            <Whisper
                ref={triggerRef}
                placement="bottomEnd"
                trigger="click"
                speaker={
                    <Popover style={{ width: 152 }}>
                        <Options openCreationModal={openCreationModal} />
                    </Popover>
                }
            >
                <FlexboxGrid>
                    {entity !== 'widget-sequence' &&
                        <Button className="button-open-options" appearance="primary" size="md">
                            <DotsIcon />
                        </Button>
                    }
                </FlexboxGrid>
            </Whisper>
        </FlexboxGrid>
    );
})`
    align-items: stretch;
    gap: 1px;
    background-color: #355c8b;
    border-radius: 5px;

    .button-create-widget {
        display: flex;
        align-items: center;
        gap: 7px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .button-open-options {
        height: 100%;
        display: flex;
        align-items: center;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        padding: 10px 8px !important;
    }
`;
