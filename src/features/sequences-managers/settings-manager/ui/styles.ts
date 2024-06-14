import { css } from 'styled-components';

export const styles = css`
    input {
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
    }

    .fieldset {
        padding-block-start: 18px;
        padding-block-end: 18px;

        &:first-child {
            border-block-end: 1px solid var(--grey-5-color);

            .split-fields .field {
                margin-block-end: 0;
            }
        }

        &__title {
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color: var(--text-dark-color);
            margin-block-end: 16px;
        }
    }

    .field,
    .field__label {
        display: block;
        margin-block-end: 10px;
    }

    .field {
        font-weight: 600;
    }

    .field__label {
        font-weight: 600;
        line-height: 17px;
        color: var(--text-dark-color);
    }

    .split-fields {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        margin-block-end: 20px;

        & > * {
            flex: 1;
        }
    }
`;
