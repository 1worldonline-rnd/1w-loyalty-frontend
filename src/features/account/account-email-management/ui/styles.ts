/* eslint-disable indent */
import { css } from 'styled-components';

export const styles = css`
    h3 {
        font-size: 18px;
        margin-block-end: 6px;
    }

    .email-label {
        color: var(--text-light-color);
    }

    .email-address {
        margin-block-end: 20px;
        color: var(--text-light-color);
    }

    .email-status {
        border-radius: 6px;
        padding: 15px 12px;
        /* padding-inline-start: 50px; */
        position: relative;
        border: 1px solid;
        display: flex;
        align-items: center;
        gap: 10px;
        .icon {
            /* position: absolute; */
            /* left: 10px; */
            /* top: 12px; */
        }

        h3 {
            font-weight: 500;
            font-size: 17px;
            color: var(--text-default-color);
            margin-block-end: 0;
        }

        p {
            color: var(--text-light-color);
        }

        button {
            margin-block-start: 12px;
            max-width: min-content;
            width: 100%;
        }
    }

    .confirm-email-button {
        min-width: 185px;

        ${({ theme: { mode } }) => {
            const isDarkTheme = mode === 'dark';
            return css`
                background-color: var(${isDarkTheme ? '--text-dark-color' : '--text-default-color'});
                color: ${isDarkTheme ? 'var(--grey-3-color)' : '#fff'};
            `;
        }}
    }
`;
