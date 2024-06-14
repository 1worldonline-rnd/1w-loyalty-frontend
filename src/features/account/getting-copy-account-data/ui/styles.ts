import { css } from 'styled-components';

export const styles = css`
    .description {
        margin: 0;
        color: var(--text-light-color);
        font-size: 14px;
        line-height: 17px;
        margin-block-start: 14px;

        ul {
            list-style: disc;
            padding-inline-start: 20px;
        }
    }

    .btn-request-archive {
        width: 100%;
    }

    .account-data__completed-archive {
        strong {
            padding-block-end: 4px;
        }

        button {
            width: 100%;
        }

        .btn-download-archive {
            margin-block-start: 14px;
        }
    }
`;
