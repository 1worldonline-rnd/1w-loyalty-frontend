import { css } from 'styled-components';

export const styles = css`
    .table__td {
        &:first-child {
            display: flex;
            align-items: center;
            gap: 14px;
        }

        &:last-child {
            display: flex;
            justify-content: center;
        }
    }

    .table__body .table__tr {
        background-color: #fff;
    }
`;
