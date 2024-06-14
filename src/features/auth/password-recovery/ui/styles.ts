import { css } from 'styled-components';

export const styles = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    max-width: 320px;
    width: 100%;

    h3 {
        width: 100%;
        margin-block-end: 18px;
        color: #000;
        text-align: center;
        font-weight: 600;
        font-size: 14px;
    }

    .input {
        margin-block-end: 6px;

        &:last-child {
            margin-block-end: 8px;
        }
    }
`;
