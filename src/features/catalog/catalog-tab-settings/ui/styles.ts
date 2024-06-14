import { css } from 'styled-components';

export const styles = css`
    .section {
        &:not(:last-child) {
            border-block-end: 1px solid var(--grey-5-color);
        }

        &--delete-catalog {
            p {
                font-weight: 600;
                font-size: 20px;
                line-height: 24px;
                color: var(--text-dark-color);
                margin-block-end: 16px;
            }
        }
    }
`;
