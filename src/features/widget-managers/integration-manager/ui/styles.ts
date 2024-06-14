import { css } from 'styled-components';

export const styles = css`
    .code {
        padding-block-start: 18px;
        padding-block-end: 18px;

        &:first-of-type {
            border-block-end: 1px solid var(--grey-5-color);
        }

        &__title {
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color: var(--text-dark-color);
        }

        &__description {
            color: var(--grey-1-color);
            margin-block-start: 2px;
            font-size: 16px;
        }

        &__instruction-btn {
            display: block;
            font-weight: 600;
            cursor: pointer;
            color: var(--text-default-color);
            margin-block-start: 5px;
            text-decoration: underline;
        }

        &__input {
            position: relative;
        }

        &__copy-btn {
            position: absolute;
            bottom: 12px;
            right: 12px;
            min-width: 87px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 4px;

            &--clicked {
                justify-content: center;
            }
        }

        &__text {
            margin-block-end: 10px;
            padding: 14px 116px 14px 14px;
            background-color: var(--grey-8-color);
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: var(--text-default-color);
            border: 1px solid var(--grey-6-color);
            border-radius: 7px;
        }

        code {
            background-color: var(--grey-8-color);
            border: 1px solid var(--grey-6-color);
            border-radius: 2px;
            padding: 0 3px;
        }
    }

    textarea {
        min-height: 76px;
        padding-inline-end: 50px;
        font-family: monospace;
    }
`;
