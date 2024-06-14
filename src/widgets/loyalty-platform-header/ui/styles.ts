import { css } from 'styled-components';

export const styles = css`
    .header-container {
        padding-block: 20px;
        overflow: visible;
    }

    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 14px;
        margin-block-end: 14px;
        position: relative;

        @media screen and (max-width: 1201px) {
            flex-direction: column-reverse;
        }

        .page-title {
            font-size: 24px;
            color: var(--text-dark-color);
            min-width: 180px;
            text-align: center;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
        }

        .link-to-back {
            display: flex;
            align-items: center;
            font-size: 17px;
            font-weight: 600;
            line-height: 23px;
            color: var(--text-default-color);
            border-radius: 999px;
            padding: 4px;
            transition: all 0.2s ease-out;
            text-decoration: none;

            span {
                padding-inline-end: 6px;
            }

            @media screen and (max-width: 1201px) {
                span {
                    display: none;
                }
            }

            ${({ theme: { mode } }) => css`
                background-color: ${mode === 'dark' ? 'var(--grey-3-color)' : 'var(--grey-7-color)'};
            `}

            &:hover {
                ${({ theme: { mode } }) => css`
                    background-color: ${mode === 'dark' ? 'var(--grey-4-color)' : 'var(--grey-6-color)'};
                    color: var(--text-dark-color);
                `}
            }
        }
    }

    .loyalty-features-links {
        @media screen and (max-width: 480px) {
            width: 100%;
        }
        .link {
            min-width: 166px;

            @media screen and (max-width: 480px) {
                min-width: 50%;
            }
        }
    }

    &[data-are-loyalty-features-pages='false'] nav {
        @media screen and (max-width: 1201px) {
            align-items: flex-start;
        }
    }

    @media screen and (max-width: 480px) {
        .loyalty-features-links {
            width: 100%;

            .link {
                min-width: 50%;
                padding-inline: 10px;
            }
        }
    }
`;
