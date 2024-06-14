import { css } from 'styled-components';

export const styles = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px 12px;

    .field--fill-width,
    .buttons {
        grid-column: 1 / 3;
    }

    .field,
    .field label {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .field label span,
    .field label strong {
        font-weight: 600;
        color: var(--text-dark-color);
    }

    .buttons {
        gap: 8px;
    }
`;
