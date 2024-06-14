import { css } from 'styled-components';

export const styles = css`
    p {
        margin: 0;
        color: var(--grey-1-color);
    }

    h3 {
        font-weight: 600;
        font-size: 20px;
        color: var(--text-dark-color);
        margin: 0;
    }

    section {
        border-block-end: 1px solid var(--grey-5-color);
        padding-block: 18px;
    }

    fieldset {
        & > *:first-child {
            border-block-end: 1px solid var(--grey-5-color);
        }
    }

    .field {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__label {
            color: var(--text-dark-color);
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
        }

        &__description {
            color: var(--grey-1-color);
            font-size: 14px;
            line-height: 17px;
            margin-block-start: 2px;
        }
    }

    .catalog-select {
        &__label {
            color: var(--text-dark-color);
            font-weight: 600;
            font-size: 14px;
            line-height: 17px;
        }

        &__inner {
            gap: 12px;
            margin-block-start: 5px;
        }

        &__select {
            flex: 1;
        }

        .button-manage-catalog {
            display: flex;
            align-items: center;
            gap: 4px;
        }
    }

    .subfields {
        margin-block-start: 16px;
        padding: 14px 16px;
        background-color: var(--grey-8-color);
        border-radius: 7px;
    }

    .submit-button {
        margin-block-start: 20px;
    }
`;
