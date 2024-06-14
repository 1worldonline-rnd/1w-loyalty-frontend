import { css } from 'styled-components';

export const styles = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;

    input:-internal-autofill-selected {
        color: var(--text-default-color) !important;
    }

    input:-webkit-autofill {
        -webkit-text-fill-color: var(--text-default-color) !important;
    }

    .input {
        margin-block-end: 10px;
    }

    strong[class^="error"] {
        transform: translateY(-4px);
    }

    .social-buttons {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-block-end: 14px;
        padding-block-end: 14px;
        border-block-end: 1px solid var(--grey-5-color);

        button {
            display: grid;
            place-items: center;
        }
    }

    .submit{
        color: var(--text-white-color); // can be problem if user selects LIGHTER color for in widget settings
    }
`;
