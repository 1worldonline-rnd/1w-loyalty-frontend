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
        }

        &__title {
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color: var(--text-dark-color);
            margin-block-end: 16px;
        }
    }

    .field {
        font-weight: 600;
        display: flex;
        flex-direction: column;
        gap: 10px;

        &__label {
            display: block;

            font-weight: 600;
            line-height: 17px;
            color: var(--text-dark-color);
        }
    }

    .field-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin-block-end: 20px;
    }

    .user-menu-settings {
        display: flex;
        flex-direction: column;
        gap: 20px;

        &__title {
            font-size: 18px;
            margin-bottom: 0;
        }

        &__field-container {
            display: flex;
            align-items: center;
            gap: 5px;

            .rs-toggle-checked .rs-toggle-presentation {
                background-color: var(--main-color);
            }
        }
    }
`;
