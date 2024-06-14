import { PropsWithClassName } from '@/shared/utility-types';
import styled from 'styled-components';
import { ButtonWithContextMenu, Table } from '@/shared/ui';
import { useStore } from 'effector-react';
import { nftModel } from '@/entities/nft';
import { styles } from './styles';
import { FlexboxGrid } from 'rsuite';
import { Button } from '@/shared/rsuite/admin-panel';
import { adminPanelModel } from '@/entities/admin-panel';
import { NftWidgetQuery } from '@/shared/api/nft-widgets/types';
import { useRef } from 'react';
import { WhisperInstance } from 'rsuite/esm/Whisper';
import { CopyButton } from '@/shared/ui/copy-button';
import { useTranslation } from 'next-i18next';

const { Td, Th, Tr } = Table;

type ContextMenuProps = PropsWithClassName<{
    nftWidget: NftWidgetQuery;
    onClose: () => void;
}>;

const Options = styled((props: ContextMenuProps) => {
    const { nftWidget, className, onClose } = props;

    const { t } = useTranslation('common', { keyPrefix: 'nft' });

    return (
        <FlexboxGrid className={className} as="nav" align="bottom">
            <Button
                appearance="link"
                onClick={() => {
                    adminPanelModel.events.adminModalToggled({
                        isOpen: true,
                        entity: 'nft-widget',
                        mode: 'update',
                        entityIdToBeManage: nftWidget.id,
                    });
                    onClose();
                }}
            >
                {t('edit')}
            </Button>
        </FlexboxGrid>
    );
})`
    flex-direction: column;

    button {
        background-color: transparent;
        padding: 6px;
        font-weight: 600;
        font-size: 18px;
        color: var(--text-default-color);
    }
`;

export const NftWidgetTable = styled((props: PropsWithClassName) => {
    const { className } = props;
    const nftWidgetsList = useStore(nftModel.stores.$nftWidgets);
    const triggerRef = useRef<WhisperInstance | undefined>();

    const { t } = useTranslation('common', { keyPrefix: 'nft' });

    const buildEmbedCode = (nftWidgetId: string) => {
        return `<div id="1WONFTW" data-nft-widget-id="${nftWidgetId}" data-locale="en"></div>
        <script defer src="${process.env.NEXT_PUBLIC_NFT_WIDGET_URL}/widget-constructor.js"></script>`.trim();
    };

    return (
        <div className={className}>
            <Table
                noDataComponent={t('nft-widgets-list-empty')}
                templateColumns={[2, 2, 2, 0]}
                head={
                    <Tr>
                        <Th>{t('name')}</Th>
                        <Th>{t('language')}</Th>
                        <Th>{t('embed-code')}</Th>
                        <Th />
                    </Tr>
                }
                body={nftWidgetsList.map((nftWidget, index) => (
                    <Tr key={index}>
                        <Td>{nftWidget.name}</Td>
                        <Td>{nftWidget.locale}</Td>
                        <Td>
                            <CopyButton
                                textToCopy={buildEmbedCode(nftWidget.id)}
                                buttonText={t('copy')}
                                appearance="default"
                            />
                        </Td>
                        <Td>
                            <FlexboxGrid justify="end" style={{ width: '100%' }}>
                                <ButtonWithContextMenu menuStyle={{ minWidth: 148 }}>
                                    {(ref) => {
                                        triggerRef.current = ref.current;
                                        return (
                                            <Options
                                                onClose={() => {
                                                    ref.current?.close();
                                                }}
                                                nftWidget={nftWidget}
                                            />
                                        );
                                    }}
                                </ButtonWithContextMenu>
                            </FlexboxGrid>
                        </Td>
                    </Tr>
                ))}
            />
        </div>
    );
})`
    ${styles}
`;
