import { css } from 'styled-components';

export const styles = css`
    padding: 4px 12px;
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    &:not(:last-child) {
        border-inline-end: 1px solid var(--grey-6-color);
    }

    &.unavailable {
        cursor: not-allowed;
    }

    .streak-item__title {
        font-size: 14px;
        font-weight: 600;
        color: var(--text-light-color);
    }

    .btn-unlock {
        padding: 2px 5px;
        background-color: rgb(var(--accent-primary-color));
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        line-height: 16px;
        border-radius: 100px;
        min-width: 90px;
        text-align: center;
    }

    .points {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 20px;
        font-weight: 700;
        color: var(--text-light-color);

        &.unlocked-points {
            color: var(--text-default-color);
        }

        &.unlockable-points {
            color: rgb(var(--accent-primary-color));
        }
    }

    .coin-icon {
        width: 20px;
        height: 20px;
    }
`;
