import { css } from 'styled-components';

export const styles = css`
    display: flex;
    flex-direction: column;
    align-items: center;

    .btn-upload-photo {
        font-weight: bold;
        margin-block-start: 5px;
        color: var(--text-default-color);
    }
    
    .fullname {
        margin-block-start: 15px;
        display: flex;
        color: var(--text-dark-color);
        align-items: center;

        p {
            font-weight: 600;
            font-size: 20px;
            margin-inline-end: 10px;
        }
    }

    .input {
        margin-block-end: 6px;

        &:last-child {
            margin-block-end: 8px;
        }
    }

    form {
        margin-block-start: 15px;
    }

    form button {
        width: 100%;

        &:last-child {
            margin-block-start: 10px;
        }
    }
`;
