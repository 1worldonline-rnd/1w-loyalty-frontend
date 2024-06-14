import React from 'react';
import styled, { css, DefaultTheme, StyledComponent } from 'styled-components';
import { PropsWithClassName } from '../utility-types';

type ContainerProps = PropsWithClassName & {
    maxWidth?: string;
    enablePadding?: boolean;
    htmlElement?: string;
    style?: React.CSSProperties;
    enabledOverflow?: boolean;
};

const styles = css<ContainerProps>`
    max-width: calc(${(p) => p.maxWidth || '1200px'} + ${(p) => (p.enablePadding ? '0px' : '40px')});
    width: 100%;
    padding-inline-start: ${(p) => (p.enablePadding ? '0' : '16px')};
    padding-inline-end: ${(p) => (p.enablePadding ? '0' : '16px')};
    margin-inline-start: auto;
    margin-inline-end: auto;
    overflow-x: ${(p) => (p.enabledOverflow ? 'initial' : 'auto')};
`;

export const Container: StyledComponent<React.FC<ContainerProps>, DefaultTheme> = styled(
    ({ className, htmlElement = 'div', children }) => {
        return React.createElement(htmlElement, { className }, children);
    }
)`
    ${styles}
`;
