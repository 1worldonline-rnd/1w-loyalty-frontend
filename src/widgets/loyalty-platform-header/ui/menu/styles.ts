/* eslint-disable indent */
import { css } from 'styled-components';

export const styles = css`
    position: relative;

    .open-menu-btn[class] {
        color: var(--text-default-color);
        
        ${({ theme: { mode } }) => css`
                background-color: ${mode === 'dark' ? 'var(--grey-3-color)' : 'var(--grey-7-color)'};
            `}

        &:hover {
            ${({ theme: { mode } }) => css`
                background-color: ${mode === 'dark' ? 'var(--grey-4-color)' : 'var(--grey-6-color)'};
                color: var(--text-dark-color);
            `}
        }
    }

    .menu {
        min-width: 170px;
        position: absolute;
        z-index: 99;
        top: 42px;
        right: 0;
        transition: all 200ms linear;
        box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.09);
        border-radius: 4px;
        padding: 16px;

        ${({ theme: { mode } }) => mode === 'dark' && css`
            background-color: var(--grey-3-color);
        `}

        ${({ theme: { mode } }) => mode === 'light' && css`
            background-color: #fff;
        `}


        li:not(:last-child) {
            margin-block-end: 10px;
        }

        li.mapped-link:nth-child(2) {
            padding-block-end: 10px;
            border-block-end: 1px solid var(--grey-7-color);
        }

        a,
        button {
            font-weight: 600;
            font-size: 17px;
            line-height: 23px;
            white-space: nowrap;
            color: var(--text-default-color);
            background-color: transparent;
            padding: 0;

            &:hover {
                text-decoration: underline;
            }
        }
    }
`;
