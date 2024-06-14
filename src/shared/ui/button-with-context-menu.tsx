import { MutableRefObject, ReactNode, useRef } from 'react';
import { Whisper } from 'rsuite';
import { WhisperInstance } from 'rsuite/esm/Whisper';
import { Button, Popover } from '../rsuite/admin-panel';
import { DotsIcon } from './icons';

export type ButtonWithContextMenuProps = {
    children: (whisperInstance: MutableRefObject<WhisperInstance | undefined>) => ReactNode;
    menuStyle?: React.CSSProperties;
};
export const ButtonWithContextMenu = (props: ButtonWithContextMenuProps) => {
    const { children, menuStyle } = props;
    const triggerRef = useRef<WhisperInstance>();

    return (
        <Whisper
            ref={triggerRef}
            placement="bottomEnd"
            trigger="click"
            speaker={<Popover style={menuStyle}>{children(triggerRef)}</Popover>}
        >
            <div>
                <Button size="md">
                    <DotsIcon />
                </Button>
            </div>
        </Whisper>
    );
};
