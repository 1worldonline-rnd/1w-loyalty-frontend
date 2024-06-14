import styled from 'styled-components';
import { Popover as RsuitePopover, PopoverProps } from 'rsuite';
import type { RsRefForwardingComponent } from 'rsuite/esm/@types/common';

type PopoverType = RsRefForwardingComponent<'div', PopoverProps>;

export const Popover: PopoverType = styled(RsuitePopover)`
    background-color: #ffffff;
    border: 1px solid var(--grey-7-color);
    box-shadow: 0px 2px 4px rgba(23, 24, 41, 0.07);
    border-radius: 5px;
    padding: 14px 12px;

    * {
        font-family: 'Proxima Nova', sans-serif;
    }

    .rs-popover-arrow {
        display: none;
    }
`;
