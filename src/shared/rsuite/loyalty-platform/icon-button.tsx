import { IconButton as RsuiteIconButton } from 'rsuite';
import styled, { css } from 'styled-components';

export const IconButton: typeof RsuiteIconButton = styled(RsuiteIconButton)`
    &.rs-btn-icon[class] {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        color: var(--text-default-color);

        ${({ theme: { mode } }) => css`
            background-color: ${mode === 'dark' ? 'var(--grey-4-color)' : 'var(--grey-7-color)'};
        `}

        &.rs-btn-md {
            width: 36px;
            height: 36px;
        }

        &.rs-btn-sm {
            width: 32px;
            height: 32px;
        }
    }
`;
