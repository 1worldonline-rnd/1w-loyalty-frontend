import { css } from 'styled-components';

export const styles = css`
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        color: var(--text-dark-color);
        font-size: 20px;
        margin-block-end: 18px;
    }

    .body {
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0px 3px 23px -5px rgba(86, 99, 104, 0.19);
        display: flex;
        max-width: min(490px, calc(100vw - 32px));
        padding: 22px 26px;
        flex-direction: column;
        gap: 16px;

        ${({ theme: { mode } }) => css`
            background-color: ${mode === 'dark' ? 'var(--grey-3-color)' : '#fff'};
            box-shadow: ${mode === 'dark'
                ? '0px 3px 6px 0px rgba(0, 0, 0, 0.06)'
                : '0px 3px 15px -3px rgba(86, 99, 104, 0.19);'};
        `}
    }

    .description {
        color: rgb(var(--accent-primary-color));
        font-size: 16px;
        font-weight: 700;
    }

    .referral-link-wrapper {
        --referral-link-wrapper-gap: 12px;
        --button-copy-link-width: 160px;

        display: flex;
        align-items: flex-end;
        gap: var(--referral-link-wrapper-gap);

        .referral-link {
            width: calc(100% - var(--referral-link-wrapper-gap) - var(--button-copy-link-width));

            .icon-button-copy-link {
                display: flex;
                padding: 0;
                background-color: transparent;
                min-width: 20px;
                margin-inline-end: 4px;
                color: var(--text-default-color);

                &:focus {
                    box-shadow: none;
                }
            }

            &__label {
                ${({ theme: { mode } }) => css`
                    color: ${mode === 'dark' ? 'var(--grey-6-color)' : 'var(--text-light-color)'};
                `}
                font-size: 14px;
                font-weight: 400;
                line-height: 20px;
                margin-block-end: 6px;
            }

            &__value {
                font-size: 14px;
                font-style: normal;
                font-weight: 700;
                color: var(--text-default-color);
            }
        }

        .button-copy-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--button-copy-link-width);
        }

        @media (max-width: 480px) {
            flex-direction: column;
            align-items: stretch;

            .referral-link,
            .button-copy-link {
                width: 100%;
            }
        }
    }

    .users-counter {
        padding: 14px;
        border-radius: 10px;
        text-align: center;

        ${({ theme: { mode } }) => css`
            background-color: ${mode === 'dark' ? 'var(--grey-1-color)' : 'var(--grey-7-color)'};
        `}

        span:first-child {
            display: block;
            color: var(--text-default-color);
            font-size: 22px;
            font-weight: 700;
        }

        span:last-child {
            display: block;
            font-size: 14px;
            ${({ theme: { mode } }) => css`
                color: ${mode === 'dark' ? 'var(--grey-6-color)' : 'var(--text-light-color)'};
            `}
        }
    }
`;
