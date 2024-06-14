import { css } from 'styled-components';

export const styles = css`
    .status {
        padding: 2px 8px;

        text-align: center;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        text-transform: uppercase;
        border-radius: 8px;

        &-active {
            background: #E8F8F1;
            color: var(--success-color);
        }

        &-draft {
            background: #ECEDEE;
            color: var(--ui-admin-text-default);
        }
    }
`;
