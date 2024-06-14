import { css } from 'styled-components';

export const styles = css`
    ul {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(295px, 1fr));
        gap: 12px;
    }

    .pagination {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-block-start: 24px;

        &__current-page {
            color: var(--text-dark-color);
            font-weight: 600;
        }

        &__button {
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            padding: 8px;

            svg {
                width: 22px;
                height: 22px;
            }
        }
    }
`;
