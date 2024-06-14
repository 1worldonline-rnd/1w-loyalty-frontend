import { css } from 'styled-components';

export const styles = css`
    & > p {
        font-size: 14px;
        line-height: 18px;
        color: var(--grey-0-color);
        padding-block-end: 14px;
        margin-block-start: -8px;
        border-block-end: 1px solid var(--grey-7-color);
        font-weight: 400;
    }

    .linked-widget {
        display: flex;
        padding: 10px;
        align-items: center;
        gap: 10px;
        font-weight: 600;

        &:not(:last-child) {
            border-block-end: 1px solid var(--grey-7-color);
        }

        .delete-button {
            padding: 0;
            color: var(--text-dark-color);

            svg {
                transition: color 150ms linear;
            }

            &:hover {
                background-color: transparent;

                svg {
                    color: rgb(var(--error-color));
                }
            }
        }

        &__info {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }

        &__name {
            font-size: 16px;
            line-height: 18px;
            color: var(--text-dark-color);
        }

        &__locale {
            font-size: 14px;
            line-height: 16px;
            color: var(--grey-9-color);
        }
    }

    .empty-linked-widgets {
        font-weight: 600;
        font-weight: 600;
        font-size: 16px;
        line-height: 18px;
        color: var(--text-disabled-color);
        padding: 10px;
    }

    .buttons-container {
        display: flex;
        justify-content: flex-end;
        gap: 5px;
        padding-block-start: 20px;
        border-block-start: 1px solid var(--grey-7-color);
    }
`;
