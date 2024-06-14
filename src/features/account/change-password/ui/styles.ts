import { css } from 'styled-components';

export const styles = css`
    label > span {
        display: block;
        color: var(--text-light-color);
        margin-block-end: 8px;
        font-weight: 600;
        line-height: 19px;
    }

    .input-wrapper {
        margin-block-end: 6px;

        strong[class^='error-message'] {
            margin-block-start: 6px;
            margin-block-end: 0;
        }

        &:last-child {
            margin-block-end: 8px;
        }
    }

    button {
        width: 100%;
    }
`;
