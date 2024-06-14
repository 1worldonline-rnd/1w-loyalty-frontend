/* eslint-disable max-len */
import { css } from 'styled-components';

export const styles = css`
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    /* FIXME:  without this line 'text-overflow: ellipsis' doesn't work for '.wallet-number p' */
    max-width: calc(100vw - 40px);

    button,
    a {
        svg + span {
            margin-inline-start: 7px;
        }
    }
    .btn-light {
        background-color: #fff;
        color: var(--text-default-color);
    }
    .rs-btn-violet {
        width: 100%;
    }

    .swap-button-icon {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;

        ${({ theme: { mode } }) => css`
            background-color: var(--${mode === 'dark' ? 'grey-5' : 'text-default'}-color);
            color: ${mode === 'dark' ? 'var(--text-dark-color)' : '#fff'};
        `}
    }

    .swap-button_disabled .swap-button-icon {
        opacity: 0.5;
    }

    .wallet-container {
        h2 {
            text-align: center;
            font-weight: 700;
            font-size: 24px;
            line-height: 33px;
            color: var(--text-dark-color);
            margin-block-end: 8px;
        }
        h3 {
            font-weight: 600;
            font-size: 17px;
            line-height: 23px;
            text-transform: uppercase;
            color: rgb(var(--accent-primary-color));
            margin-block-end: 10px;
        }
        .token-icon {
            background: var(--accent-secondary-color);
            box-shadow: 0px 8px 17px -10px var(--accent-secondary-color);
            border-radius: 60px;
            width: 56px;
            height: 56px;
            position: relative;
            svg {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }
        .divider {
            height: 2px;
            ${({ theme: { mode } }) => css`
                background-color: var(--grey-${mode === 'dark' ? '4' : '6'}-color);
            `}
            width: calc(100% - 110px);
            border-radius: 1px;
        }
        .divider-desktop {
            display: none;
        }
        .swap-button_disabled,
        .swap-button {
            height: 42px;
            top: 112px;
            padding: 6px 10px 6px 6px;
            border-radius: 44px;
            display: flex;
            cursor: pointer;
            span {
                margin-inline-start: 6px;
                font-weight: bold;
                font-size: 17px;
                line-height: 23px;
                letter-spacing: -0.2px;
                color: var(--text-primary-color);
            }
        }
        .swap-button_disabled {
            background-color: var(--disabled-color);
            cursor: not-allowed;

            span {
                color: var(--text-disabled-color);
            }
        }
        .swap-button {
            ${({ theme: { mode } }) => css`
                background-color: ${mode === 'dark' ? 'var(--grey-4-color)' : 'var(--grey-7-color)'};
            `}
            transition: 0.15s linear;

            &:hover {
                ${({ theme: { mode } }) => css`
                    background-color: ${mode === 'dark'
                        ? 'var(--text-light-color)'
                        : 'var(--text-default-color)'};
                `}
                transition: 0.15s linear;
                span {
                    color: var(--text-accent-secondary-color);
                    transition: 0.15s linear;
                }
            }
        }
        form {
            width: 100%;
            position: relative;
            margin-block-start: 6px;
            padding: 0 32px 0 26px;
            .wallet-icon {
                position: absolute;
                top: 6px;
                left: 5px;
            }
            input {
                width: 100%;
                font-size: 17px;
                line-height: 23px;
            }
        }
        .wallet-sign-up {
            padding: 100px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: linear-gradient(255.08deg, rgba(109, 96, 233, 0.1) 0%, rgba(255, 46, 0, 0.1) 98.94%);

            .icons {
                position: relative;
                width: 100%;
                margin-block-end: 15px;
            }

            .icon {
                display: grid;
                place-items: center;
                background-color: #fff;
                width: 95px;
                height: 95px;
                border-radius: 50%;

                &--logotype,
                &--token,
                &--emoji {
                    box-shadow: 0px 11.1905px 57.8175px rgba(44, 70, 95, 0.1);
                }

                &--logotype {
                    z-index: 1;
                    position: relative;
                    left: 50%;
                    transform: translate(-50%);
                }

                &--token,
                &--emoji {
                    top: 50%;
                    transform: translateY(-50%);
                    position: absolute;
                    width: 72px;
                    height: 72px;
                }

                &--token {
                    left: calc(50% - 42.5px - 62px);
                }

                &--emoji {
                    right: calc(50% - 42.5px - 62px);
                }
            }

            p {
                text-align: center;
                font-weight: 500;
                font-size: 24px;
                max-width: 350px;
                margin-block-end: 15px;
                color: var(--text-dark-color);
            }

            button {
                max-width: 290px;
                width: 100%;
            }
        }

        .wallet-authorized {
            border-width: 1px;
            border-style: solid;

            ${({ theme: { mode } }) => css`
                border-color: var(--grey-${mode === 'dark' ? '4' : '6'}-color);
                background-color: ${mode === 'dark' ? 'var(--grey-3-color)' : '#fff'};
            `}
            box-shadow: 1px 2px 30px -7px rgba(0, 0, 0, 0.06);
            border-radius: 10px;
            padding: 18px 20px;

            .points-container,
            .tokens-container {
                color: var(--accent-secondary-color);
                border-radius: 6px;
            }

            .points-container {
                .point-description {
                    color: var(--grey-2-color);
                    .count {
                        font-weight: bold;
                        letter-spacing: -0.25px;
                    }
                    .conversion {
                        font-size: 17px;
                        margin-inline-start: 10px;
                    }
                }
                .points {
                    font-size: 34px;
                    color: rgb(var(--accent-primary-color));
                    .point-icon {
                        background: rgb(var(--accent-primary-color));
                        box-shadow: 0px 8px 17px -10px rgb(var(--accent-primary-color));
                        border-radius: 60px;
                        width: 56px;
                        height: 56px;
                        position: relative;
                        svg {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }
                    }
                    strong {
                        margin-inline-start: 10px;
                    }
                }
                .convertible-points {
                    display: flex;
                    align-items: baseline;
                }

                .possible-tokens {
                    margin-left: 7px;
                    line-height: 10px;
                    .tokens-name {
                        color: var(--grey-1-color);
                    }
                }

                .tokens-name,
                .possible-tokens-number {
                    font-size: 17px;
                    font-weight: 700;
                    line-height: 23px;
                    color: var(--grey-1-color);
                }

                .tokens-name {
                    font-weight: 400;
                }
            }
            .points-container-desktop {
                display: none;
            }
            .tokens-container {
                margin-block-start: 2px;
                &-desktop {
                    display: none;
                }
                h3 {
                    color: var(--accent-secondary-color);
                }
                .tokens {
                    font-size: 34px;
                    color: var(--accent-secondary-color);
                    margin-inline-start: 10px;
                    font-weight: bold;
                }
                .tokens-holder {
                    position: relative;

                    .withdraw-configs {
                        position: absolute;
                        top: 5px;
                        right: 0;
                    }

                    .min-config,
                    .max-config {
                        font-weight: 700;
                        font-size: 14px;
                        line-height: 19px;
                        color: var(--accent-secondary-color);
                    }

                    .min-config {
                        color: #b7b9bf;
                    }

                    .min-config-text {
                        font-weight: 400;
                    }
                }
                .token-description {
                    color: var(--grey-2-color);
                    flex-direction: column;
                    align-items: flex-start;

                    .count {
                        font-weight: bold;
                        letter-spacing: -0.25px;
                    }
                    p {
                        margin: 4px 0px 0px 10px;
                        color: var(--text-default-color);
                        font-size: 14px;
                        font-weight: bold;
                    }
                    input {
                        border: none;
                        outline: none;
                        width: 150px;
                        box-shadow: none;
                        flex-direction: column;
                        color: var(--accent-secondary-color);
                        letter-spacing: -0.2px;
                        line-height: 33px;
                        font-weight: bold;
                        font-size: 24px;
                        padding: 0;
                        margin-inline-start: 10px;
                        background: transparent;
                    }
                }

                .wallet-editor {
                    border: 1px solid var(--grey-6-color);
                    border-radius: 10px;
                    width: 100%;
                    padding: 5px;
                    margin: 12px 0 9px;
                    .transaction-fee-container {
                        border-top: 1px solid var(--grey-6-color);
                        padding-block-start: 5px;
                        p {
                            text-align: center;
                            padding: 6px 0;
                            color: var(--text-light-color);
                        }
                    }
                    .form-container {
                        position: relative;

                        .form {
                            margin-block-end: 10px;
                            .wallet-input {
                                outline: none;
                                border: none;
                                outline-style: none;
                                box-shadow: none;
                                border-color: transparent;
                                /* &:focus {
                                    outline: none;
                                    border: none;
                                    outline-style: none;
                                    box-shadow: none;
                                    border-color: transparent;
                                } */
                            }
                            .form-submit {
                                position: absolute;
                                right: 10px;
                                top: 0;
                                padding: 0;
                                height: 0;
                            }
                            .pencilIcon-container {
                                cursor: pointer;
                                position: absolute;
                                right: 0;
                                top: 0;
                            }

                            input {
                                background: transparent;
                            }
                        }
                    }
                }

                .wallet-show-mode {
                    position: relative;
                    height: 42px;
                    width: 100%;
                    overflow: hidden;
                    margin-block-end: 5px;
                    .wallet-address-container {
                        width: calc (100% - 20px);
                        margin: 12px 34px 0px 35px;
                        display: block;
                        overflow: hidden;
                        .address {
                            position: absolute;
                            top: 12px;
                            right: 34px;

                            ${({ theme: { mode } }) => css`
                                background-color: ${mode === 'dark' ? 'var(--grey-3-color)' : '#fff'};
                            `}
                        }
                    }

                    .wallet-icon {
                        position: absolute;
                        top: 12px;
                        left: 5px;
                    }

                    p {
                        font-size: 17px;
                        color: var(--text-light-grey-color);
                    }
                    .pencil-icon {
                        cursor: pointer;
                        position: absolute;
                        right: 1px;
                        top: 7px;
                    }
                }
                .buttons-container {
                    width: 100%;
                    .send-to-wallet {
                        width: 100%;
                        margin-block-end: 5px;
                        letter-spacing: 0.5px;
                    }
                    .cancel-btn {
                        width: 100%;
                        letter-spacing: -0.2 px;
                    }
                }
                .wallet-number {
                    flex-wrap: nowrap;
                    margin: 10px 0;

                    svg {
                        fill: var(--text-default-color);
                        margin-inline-end: 7px;
                    }

                    p {
                        flex: 1;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }

                .btn-settings {
                    margin-inline-end: 6px;
                }
            }

            .withdraw-btn {
                margin-block-start: 18px;
                width: 100%;
                color: var(--grey-8-color);
                font-size: 17px;
                ${({ theme: { mode } }) => css`
                    background-color: ${mode === 'dark' ? 'var(--grey-4-color)' : 'var(--grey-7-color)'};
                `}
            }
        }
    }

    @media screen and (min-width: 1201px) {
        .wallet-container {
            h3 {
                margin-block-end: 0px;
            }
            .wallet-authorized {
                max-width: 636px;
                margin: 0 auto;
                padding: 31px 20px;

                .points-container {
                    display: none;
                    &-desktop {
                        display: block;
                        .points {
                            display: grid;
                            grid-template-columns: 2fr 56px 2fr;
                            justify-items: center;
                            align-items: center;
                            justify-items: stretch;
                            grid-gap: 15px;
                            margin-block-end: 19px;
                            h3 {
                                text-align: right;
                            }
                            .token-icon {
                                display: flex;
                                align-items: center;
                            }
                            .convertible-points {
                                strong {
                                    margin-inline-start: 0px;
                                    margin-block-end: 0px;
                                }
                            }
                        }
                    }
                }

                .tokens-container {
                    display: none;
                    &-desktop {
                        display: block;
                        .points {
                            display: grid;
                            grid-template-columns: 2fr 56px 2fr;
                            justify-items: center;
                            align-items: center;
                            justify-items: stretch;
                            grid-gap: 15px;
                            margin-block-start: 19px;
                            margin-block-end: 22px;

                            .token-icon {
                                display: flex;
                                align-items: center;
                            }
                            .token-description {
                                .tokens {
                                    margin-inline-start: 0px;
                                }
                            }
                        }
                        /* .token-icon {
                            position: relative;
                            .tokens{
                                position: absolute;
                                top: 1px;
                                right: -35px;                              
                            }
                            h3 {
                                position: absolute;
                                top: 13px;
                                left: -195px;
                            }
                        } */
                    }
                }

                .withdraw-btn {
                    width: initial;
                    margin: 0 auto;
                    display: block;
                }
            }

            .divider {
                height: 2px;
                ${({ theme: { mode } }) => css`
                    background-color: var(--grey-${mode === 'dark' ? '4' : '6'}-color);
                `}
                width: calc(100%/2 - 55px);
                border-radius: 1px;
            }
            .divider-desktop {
                display: block;
            }
        }
    }
`;
