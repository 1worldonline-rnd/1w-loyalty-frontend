import styled, { css } from 'styled-components';

export const FeedContentCardStyled = styled.div<{ accentColor: string }>`
    border-width: 1px;
    border-style: solid;
    border-radius: 10px;
    padding: 14px 16px 0px 16px;
    font-weight: 700;
    font-size: 14px;
    color: var(--text-light-color);
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    transition: all 0.15s ease-in-out;

    ${({ theme: { mode } }) => css`
        background-color: ${mode === 'dark' ? 'var(--grey-3-color)' : '#fff'};
        border-color: ${mode === 'dark' ? 'var(--grey-3-color)' : '#fff'};
        box-shadow: ${mode === 'dark' ? '0px 3px 6px 0px rgba(0, 0, 0, 0.06)' : '0px 3px 15px -3px rgba(86, 99, 104, 0.19);'};
    `}

    &:hover {
        box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
        transform: scale(1.01);

        ${({ theme: { mode } }) => css`
            border-color: var(--grey-${mode === 'dark' ? '4' : '6'}-color);
        `}
    }

    .link {
        font-weight: 700;
        font-size: 14px;
        color: var(--text-light-color);
        text-decoration: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 5px;
        color: var(--text-dark-color);

        .title {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-size: inherit;
            font-size: 17px;
            font-weight: 600;
            line-height: 23px;
        }
    }

    .image {
        overflow: hidden;
        display: flex;
        border-radius: 5px;
        color: rgb(var(--accent-primary-color));
        height: 100%;
        margin-block-start: 12px;
        margin-block-end: 12px;

        &[data-has-image='true'] {
            aspect-ratio: 2.7 / 1;
        }

        img {
            object-fit: cover;
            height: 100%;
        }
    }

    .tasks {
        .required-tasks {
            border-radius: 6px;
            position: relative;
            border: 1px solid ${(props) => props.accentColor};

            .required-icon {
                position: absolute;
                top: -6px;
                left: -6px;

                svg {
                    color: ${(props) => props.accentColor};
                }
            }

            &--completed {
                ${({ theme: { mode } }) => css`   
                    border-color: var(--grey-${mode === 'dark' ? '5' : '6'}-color); 
                `}
                .required-icon {
                    position: absolute;
                    top: -6px;
                    left: -6px;

                    svg {
                        rect{
                            ${({ theme: { mode } }) => css`   
                                fill: var(--grey-${mode === 'dark' ? '5' : '2'}-color); 
                            `}
                        }
                    }
                }
            }


            p {
                color: var(--text-light-color);
                font-size: 12px;
                font-weight: 600;
                line-height: 18px;
            }
            .event {
                &:not(:last-child) {
                    ${({ theme: { mode } }) => css`
                        border-bottom: 1px solid var(--grey-${mode === 'dark' ? '4' : '6'}-color);
                    `}
                }
            }
            .share-reward {
                padding: 9px 0;
            }
        }
        .regular-tasks {
            a {
                text-decoration: none;
            }
            p {
                color: var(--text-light-color);
                font-size: 14px;
                font-weight: 600;
                line-height: 18px;
                font-weight: 700;
            }
            .event {
                &:not(:last-child) {
                    ${({ theme: { mode } }) => css`
                        border-bottom: 1px solid var(--grey-${mode === 'dark' ? '4' : '6'}-color);
                    `}
                }
            }
        }
    }

    .image {
        overflow: hidden;
        display: flex;
        border-radius: 5px;
        color: rgb(var(--accent-primary-color));
        height: 100%;
        &[data-has-image='true'] {
            aspect-ratio: 2.7 / 1;
        }

        img {
            object-fit: cover;
            height: 100%;
        }
    }
    .events {
        margin-block-end: 5px;
        .event {
            justify-content: space-between;
            ${({ theme: { mode } }) => css`
                border-color: var(--grey-${mode === 'dark' ? '4' : '6'}-color);
            `}
            cursor: pointer;

            font-weight: 700;
            font-size: 14px;
            overflow: hidden;
            display: flex;
            align-items: center;
            letter-spacing: -0.2px;
            line-height: 20px;
            padding: 9px;
            transition: all 0.2s ease-out;
            .arrow {
                animation: show 0.2s forwards;
                svg {
                    display: inherit;
                    opacity: 0;
                } 
            }
            
            &:hover {
                .event-counter{
                    transform: translate(0px, 0px);
                }
                .reward {
                    color: var(--text-dark-color);
                }
                .arrow {
                    animation: show 0.2s forwards;
                    svg {
                        display: inherit;
                        opacity: 1;
                    }
                }
            }
            &:first-child {
                border: none;
            }
            .reward {
                display: flex;
                align-items: center;
                gap: 5px;
                color: var(--text-default-color);
            }
            .reward-title {
                display: flex;
                align-items: center;
                gap: 5px;
                color: var(--text-default-color);

                .timer {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    span {
                        color: var(--text-light-color);
                    }
                }
            }
            .reward-icons {
                display: flex;
                gap: 5px;

                span {
                    border-radius: 50%;
                    display: inherit;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 4px;
                }
                svg {
                    height: 15px;
                    width: 15px;
                }
            }
            .share-icon {
                width: 20px;
                height: 20px;
                padding: 4px;
                border-radius: 40px;
                background-color: ${({ theme }) => theme.mode === 'dark' ? 'var(--grey-1-color)' : 'var(--grey-7-color)'};

                &-shared {
                    img {
                        filter: grayscale(1) contrast(80%) brightness(140%);
                    }
                }
            }
            .event-counter {
                font-weight: 700;
                font-size: 14px;
                line-height: 19px;
                display: flex;
                align-items: center;
                text-align: right;
                letter-spacing: -0.2px;
                color: ${(props) => props.accentColor};
                transform: translate(16px, 0px);
                transition: all .2s ease-in;
                svg {
                    color: var(--text-default-color);
                }
            }
            .gull {
                svg {
                    width: 16px;
                }
            }
            .points {
            }
            .icon {
                display: inline;
                height: initial;
                line-height: 1;
                img {
                    margin-inline-start: 3px;
                    width: 15px;
                }
                svg {
                    margin-inline-start: 3px;
                    width: 15px;
                    height: 15px;
                }
            }
        }

        .retry {
            display: flex;
            align-items: center;
            gap: 4px;

            span,
            svg {
                color: ${(props) => props.accentColor};
            }
        }

        .watched {
            ${({ theme: { mode } }) => css`
                border-color: var(--grey-${mode === 'dark' ? '4' : '6'}-color);

            `}
            .points {
                color: var(--text-default-color);
            }
            &:hover{
                .event-counter {
                    color: var(--text-default-color);
                    transform: translate(16px, 0px);
                    .arrow {
                        svg {
                            opacity: 0;
                        }
                    }
                }
            }
            .event-counter {
                color: var(--text-default-color);
                transform: translate(16px, 0px);
                .arrow {
                    svg {
                        opacity: 0;
                    }
                }
            }
        }

        .started {
            .points-earned {
                color: var(--text-default-color);
            }
        }
    }
    @keyframes show {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;
