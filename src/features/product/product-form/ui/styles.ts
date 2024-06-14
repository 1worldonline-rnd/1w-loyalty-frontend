import { css } from 'styled-components';

export const styles = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 12px;

    .field--full-row {
        grid-column: 1 / 3;
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
    .field--name {
        grid-column: 1 / 3;
    }

    .field__toggle {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .field__toggle-text {
        font-size: 12px;
    }
`;
