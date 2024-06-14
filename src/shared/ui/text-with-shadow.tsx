import React from 'react';
import styled from 'styled-components';
import { PropsWithClassName } from '../utility-types';

type TextWithShadowProps = PropsWithClassName & {
    text: React.ReactText;
    htmlElement?: string;
};

export const TextWithShadow = styled(({ text, htmlElement = 'p', className }: TextWithShadowProps) => {
    return React.createElement(htmlElement, { className }, text);
})`
    color: var(--grey-4-color);
    font-weight: 600;
    font-size: 86px;
    position: relative;

    &::after {
        content: '${({ text }) => text}';
        position: absolute;
        left: -4.5px;
        top: -3px;
        color: rgb(var(--accent-primary-color));
        pointer-events: none;
    }
`;
