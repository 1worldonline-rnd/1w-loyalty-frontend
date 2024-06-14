import Color from 'color';
import styled, { css } from 'styled-components';

export type ButtonProps = {
    size?: 'medium' | 'small';
};

export const Button = styled.button<ButtonProps>`
    display: flex;
    border-radius: 100px;
    border: 2px solid #f99a9a;
    background-color: #fa014e;
    color: #fff;
    font-weight: 700;
    transition: background-color 200ms ease-in-out;
    white-space: nowrap;

    &:hover {
        background-color: ${Color('#fa014e').darken(0.1).toString()};
    }

    ${({ size = 'medium' }) => {
        if (size === 'medium') {
            return css`
                font-size: 22px;
                line-height: 32px;
                padding: 9px 22px;
            `;
        }
        return css`
            font-size: 20px;
            line-height: 31px;
            padding: 6px 18px;
        `;
    }}
`;
