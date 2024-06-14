import { css } from 'styled-components';

export const styles = css`
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        font-size: 20px;
        font-weight: 700;
        line-height: 27px;
        color: var(--text-dark-color);
    }

    .streak-wrapper {
        margin-block-start: 18px;
        width: 100%;
        overflow-x: auto;

        /* streak item with width 150px * 7 + border-inline 2px of .streak */
        /* 7 * 150 + 2 = 1050 * 2 = 1052 */
        @media (max-width: 1052px) {
            right: 0;
            position: relative;
            left: 0;
            width: calc(100% + 16px * 2);
        }
    }

    .streak {
        margin-inline: auto;
        width: min-content;
        border-radius: 10px;
        border: 1px solid var(--grey-6-color);
        box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.04);
        padding-block: 8px;
        display: flex;

        @media (max-width: 1052px) {
            margin-inline: 16px;
        }
    }
`;
