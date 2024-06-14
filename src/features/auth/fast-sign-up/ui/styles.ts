import { css } from 'styled-components';

export const styles = css`
    max-width: 500px;
    margin-inline: auto;
    input:-internal-autofill-selected {
        color: var(--text-default-color) !important;
    }

    input:-webkit-autofill {
        -webkit-text-fill-color: var(--text-default-color) !important;
    }

    h2 {
        font-weight: 600;
        font-size: 20px;
        color: var(--text-dark-color);
        text-align: center;
        margin-block: 15px 20px;
    }

    p {
        text-align: center;
        margin-block-end: 20px;
        font-size: 16px;
        max-width: 340px;
        margin-inline: auto;
    }

    .input {
        margin-block-end: 10px;

        & + strong {
            transform: translateY(-4px);
        }
    }

    .agree-checkbox {
        display: block;
        margin-block-end: 10px;
    }

    button {
        width: 100%;
    }

    .submit {
        color: var(--text-white-color); // can be problem if user selects LIGHTER color for in widget settings
    }
`;
