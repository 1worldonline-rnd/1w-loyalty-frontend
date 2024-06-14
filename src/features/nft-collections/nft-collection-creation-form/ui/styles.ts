import { css } from 'styled-components';

export const styles = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 12px;

    .crypto-info {
        white-space: nowrap;
    }

    .field,
    .field label {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .field label span {
        font-weight: 600;
        color: var(--text-dark-color);
    }

    .field--required label span::after {
        content: ' *';
        color: rgb(var(--error-color));
    }

    .buttons {
        gap: 8px;
    }

    .buttons,
    .field--full {
        grid-column: 1 / 3;
    }
`;
