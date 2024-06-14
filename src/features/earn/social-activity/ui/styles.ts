import { css } from 'styled-components';

export const styles = css`
    ul {
        display: flex;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
    }

    .activity-item {
        cursor: pointer;
        transition: transform 0.1s ease-in-out;

        .title {
        }

        .icon {
            svg,
            img {
                width: 30px !important;
            }
        }

        &:hover {
            transform: scale(1.02);
        }

        &-finished {
            .activity-item__card {
                background-color: ${({ theme }) =>
                    theme.mode === 'dark' ? 'var(--grey-1-color)' : 'var(--grey-8-color)'};
                border: none;
            }

            .social-count {
                color: var(--grey-8-color);

                svg {
                    margin-inline-end: 6px;
                    width: 15px;
                }
            }

            .social-subscribe {
                .result-icon {
                    svg {
                        color: var(--text-default-color);
                    }
                }
            }
        }
    }

    @media (min-width: 800px) {
        .activity-item {
            .icon {
                svg,
                img {
                    width: 20px !important;
                }
            }
        }
    }
`;
