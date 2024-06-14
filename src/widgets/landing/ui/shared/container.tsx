import { PropsWithClassName } from '@/shared/utility-types';
import { PropsWithChildren, ReactHTML, createElement } from 'react';
import styled from 'styled-components';

export type ContainerProps = PropsWithChildren<
    PropsWithClassName<{
        as?: keyof ReactHTML;
    }>
>;

export const Container = styled(({ as = 'div', children, className }: ContainerProps) => {
    return createElement(as, { className }, children);
})`
    --padding-inline: 20px;

    max-width: calc(1270px + var(--padding-inline) * 2);
    padding-inline: var(--padding-inline);
    margin-inline: auto;
`;
