import { css } from 'styled-components';

export const styles = css`
    .agreement {
        text-align: center;

        h1 {
            font-weight: 600;
            font-size: 20px;
            color: var(--text-dark-color);
            margin-block: 18px 8px;
        }

        p {
            font-size: 18px;
            margin-block-end: 8px;
            color: var(--text-light-color);
        }

        .link-go-to-loyalty {
            width: 100%;
            max-width: 320px;
            margin-block-start: 15px;
            text-decoration: none;
        }
    }

    .forms {
        margin-block-start: 30px;
        transition: filter 200ms linear;
        max-width: 504px;
        margin-inline: auto;

        &[data-blur='true'] {
            filter: blur(3px);
            pointer-events: none;
        }

        .btn-registration,
        .btn-finish-registration {
            width: 100%;
        }

        .input {
            margin-block-end: 10px;

            & + strong {
                transform: translateY(-4px);
            }
        }
    }

    .social-buttons {
        display: flex;
        gap: 10px;
        margin-block: 8px 14px;
        padding-block-end: 14px;
        border-block-end: 1px solid var(--grey-5-color);

        button {
            flex-basis: 50%;
            display: grid;
            place-items: center;
        }
    }

    .btn-step-back {
        display: block;
        margin: 14px auto 0;
        font-weight: bold;
    }

    @media (min-width: 769px) {
        .form-email {
            width: 100%;
            display: grid;
            grid-template-columns: calc(170 / 504 * 100%) calc(334 / 504 * 100%);

            .social-buttons {
                flex-direction: column;
                margin: 0;
                padding: 0;
                border: 0;
                padding-inline-end: 14px;
                border-inline-end: 1px solid var(--grey-6-color);
            }

            form {
                padding-inline-start: 14px;
            }
        }
    }
`;
