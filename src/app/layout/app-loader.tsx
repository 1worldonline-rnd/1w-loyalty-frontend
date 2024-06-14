import styled, { css } from 'styled-components';
import { Loader } from '@/shared/ui';
import type { PropsWithClassName } from '@/shared/utility-types';

export const AppLoader = styled(({ className }: PropsWithClassName<{ show: boolean }>) => (
    <div className={className}>
        <Loader />
    </div>
))`
    z-index: 99;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: grid;
    place-items: center;
    background-color: rgb(var(--body-background-color));
    color: rgb(var(--accent-primary-color));
    transition: opacity 200ms linear;

    ${({ show }) => !show && css`
        pointer-events: none;
        opacity: 0;
    `}
`;
